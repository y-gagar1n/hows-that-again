webpackJsonp([0xa9c08342f552],{487:function(s,a){s.exports={data:{markdownRemark:{html:'<h1>sh</h1>\n<h2>Parameter expansion</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token number">1</span> <span class="token number">2</span> \n<span class="token keyword">do</span>\n\tmy_secret_process <span class="token variable">${i}</span>_tmp\n<span class="token keyword">done</span></code></pre></div>\n<p>Такая форма записи позволит подставить 1<em>tmp и 2</em>tmp. Если делать без скобок, то получится пустота, так как у нас нет переменной i_tmp</p>\n<h2>Чтение переменных</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">FOO</span><span class="token operator">=</span>bar\n<span class="token builtin class-name">echo</span> <span class="token string">"Hello, <span class="token variable">$FOO</span>!"</span>   <span class="token comment"># Hello, bar! - сработает только с двойными кавычками, так как они слабые</span>\n<span class="token builtin class-name">echo</span> <span class="token string">\'Hello, <span class="token variable">$FOO</span>!\'</span>   <span class="token comment"># Hello, $FOO! - не сработает, так как одинарные кавычки - строгие</span></code></pre></div>\n<h2>Специальные переменные</h2>\n<ul>\n<li><code class="language-text">$0</code> - название скрипта</li>\n<li><code class="language-text">$1, $2, $3...</code> - первый, второй, третий аргумент</li>\n<li><code class="language-text">$#</code> - количество аргументов</li>\n<li><code class="language-text">$@</code> - все аргументы</li>\n<li><code class="language-text">$$</code> - текущий PID</li>\n<li><code class="language-text">$?</code> - exit code последней выполненной команды</li>\n</ul>\n<h2>Условия</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$1</span>"</span> <span class="token operator">=</span> <span class="token string">"hi"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>\n\t<span class="token builtin class-name">echo</span> <span class="token string">"hello"</span>\n<span class="token keyword">else</span>\n\t<span class="token builtin class-name">echo</span> <span class="token string">"bye"</span>\n<span class="token keyword">fi</span></code></pre></div>\n<p>Кавычки вокруг <code class="language-text">$1</code> и <code class="language-text">hi</code> не обязательнц, но нужны на случай, если в <code class="language-text">$1</code> будет пустота, либо слова со спец. символами.</p>\n<p>Причем <strong>[</strong> здесь - это симлинк к команде  <strong>test</strong>:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ <span class="token builtin class-name">type</span> -a <span class="token punctuation">[</span>\n<span class="token punctuation">[</span> is a shell <span class="token builtin class-name">builtin</span>\n<span class="token punctuation">[</span> is /bin/<span class="token punctuation">[</span></code></pre></div>\n<p>Таким образом, <code class="language-text">if</code> просто проверяет, равен ли 0 результат следующего за ним <code class="language-text">test</code>.</p>\n<p><strong>Проверки для файлов:</strong></p>\n<ul>\n<li><code class="language-text">-f</code>: есть ли такой обычный файл на диске (<code class="language-text">if [ -f &#39;filename.txt&#39; ]</code>)</li>\n<li><code class="language-text">-d</code>: есть ли такая директория</li>\n<li><code class="language-text">-e</code>: есть ли такой файловый дескриптор</li>\n<li><code class="language-text">-s</code>: true, если файл есть и не пустой</li>\n<li><code class="language-text">-h</code>: есть ли такой симлинк</li>\n<li><code class="language-text">-a</code>: логическое "и" (<code class="language-text">if [ -f file1 -a file2 ]</code>)</li>\n<li><code class="language-text">-o</code>: логическое "или"</li>\n<li><code class="language-text">-r</code>: читаемый</li>\n<li><code class="language-text">-w</code>: редактируемый</li>\n<li><code class="language-text">-x</code>: выполняемый</li>\n<li><code class="language-text">-nt</code>: newer than (<code class="language-text">if [ file1 -nt file2 ]</code>)</li>\n<li><code class="language-text">-ot</code>: older than</li>\n</ul>\n<p>Все эти команды (кроме <code class="language-text">-h</code>) поддерживают симлинки. То есть если <strong>link</strong> это симлинк на файл, то <code class="language-text">[ -f link ]</code> вернет 0.</p>\n<p><strong>Проверки для строк:</strong></p>\n<ul>\n<li><code class="language-text">-z</code>: true, если строка пуста</li>\n<li><code class="language-text">-n</code>: true, если строка не пуста</li>\n</ul>\n<p><strong>Арифметические проверки:</strong></p>\n<p>ВАЖНО: <code class="language-text">=</code> проверяет на равенство только строки, <strong>но не числа</strong>.</p>\n<p>Обратить условие можно, добавив <strong>!</strong> перед ним: <code class="language-text">if [ ! -f &#39;filename.txt&#39; ]</code>. Для проверки чисел на равенство, нужно использовать <code class="language-text">-eq</code>.</p>\n<ul>\n<li><code class="language-text">-eq</code>: equal</li>\n<li><code class="language-text">-ne</code>: not equal</li>\n<li><code class="language-text">-lt</code>: less than</li>\n<li><code class="language-text">-gt</code>: greater than</li>\n<li><code class="language-text">-le</code>: less than or equal</li>\n<li><code class="language-text">-ge</code>: greater than or equal</li>\n</ul>\n<p>Вслед за <code class="language-text">if</code> может идти любая команда, поэтому и нужна ";" перед <code class="language-text">then</code>. Если не указать точку с запятой, то <code class="language-text">then</code> будет распознана как аргумент команды. Можно не писать точку с запятой, но тогда <code class="language-text">then</code> должен быть на следующей строчке.</p>\n<p>Пример другой команды:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token keyword">if</span> <span class="token function">grep</span> -q daemon /etc/passwd<span class="token punctuation">;</span> <span class="token keyword">then</span>\n   <span class="token builtin class-name">echo</span> The daemon user is <span class="token keyword">in</span> the <span class="token function">passwd</span> file.\n<span class="token keyword">else</span>\n   <span class="token builtin class-name">echo</span> There is a big problem. daemon is not <span class="token keyword">in</span> the <span class="token function">passwd</span> file.\n<span class="token keyword">fi</span></code></pre></div>\n<h2>switch-case</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>\n\tbye<span class="token punctuation">)</span>\n\t\t<span class="token builtin class-name">echo</span> Fine, bye.\n\t\t<span class="token punctuation">;</span><span class="token punctuation">;</span> \n\thi<span class="token operator">|</span>hello<span class="token punctuation">)</span>\n\t\t<span class="token builtin class-name">echo</span> Nice to see you.\n\t\t<span class="token punctuation">;</span><span class="token punctuation">;</span>\n\twhat*<span class="token punctuation">)</span>\n\t\t<span class="token builtin class-name">echo</span> Whatever.\n\t\t<span class="token punctuation">;</span><span class="token punctuation">;</span> \n\t*<span class="token punctuation">)</span>\n\t\t<span class="token builtin class-name">echo</span> <span class="token string">\'Huh?\'</span>\n\t\t<span class="token punctuation">;</span><span class="token punctuation">;</span> \n<span class="token keyword">esac</span></code></pre></div>\n<h2>Циклы</h2>\n<h3>for</h3>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token keyword">for</span> <span class="token for-or-select variable">str</span> <span class="token keyword">in</span> one two three four<span class="token punctuation">;</span> <span class="token keyword">do</span>\n   <span class="token builtin class-name">echo</span> <span class="token variable">$str</span>\n<span class="token keyword">done</span></code></pre></div>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">FLAGS</span><span class="token operator">=</span><span class="token punctuation">(</span>foo bar baz<span class="token punctuation">)</span>\n<span class="token keyword">for</span> <span class="token for-or-select variable">f</span> <span class="token keyword">in</span> <span class="token variable">$FLAGS</span><span class="token punctuation">;</span> <span class="token keyword">do</span>\n\t<span class="token builtin class-name">echo</span> <span class="token variable">$f</span>\n<span class="token keyword">done</span></code></pre></div>\n<p>Можно фориться по списку файлов:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token keyword">for</span> <span class="token for-or-select variable">file</span> <span class="token keyword">in</span> *.gif<span class="token punctuation">;</span> <span class="token keyword">do</span>\n\t<span class="token builtin class-name">echo</span> <span class="token variable">$file</span>\n<span class="token keyword">done</span></code></pre></div>\n<h3>while</h3>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">FILE</span><span class="token operator">=</span>/tmp/whiletest.<span class="token variable">$$</span><span class="token punctuation">;</span>\n<span class="token builtin class-name">echo</span> firstline <span class="token operator">></span> <span class="token variable">$FILE</span>\n<span class="token keyword">while</span> <span class="token function">tail</span> -10 <span class="token variable">$FILE</span> <span class="token operator">|</span> <span class="token function">grep</span> -q firstline<span class="token punctuation">;</span> <span class="token keyword">do</span>\n\t<span class="token comment"># add lines to $FILE until tail -10 $FILE no longer prints "firstline" </span>\n\t<span class="token builtin class-name">echo</span> -n Number of lines <span class="token keyword">in</span> <span class="token variable">$FILE</span><span class="token builtin class-name">:</span><span class="token string">\' \'</span>\n\t<span class="token function">wc</span> -l <span class="token variable">$FILE</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">\'{print <span class="token variable">$1</span>}\'</span>\n\t<span class="token builtin class-name">echo</span> newline <span class="token operator">>></span> <span class="token variable">$FILE</span>\n<span class="token keyword">done</span>\n\n<span class="token function">rm</span> -f <span class="token variable">$FILE</span></code></pre></div>\n<h3>IFS</h3>\n<p><strong>IFS</strong> = <strong>i</strong>nternal <strong>f</strong>ield <strong>s</strong>eparator. Значение этой переменной используется для представления строки в виде массива.</p>\n<p>Пример (не сработает в <strong>zsh</strong>, сработает в <strong>bash</strong>):</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">words</span><span class="token operator">=</span>foo,bar,baz\n\n<span class="token keyword">for</span> <span class="token for-or-select variable">word</span> <span class="token keyword">in</span> <span class="token variable">$words</span>\n<span class="token keyword">do</span>\n\t<span class="token builtin class-name">echo</span> <span class="token variable">$word</span>\n<span class="token keyword">done</span></code></pre></div>\n<p>В результате будет выведено:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">foo\nbar\nbaz</code></pre></div>\n<h3>Подстроки</h3>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">FOO</span><span class="token operator">=</span>Hello<span class="token operator">!</span>\n<span class="token assign-left variable">BAR</span><span class="token operator">=</span><span class="token punctuation">{</span>FOO:1:3<span class="token punctuation">}</span>\t<span class="token comment"># взять 3 символа, начиная с 1-го. то есть получится "ell"</span></code></pre></div>\n<p>Если второе число не указано, то возьмется до конца строки:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">FOO</span><span class="token operator">=</span>Hello<span class="token operator">!</span>\n<span class="token assign-left variable">BAR</span><span class="token operator">=</span><span class="token punctuation">{</span>FOO:3<span class="token punctuation">}</span>\t<span class="token comment"># lo!</span></code></pre></div>\n<h3>Парсинг опций</h3>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token comment"># command.sh</span>\n\n<span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> <span class="token string">\'srd:f:\'</span> c\n<span class="token keyword">do</span>\n  <span class="token keyword">case</span> <span class="token variable">$c</span> <span class="token keyword">in</span>\n    s<span class="token punctuation">)</span> <span class="token assign-left variable">ACTION</span><span class="token operator">=</span>SAVE <span class="token punctuation">;</span><span class="token punctuation">;</span>\n    r<span class="token punctuation">)</span> <span class="token assign-left variable">ACTION</span><span class="token operator">=</span>RESTORE <span class="token punctuation">;</span><span class="token punctuation">;</span>\n    d<span class="token punctuation">)</span> <span class="token assign-left variable">DB_DUMP</span><span class="token operator">=</span><span class="token variable">$OPTARG</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>\n    f<span class="token punctuation">)</span> <span class="token assign-left variable">TARBALL</span><span class="token operator">=</span><span class="token variable">$OPTARG</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>\n  <span class="token keyword">esac</span>\n<span class="token keyword">done</span></code></pre></div>\n<p><code class="language-text">srd:f:</code> - это список флагов, которые могут быть использованы. Причем если после флага стоит двоеточие, то для этого флага можно указать значение.</p>\n<p>Скрипт из примера можно запускать с такими параметрами:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">./command.sh -sr -d dump.db -f ball.TARBALL</code></pre></div>\n<h3>Стили и цвета</h3>\n<p>Для использования стилей текста сильно поможет такая функция:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/bin/bash</span>\n<span class="token comment"># ANSI color--Use these variables to make output in different colors</span>\n<span class="token comment"># and formats. Color names that end with \'f\' are foreground colors,</span>\n<span class="token comment"># and those ending with \'b\' are background colors.</span>\n<span class="token function-name function">initializeANSI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n <span class="token assign-left variable">esc</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\\033">\\033</span>"</span> <span class="token comment"># If this doesn\'t work, enter an ESC directly.</span>\n <span class="token comment"># Foreground colors</span>\n <span class="token assign-left variable">blackf</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[30m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">redf</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[31m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">greenf</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[32m"</span>\n <span class="token assign-left variable">yellowf</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[33m"</span> <span class="token assign-left variable">bluef</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[34m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">purplef</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[35m"</span>\n <span class="token assign-left variable">cyanf</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[36m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">whitef</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[37m"</span>\n <span class="token comment"># Background colors</span>\n <span class="token assign-left variable">blackb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[40m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">redb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[41m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">greenb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[42m"</span>\n <span class="token assign-left variable">yellowb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[43m"</span> <span class="token assign-left variable">blueb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[44m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">purpleb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[45m"</span>\n <span class="token assign-left variable">cyanb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[46m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">whiteb</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[47m"</span>\n <span class="token comment"># Bold, italic, underline, and inverse style toggles</span>\n <span class="token assign-left variable">boldon</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[1m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">boldoff</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[22m"</span>\n <span class="token assign-left variable">italicson</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[3m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">italicsoff</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[23m"</span>\n <span class="token assign-left variable">ulon</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[4m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">uloff</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[24m"</span>\n <span class="token assign-left variable">invon</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[7m"</span><span class="token punctuation">;</span> <span class="token assign-left variable">invoff</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[27m"</span>\n <span class="token assign-left variable">reset</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${esc}</span>[0m"</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>Использовать ее можно вот так:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">initializeANSI\n\n<span class="token builtin class-name">echo</span> <span class="token variable">${boldon}</span>this is <span class="token keyword">in</span> bold and <span class="token variable">${italicson}</span>this is <span class="token punctuation">\\</span>\nitalics<span class="token variable">${italicsoff}</span>within the bold<span class="token variable">${reset}</span></code></pre></div>\n<h2>Утилиты</h2>\n<h3>basename</h3>\n<p>Позволяет получить имя файла без пути, или имя файла без расширения, или и то и то.</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">basename</span> ~/temp/readme.md <span class="token comment"># readme.md</span>\n<span class="token function">basename</span> readme.md .md <span class="token comment"># readme</span>\n<span class="token function">basename</span> ~/temp/readme.md .md <span class="token comment"># readme</span></code></pre></div>\n<h3>awk</h3>\n<p>Вообще-то это целый язык программирования, но в большинстве случаев он используется просто чтобы распарсить колоночный вывод от других программ:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">ls</span> -l <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">\'{print <span class="token variable">$5</span>}\'</span>   <span class="token comment"># выведет 5-ю колонку, то етсь размер</span></code></pre></div>\n<p>Если нужно вывести несколько колонок:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">ls</span> -l <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">\'{print <span class="token variable">$6</span> " " <span class="token variable">$7</span> " " <span class="token variable">$8</span>}\'</span>   <span class="token comment"># выведет 5,6,7 колонку через пробел</span></code></pre></div>\n<h3>sed</h3>\n<p><strong>sed</strong> принимает первым аргументом адрес и операцию, а вторым - путь к файлу. Либо можно пайплайнить в него вывод другой программы, тогда ворой аргумент не нужен:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">ls</span> -l <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">\'s/июл/авг/\'</span>  <span class="token comment"># заменяет месяц в выводе с июля на август</span></code></pre></div>\n<p>sed работает построчно, и по умолчанию он будет заменять первое встретившееся значение в каждой строчке. Если нужно чтобы точно заменил все значения, то в конце надо приписывать модификатор <strong>g</strong>:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sed</span> <span class="token string">\'s/foo/bar/g\'</span> tmp.txt</code></pre></div>\n<p>В предыдущих примерах адрес был опущен. В качестве адреса могут быть указаны, например, первая и последняя строчка, над которыми проводить операцию:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sed</span> <span class="token string">\'1,3s/foo/bar/g\'</span> tmp.txt \t<span class="token comment"># замена произойдет в строчках 1-3</span>\n<span class="token function">sed</span> <span class="token string">\'2,4d\'</span> tmp.txt \t\t\t\t<span class="token comment"># будут удалены строчки 2-4</span></code></pre></div>\n<p>Вместо адреса может быть использовано даже регулярное выражение:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sed</span> <span class="token string">\'/exp/d\'</span> tmp.txt\t<span class="token comment"># удалит все строки, подходящие под указанный регэксп</span></code></pre></div>\n<h3>xargs</h3>\n<p>Принимает на вход аргументы и подставляет их в команду последним аргументом</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">ls</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">file</span> \t<span class="token comment"># выведет тип для каждого файла в текущей директории</span></code></pre></div>\n<p>Можно подставлять любым аргументом, но тогда нужно использовать такую конструкцию:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">ls</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I % <span class="token function">file</span> %</code></pre></div>\n<p>Здесь <code class="language-text">-I %</code> означает, что плейсхолдер будет обозначаться знаком процента, а <code class="language-text">%</code> в конце - это как раз плейсхолдер.</p>\n<h3>grep</h3>\n<p><code class="language-text">grep -R def .</code> - рекурсивно ищет "def" во всех файлах текущей директории</p>\n<p><code class="language-text">grep -E [a-z]{10}</code> - регулярное выражение</p>\n<p><code class="language-text">grep a[[:blank:]]</code> - ищем все слова, кончающиеся на а</p>\n<p><code class="language-text">grep -c PATTERN</code> - выводит не строчки, а количество вхождений паттерна в файле</p>\n<h3>find</h3>\n<p><code class="language-text">find . -name &quot;*setup*&quot;</code> - рекурсивно искать все файлы с именем, содержащим <strong>setup</strong>, начиная с текущей директории</p>\n<p><code class="language-text">find -type f -exec grep PATTERN {} \\;</code> : <strong>-exec</strong> позволяет выполнить указанную после него команду для каждого найденного файла. {} - плейсхолдер для полного пути файла. ; - конец команды.</p>\n<h2>Выход из скрипта после первой провалившейся команды</h2>\n<p>Нужно вставить в начало скрипта:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">set</span> -e</code></pre></div>\n<h2>Отладка</h2>\n<p><code class="language-text">sh -n &lt;script&gt;</code> -проверка на синтаксические ошибки</p>\n<p><code class="language-text">sh -v &lt;script&gt;</code> - выводит все команды на экран перед выполнением</p>\n<p><code class="language-text">sh -x &lt;script&gt;</code> - тоже выводит, но после подстановки всех переменных и прочей обработки</p>\n<p><code class="language-text">sh -u &lt;script&gt;</code> - выводит ошибку, если используется неопределенная переменная</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">set -o xtrace\n...\nset +o xtrace</code></pre></div>\n<p>Такой код можно написать вокруг проблемного участка кода, чтобы только в этом коде выводить на экран команды с подстановкой переменных.</p>\n<p><code class="language-text">trap ‘echo Exiting: critical variable = $critical_variable’ EXIT</code> - а так мы можем выводить значение интересующей нас переменной перед выходом из скрипта</p>\n<h2>Tips &#x26; tricks</h2>\n<h3>Перемещение в директорию, в которой лежит скрипт</h3>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">cd</span> <span class="token string">"<span class="token variable">${0<span class="token operator">%</span><span class="token operator">/</span>*}</span>"</span></code></pre></div>\n<p>Если нужно в другую папку, относительно скрипта (например, в корень репозитория), то можно в конце добавлять относительный путь, например:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token builtin class-name">cd</span> <span class="token string">"<span class="token variable">${0<span class="token operator">%</span><span class="token operator">/</span>*}</span>/.."</span></code></pre></div>\n<p><a href="https://stackoverflow.com/questions/28894290/what-does-cd-0-mean-in-bash">https://stackoverflow.com/questions/28894290/what-does-cd-0-mean-in-bash</a></p>\n<h3>here document</h3>\n<p>Используя специальный синтаксис, можно прямо в команду вставить текст, который будет сохранен в файл:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">$ <span class="token function">cat</span> <span class="token operator">></span> test.txt <span class="token operator">&lt;&lt;</span> EOF\n<span class="token operator">></span> hello\n<span class="token operator">></span> this\n<span class="token operator">></span> is\n<span class="token operator">></span> <span class="token builtin class-name">test</span>\n<span class="token operator">></span> <span class="token function">file</span>\n<span class="token operator">></span> EOF</code></pre></div>\n<p>Здесь <code class="language-text">EOF</code> - это плейсхолдер, обозначающий последнюю строчку файла. Он необязательно должен быть <code class="language-text">EOF</code>, может быть любой.</p>',frontmatter:{path:"/blog/sh",title:"sh"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sh-5beeef3257141fa4537d.js.map