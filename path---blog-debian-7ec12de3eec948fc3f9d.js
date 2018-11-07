webpackJsonp([0xe03050f36dc7],{411:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>Debian</h1>\n<h2>CD-ROM</h2>\n<p>После установки при манипуляциях с <code>apt-get</code> часто спрашивает cd-rom. Чтобы от этого избавиться, нужно отредактировать файл <code>/etc/apt/sources.list</code> и удалить оттуда строчку, начинающуюся с <code>deb cdrom</code></p>\n<h2>Тачпад</h2>\n<p>После установки не работал левый клик по нажатию на тачпад. Решение - подключить мышь, зайти в Settings -> Mouse и включить там Tap To Click</p>\n<h2>Ctrl-Alt-T</h2>\n<p>Чтобы назначить вызов консоли по шорткату ctrl-alt-t, нужно зайти в Settings-Keyboard и создать новый шорткат для команды <code>gnome-terminal</code></p>\n<h2>sudo</h2>\n<p>После установки <code>sudo</code> в системе отсутствует. Нужно сделать:\n<br>\n<br>\nsu\napt install sudo\n</p>\n<h2>apt-get</h2>\n<p>Если не может найти многих пакетов, то нужно отредактировать <code>/etc/apt/sources.list</code> и добавить туда источники:\n<br>\n<br>\ndeb <a href="http://deb.debian.org/debian/">http://deb.debian.org/debian/</a> stretch-updates main non-free\ndeb-src <a href="http://deb.debian.org/debian/">http://deb.debian.org/debian/</a> stretch-updates main non-free\n</p>\n<h2>Alt-Shift</h2>\n<p>Чтобыустановить смену раскладки на Alt+Shift,нужно:</p>\n<p>Tweak tool >> Typing >> Modifiers of input sources switch >> Alt shift.</p>\n<h2>DNS</h2>\n<p>Прописывается в файле <strong>/etc/resolv.conf</strong></p>\n<p>Чтобы добавить туда новый DNS-server, нужно дописать:\n<br>\nnameserver 8.8.8.8\n</p>\n<h2>Переменные окружения и оболочки</h2>\n<p>Переменные оболочки (shell variables) работают только в шелле.</p>\n<h3>Установка переменной оболочки</h3>\n<p><code>KEY=value</code></p>\n<h3>Чтение переменной оболочки</h3>\n<p><code>$KEY</code></p>\n<h3>Установка переменной окружения</h3>\n<p>Осуществляется через экспорт переменной оболочки:\n<br>\n<br>\nKEY=value\nexport KEY\n</p>\n<p>Можно объединить в одну строчку:</p>\n<p><code>export KEY=value</code></p>\n<h3>Снятие переменной окружения</h3>\n<p><code>export -n KEY</code></p>\n<h3>Вывод всех переменных окружения</h3>\n<p><code>printenv</code></p>\n<p>Установка будет работать только на текущий сеанс. Если нужно установить навсегда, то можно так:</p>\n<p><code>nano ~/.profile</code></p>\n<p>и в этом файле добавлять свои переменные в обычном формате</p>\n<h2>Распаковка архива</h2>\n<p><code>tar -xvf file.tar</code></p>\n<p>Если имеет расширение <strong>.tar.gz</strong> , то:</p>\n<p><code>tar -xzvf file.tar.gz</code></p>\n<p>Если <strong>.tar.bz2</strong> :</p>\n<p><code>tar -xjvf file.tar.bz2</code></p>\n<p><strong>-x</strong> : распаковка архива</p>\n<p><strong>-v</strong> : verbose-вывод и показ прогресса</p>\n<p><strong>-f</strong> : из файла</p>\n<p><strong>-j</strong> : архив bzip2</p>\n<p><strong>-z</strong> : архив gzip</p>\n<p>Если нужно экстрактнуть 1 файл, то:</p>\n<p><code>tar -xvf file.tar foo.txt</code></p>\n<h2>Поиск файлов, установленных пакетом</h2>\n<p><code>dpkg-query -l &#x26;lt;имя пакета&#x26;gt;</code></p>\n<p>Пример: <code>apt-get install yasm dpkg-query -l yasm</code></p>\n<h2>Алиасы</h2>\n<p>Чтобы сохранить алиас навсегда, его нужно писать в:\n<br>\n<br>\nsudo nano ~/.bashrc\n</p>\n<h2>Вывод процессов, отжирающих больше всего памяти</h2>\n<p><code>ps aux --sort=-%mem | head</code></p>\n<h2>Убить все процессы питона</h2>\n<p><code>pkill -9 python</code></p>\n<h2>Показать, сколько осталось свободной памяти</h2>\n<p><code>free -m</code></p>\n<p>В колонке available показано, сколько памяти доступно процессам</p>\n<h2>Почта</h2>\n<pre><code>apt-get install mailutils ssmtp\nnano /etc/ssmtp/smtp.conf\n</code></pre>\n<p>Там вписать строчки:\n<br>\n<br>\nroot=yuriy.timofeev@vocord\nmailhub=smtp.gmail.com:465\nFromLineOverride=YES\nAuthUser=yuriy.timofeev@vocord.ru\nAuthPass=testing123\nUseTLS=YES\n</p>\n<p>Отправка письма:\n<br>\n<br>\necho "Тело письма" | mail -s "Пришел" -a "From: Юрий Тимофеев&#x3C;yuriy.timofeev@vocord.ru>" yuriy.timofeev@vocord.ru\n</p>\n<h2>Установка deb-пакетов</h2>\n<pre><code>dpkg -i &#x26;lt;name&#x26;gt;.deb\nsudo apt-get -f install\n</code></pre>\n<p>После первой строчки может выдать ошибки - не волноваться, вторая все исправит.</p>\n<h2>apt-get</h2>\n<p>Запустить симуляцию установки:\n<br>\n<br>\napt-get install -s PACKAGE\n</p>\n<p>Вывод установленной версии пакета:\n<br>\n<br>\napt-cache policy PACKAGE\n</p>\n<h2>gcc</h2>\n<p>Вывод всех папок, в которых gcc ищет хидеры:\n<br>\n<br>\nLC<em>ALL=C gcc -v -E -xc - &#x3C; /dev/null 2>&#x26;1 |\nLC</em>ALL=C sed -ne \'/starts here/,/End of/p\'\n</p>\n<h2>find</h2>\n<p>Поиск файла по всей файловой системе: <code>find / -name FILENAME -print 2&#x26;gt;/dev/null</code></p>\n<h2>Вывод процесса, занимающего порт:</h2>\n<pre><code>lsof -i -P -n | grep :&#x26;lt;port&#x26;gt;\n</code></pre>\n<h2>Вывод .so, которые нужны библиотеке и путей, по которым она их ищет:</h2>\n<pre><code>ldd file.so\n</code></pre>\n<h2>Вывод размера директории:</h2>\n<pre><code>du -k DIRECTORY\n</code></pre>\n<p>-k выводит размер в килобайтах -b, -m - в байтах и мегабайтах, соответственно</p>\n<h2>Установка прокси</h2>\n<p>Нужно установить две переменные окружения:\n<br>\n<br>\nexport HTTP<em>PROXY=<a href="http://192.168.2.102:3128">http://192.168.2.102:3128</a>\nexport HTTPS</em>PROXY=<a href="http://192.168.2.102:3128">http://192.168.2.102:3128</a>\n</p>\n<p><strong>ВАЖНО</strong>, чтобы схема (http://) присутсвовала в адресе, иначе, например, питоновский urlparse может тупить (было такое в geeknote)</p>',frontmatter:{path:"/blog/debian",title:"Debian"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-debian-7ec12de3eec948fc3f9d.js.map