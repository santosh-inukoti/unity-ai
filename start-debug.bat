@echo off
echo ========================================
echo Unity AI - Debug Start
echo ========================================
echo.

echo Step 1: Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed
echo.

echo Step 2: Installing dependencies...
call npm run install-all
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo Step 3: Creating .env files...
if not exist "backend\.env" copy backend\.env.example backend\.env
if not exist "frontend\.env" copy frontend\.env.example frontend\.env
echo.

echo Step 4: Starting servers...
echo.
echo Starting backend on http://localhost:3001
echo Starting frontend on http://localhost:3000
echo.
echo Wait 15 seconds, then press any key to open browser...
echo.

start /B npm run dev

timeout /t 15 /nobreak

echo Opening browser...
start http://localhost:3000

echo.
echo If the page doesn't load, wait a bit longer and refresh!
echo Press Ctrl+C to stop the servers
echo.

pause
