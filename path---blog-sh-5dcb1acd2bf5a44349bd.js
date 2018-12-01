webpackJsonp([0xa9c08342f552],{468:function(e,p){e.exports={data:{markdownRemark:{html:"<h1>sh</h1>\n<h2>Parameter expansion</h2>\n<pre><code>for i in 1 2 \ndo\n    my_secret_process ${i}_tmp\ndone\n</code></pre>\n<p>Такая форма записи позволит подставить 1<em>tmp и 2</em>tmp. Если делать без скобок, то получится пустота, так как у нас нет переменной i_tmp</p>\n<h2>xargs</h2>\n<pre><code>xargs -I % ls /% | head\n</code></pre>\n<p><code>xargs [OPTIONS] COMMAND</code> - будет читать аргументы из ввода и подставлять их в команду. -I % означает, что плейсхолдер для аргумента обозначается знаком процента.</p>\n<h2>grep</h2>\n<p><code>grep -E [a-z]{10}</code> - регулярное выражение</p>\n<p><code>grep a[[:blank:]]</code> - ищем все слова, кончающиеся на а</p>\n<p><code>grep -c PATTERN</code> - выводит не строчки, а количество вхождений паттерна в файле</p>\n<h2>find</h2>\n<p><code>find -type f -exec grep PATTERN {} \\;</code> : <strong>-exec</strong> позволяет выполнить указанную после него команду для каждого найденного файла. {} - плейсхолдер для полного пути файла. ; - конец команды.</p>\n<h2>Отладка</h2>\n<p><code>sh -n &#x3C;script></code> -проверка на синтаксические ошибки</p>\n<p><code>sh -v &#x3C;script></code> - выводит все команды на экран перед выполнением</p>\n<p><code>sh -x &#x3C;script></code> - тоже выводит, но после подстановки всех переменных и прочей обработки</p>\n<p><code>sh -u &#x3C;script></code> - выводит ошибку, если используется неопределенная переменная</p>\n<pre><code>set -o xtrace\n...\nset +o xtrace\n</code></pre>\n<p>Такой код можно написать вокруг проблемного участка кода, чтобы только в этом коде выводить на экран команды с подстановкой переменных.</p>\n<p><code>trap ‘echo Exiting: critical variable = $critical_variable’ EXIT</code> - а так мы можем выводить значение интересующей нас переменнойперед выходом из скрипта</p>",frontmatter:{path:"/blog/sh",title:"sh"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sh-5dcb1acd2bf5a44349bd.js.map