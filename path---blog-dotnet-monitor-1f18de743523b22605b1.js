webpackJsonp([44704367536930],{439:function(n,s){n.exports={data:{markdownRemark:{html:'<h1>Monitor</h1>\n<h2>Wait/Pulse</h2>\n<p>Обычно нужен для реализации Consumer-Producer.</p>\n<p>У каждого синхронизируемого объекта есть ready queue и waiting queue.</p>\n<p><strong>Ready queue</strong> - это коллекция потоков, которые ждут блокировки на одном объекте.</p>\n<p><strong>Waiting queue</strong> - очередь потоков, ожидающих попадания в ready queue (см. ниже)</p>\n<p>Когда поток, владеющий локом, вызывает <code class="language-text">Monitor.Wait(_locker)</code>, то он немедленно отпускает лок на этом объекте и встает в <em>waiting queue</em> этого объекта. </p>\n<p>После этого лок получает следующий поток в <em>ready queue</em> объекта.</p>\n<p>Когда какой-нибудь владелец лока вызывает <code class="language-text">Monitor.Pulse(_locker)</code>, то первый поток в <em>waiting queue</em> ставится в конец <em>ready queue</em> (при этом Pulse <em>не отпускает</em> лок). Когда до этого потока дойдет очередь и он захватит лок, то выполнение кода продолжается со строчки, следующей за вызовом <code class="language-text">Monitor.Wait(_locker)</code>.</p>\n<p>Если владелец лока вызывает <code class="language-text">Monitor.PulseAll(_locker)</code>, то вызываются по очереди все потоки из <em>waiting queue</em>.</p>\n<p>Если вызвать <code class="language-text">Pulse</code>, когда очередь waiting queue пуста, то ничего не произойдет. Если вызвать его снаружи лока, то словим <code class="language-text">SynchronizationLockException</code>.</p>\n<p><em>waiting queue</em> нужна, чтобы не приходилось использовать активное ожидание при использовании паттерна Producer-Consumer</p>\n<p>Обычно внутри тредов, использующих Pulse/Wait используется <code class="language-text">while</code>, как в примере ниже. Это нужно по 2 причинам:</p>\n<ol>\n<li>Чтобы обезопаситься в ситуации, когда Pulse вызывается раньше, чем Wait</li>\n<li>После Pulse поток с Wait идет в конец ready queue и до его выполнения могут отработать еще несколько потоков. Причем это могут быть просто другие консюмеры, вызывающие этот же метод. Может возникнуть ситуация, когда они поменяют условия и выставят переменную _block обратно в true. Тогда мы не должны продолжать выполнение потока после Wait, а встать обратно в ожидание.</li>\n</ol>\n<h2>Общий алгоритм использования Monitor.Pulse/Wait</h2>\n<ol>\n<li>\n<p>Когда хотим заблокировать выполнение, включаем следующий код:</p>\n<div class="gatsby-highlight" data-language="csharp"><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">lock</span> <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span>\n  <span class="token keyword">while</span> <span class="token punctuation">(</span> <span class="token operator">&lt;</span>blocking<span class="token operator">-</span>condition<span class="token operator">></span> <span class="token punctuation">)</span>\n    Monitor<span class="token punctuation">.</span>Wait <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>\n</li>\n<li>\n<p>Когда изменяем (или потенциально можем изменить) условие блокировки, включаем следующий код:</p>\n<div class="gatsby-highlight" data-language="csharp"><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">lock</span> <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n  <span class="token comment">// Изменяем данные, которые влияют на условие блокировки</span>\n  <span class="token comment">// ...</span>\n  Monitor<span class="token punctuation">.</span><span class="token function">Pulse</span><span class="token punctuation">(</span>_locker<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// или: Monitor.PulseAll (_locker);</span>\n<span class="token punctuation">}</span></code></pre></div>\n</li>\n</ol>\n<h2>Пример использования:</h2>\n<div class="gatsby-highlight" data-language="csharp"><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> \n<span class="token punctuation">{</span> \n\t<span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n\t<span class="token punctuation">{</span> \n\t\t<span class="token keyword">lock</span> <span class="token punctuation">(</span>_lock<span class="token punctuation">)</span> \n\t\t<span class="token punctuation">{</span> \n\t\t\t_go <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">;</span> \n\t\t\tMonitor<span class="token punctuation">.</span><span class="token function">Pulse</span><span class="token punctuation">(</span>_lock<span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t\t\tConsole<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"Pulsed"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t\t<span class="token punctuation">}</span> \n\t\tThread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t\tConsole<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"t1 finished"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t<span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n\t<span class="token punctuation">{</span> \n\t\t<span class="token keyword">lock</span> <span class="token punctuation">(</span>_lock<span class="token punctuation">)</span> \n\t\t<span class="token punctuation">{</span> \n\t\t\t<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>_go<span class="token punctuation">)</span> \n\t\t\t<span class="token punctuation">{</span> \n\t\t\t\tMonitor<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span>_lock<span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t\t\t\tConsole<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"Waited"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t\t\t<span class="token punctuation">}</span> \n\t\t<span class="token punctuation">}</span> \n\t\tConsole<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"t2 finished"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\tt2<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\tt1<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">true</span><span class="token punctuation">)</span> <span class="token punctuation">;</span> \n<span class="token punctuation">}</span></code></pre></div>\n<p>На экран выдастся:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">Pulsed\nWaited\nt2 finished\nt1 finished</code></pre></div>\n<h2>Имплементация ивентов через Wait/Pulse</h2>\n<p>Вот имплементация AutoResetEvent:</p>\n<div class="gatsby-highlight" data-language="csharp"><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">readonly</span> <span class="token keyword">object</span> key <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">bool</span> block <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">;</span>\n\n<span class="token comment">// thread A</span>\n<span class="token keyword">lock</span> <span class="token punctuation">(</span> key <span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">while</span> <span class="token punctuation">(</span> block <span class="token punctuation">)</span>\n    Monitor<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span> key <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  block <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// thread B</span>\n<span class="token keyword">lock</span> <span class="token punctuation">(</span> key <span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n  block <span class="token operator">=</span> <span class="token keyword">false</span><span class="token punctuation">;</span>\n  Monitor<span class="token punctuation">.</span><span class="token function">Pulse</span><span class="token punctuation">(</span> key <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>Если уберем строчку <code class="language-text">block=true</code>, то получим <strong>ManualResetEvent</strong>. А если используем <code class="language-text">int</code> вместо <code class="language-text">bool</code>, то получим семафор.</p>\n<h2>Имплементация Producer-Consumer через Wait/Pulse</h2>\n<p>Внутри используется стэк задач, когда стэк пуст, то консюмеры должны блокироваться</p>\n<div class="gatsby-highlight" data-language="csharp"><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">class</span> <span class="token class-name">MyStack</span><span class="token operator">&lt;</span>T<span class="token operator">></span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">object</span> _locker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> Stack<span class="token operator">&lt;</span>T<span class="token operator">></span> _stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token generic-method"><span class="token function">Stack</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">Push</span><span class="token punctuation">(</span><span class="token class-name">T</span> <span class="token keyword">value</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">lock</span> <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            _stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>_stack<span class="token punctuation">.</span>Count <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n            \tMonitor<span class="token punctuation">.</span><span class="token function">Pulse</span><span class="token punctuation">(</span>_locker<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">lock</span> <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            <span class="token keyword">while</span> <span class="token punctuation">(</span>_stack<span class="token punctuation">.</span>Count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>\n                Monitor<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span>_locker<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> _stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">class</span> <span class="token class-name">Program</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> q <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token generic-method"><span class="token function">MyStack</span><span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Thread</span> producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n        <span class="token punctuation">{</span>\n            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>\n                q<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">true</span><span class="token punctuation">)</span>\n            <span class="token punctuation">{</span>\n                q<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            <span class="token keyword">var</span> c <span class="token operator">=</span> i<span class="token punctuation">;</span>\n            <span class="token class-name">Thread</span> consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n            <span class="token punctuation">{</span>\n                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">true</span><span class="token punctuation">)</span>\n                <span class="token punctuation">{</span>\n                    Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">": "</span> <span class="token operator">+</span> q<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            consumer<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        producer<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">true</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span></code></pre></div>\n<h2>Monitor.Wait(int timeout)</h2>\n<p>Если указать таймаут, то по истечению интервала поток сам встанет в ready queue.</p>\n<h3>Пример использования Monitor.Wait с таймаутом</h3>\n<p><a href="http://www.albahari.com/threading/part4.aspx#_How_to_Use_Wait_and_Pulse">http://www.albahari.com/threading/part4.aspx#<em>How</em>to<em>Use</em>Wait<em>and</em>Pulse</a></p>\n<div class="gatsby-highlight" data-language="csharp"><pre class="language-csharp"><code class="language-csharp"><span class="token keyword">class</span> <span class="token class-name">SimpleWaitPulse</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token keyword">object</span> _locker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">static</span> <span class="token keyword">bool</span> _block <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">;</span>\n \n  <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>                                <span class="token comment">// The new thread will block</span>\n    <span class="token keyword">new</span> <span class="token class-name">Thread</span> <span class="token punctuation">(</span>Work<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// because _go==false.</span>\n \n    Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>            <span class="token comment">// Wait for user to hit Enter</span>\n \n    <span class="token keyword">lock</span> <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span>                 <span class="token comment">// Let\'s now wake up the thread by</span>\n    <span class="token punctuation">{</span>                              <span class="token comment">// setting _block=false and pulsing.</span>\n      bloack <span class="token operator">=</span> <span class="token keyword">false</span><span class="token punctuation">;</span>\n      Monitor<span class="token punctuation">.</span>Pulse <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n \n  <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">lock</span> <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span>\n      <span class="token keyword">while</span> <span class="token punctuation">(</span>block<span class="token punctuation">)</span>\n        Monitor<span class="token punctuation">.</span>Wait <span class="token punctuation">(</span>_locker<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Lock is released while we’re waiting</span>\n \n    Console<span class="token punctuation">.</span>WriteLine <span class="token punctuation">(</span><span class="token string">"Woken!!!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>Pulse предназначен для того, чтобы его использовать внутри lock. В коде Work доходит до Wait, а он внутри себя отпускает lock и останавливается. После этого Main() захватывает lock, запускает Pulse, а он внутри себя <strong>отпускает поток Work</strong> и выполнение Work продолжается, но только <strong>после того</strong> как дойдет до конца блокировка lock в методе Main.</p>',frontmatter:{path:"/blog/dotnet-monitor",title:".NET Monitor"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-dotnet-monitor-1f18de743523b22605b1.js.map