---
title: "C# sockets"
path: "/blog/cs-sockets"
---
# C# sockets

## Сервер

```csharp
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace HttpServer
{
	class Program
	{
		static void Main(string[] args)
		{
			Socket s = new Socket(SocketType.Stream, ProtocolType.Tcp); 
			s.Bind(new IPEndPoint(IPAddress.Loopback, 5000)); 
			s.Listen(10); 
			var q = s.Accept(); 
			var buf = new byte[3]; 
			q.Receive(buf);
		}
	}
}
```

## Клиент

```csharp
using System;
using System.Net;
using System.Net.Sockets;

namespace HttpClient
{
	class Program
	{
		static void Main(string[] args)
		{ 
			var socket = new Socket(SocketType.Stream, ProtocolType.Tcp); 
			socket.Connect(IPAddress.Loopback, 5000); 
			var buf = new byte[] {1, 2, 3}; 
			socket.Send(buf);
		}
	}
}
```
  


  


  


  

