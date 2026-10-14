# ==============================================================================
# Krushimitra Agro - Teardown / Cleanup Script (Terraform)
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Red
Write-Host "  TEARDOWN: DELETING S3 & CLOUDFRONT RESOURCES" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Red

terraform destroy -auto-approve

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nAll AWS resources cleaned up successfully without any recurring costs!" -ForegroundColor Green
} else {
    Write-Host "`nTerraform destroy encountered an error." -ForegroundColor Red
}
