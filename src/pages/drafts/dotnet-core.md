---
title: ".NET Core"
path: "/blog/dotnet-core"
---
# .NET Core

Чтобы из консоли (без студии) построить экзешник:

	dotnet publish -c Release -r win10-x64

Дебаг фреймворка: <https://github.com/dotnet/coreclr/blob/master/Documentation/building/debugging-instructions.md>

  * на шаге 7 (Set Command Arguments=`<managed app you wish to run>` (e.g. HelloWorld.exe)) нужно указывать путь не к .exe, а к .dll, причем к тому, рядом с которым лежат све его .dll, в том числе и mscorlib.dll. После команды publish он будет лежать в папке \bin\Release\netcoreapp2.0\<платформа>\publish. Пример: **C:\Work\netcore\helloworld\bin\Release\netcoreapp2.0\win10-x64\publish\helloworld.dll**

  

