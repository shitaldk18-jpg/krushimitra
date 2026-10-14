variable "aws_region" {
  type        = string
  default     = "ap-south-1" # AWS Mumbai Region (Fastest for Maharashtra, India)
  description = "AWS region to deploy resources (Default: Mumbai ap-south-1)"
}

variable "project_name" {
  type        = string
  default     = "krushimitra-agro"
  description = "Base project identifier for naming AWS resources"
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Deployment environment name"
}
