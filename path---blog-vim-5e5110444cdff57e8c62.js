webpackJsonp([0xf98fc8b4b710],{500:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>Vim</h1>\n<p><a href="https://vim.rtorr.com">https://vim.rtorr.com</a></p>\n<p>Во всех записях шорткатов буква <strong>С</strong> означает кнопку <em>Ctrl</em>. Например, <code>&#x3C;C-q></code> означает <code>Ctrl+q</code>.</p>\n<p>Буква <strong>S</strong> означает кнопку <em>Shift</em>. Например, <code>&#x3C;S-w></code> означает <code>Shift+w</code>.</p>\n<h2>Основные клавиши</h2>\n<ul>\n<li><code>H</code> - наверх экрана</li>\n<li><code>M</code> - в середину экрана</li>\n<li><code>L</code> - в низ экрана</li>\n<li><code>w</code> - к началу следующего слова</li>\n<li><code>e</code> - к концу следующего окна</li>\n<li><code>b</code> - назад к началу текущего слова</li>\n<li><code>0</code> - к началу строки</li>\n<li><code>^</code> - к первому значимому символу строки</li>\n<li><code>$</code> - к концу строки</li>\n<li><code>&#x3C;C-d></code> - вниз на пол-экрана</li>\n<li><code>&#x3C;C-f></code> - вниз на экран</li>\n<li><code>&#x3C;C-u></code> - вверх на пол-экрана</li>\n<li><code>&#x3C;C-b></code> - вверх на экран</li>\n<li><code>*</code> - подсветить все вхождения слова, на которое указывает курсор</li>\n<li><code>&#x3C;C-g></code> - показать полный путь текущего файла</li>\n</ul>\n<h2>NerdTree</h2>\n<p>Дерево слева обеспечивается плагином <code>scrooloose/nerdtree</code>.</p>\n<p>Открывается командой <code>:NERDTreeToggle</code>. Она замаплена на <code>Ctrl+n</code></p>\n<p>Когда фокус внутри дерева, справка вызывается кнопкой <code>?</code>.</p>\n<p>Основные команды:</p>\n<ul>\n<li><code>o</code> - открыть файл и перенести фокус на него</li>\n<li><code>go</code> - открыть файл, но фокус оставить в дереве</li>\n<li><code>t</code> - открыть в новой вкладке</li>\n<li><code>T</code> - открыть в новой вкладке, но не перключаться на нее</li>\n<li><code>[g]i</code> - разделить экран горизонтально, открыть файл в новой области</li>\n<li><code>[g]s</code> - разделить экран вертикально, открыть файл в новой области</li>\n<li><code>O</code> - рекурсивно открыть папку, то есть открыть и все ее подпапки до листьев</li>\n<li><code>x</code> - закрыть родителя</li>\n<li><code>X</code> - рекурсивно закрыть всех детей</li>\n<li><code>p</code> - перейти в дереве к родителю</li>\n<li><code>P</code> - перейти в дереве к корню проекта</li>\n<li><code>&#x3C;C-j></code> - перейти к предыдущему брату</li>\n<li><code>&#x3C;C-k></code> - перейти к следующему брату</li>\n<li><code>r</code> - обновить содержимое директории</li>\n<li><code>R</code> - обновить все дерево</li>\n<li><code>I</code> - показать/скрыть скрытые файлы</li>\n<li><code>A</code> - развернуть дерево на весь экран</li>\n<li><code>m</code> - открыть меню манипуляций с файлом, в нем потом перемещаться кнопками <code>j/k</code>, на текущий пункт указывает знак <code>></code> слева от пункта.</li>\n</ul>\n<h2>Окна, вкладки, сплиты</h2>\n<p>Окна - это области, на которые разделена текущая вкладка.</p>\n<h3>Работа с окнами/сплитами</h3>\n<ul>\n<li><code>&#x3C;C-w>s</code> - разделить текущий буфер вертикально</li>\n<li><code>&#x3C;C-w>v</code> - разделить текущий буфер горизонтально</li>\n<li><code>&#x3C;C-w>q</code> - закрыть текущий сплит</li>\n<li><code>&#x3C;C-w>[hjkl]</code> - переход по соседним сплитам</li>\n<li><code>&#x3C;C-w>&#x3C;S-[&#x3C;>+-]></code> - ресайзит текущий сплит. По умолчанию резайсит на 1 позицию курсора. Если нужно много, то предварять комбинацию числом.</li>\n</ul>\n<p>Когда разделяем сплит, в новом оказывается то же содержимое, что и было до разделения. После этого выбрать новый буфер в нем можно кнопками перехода по буферам <code>&#x3C;S-[jk]></code>.</p>\n<h3>Работа с вкладками</h3>\n<p>В каждой вкладке может быть открыт любой из буферов. В виме нет жесткой привязки вкладка-файл, как в других браузерах. Когда нажимаем <code>&#x3C;C-w>q</code>, то закрывается текущая вкладка. Если она последняя, то закроется и весь <code>vi</code>, независимо от того, сколько осталось открытых буферов.</p>\n<ul>\n<li><code>gt</code> - перейти в следующую вкладку</li>\n<li><code>gT</code> - перейти в предыдущую вкладку </li>\n<li><code>{i}gt</code> - перейти во вкладку номер <strong>i</strong> (нумерация с 1)</li>\n</ul>\n<h3>Работа с буферами</h3>\n<ul>\n<li><code>&#x3C;S-j></code> - перейти в следующий буфер</li>\n<li><code>&#x3C;S-k></code> - перейти в предыдущий буфер</li>\n<li><code>gd</code> - закрыть текущий буфер</li>\n</ul>\n<h2>Навигация по коду</h2>\n<ul>\n<li><code>&#x3C;C-yh></code> - перейти к реализации или объявлению, если не удалось к реализации</li>\n<li><code>&#x3C;C-yd></code> - перейти к объявлению</li>\n<li><code>&#x3C;C-yi></code> - перейти к заголовочному файлу из <code>#include</code></li>\n<li><code>&#x3C;C-yt></code> - вывести тип переменной</li>\n<li><code>&#x3C;C-yd></code> - вывести документацию</li>\n<li><code>&#x3C;C-yf></code> - исправить ошибку в текущей строке, если возможно</li>\n<li><code>&#x3C;C-o></code> - вернуться назад</li>\n<li><code>&#x3C;C-i></code> - перейти вперед</li>\n</ul>\n<h3>Поиск</h3>\n<ul>\n<li><code>&#x3C;C-p></code> - вывести окошко поиска по файла по пути</li>\n<li><code>Enter</code> - открыть выбранный файл в текущей вкладке (будет создан новый буффер, буфер открытый прежде в этой вкладке останется открытым)</li>\n<li><code>&#x3C;C-t></code> - открыть выбранный файл в новой вкладке</li>\n<li><code>&#x3C;C-v></code> - открыть выбранный файл в новом вертикальном сплите</li>\n<li><code>&#x3C;C-x></code> - открыть выбранный файл в новом горизонтальном сплите</li>\n</ul>\n<h3>Системные шорткаты</h3>\n<ul>\n<li><code>&#x3C;Leader>ev</code> - открыть vimrc</li>\n<li><code>&#x3C;Leader>rv</code> - перезагрузить vimrc</li>\n</ul>\n<h3>Запуск shell-команды</h3>\n<pre><code>:! ls ~\n</code></pre>\n<h2>Прочее</h2>\n<p>К виму не относится, но не знаю куда еще сунуть - в маковском терминале чтобы выделить текст и скопировать его в буфер обмена, нужно его выделять с зажатым <code>Fn</code>, а потом жать <code>Ctrl+C</code>.</p>',frontmatter:{path:"/blog/vim",title:"Vim"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-vim-5e5110444cdff57e8c62.js.map