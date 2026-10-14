output "website_url" {
  description = "Live HTTPS URL of the Krushimitra Agro website on AWS CloudFront"
  value       = "https://${aws_cloudfront_distribution.site_distribution.domain_name}"
}

output "cloudfront_domain" {
  description = "CloudFront default domain name"
  value       = aws_cloudfront_distribution.site_distribution.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID (used for cache invalidation)"
  value       = aws_cloudfront_distribution.site_distribution.id
}

output "s3_bucket_name" {
  description = "S3 Bucket storing static website assets"
  value       = aws_s3_bucket.site_bucket.id
}

output "aws_region" {
  description = "AWS region deployed to"
  value       = var.aws_region
}

output "free_tier_status" {
  description = "AWS Free Tier status breakdown"
  value = {
    s3_storage_tier         = "5 GB Free / month (Website uses < 1 MB - 0.02% of limit)"
    cloudfront_tier         = "Always Free: 1 TB transfer/month + 10,000,000 requests/month forever"
    ssl_certificate_tier    = "100% Free HTTPS with AWS CloudFront"
    estimated_monthly_bill  = "₹0.00 (Completely within AWS Free Tier)"
  }
}
