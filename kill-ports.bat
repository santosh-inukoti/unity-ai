@echo off
echo ========================================
echo Killing processes on ports 3000 and 3001
echo ========================================
echo.

echo Killing port 3000 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    echo Found process %%a on port 3000
    taskkill /F /PID %%a
)

echo.
echo Killing port 3001 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do (
    echo Found process %%a on port 3001
    taskkill /F /PID %%a
)

echo.
echo ========================================
echo All processes terminated!
echo ========================================
pause
