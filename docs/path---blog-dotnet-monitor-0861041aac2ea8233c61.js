webpackJsonp([44704367536930],{398:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>Monitor</h1>\n<h2>Wait/Pulse</h2>\n<p>Обычно нужен для реализации Consumer-Producer.</p>\n<p>У каждого синхронизируемого объекта есть ready queue и waiting queue.</p>\n<p><strong>Ready queue</strong> - это коллекция потоков, которые ждут блокировки на одном объекте.</p>\n<p><strong>Waiting queue</strong> - очередь потоков, ожидающих попадания в ready queue (см. ниже)</p>\n<p>Когда поток вызывает <code>Monitor.Wait(_locker)</code>, то он немедленно отпускает лок на этом объекте и встает в waiting queue этого объекта. </p>\n<p>После этого лок получает следующий поток в ready queue объекта.</p>\n<p>Когда какой-нибудь владелец лока вызывает <code>Monitor.Pulse(_locker)</code>, то первый поток в waiting queue ставится в конец ready queue (при этом Pulse <em>не отпускает</em> лок). Когда до этого потока дойдет очередь и он захватит лок, то выполнение кода продолжается со строчки, следующей за вызовом <code>Monitor.Wait(_locker)</code>.</p>\n<p>Если владелец лока вызывает <code>Monitor.PulseAll(_locker)</code>, то вызываются по очереди все потоки из waiting queue.</p>\n<p>Если вызвать <code>Pulse</code>, когда очередь waiting queue пуста, то ничего не произойдет. Если вызвать его снаружи лока, то словим <code>SynchronizationLockException</code>.</p>\n<p>waiting queue нужна, чтобы не приходилось использовать активное ожидание при использовании паттерна Producer-Consumer</p>\n<p>Обычно внутри тредов, использующих Pulse/Wait используется while, как в примере ниже. Это нужно по 2 причинам:</p>\n<ol>\n<li>Чтобы обезопаситься в ситуации, когда Pulse вызывается раньше, чем Wait</li>\n<li>После Pulse поток с Wait идет в кноец ready queue и до его выполнения могут отработать еще несколько потоков. Причем это могут быть просто другие консюмеры, вызывающие этот же метод. Может возникнуть ситуация, когда они поменяют условия и выставят переменную _block обратно в true. Тогда мы не должны продолжать выполнение потока после Wait, а встать обратно в ожидание.</li>\n</ol>\n<h2>Имплементация ивентов через Wait/Pulse</h2>\n<p>Вот имплементация AutoResetEvent:</p>\n<pre><code class="language-csharp">readonly object key = new object();\nbool block = true;\n\n// thread A\nlock ( key )\n{\n  while ( block )\n    Monitor.Wait( key );\n  block = true;\n}\n\n// thread B\nlock ( key )\n{\n  block = false;\n  Monitor.Pulse( key );\n}\n</code></pre>\n<p>Если уберем строчку <code>block=true</code>, то получим <strong>ManualResetEvent</strong>. А если используем <code>int</code> вместо <code>bool</code>, то получим семафор.</p>\n<h2>Monitor.Wait(int timeout)</h2>\n<p>Если указать таймаут, то по истечению интервала поток сам встанет в ready queue.</p>\n<h2>Прммеры</h2>\n<p><a href="http://www.albahari.com/threading/part4.aspx#_How_to_Use_Wait_and_Pulse">http://www.albahari.com/threading/part4.aspx#<em>How</em>to<em>Use</em>Wait<em>and</em>Pulse</a></p>\n<pre><code class="language-csharp">class SimpleWaitPulse\n{\n  static readonly object _locker = new object();\n  static bool _block = true;\n \n  static void Main()\n  {                                // The new thread will block\n    new Thread (Work).Start();     // because _go==false.\n \n    Console.ReadLine();            // Wait for user to hit Enter\n \n    lock (_locker)                 // Let\'s now wake up the thread by\n    {                              // setting _block=false and pulsing.\n      bloack = false;\n      Monitor.Pulse (_locker);\n    }\n  }\n \n  static void Work()\n  {\n    lock (_locker)\n      while (block)\n        Monitor.Wait (_locker);    // Lock is released while we’re waiting\n \n    Console.WriteLine ("Woken!!!");\n  }\n}\n</code></pre>\n<p>Pulse предназначен для того, чтобы его использовать внутри lock. В коде Work доходит до Wait, а он внутри себя отпускает lock и останавливается. После этого Main() захватывает lock, запускает Pulse, а он внутри себя <strong>отпускает поток Work</strong> и выполнение Work продолжается, но только <strong>после того</strong> как дойдет до конца блокировка lock в методе Main.</p>\n<h1>Пример использования:</h1>\n<pre><code class="language-csharp">static void Main(string[] args) \n{ \n    Thread t1 = new Thread(() =>\n    { \n        lock (_lock) \n        { \n            _go = true; \n            Monitor.Pulse(_lock); \n            Console.WriteLine("Pulsed"); \n        } \n        Thread.Sleep(1000); \n        Console.WriteLine("t1 finished"); \n    }); \n    Thread t2 = new Thread(() =>\n    { \n        lock (_lock) \n        { \n            while (!_go) \n            { \n                Monitor.Wait(_lock); \n                Console.WriteLine("Waited"); \n            } \n        } \n        Console.WriteLine("t2 finished"); \n    }); \n    t2.Start(); \n    t1.Start(); \n    while (true) ; \n}\n</code></pre>\n<p>На экран выдастся:</p>\n<pre><code>Pulsed\nWaited\nt2 finished\nt1 finished\n</code></pre>',frontmatter:{path:"/blog/dotnet-monitor",title:".NET Monitor"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-dotnet-monitor-0861041aac2ea8233c61.js.map