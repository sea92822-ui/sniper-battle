@echo off
set PATH=C:\Users\qqqq\AppData\Local\Temp\opencode\node\node-v20.18.0-win-x64;%PATH%
cd /d C:\sniper-battle
set EMAIL=sniper%RANDOM%@mail.com
echo Using: %EMAIL%
(
echo %EMAIL%
echo SniperPass1!
) | npx.cmd -y surge ./ sniper-battle-game.surge.sh
echo Exit code: %ERRORLEVEL%
pause
