@echo off
echo ========================================
echo Starting Unity AI Application
echo ========================================
echo.

echo Checking if dependencies are installed...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Setting up environment files if needed...
if not exist "backend\.env" (
    echo Creating backend .env file...
    copy backend\.env.example backend\.env
)

if not exist "frontend\.env" (
    echo Creating frontend .env file...
    copy frontend\.env.example frontend\.env
)

echo.
echo ========================================
echo Starting Backend and Frontend...
echo ========================================
echo Backend will run on: http://localhost:3001
echo Frontend will run on: http://localhost:3000
echo.
echo Opening browser in 10 seconds...
echo Press Ctrl+C to stop the servers
echo ========================================
echo.

REM Start the dev servers in background and wait for them to start
start /B npm run dev

REM Wait 10 seconds for servers to start
timeout /t 10 /nobreak >nul

REM Open the browser
start http://localhost:3000

REM Keep the window open
pause
