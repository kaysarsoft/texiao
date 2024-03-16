@echo off
set name=%~n0
echo 这是%name%脚本
echo 111开始111
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%-%time:~3,2%-%time:~6,2%
ping 127.0.0.1
echo 111结束111
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%-%time:~3,2%-%time:~6,2%