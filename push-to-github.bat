@echo off
title Krushimitra Agro - Push to GitHub
color 0A
echo ========================================================
echo   Pushing Krushimitra Agro Code to GitHub
echo   Repository: https://github.com/shitaldk18-jpg/krushimitra.git
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! All code pushed to GitHub successfully.
    echo   View repo: https://github.com/shitaldk18-jpg/krushimitra
    echo ========================================================
) else (
    echo ========================================================
    echo   Push failed or requires GitHub login.
    echo   Please sign in when the browser window opens.
    echo ========================================================
)
pause
