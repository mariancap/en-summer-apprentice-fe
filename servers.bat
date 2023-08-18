@echo off

 

REM Script to start Spring and .NET servers(run ./start_servers.bat in cl)

 

REM Start Spring server

echo Starting Spring server...

start cmd /k "cd C:\Users\tiber\OneDrive\Documente\ENDAVA\JAVA-SPRING\java2023demo\target && java -jar java2023demo-0.0.1-SNAPSHOT.jar"

 

REM Start .NET server

echo Starting .NET server...

start cmd /k "cd C:\Users\tiber\OneDrive\Documente\ENDAVA\.NET\TicketManagementSystemAPI\TicketManagementSystemAPI && dotnet run"

 

echo Servers started.