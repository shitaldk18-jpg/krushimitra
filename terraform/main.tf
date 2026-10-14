# ==============================================================================
# KRUSHIMITRA AGRO - AWS FREE TIER S3 STATIC WEBSITE HOSTING (TERRAFORM)
# Architecture: Amazon S3 Static Website Hosting (100% AWS Free Tier)
# Instant deployment: Zero verification required, works immediately!
# ==============================================================================

# Random suffix to ensure unique global S3 bucket name
resource "random_string" "bucket_suffix" {
  length  = 6
  special = false
  upper   = false
}

# 1. S3 Bucket for Static Website
resource "aws_s3_bucket" "site_bucket" {
  bucket        = "${var.project_name}-${random_string.bucket_suffix.result}"
  force_destroy = true # Allows clean teardown if destroyed

  tags = {
    Name = "${var.project_name}-website"
  }
}

# 2. Allow Public Read on S3 Website Bucket (Free Tier static hosting)
resource "aws_s3_bucket_public_access_block" "site_bucket_pab" {
  bucket = aws_s3_bucket.site_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 3. Enable Static Website Hosting configuration on S3
resource "aws_s3_bucket_website_configuration" "site_web_config" {
  bucket = aws_s3_bucket.site_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# 4. Public Read Bucket Policy for Website Hosting
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.site_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.site_bucket.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.site_bucket_pab]
}

# 5. Automatic File Uploads to S3 with Accurate MIME Types
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
