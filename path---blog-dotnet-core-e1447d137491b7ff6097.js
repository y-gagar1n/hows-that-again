webpackJsonp([0xf1eba33d5c91],{421:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>.NET Core</h1>\n<p>Чтобы из консоли (без студии) построить экзешник:</p>\n<pre><code>dotnet publish -c Release -r win10-x64\n</code></pre>\n<p>Дебаг фреймворка: <a href="https://github.com/dotnet/coreclr/blob/master/Documentation/building/debugging-instructions.md">https://github.com/dotnet/coreclr/blob/master/Documentation/building/debugging-instructions.md</a></p>\n<ul>\n<li>на шаге 7 (Set Command Arguments=<code>&#x3C;managed app you wish to run></code> (e.g. HelloWorld.exe)) нужно указывать путь не к .exe, а к .dll, причем к тому, рядом с которым лежат све его .dll, в том числе и mscorlib.dll. После команды publish он будет лежать в папке \\bin\\Release\\netcoreapp2.0&#x3C;платформа>\\publish. Пример: <strong>C:\\Work\\netcore\\helloworld\\bin\\Release\\netcoreapp2.0\\win10-x64\\publish\\helloworld.dll</strong></li>\n</ul>',frontmatter:{path:"/blog/dotnet-core",title:".NET Core"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-dotnet-core-e1447d137491b7ff6097.js.map