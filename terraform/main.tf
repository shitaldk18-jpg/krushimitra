# ==============================================================================
# KRUSHIMITRA AGRO - AWS FREE TIER INFRASTRUCTURE (TERRAFORM)
# Architecture: Private S3 Bucket + CloudFront CDN + Origin Access Control (OAC)
# Free Tier Compliance: 100% Free Tier (S3 5GB Free + CloudFront 1TB Always-Free)
# ==============================================================================

# Random suffix to ensure unique global S3 bucket name
resource "random_string" "bucket_suffix" {
  length  = 6
  special = false
  upper   = false
}

# 1. Private S3 Bucket for Static Website Assets
resource "aws_s3_bucket" "site_bucket" {
  bucket        = "${var.project_name}-${random_string.bucket_suffix.result}"
  force_destroy = true # Allows clean teardown if destroyed

  tags = {
    Name = "${var.project_name}-static-storage"
  }
}

# 2. Block all public S3 access (CloudFront accesses S3 privately via OAC)
resource "aws_s3_bucket_public_access_block" "site_bucket_pab" {
  bucket = aws_s3_bucket.site_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 3. CloudFront Origin Access Control (OAC) - Modern, Secure Replacement for OAI
resource "aws_cloudfront_origin_access_control" "site_oac" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name} static website"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# 4. S3 Bucket Policy allowing CloudFront OAC read access
resource "aws_s3_bucket_policy" "allow_cloudfront_oac" {
  bucket = aws_s3_bucket.site_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipalReadOnly"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site_distribution.arn
          }
        }
      }
    ]
  })
}

# 5. CloudFront Global CDN Distribution (Always Free Tier: 1TB transfer/mo + 10M requests/mo)
resource "aws_cloudfront_distribution" "site_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CDN Distribution for ${var.project_name}"
  default_root_object = "index.html"
  price_class         = "PriceClass_All" # Uses edge locations in Mumbai, Delhi, Hyderabad, Bengaluru, etc.

  origin {
    domain_name              = aws_s3_bucket.site_bucket.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.site_bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site_oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.site_bucket.id}"

    # Managed CachingOptimized policy ID (Default AWS optimized caching)
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  # SPA friendly fallback (returns index.html on 403 / 404)
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true # Free SSL Certificate from CloudFront (*.cloudfront.net)
  }

  tags = {
    Name = "${var.project_name}-cdn"
  }
}

# 6. Automatic File Uploads to S3 with Accurate MIME Types
locals {
  mime_types = {
    "html" = "text/html; charset=utf-8"
    "css"  = "text/css; charset=utf-8"
    "js"   = "application/javascript; charset=utf-8"
    "json" = "application/json"
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "jpeg" = "image/jpeg"
    "svg"  = "image/svg+xml"
    "ico"  = "image/x-icon"
    "txt"  = "text/plain"
    "md"   = "text/markdown"
  }

  # Discover all frontend files in root, css/, and js/
  website_files = setunion(
    fileset("${path.module}/..", "index.html"),
    fileset("${path.module}/..", "css/**"),
    fileset("${path.module}/..", "js/**")
  )
}

resource "aws_s3_object" "site_assets" {
  for_each     = local.website_files
  bucket       = aws_s3_bucket.site_bucket.id
  key          = each.value
  source       = "${path.module}/../${each.value}"
  etag         = filemd5("${path.module}/../${each.value}")
  content_type = lookup(local.mime_types, lower(element(reverse(split(".", each.value)), 0)), "binary/octet-stream")

  depends_on = [
    aws_s3_bucket.site_bucket,
    aws_s3_bucket_public_access_block.site_bucket_pab
  ]
}
