param(
    [int]$Port = 3000
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:${Port}/")
$listener.Prefixes.Add("http://127.0.0.1:${Port}/")

try {
    $listener.Start()
} catch {
    $Port = 8080
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:${Port}/")
    $listener.Prefixes.Add("http://127.0.0.1:${Port}/")
    $listener.Start()
}

$currentDir = $PSScriptRoot
if (-not $currentDir) {
    $currentDir = (Get-Location).Path
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  KRUSHIMITRA AGRO BANSAROLA LOCAL SERVER ACTIVE!" -ForegroundColor Yellow
Write-Host "  Location: Bansarola, Ta. Kaij, Dist. Beed (Call: 9545169002)" -ForegroundColor Green
Write-Host "  URL: http://localhost:${Port}/" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.LocalPath.TrimStart([char]47)
        if ([string]::IsNullOrWhiteSpace($rawPath)) {
            $rawPath = "index.html"
        }

        $decodedPath = [System.Uri]::UnescapeDataString($rawPath).Replace([char]47, [char]92)
        $filePath = Join-Path $currentDir $decodedPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".htm"  { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                ".webp" { "image/webp" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found - $rawPath</h1>")
            $response.StatusCode = 404
            $response.ContentType = "text/html"
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        $response.Close()
    } catch {
        # ignore context interruptions
    }
}
