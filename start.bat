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
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo ========================================
echo.

npm run dev
