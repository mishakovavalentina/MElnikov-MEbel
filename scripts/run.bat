@echo off
chcp 65001 > nul

if not "%~1"=="" (
    python "%~dp0generate.py" "%~1"
    goto done
)

echo.
echo --------------------------------------------------
echo  Drag your Excel file onto run.bat  - OR -
echo  Enter path to Excel file below:
echo --------------------------------------------------
echo.
set /p EXCEL_PATH=Excel file:

if "%EXCEL_PATH%"=="" (
    echo Error: no path given.
    pause
    exit /b 1
)

python "%~dp0generate.py" "%EXCEL_PATH%"

:done
echo.
pause
