variable "aws_region" {
  description = "AWS region where resources will be created."
  type        = string
}

variable "bucket_name" {
  description = "S3 bucket name used to host the dashboard build artifacts."
  type        = string
}

variable "cf_price_class" {
  description = "CloudFront price class."
  type        = string
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
}
