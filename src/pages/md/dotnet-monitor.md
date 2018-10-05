---
title: ".NET Monitor"
path: "/blog/dotnet-monitor"
---


# Monitor

## Wait/Pulse

Обычно нужен для реализации Consumer-Producer.

У каждого синхронизируемого объекта есть ready queue и waiting queue.

**Ready queue** - это коллекция потоков, которые ждут блокировки на одном объекте.

**Waiting queue** - очередь потоков, ожидающих попадания в ready queue (см. ниже)

Когда поток, владеющий локом, вызывает `Monitor.Wait(_locker)`, то он немедленно отпускает лок на этом объекте и встает в *waiting queue* этого объекта. 

После этого лок получает следующий поток в *ready queue* объекта.

Когда какой-нибудь владелец лока вызывает `Monitor.Pulse(_locker)`, то первый поток в *waiting queue* ставится в конец *ready queue* (при этом Pulse *не отпускает* лок). Когда до этого потока дойдет очередь и он захватит лок, то выполнение кода продолжается со строчки, следующей за вызовом `Monitor.Wait(_locker)`.

Если владелец лока вызывает `Monitor.PulseAll(_locker)`, то вызываются по очереди все потоки из *waiting queue*.

Если вызвать `Pulse`, когда очередь waiting queue пуста, то ничего не произойдет. Если вызвать его снаружи лока, то словим `SynchronizationLockException`.

*waiting queue* нужна, чтобы не приходилось использовать активное ожидание при использовании паттерна Producer-Consumer

Обычно внутри тредов, использующих Pulse/Wait используется `while`, как в примере ниже. Это нужно по 2 причинам:

1. Чтобы обезопаситься в ситуации, когда Pulse вызывается раньше, чем Wait
2. После Pulse поток с Wait идет в конец ready queue и до его выполнения могут отработать еще несколько потоков. Причем это могут быть просто другие консюмеры, вызывающие этот же метод. Может возникнуть ситуация, когда они поменяют условия и выставят переменную \_block обратно в true. Тогда мы не должны продолжать выполнение потока после Wait, а встать обратно в ожидание.

## Общий алгоритм использования Monitor.Pulse/Wait

1. Когда хотим заблокировать выполнение, включаем следующий код:

	```csharp
	lock (_locker)
	  while ( <blocking-condition> )
	    Monitor.Wait (_locker);
	```

2. Когда изменяем (или потенциально можем изменить) условие блокировки, включаем следующий код:

	```csharp
	lock (_locker)
	{
	  // Изменяем данные, которые влияют на условие блокировки
	  // ...
	  Monitor.Pulse(_locker);  // или: Monitor.PulseAll (_locker);
	}
	```

## Пример использования:

```csharp
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

## Имплементация ивентов через Wait/Pulse

Вот имплементация AutoResetEvent:

```csharp
readonly object key = new object();
bool block = true;

// thread A
lock ( key )
{
  while ( block )
    Monitor.Wait( key );
  block = true;
}

// thread B
lock ( key )
{
  block = false;
  Monitor.Pulse( key );
}
```

Если уберем строчку `block=true`, то получим **ManualResetEvent**. А если используем `int` вместо `bool`, то получим семафор.

## Имплементация Producer-Consumer через Wait/Pulse

Внутри используется стэк задач, когда стэк пуст, то консюмеры должны блокироваться

```csharp
class MyStack<T>
{
    private object _locker = new object();
    private Stack<T> _stack = new Stack<T>();

    public void Push(T value)
    {
        lock (_locker)
        {
            _stack.Push(value);
            if (_stack.Count == 1)
            	Monitor.Pulse(_locker);
        }
    }

    public T Pop()
    {
        lock (_locker)
        {
            while (_stack.Count == 0)
                Monitor.Wait(_locker);
            return _stack.Pop();
        }
    }
}
class Program
{
    static void Main(string[] args)
    {
        var q = new MyStack<int>();
        Thread producer = new Thread(() =>
        {
            for (int i = 0; i < 10; i++)
                q.Push(i);
            while (true)
            {
                q.Push(100);
                Thread.Sleep(1000);
            }
        });
        for (int i = 0; i < 5; i++)
        {
            var c = i;
            Thread consumer = new Thread(() =>
            {
                while (true)
                {
                    Thread.Sleep(100);
                    Console.WriteLine(c.ToString() + ": " + q.Pop());

                }
            });
            consumer.Start();
        }
        producer.Start();
        while (true) ;
    }

}
```

## Monitor.Wait(int timeout)

Если указать таймаут, то по истечению интервала поток сам встанет в ready queue.

### Пример использования Monitor.Wait с таймаутом

<http://www.albahari.com/threading/part4.aspx#_How_to_Use_Wait_and_Pulse>

```csharp
class SimpleWaitPulse
{
  static readonly object _locker = new object();
  static bool _block = true;
 
  static void Main()
  {                                // The new thread will block
    new Thread (Work).Start();     // because _go==false.
 
    Console.ReadLine();            // Wait for user to hit Enter
 
    lock (_locker)                 // Let's now wake up the thread by
    {                              // setting _block=false and pulsing.
      bloack = false;
      Monitor.Pulse (_locker);
    }
  }
 
  static void Work()
  {
    lock (_locker)
      while (block)
        Monitor.Wait (_locker);    // Lock is released while we’re waiting
 
    Console.WriteLine ("Woken!!!");
  }
}
```

Pulse предназначен для того, чтобы его использовать внутри lock. В коде Work доходит до Wait, а он внутри себя отпускает lock и останавливается. После этого Main() захватывает lock, запускает Pulse, а он внутри себя **отпускает поток Work** и выполнение Work продолжается, но только **после того** как дойдет до конца блокировка lock в методе Main.