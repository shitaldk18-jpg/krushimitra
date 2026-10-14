output "website_url" {
  description = "Live URL of the Krushimitra Agro website on AWS S3 Static Website Hosting"
  value       = "http://${aws_s3_bucket_website_configuration.site_web_config.website_endpoint}"
}

output "website_endpoint" {
  description = "S3 Website endpoint domain"
  value       = aws_s3_bucket_website_configuration.site_web_config.website_endpoint
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
    data_transfer_tier      = "15 GB Free data transfer out per month"
    verification_needed     = "No AWS Support verification required!"
    estimated_monthly_bill  = "₹0.00 (100% within AWS Free Tier)"
  }
}
