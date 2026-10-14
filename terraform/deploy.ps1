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
Write-Host "AWS Authentication verified successfully!" -ForegroundColor Green

# 4. Initialize Terraform
Write-Host "`n[2/4] Initializing Terraform (downloading AWS provider)..." -ForegroundColor Yellow
terraform init
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
