webpackJsonp([0x8769499f4e7e],{477:function(n,s){n.exports={data:{markdownRemark:{html:'<h1>Python</h1>\n<h2>Чтение аргументов командной строки</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> sys\n<span class="token builtin">file</span> <span class="token operator">=</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>   <span class="token comment"># название запущенного файла</span>\narg0 <span class="token operator">=</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>   <span class="token comment"># первый аргумент командной строки</span></code></pre></div>\n<h2>Декодирование байт в строку</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token builtin">str</span> <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">\'utf-8\'</span><span class="token punctuation">)</span> <span class="token comment"># преобразует массив байт (тип bytes в строку)</span></code></pre></div>\n<h2>Десериализация json</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> json\n\ndata <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span></code></pre></div>\n<h2>Чтение из файла</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token builtin">open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token string">\'r\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># читает и возвращает весь файл как строку в кодировке utf-8 </span></code></pre></div>\n<p>Если же нужно прочитать байты из файла, то:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">b <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token string">\'rb\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token builtin">type</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment"># &lt;class \'bytes\'></span></code></pre></div>\n<h2>Перечисление файлов</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> os\n\nos<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span><span class="token string">\'/home/y/my\'</span><span class="token punctuation">)</span> <span class="token comment"># [\'1.jpg\', \'2.jpg\', \'3.jpg\']</span></code></pre></div>\n<h2>Работа с путями</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> os\n\n<span class="token builtin">file</span> <span class="token operator">=</span> <span class="token string">\'photo.jpg\'</span>\n<span class="token builtin">dir</span> <span class="token operator">=</span> <span class="token string">\'/home/y/my\'</span>\nos<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token builtin">dir</span><span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span> <span class="token comment"># /home/y/my/photo.jpg</span></code></pre></div>\n<h2>Асинхронные функции</h2>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">import asyncio\n\nasync def foo():\n    print(&#39;Running in foo&#39;)\n    await asyncio.sleep(0)\n    print(&#39;Explicit context switch to foo again&#39;)\n\n\nasync def bar():\n    print(&#39;Explicit context to bar&#39;)\n    await asyncio.sleep(0)\n    print(&#39;Implicit context switch back to bar&#39;)\n\n\nioloop = asyncio.get_event_loop()\ntasks = [ioloop.create_task(foo()), ioloop.create_task(bar())]\nwait_tasks = asyncio.wait(tasks)\nioloop.run_until_complete(wait_tasks)\nioloop.close()</code></pre></div>\n<p><code class="language-text">async def foo()</code> и <code class="language-text">async def bar()</code> - это объявления <strong>корутин</strong>.</p>\n<p>Корутины могут быть запущены только из другой корутины, или обёрнуты в задачу с помощью <code class="language-text">create_task</code></p>\n<p>Объединяем 2 задачи в одну, используя <code class="language-text">asyncio.wait</code></p>\n<p>Отправляем задачу на выполнение в цикл событий через <code class="language-text">ioloop.run_until_complete</code></p>\n<p>Используя <code class="language-text">await</code> в какой-либо корутине, мы объявляем, что корутина может отдавать управление обратно в <code class="language-text">event loop</code>, который запустит какую-либо следующую задачу. Переключение тасков происходит ТОЛЬКО по достижению <strong>await</strong> либо по завершению таска.</p>\n<h2>Потоки</h2>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">import threading\nimport time\n\ndef sleeper():\n\tprint(&quot;start sleeping!&quot;)\n\ttime.sleep(10)\n\tprint(&quot;finish sleeping!&quot;)\n\ndef writer(x, event_for_wait, event_for_set):\n    for i in range(10):\n        ##event_for_wait.wait() # wait for event\n        ##event_for_wait.clear() # clean event for future        \n        print(x)\n        time.sleep(1)\n        ##event_for_set.set() # set event for neighbor thread\n\n# init events\ne1 = threading.Event()\ne2 = threading.Event()\n\n# init threads\nt1 = threading.Thread(target=writer, args=(0, e1, e2))\nt2 = threading.Thread(target=sleeper)\n\n# start threads\nt1.start()\nt2.start()\n\n#e1.set() # initiate the first event\n\n# join threads to the main thread\nt1.join()\nt2.join()</code></pre></div>\n<h2>Enum</h2>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">Severity</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    INFO <span class="token operator">=</span> <span class="token number">0</span>\n    WARN <span class="token operator">=</span> <span class="token number">1000</span>\n    CRIT <span class="token operator">=</span> <span class="token number">2000</span></code></pre></div>\n<p>Если потом нужно получить значение (0/1000/200), то <code class="language-text">e._value_</code>.</p>\n<p>Если нужно название (INFO/WARN/CRIT), то <code class="language-text">e._name_</code></p>\n<p>Преобразование значения к енуму:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">s <span class="token operator">=</span> Severity<span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span></code></pre></div>\n<h2>Сериализация</h2>\n<p>Самый простой способ сериализовать дженерик объект:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">import json\njson.dumps(self.__dict__)</code></pre></div>\n<p>Однако если среди членом класса есть <strong>Enum</strong>, то такой выдаст ошибку. Я нашел такое решение:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">Serializable</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">toJSON</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>self<span class="token punctuation">.</span>__dict__<span class="token punctuation">,</span> sort_keys<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> cls<span class="token operator">=</span>EnumEncoder<span class="token punctuation">)</span>\n\n<span class="token keyword">class</span> <span class="token class-name">EnumEncoder</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>JSONEncoder<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">default</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>\n            <span class="token keyword">return</span> obj<span class="token punctuation">.</span>name\n        <span class="token keyword">else</span><span class="token punctuation">:</span>\n            <span class="token keyword">return</span> obj<span class="token punctuation">.</span>__dict__</code></pre></div>\n<h2>@staticmethod</h2>\n<p>Таким декоратором объявляется обычный статический метод:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n\n    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> day<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> month<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> year<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>day <span class="token operator">=</span> day\n        self<span class="token punctuation">.</span>month <span class="token operator">=</span> month\n        self<span class="token punctuation">.</span>year <span class="token operator">=</span> year\n\n\t@<span class="token builtin">staticmethod</span>\n\t<span class="token keyword">def</span> <span class="token function">is_date_valid</span><span class="token punctuation">(</span>date_as_string<span class="token punctuation">)</span><span class="token punctuation">:</span>\n\t    day<span class="token punctuation">,</span> month<span class="token punctuation">,</span> year <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> date_as_string<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">\'-\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\t    <span class="token keyword">return</span> day <span class="token operator">&lt;=</span> <span class="token number">31</span> <span class="token keyword">and</span> month <span class="token operator">&lt;=</span> <span class="token number">12</span> <span class="token keyword">and</span> year <span class="token operator">&lt;=</span> <span class="token number">3999</span>\n\n<span class="token comment"># usage:</span>\nis_date <span class="token operator">=</span> Date<span class="token punctuation">.</span>is_date_valid<span class="token punctuation">(</span><span class="token string">\'11-09-2012\'</span><span class="token punctuation">)</span></code></pre></div>\n<h2>@classmethod</h2>\n<p>Тоже статический метод, но первым аргументом всегда приходит объект типа:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n\n    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> day<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> month<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> year<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>day <span class="token operator">=</span> day\n        self<span class="token punctuation">.</span>month <span class="token operator">=</span> month\n        self<span class="token punctuation">.</span>year <span class="token operator">=</span> year\n\n\t@<span class="token builtin">classmethod</span>\n\t<span class="token keyword">def</span> <span class="token function">from_string</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> date_as_string<span class="token punctuation">)</span><span class="token punctuation">:</span>\n\t    day<span class="token punctuation">,</span> month<span class="token punctuation">,</span> year <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> date_as_string<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">\'-\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\t    date1 <span class="token operator">=</span> cls<span class="token punctuation">(</span>day<span class="token punctuation">,</span> month<span class="token punctuation">,</span> year<span class="token punctuation">)</span>\n\t    <span class="token keyword">return</span> date1\n\ndate2 <span class="token operator">=</span> Date<span class="token punctuation">.</span>from_string<span class="token punctuation">(</span><span class="token string">\'11-09-2012\'</span><span class="token punctuation">)</span></code></pre></div>\n<p>Это лучше, чем просто делать <code class="language-text">date = Date(day, month, year)</code>, потому что будет работать и для классов-наследников Date.</p>\n<h2>args/kwargs</h2>\n<p>*args - это список неименованных аргументов функции, передаваемый массивом:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">test_var_args</span><span class="token punctuation">(</span>f_arg<span class="token punctuation">,</span> <span class="token operator">*</span>argv<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span> <span class="token string">"first normal arg:"</span><span class="token punctuation">,</span> f_arg\n    <span class="token keyword">for</span> arg <span class="token keyword">in</span> argv<span class="token punctuation">:</span>\n        <span class="token keyword">print</span> <span class="token string">"another arg through *argv :"</span><span class="token punctuation">,</span> arg\n\ntest_var_args<span class="token punctuation">(</span><span class="token string">\'yasoob\'</span><span class="token punctuation">,</span><span class="token string">\'python\'</span><span class="token punctuation">,</span><span class="token string">\'eggs\'</span><span class="token punctuation">,</span><span class="token string">\'test\'</span><span class="token punctuation">)</span> <span class="token operator">//</span> выводит python<span class="token punctuation">,</span> eggs<span class="token punctuation">,</span> test</code></pre></div>\n<p>Можно и наоборот:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">test_args_kwargs</span><span class="token punctuation">(</span>arg1<span class="token punctuation">,</span> arg2<span class="token punctuation">,</span> arg3<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span> <span class="token string">"arg1:"</span><span class="token punctuation">,</span> arg1\n    <span class="token keyword">print</span> <span class="token string">"arg2:"</span><span class="token punctuation">,</span> arg2\n    <span class="token keyword">print</span> <span class="token string">"arg3:"</span><span class="token punctuation">,</span> arg3\n\nargs <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token string">"two"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span>\ntest_args_kwargs<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span></code></pre></div>\n<p>/<em>/</em>kwargs - список <em>именованных</em> аргументов, передаваемый как словарь:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">greet_me</span><span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">if</span> kwargs <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>\n        <span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> kwargs<span class="token punctuation">.</span>iteritems<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n            <span class="token keyword">print</span> <span class="token string">"%s == %s"</span> <span class="token operator">%</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span>\n \ngreet_me<span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">"yasoob"</span><span class="token punctuation">)</span></code></pre></div>\n<p>Или наоборот:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">test_args_kwargs</span><span class="token punctuation">(</span>arg1<span class="token punctuation">,</span> arg2<span class="token punctuation">,</span> arg3<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span> <span class="token string">"arg1:"</span><span class="token punctuation">,</span> arg1\n    <span class="token keyword">print</span> <span class="token string">"arg2:"</span><span class="token punctuation">,</span> arg2\n    <span class="token keyword">print</span> <span class="token string">"arg3:"</span><span class="token punctuation">,</span> arg3\n\nkwargs <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"arg3"</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">"arg2"</span><span class="token punctuation">:</span> <span class="token string">"two"</span><span class="token punctuation">,</span><span class="token string">"arg1"</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">}</span>\ntest_args_kwargs<span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span></code></pre></div>',frontmatter:{path:"/blog/python 2",title:"Python"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-python-2-16aba90ef642ebadf689.js.map