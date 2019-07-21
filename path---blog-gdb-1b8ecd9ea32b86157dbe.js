webpackJsonp([68448465120492],{436:function(n,o){n.exports={data:{markdownRemark:{html:'<h1>GDB</h1>\n<h2>Написание скриптов</h2>\n<p>Вот такой скрипт установит брейкпойнты в функции <code>gst_object_ref</code>  и <code>gst_object_unref</code>, которые будут срабатывать, когда первый аргумент (<code>$rdi</code>) указывает на тот же адрес, что и переменная <code>audioconvert</code>. При каждом срабатывании брейкпойнта будет печетаться стектрейс и выполнение продолжится дальше.</p>\n<pre><code>set pagination off \nbreak main.cpp:69\nrun\nset $conv=audioconvert\nbreak gst_object_ref if ($rdi == $conv)\ncommands\nbt\ncont\nend\nbreak gst_object_unref if ($rdi == $conv)\ncommands\nbt\ncont\nend\ncont\n</code></pre>\n<p>Ключевое слово <code>commands</code> позволяет задать несколько действий, которые будут выполнены, когда сработает этот брейкпойнт. Список действий заключен между <code>commands</code> и <code>end</code>.</p>\n<p><code>set pagination off</code> - указывает, что при выводе стектрейса не нужно останавливать выполнение и выводить "нажмите пробел для следующей страницы".</p>\n<h2>Выполнение скрипта</h2>\n<p>Сохраняем скрипт в файл <strong>script.txt</strong> затем делаем:</p>\n<pre><code class="language-sh">gdb -x script.txt\n</code></pre>',frontmatter:{path:"/blog/gdb",title:"Gdb"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-gdb-1b8ecd9ea32b86157dbe.js.map