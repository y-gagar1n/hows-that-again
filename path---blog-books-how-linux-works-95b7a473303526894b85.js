webpackJsonp([0x8cb3f28ecf58],{426:function(e,a){e.exports={data:{markdownRemark:{html:'<h1>Disks, files</h1>\n<h2>Партиционирование диска</h2>\n<p>Основные виды таблицы партиций - MBR (старый) и GPT (новый).</p>\n<p>Основные тулзы для партиционирования:</p>\n<ul>\n<li>parted - текстовая утилита, поддерживает MBR и GPT</li>\n<li>gparted - графическая версия parted</li>\n<li>fdisk - текстовая, поддерживает только MBR</li>\n<li>gdisk - версия fdisk, которая поддерживает только GPT</li>\n</ul>\n<p><code class="language-text">parted -l</code> - вывод текущей таблицы партиций</p>\n<h2>mkfs</h2>\n<p>Создает файловую систему на указанном девайсе</p>\n<p><code class="language-text">mkfs -t ext4 /dev/sdf2</code></p>\n<h2>mount</h2>\n<p>Синтаксис:</p>\n<p><code class="language-text">mount -t type device mountpoint</code></p>\n<p>Пример:</p>\n<p><code class="language-text">mount -t ext4 /dev/sdf2 /home/extra</code></p>\n<p>В конце можно указать список опций под общим флагом <code class="language-text">-o</code> и через запятую:</p>\n<p><code class="language-text">mount -t vfat /dev/hda1 /dos -o ro,conv=auto</code></p>\n<p>Наиболее часто используемые опции:</p>\n<ul>\n<li><strong>exec,noexec</strong> - разрешить или запретить выполнение программ</li>\n<li><strong>ro</strong> - read-only</li>\n<li><strong>rw</strong> - read-write</li>\n<li><strong>conv=rule</strong> (для FAT) - конвертит символы перевода строки в файлах в зависимости от указанного правила (binary/text/auto).</li>\n</ul>\n<p>Чтобы примаунтить по UUID:</p>\n<p><code class="language-text">mount UUID=a9011c2b-1c03-4288-b3fe-8ba961ab089 /home/extra</code></p>\n<p>Список подключенных файловых систем и их UUID можно получить командой <code class="language-text">blkid</code>.</p>\n<p><code class="language-text">mount -a</code> - примаунтит все вхождения из <code class="language-text">/etc/fstab</code>, для которых не указан атрибут <strong>noauto</strong>.</p>\n<h2>umount</h2>\n<p><code class="language-text">umount mountpoint</code></p>\n<h2>/etc/fstab</h2>\n<p>В файле <code class="language-text">/etc/fstab</code> перечислены манутпойнты, автоматически подключаемые на старте системы.</p>\n<p>Пример:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">proc /proc proc nodev,noexec,nosuid 0 0\nUUID=70ccd6e7-6ae6-44f6-812c-51aab8036d29 / ext4 errors=remount-ro 0 1\nUUID=592dcfd1-58da-4769-9ea8-5f412a896980 none swap sw 0 0\n/dev/sr0 /cdrom iso9660 ro,user,nosuid,noauto 0 0</code></pre></div>\n<p>В каждой строчке указаны: </p>\n<ul>\n<li>девайс или его UUID</li>\n<li>mountpoint</li>\n<li>тип файловой системы</li>\n<li>опции, разделенные запятой</li>\n<li>информация о бэкапе, здесь всегда ставить 0</li>\n<li>порядок проверки на целостность, здесть для корневых систем ставить 1, для остальных систем на жестком диске - 2. 0 - для всего остального, чтобы отключить проверку на старте.</li>\n</ul>\n<h2>fsck</h2>\n<p>Утилита для поиска и исправления ошибок в файловой системе.</p>\n<p><code class="language-text">lost+found</code> - в эту папку fsck перемещает файлы, у которых нет имени. Все файлы в этой папке имеют числовые имена и пользователь может по содержанию предположить, какое было имя.</p>\n<p><code class="language-text">fsck -p</code> (либо <code class="language-text">fsck -a</code>) - автоматически исправляет типичные ошибки, не спрашивая пользователя, и абортится в случае обнаружения серьезных ошибок.</p>\n<h1>Boot</h1>\n<p>Старт системы выглядит так:</p>\n<ol>\n<li>Загружается BIOS, запускает boot loader</li>\n<li>boot loader находит образ ядра на диске, загружает его в память, запускает</li>\n<li>Ядро инициализирует устройства и их драйвера</li>\n<li>Ядро маунтит корневую файловую систему</li>\n<li>Ядро запускает программу <code class="language-text">init</code> с PID=1. Здесь начинается юзер-спейс</li>\n<li><code class="language-text">init</code> запускает оставшиеся системные процессы</li>\n<li>В какой-то момент ближе к концу  <code class="language-text">init</code> запускает процесс, позволяющий пользователю залогиниться.</li>\n</ol>\n<p>На 1 этапе биосу нужно найти на диске ядро, но у него нет доступа ни к файловой системе, ни к драйверам для работы с диском, так как ядро еще не загружено. </p>\n<p>Для решения проблемы работы диском на все диски устанавливается прошивка, которая позволяет биосу обращаться к содержимому диска, используя <strong>Logical Block Addressing (LBA)</strong>. Этот способ обеспечивает универсальный доступ к диску, но при этом очень низкую производительность. Поэтому этот способ используется только бутлоадером. </p>\n<p>А для работы с файловой системой все бутлоадеры умеют читать таблицы партиций и имеют поддержку read-only доступа к файловым системам. То есть они могут находить и читать файлы.</p>\n<h2>GRUB</h2>\n<p>Главная фича, отличающая GRUB от остальных бутлоадеров - возможность навигации по файловой системе.</p>\n<p>Чтобы попасть в меню GRUB, нужно зажать SHIFT при загрузке BIOS.</p>\n<p>Конфиги лежат в папке <code class="language-text">/boot/grub</code> или <code class="language-text">/boot/grub2</code>. Но их не нужно модифицировать вручную, нужно использовать утилиту <code class="language-text">grub-mkconfig</code>.</p>\n<p>Утилитой <code class="language-text">grub-install</code> можно установить GRUB и его конфигурацию на любой диск или внешнее хранилище. Для установки на внешнее хранилище, нужно указать примаунченную корневую директорию этого устройства. Например, если устройство <code class="language-text">/dev/sdc</code> примаунчено как <code class="language-text">/mnt</code>,то делаем так:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">grub-install --boot-directory<span class="token operator">=</span>/mnt/boot /dev/sdc</code></pre></div>\n<h2>Старт юзер-спейса</h2>\n<ol>\n<li>init</li>\n<li>низкоуровневые сервисы: udevd, syslogd, ...</li>\n<li>настройка сети</li>\n<li>средне- и высокоуровневые сервисы (cron, printing, ...)</li>\n<li>Запрос авторизации, GUI и прочие высокоуровненые приложения</li>\n</ol>\n<h1>Процессы, ресурсы</h1>\n<h2>Файловые дескрипторы</h2>\n<p><code class="language-text">lsof</code> - выводит список открытых файловых ресурсов, для каждого выводит путь, тип дескриптора, процесс.</p>\n<p>Если нужно отфильтровать по директории, то, нужно например так: <code class="language-text">lsof +d /home/y</code></p>\n<p>Можно отфильтровать по конкретному процессу: <code class="language-text">lsof -p pid</code>.</p>\n<h2>Вызовы функций</h2>\n<ul>\n<li><code class="language-text">strace</code> - выводит системные вызовы, их аргументы и возвращаемые значения</li>\n<li><code class="language-text">ltrace</code>- то же самое, но для вызовов к разделяемым библиотекам</li>\n</ul>\n<h2>Потоки</h2>\n<p><code class="language-text">ps m</code> - выводит список процессов и под каждым - список его потоков.</p>\n<p>Если нужно увидеть ID тредов, то нужно указать кастомный формат:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">ps</span> m -o pid,tid,command</code></pre></div>\n<h2>Мониторинг ресурсов</h2>\n<p><code class="language-text">vmstat 2</code> - каждые 2 секунды выводит инфу по использованию CPU, RAM, IO</p>\n<p>Колонки:</p>\n<ul>\n<li><code class="language-text">swpd</code> - Кб памяти засваплено на диск</li>\n<li><code class="language-text">si</code> - Кб взять в память из свапа за секунду</li>\n<li><code class="language-text">so</code> - Кб памяти засваплено на диск за секунду</li>\n<li><code class="language-text">buff</code> - Кб памяти используется для дискового буфера</li>\n<li><code class="language-text">us</code>, <code class="language-text">sy</code>, <code class="language-text">id</code>, <code class="language-text">wa</code> - сколько % процессорного времени тратится на пользовательские процессы, системные, idle time и ожидание (waiting) ввода-вывода.</li>\n</ul>\n<h2>Мониторинг использования I/O</h2>\n<p>Тут помогут команды <code class="language-text">iostat</code> и <code class="language-text">iotop</code>, но их по дефолту в убунте нет, надо отдельно устанавливать.</p>\n<h2>Мониторинг для процесса</h2>\n<p><code class="language-text">pidstat -p PID 1</code> - вывод статистики по ресурсам процесса PID, каждую секунду.</p>\n<h1>Шаринг файлов</h1>\n<p>Простейший способ пошарить папку:</p>\n<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">python <span class="token operator">-</span>m SimpleHTTPServer</code></pre></div>\n<p>После этого на порту 8000 будет запущен веб-сервер, раздающий файлы из текущей директории.</p>\n<h2>rsync</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">rsync</span> -av src-folder/ user@host:dest-folder\t\t<span class="token comment"># скопирует все файлы из папки ./src-folder в домашнюю папку пользователя user на машине host</span>\n<span class="token function">rsync</span> -av src-folder user@host:dest-folder\t\t<span class="token comment"># здесь тоже самое, но слэша после src-folder нет, поэтому скопирована будет сама папка</span></code></pre></div>\n<ul>\n<li><code class="language-text">-a</code> - означает, что будет полностью сохранена структура папок - в том числе симлинки, права доступа и прочее</li>\n<li><code class="language-text">-v</code> - выведет список копируемых файлов</li>\n<li><code class="language-text">-n</code> - не копирует файлы, но выводит их список</li>\n<li><code class="language-text">--delete</code> - удалить в папке-назначении файлы, которых нет в папке-источнике (по умолчанию они не удаляются)</li>\n<li><code class="language-text">--exclude=.git</code> - не копировать папку <code class="language-text">.git</code></li>\n<li><code class="language-text">--exclude-from=.rsyncignore</code> - не копировать файлы, перечисленные в <code class="language-text">.rsyncignore</code></li>\n<li><code class="language-text">-c</code> - сравнивать файлы по чексумме (по умолчанию сравнивает по размеру и дате модификации)</li>\n<li><code class="language-text">-b</code> - бэкапить файлы, которые перезапишутся в папке-назначении</li>\n<li><code class="language-text">-u</code> - не трогать файлы в назначении, которые свежее, чем соответствующие файлы в источнике</li>\n<li><code class="language-text">-z</code> - сжимать файлы перед отправкой</li>\n</ul>\n<h2>NFS</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"> <span class="token function">mount</span> -t nfs server:directory mountpoint</code></pre></div>\n<p> Для автомонтирования можно использовать <code class="language-text">automount</code>, или его более новую версию <code class="language-text">amd</code>, или <strong>automount init type</strong> в <code class="language-text">systemd</code>.</p>',frontmatter:{path:"/blog/books/how-linux-works",title:"How Linux works"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-books-how-linux-works-95b7a473303526894b85.js.map