# ==============================================================================
# Krushimitra Agro - Automated AWS Deployment Script (Terraform)
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  KRUSHIMITRA AGRO - AWS FREE TIER DEPLOYMENT (TERRAFORM)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green

# 1. Check Terraform Installation
if (-not (Get-Command terraform -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Terraform is not installed on this system!" -ForegroundColor Red
    Write-Host "Install it quickly by running this command in PowerShell:" -ForegroundColor Yellow
    Write-Host "  winget install Hashicorp.Terraform --accept-source-agreements --accept-package-agreements" -ForegroundColor White
    exit 1
}

# 2. Check AWS CLI Installation
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] AWS CLI is not installed on this system!" -ForegroundColor Red
    Write-Host "Install it quickly by running this command in PowerShell:" -ForegroundColor Yellow
    Write-Host "  winget install Amazon.AWSCLI --accept-source-agreements --accept-package-agreements" -ForegroundColor White
    exit 1
}

# 3. Check AWS Credentials
Write-Host "`n[1/4] Verifying AWS Credentials..." -ForegroundColor Yellow
$awsIdentity = aws sts get-caller-identity 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] AWS Credentials not configured or expired!" -ForegroundColor Red
    Write-Host "Please run 'aws configure' and enter your AWS Access Key ID, Secret Access Key, and region (ap-south-1)." -ForegroundColor Yellow
    exit 1
}
$accountId = aws sts get-caller-identity --query Account --output text
$stateBucket = "krushimitra-tfstate-$accountId"
Write-Host "AWS Authentication verified successfully! Account ID: $accountId" -ForegroundColor Green

# Ensure State Bucket exists
Write-Host "Ensuring Terraform S3 state bucket ($stateBucket)..." -ForegroundColor Yellow
aws s3api head-bucket --bucket "$stateBucket" 2>$null
if ($LASTEXITCODE -ne 0) {
    aws s3api create-bucket --bucket "$stateBucket" --region ap-south-1 --create-bucket-configuration LocationConstraint=ap-south-1
    aws s3api put-bucket-versioning --bucket "$stateBucket" --versioning-configuration Status=Enabled
}

# 4. Initialize Terraform with S3 Backend
Write-Host "`n[2/4] Initializing Terraform with remote state..." -ForegroundColor Yellow
terraform init `
    -backend-config="bucket=$stateBucket" `
    -backend-config="key=krushimitra/terraform.tfstate" `
    -backend-config="region=ap-south-1"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Terraform init failed!" -ForegroundColor Red
    exit 1
}

# 5. Plan and Apply Infrastructure
Write-Host "`n[3/4] Planning and provisioning S3 & CloudFront (Free Tier)..." -ForegroundColor Yellow
terraform apply -auto-approve
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Terraform apply failed!" -ForegroundColor Red
    exit 1
}

# 6. Display Output
Write-Host "`n[4/4] Deployment Successful!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
$siteUrl = terraform output -raw website_url
Write-Host "  LIVE WEBSITE URL: $siteUrl" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "Note: CloudFront CDN distributions take 2-4 minutes to fully deploy globally." -ForegroundColor Yellow
