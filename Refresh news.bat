@echo off
REM Fetches the latest science and engineering headlines for the news banner.
cd /d "%~dp0"
py update_news.py
pause
