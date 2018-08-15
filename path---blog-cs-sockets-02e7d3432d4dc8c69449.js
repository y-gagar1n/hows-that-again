webpackJsonp([0xeb764c3984b6],{394:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>C# sockets</h1>\n<h2>Сервер</h2>\n<pre><code class="language-csharp">using System;\nusing System.IO;\nusing System.Net;\nusing System.Net.Sockets;\n\nnamespace HttpServer\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Socket s = new Socket(SocketType.Stream, ProtocolType.Tcp); \n            s.Bind(new IPEndPoint(IPAddress.Loopback, 5000)); \n            s.Listen(10); \n            var q = s.Accept(); \n            var buf = new byte[3]; \n            q.Receive(buf);\n        }\n    }\n}\n</code></pre>\n<h2>Клиент</h2>\n<pre><code class="language-csharp">using System;\nusing System.Net;\nusing System.Net.Sockets;\n\nnamespace HttpClient\n{\n    class Program\n    {\n        static void Main(string[] args)\n        { \n            var socket = new Socket(SocketType.Stream, ProtocolType.Tcp); \n            socket.Connect(IPAddress.Loopback, 5000); \n            var buf = new byte[] {1, 2, 3}; \n            socket.Send(buf);\n        }\n    }\n}\n</code></pre>',frontmatter:{path:"/blog/cs-sockets",title:"C# sockets"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-cs-sockets-02e7d3432d4dc8c69449.js.map