@echo off
title Legends of Avantris Launcher
echo ========================================================
echo        LEGENDS OF AVANTRIS: WORLD EXPLORER Launcher
echo ========================================================
echo.
echo Checking environment...

:: Check if Python is available in PATH
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Python detected. Starting local background server on port 8000...
    :: Start server quietly in the background
    start /B python -m http.server 8000 >nul 2>&1
    :: Bounded wait for server startup
    timeout /t 1 >nul
    echo Launching web browser at http://localhost:8000/index.html...
    start http://localhost:8000/index.html
) else (
    echo Python not detected. 
    echo Launching index.html directly as a local file...
    start index.html
)

echo.
echo Done! Enjoy exploring Avantris.
timeout /t 2 >nul
exit
