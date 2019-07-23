webpackJsonp([0xa9c08342f552],{482:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>sh</h1>\n<h2>Parameter expansion</h2>\n<pre><code>for i in 1 2 \ndo\n    my_secret_process ${i}_tmp\ndone\n</code></pre>\n<p>Такая форма записи позволит подставить 1<em>tmp и 2</em>tmp. Если делать без скобок, то получится пустота, так как у нас нет переменной i_tmp</p>\n<h2>Чтение переменных</h2>\n<pre><code class="language-sh">FOO=bar\necho "Hello, $FOO!"   # Hello, bar! - сработает только с двойными кавычками, так как они слабые\necho \'Hello, $FOO!\'   # Hello, $FOO! - не сработает, так как одинарные кавычки - строгие\n</code></pre>\n<h2>Специальные переменные</h2>\n<ul>\n<li><code>$0</code> - название скрипта</li>\n<li><code>$1, $2, $3...</code> - первый, второй, третий аргумент</li>\n<li><code>$#</code> - количество аргументов</li>\n<li><code>$@</code> - все аргументы</li>\n<li><code>$$</code> - текущий PID</li>\n<li><code>$?</code> - exit code последней выполненной команды</li>\n</ul>\n<h2>Условия</h2>\n<pre><code class="language-sh">if [ "$1" = "hi" ]; then\n    echo "hello"\nelse\n    echo "bye"\nfi\n</code></pre>\n<p>Кавычки вокруг <code>$1</code> и <code>hi</code> не обязательнц, но нужны на случай, если в <code>$1</code> будет пустота, либо слова со спец. символами.</p>\n<p>Причем <strong>[</strong> здесь - это симлинк к команде  <strong>test</strong>:</p>\n<pre><code class="language-sh">$ type -a [\n[ is a shell builtin\n[ is /bin/[\n</code></pre>\n<p>Таким образом, <code>if</code> просто проверяет, равен ли 0 результат следующего за ним <code>test</code>.</p>\n<p><strong>Проверки для файлов:</strong></p>\n<ul>\n<li><code>-f</code>: есть ли такой обычный файл на диске (<code>if [ -f \'filename.txt\' ]</code>)</li>\n<li><code>-d</code>: есть ли такая директория</li>\n<li><code>-e</code>: есть ли такой файловый дескриптор</li>\n<li><code>-s</code>: true, если файл есть и не пустой</li>\n<li><code>-h</code>: есть ли такой симлинк</li>\n<li><code>-a</code>: логическое "и" (<code>if [ -f file1 -a file2 ]</code>)</li>\n<li><code>-o</code>: логическое "или"</li>\n<li><code>-r</code>: читаемый</li>\n<li><code>-w</code>: редактируемый</li>\n<li><code>-x</code>: выполняемый</li>\n<li><code>-nt</code>: newer than (<code>if [ file1 -nt file2 ]</code>)</li>\n<li><code>-ot</code>: older than</li>\n</ul>\n<p>Все эти команды (кроме <code>-h</code>) поддерживают симлинки. То есть если <strong>link</strong> это симлинк на файл, то <code>[ -f link ]</code> вернет 0.</p>\n<p><strong>Проверки для строк:</strong></p>\n<ul>\n<li><code>-z</code>: true, если строка пуста</li>\n<li><code>-n</code>: true, если строка не пуста</li>\n</ul>\n<p><strong>Арифметические проверки:</strong></p>\n<p>ВАЖНО: <code>=</code> проверяет на равенство только строки, <strong>но не числа</strong>.</p>\n<p>Обратить условие можно, добавив <strong>!</strong> перед ним: <code>if [ ! -f \'filename.txt\' ]</code>. Для проверки чисел на равенство, нужно использовать <code>-eq</code>.</p>\n<ul>\n<li><code>-eq</code>: equal</li>\n<li><code>-ne</code>: not equal</li>\n<li><code>-lt</code>: less than</li>\n<li><code>-gt</code>: greater than</li>\n<li><code>-le</code>: less than or equal</li>\n<li><code>-ge</code>: greater than or equal</li>\n</ul>\n<p>Вслед за <code>if</code> может идти любая команда, поэтому и нужна ";" перед <code>then</code>. Если не указать точку с запятой, то <code>then</code> будет распознана как аргумент команды. Можно не писать точку с запятой, но тогда <code>then</code> должен быть на следующей строчке.</p>\n<p>Пример другой команды:</p>\n<pre><code class="language-sh">if grep -q daemon /etc/passwd; then\n   echo The daemon user is in the passwd file.\nelse\n   echo There is a big problem. daemon is not in the passwd file.\nfi\n</code></pre>\n<h2>switch-case</h2>\n<pre><code class="language-sh">case $1 in\n    bye)\n        echo Fine, bye.\n        ;; \n    hi|hello)\n        echo Nice to see you.\n        ;;\n    what*)\n        echo Whatever.\n        ;; \n    *)\n        echo \'Huh?\'\n        ;; \nesac\n</code></pre>\n<h2>Циклы</h2>\n<h3>for</h3>\n<pre><code class="language-sh">for str in one two three four; do\n   echo $str\ndone\n</code></pre>\n<pre><code class="language-sh">FLAGS=(foo bar baz)\nfor f in $FLAGS; do\n    echo $f\ndone\n</code></pre>\n<h3>while</h3>\n<pre><code class="language-sh">FILE=/tmp/whiletest.$$;\necho firstline > $FILE\nwhile tail -10 $FILE | grep -q firstline; do\n    # add lines to $FILE until tail -10 $FILE no longer prints "firstline" \n    echo -n Number of lines in $FILE:\' \'\n    wc -l $FILE | awk \'{print $1}\'\n    echo newline >> $FILE\ndone\n\nrm -f $FILE\n</code></pre>\n<h2>xargs</h2>\n<pre><code>xargs -I % ls /% | head\n</code></pre>\n<p><code>xargs [OPTIONS] COMMAND</code> - будет читать аргументы из ввода и подставлять их в команду. -I % означает, что плейсхолдер для аргумента обозначается знаком процента.</p>\n<h2>grep</h2>\n<p><code>grep -R def .</code> - рекурсивно ищет "def" во всех файлах текущей директории</p>\n<p><code>grep -E [a-z]{10}</code> - регулярное выражение</p>\n<p><code>grep a[[:blank:]]</code> - ищем все слова, кончающиеся на а</p>\n<p><code>grep -c PATTERN</code> - выводит не строчки, а количество вхождений паттерна в файле</p>\n<h2>find</h2>\n<p><code>find . -name "*setup*"</code> - рекурсивно искать все файлы с именем, содержащим <strong>setup</strong>, начиная с текущей директории</p>\n<p><code>find -type f -exec grep PATTERN {} \\;</code> : <strong>-exec</strong> позволяет выполнить указанную после него команду для каждого найденного файла. {} - плейсхолдер для полного пути файла. ; - конец команды.</p>\n<h2>Выход из скрипта после первой провалившейся команды</h2>\n<p>Нужно вставить в начало скрипта:</p>\n<pre><code class="language-sh">set -e\n</code></pre>\n<h2>Отладка</h2>\n<p><code>sh -n &#x3C;script></code> -проверка на синтаксические ошибки</p>\n<p><code>sh -v &#x3C;script></code> - выводит все команды на экран перед выполнением</p>\n<p><code>sh -x &#x3C;script></code> - тоже выводит, но после подстановки всех переменных и прочей обработки</p>\n<p><code>sh -u &#x3C;script></code> - выводит ошибку, если используется неопределенная переменная</p>\n<pre><code>set -o xtrace\n...\nset +o xtrace\n</code></pre>\n<p>Такой код можно написать вокруг проблемного участка кода, чтобы только в этом коде выводить на экран команды с подстановкой переменных.</p>\n<p><code>trap ‘echo Exiting: critical variable = $critical_variable’ EXIT</code> - а так мы можем выводить значение интересующей нас переменной перед выходом из скрипта</p>',frontmatter:{path:"/blog/sh",title:"sh"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sh-dfe4a8d6a226e9333943.js.map