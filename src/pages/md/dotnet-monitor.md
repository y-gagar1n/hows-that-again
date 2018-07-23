---
title: "Monitor"
path: "/blog/dotnet-monitor"
---
# Monitor

<http://www.albahari.com/threading/part4.aspx#_How_to_Use_Wait_and_Pulse>

Pulse предназначен для того, чтобы его использовать внутри lock. В коде Work доходит до Wait, а он внутри себя отпускает lock и останавливается. После этого Main() захватывает lock, запускает Pulse, а он внутри себя **отпускает поток Work** и выполнение Work продолжается, но только **после того** как дойдет до конца блокировка lock в методе Main.

# Пример использования:

```csarp
static void Main(string[] args) 
{ 
	Thread t1 = new Thread(() =>
	{ 
		lock (_lock) 
		{ 
			_go = true; 
			Monitor.Pulse(_lock); 
			Console.WriteLine("Pulsed"); 
		} 
		Thread.Sleep(1000); 
		Console.WriteLine("t1 finished"); 
	}); 
	Thread t2 = new Thread(() =>
	{ 
		lock (_lock) 
		{ 
			while (!_go) 
			{ 
				Monitor.Wait(_lock); 
				Console.WriteLine("Waited"); 
			} 
		} 
		Console.WriteLine("t2 finished"); 
	}); 
	t2.Start(); 
	t1.Start(); 
	while (true) ; 
}
```

На экран выдастся:

```
Pulsed
Waited
t2 finished
t1 finished
```
  


  


  


  

