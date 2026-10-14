@echo off
title Krushimitra Agro Bansarola - Local Server
echo ========================================================
echo   Starting Krushimitra Agro Website on localhost:3000...
echo   Location: Bansarola, Ta. Kaij, Dist. Beed
echo   Contact: 9545169002
echo ========================================================
start http://localhost:3000
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"
pause
