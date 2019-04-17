webpackJsonp([0x601a7a95ba5e],{466:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>Python</h1>\n<h2>Конфигурация</h2>\n<p>Можно создать файл <code>config.py</code>:</p>\n<pre><code class="language-python">key = "YOUR_KEY"\nsecret = "YOUR_SECRET"\n</code></pre>\n<p>В основном тексте программы ссылаться на него так:</p>\n<pre><code class="language-python">import config\n\nconfig.key\n</code></pre>\n<h2>Чтение из стандартного инпута</h2>\n<h3>В цикле</h3>\n<pre><code class="language-python">import sys\n\nfor line in sys.stdin:\n    print(line.rstrip()) # rstrip нужен, чтобы не выводить символ перевода строки\n</code></pre>\n<h3>Чтение всех разом</h3>\n<pre><code class="language-python">import sys\n\nlines = sys.stdin.readlines()\nfor line in lines:\n    print(line)\n</code></pre>\n<h3>Проверка</h3>\n<pre><code class="language-sh">$ echo "qwe\\nasd" > text &#x26;&#x26; cat text | python3 main.py\nqwe\nasd\n</code></pre>\n<p>Если вводим инпут через терминал, то можем завершить ввод через <code>Ctrl + D</code>.</p>\n<h3>Чтение бинарного файла и запись его в кодировке UTF-8</h3>\n<pre><code class="language-python">input = open("/home/y/photos/4.jpeg", "rb")\noutput = open("/home/y/photos/dump4.txt", "wb+")\n\ninput_text = input.read().decode("latin-1") // read возвращает bytes, decode возвращает строку\noutput.write(input_text.encode("utf-8"))  // encode принимает строку, возвращает строку, но в другой кодировке\n</code></pre>',frontmatter:{path:"/blog/python",title:"Python"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-python-4c69d05159424d2e7402.js.map