webpackJsonp([0x8769499f4e7e],{465:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>Python</h1>\n<h2>Чтение аргументов командной строки</h2>\n<pre><code class="language-python">import sys\nfile = sys.argv[0]   # название запущенного файла\narg0 = sys.argv[1]   # первый аргумент командной строки\n</code></pre>\n<h2>Декодирование байт в строку</h2>\n<pre><code class="language-python">str = bytes.decode(\'utf-8\') # преобразует массив байт (тип bytes в строку)\n</code></pre>\n<h2>Десериализация json</h2>\n<pre><code class="language-python">import json\n\ndata = json.loads(str)\n</code></pre>\n<h2>Чтение из файла</h2>\n<pre><code class="language-python">open(path, \'r\').read() # читает и возвращает весь файл как строку в кодировке utf-8 \n</code></pre>\n<p>Если же нужно прочитать байты из файла, то:</p>\n<pre><code class="language-python">b = open(path, \'rb\').read()\ntype(b) # &#x3C;class \'bytes\'>\n</code></pre>\n<h2>Перечисление файлов</h2>\n<pre><code class="language-python">import os\n\nos.listdir(\'/home/y/my\') # [\'1.jpg\', \'2.jpg\', \'3.jpg\']\n</code></pre>\n<h2>Работа с путями</h2>\n<pre><code class="language-python">import os\n\nfile = \'photo.jpg\'\ndir = \'/home/y/my\'\nos.path.join(dir, file) # /home/y/my/photo.jpg\n</code></pre>\n<h2>Асинхронные функции</h2>\n<pre><code>import asyncio\n\nasync def foo():\n    print(\'Running in foo\')\n    await asyncio.sleep(0)\n    print(\'Explicit context switch to foo again\')\n\n\nasync def bar():\n    print(\'Explicit context to bar\')\n    await asyncio.sleep(0)\n    print(\'Implicit context switch back to bar\')\n\n\nioloop = asyncio.get_event_loop()\ntasks = [ioloop.create_task(foo()), ioloop.create_task(bar())]\nwait_tasks = asyncio.wait(tasks)\nioloop.run_until_complete(wait_tasks)\nioloop.close()\n</code></pre>\n<p><code>async def foo()</code> и <code>async def bar()</code> - это объявления <strong>корутин</strong>.</p>\n<p>Корутины могут быть запущены только из другой корутины, или обёрнуты в задачу с помощью <code>create_task</code></p>\n<p>Объединяем 2 задачи в одну, используя <code>asyncio.wait</code></p>\n<p>Отправляем задачу на выполнение в цикл событий через <code>ioloop.run_until_complete</code></p>\n<p>Используя <code>await</code> в какой-либо корутине, мы объявляем, что корутина может отдавать управление обратно в <code>event loop</code>, который запустит какую-либо следующую задачу. Переключение тасков происходит ТОЛЬКО по достижению <strong>await</strong> либо по завершению таска.</p>\n<h2>Потоки</h2>\n<pre><code>import threading\nimport time\n\ndef sleeper():\n    print("start sleeping!")\n    time.sleep(10)\n    print("finish sleeping!")\n\ndef writer(x, event_for_wait, event_for_set):\n    for i in range(10):\n        ##event_for_wait.wait() # wait for event\n        ##event_for_wait.clear() # clean event for future        \n        print(x)\n        time.sleep(1)\n        ##event_for_set.set() # set event for neighbor thread\n\n# init events\ne1 = threading.Event()\ne2 = threading.Event()\n\n# init threads\nt1 = threading.Thread(target=writer, args=(0, e1, e2))\nt2 = threading.Thread(target=sleeper)\n\n# start threads\nt1.start()\nt2.start()\n\n#e1.set() # initiate the first event\n\n# join threads to the main thread\nt1.join()\nt2.join()\n</code></pre>\n<h2>Enum</h2>\n<pre><code class="language-python">class Severity(Enum):\n    INFO = 0\n    WARN = 1000\n    CRIT = 2000\n</code></pre>\n<p>Если потом нужно получить значение (0/1000/200), то <code>e._value_</code>.</p>\n<p>Если нужно название (INFO/WARN/CRIT), то <code>e._name_</code></p>\n<p>Преобразование значения к енуму:</p>\n<pre><code class="language-python">s = Severity(1000)\n</code></pre>\n<h2>Сериализация</h2>\n<p>Самый простой способ сериализовать дженерик объект:</p>\n<pre><code>import json\njson.dumps(self.__dict__)\n</code></pre>\n<p>Однако если среди членом класса есть <strong>Enum</strong>, то такой выдаст ошибку. Я нашел такое решение:</p>\n<pre><code class="language-python">class Serializable:\n    def toJSON(self):\n        return json.dumps(self.__dict__, sort_keys=True, cls=EnumEncoder)\n\nclass EnumEncoder(json.JSONEncoder):\n    def default(self, obj):\n        if isinstance(obj, Enum):\n            return obj.name\n        else:\n            return obj.__dict__\n</code></pre>\n<h2>@staticmethod</h2>\n<p>Таким декоратором объявляется обычный статический метод:</p>\n<pre><code class="language-python">class Date(object):\n\n    def __init__(self, day=0, month=0, year=0):\n        self.day = day\n        self.month = month\n        self.year = year\n\n    @staticmethod\n    def is_date_valid(date_as_string):\n        day, month, year = map(int, date_as_string.split(\'-\'))\n        return day &#x3C;= 31 and month &#x3C;= 12 and year &#x3C;= 3999\n\n# usage:\nis_date = Date.is_date_valid(\'11-09-2012\')\n</code></pre>\n<h2>@classmethod</h2>\n<p>Тоже статический метод, но первым аргументом всегда приходит объект типа:</p>\n<pre><code class="language-python">class Date(object):\n\n    def __init__(self, day=0, month=0, year=0):\n        self.day = day\n        self.month = month\n        self.year = year\n\n    @classmethod\n    def from_string(cls, date_as_string):\n        day, month, year = map(int, date_as_string.split(\'-\'))\n        date1 = cls(day, month, year)\n        return date1\n\ndate2 = Date.from_string(\'11-09-2012\')\n</code></pre>\n<p>Это лучше, чем просто делать <code>date = Date(day, month, year)</code>, потому что будет работать и для классов-наследников Date.</p>\n<h2>args/kwargs</h2>\n<p>*args - это список неименованных аргументов функции, передаваемый массивом:</p>\n<pre><code class="language-python">def test_var_args(f_arg, *argv):\n    print "first normal arg:", f_arg\n    for arg in argv:\n        print "another arg through *argv :", arg\n\ntest_var_args(\'yasoob\',\'python\',\'eggs\',\'test\') // выводит python, eggs, test\n</code></pre>\n<p>Можно и наоборот:</p>\n<pre><code class="language-python">def test_args_kwargs(arg1, arg2, arg3):\n    print "arg1:", arg1\n    print "arg2:", arg2\n    print "arg3:", arg3\n\nargs = ("two", 3,5)\ntest_args_kwargs(*args)\n</code></pre>\n<p>/<em>/</em>kwargs - список <em>именованных</em> аргументов, передаваемый как словарь:</p>\n<pre><code class="language-python">def greet_me(**kwargs):\n    if kwargs is not None:\n        for key, value in kwargs.iteritems():\n            print "%s == %s" %(key,value)\n \ngreet_me(name="yasoob")\n</code></pre>\n<p>Или наоборот:</p>\n<pre><code class="language-python">def test_args_kwargs(arg1, arg2, arg3):\n    print "arg1:", arg1\n    print "arg2:", arg2\n    print "arg3:", arg3\n\nkwargs = {"arg3": 3, "arg2": "two","arg1":5}\ntest_args_kwargs(**kwargs)\n</code></pre>',frontmatter:{path:"/blog/python 2",title:"Python"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-python-2-a5296659987e03ada440.js.map