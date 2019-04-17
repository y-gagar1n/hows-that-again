webpackJsonp([64880211853811],{448:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>strace</h1>\n<p>Выводит все системные вызовы программы. Пример запуска:</p>\n<p><code>strace ls</code></p>\n<p>Выводит кучу строк следующего вида:</p>\n<pre><code>execve("/bin/ls", ["ls"], [/* 93 vars */]) = 0                 \nbrk(NULL)                               = 0x558f2b6db000                                       \naccess("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)\nmmap(NULL, 12288, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f1ce7ad9000\naccess("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)           \nopen("/usr/local/cuda/lib64/tls/x86_64/libselinux.so.1", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)\n</code></pre>\n<p>Разберем первую строку по частям:</p>\n<ul>\n<li><code>execve</code> - системный вызов</li>\n<li><code>("/bin/ls", ["ls"], [/* 93 vars */])</code> - аргументы вызова</li>\n<li><code>= 0</code> - возвращаемое значение</li>\n</ul>\n<h2>Флаги</h2>\n<ul>\n<li><code>-e</code> - ограничить показываемые системные вызовы, например, <code>strace -e open</code></li>\n<li><code>-f</code> - (follow) - если программа создает подпроцессы, то следить за их системными вызовами тоже. Лучше использовать этот флаг по умолчанию всегда.</li>\n<li><code>-p</code> - присоединиться к уже запущенному процессу, указав его PID, например, <code>strace -p 747</code></li>\n<li><code>-s</code> - показывать первые N символов для всех выводимых строк (имена файлов строками не считаются), например, <code>strace -s 800</code>. Дефолтный размер строк - 32, поэтому лучше указывать побольше.</li>\n<li><code>-o</code> - перенаправлять вывод в указанный файл, например, <code>strace -o log.txt</code></li>\n</ul>\n<h2>Основные системные вызовы</h2>\n<ul>\n<li>\n<p><code>execve</code> - запуск программы</p>\n</li>\n<li>\n<p><code>open</code> - открытие файла</p>\n</li>\n<li>\n<p><code>write</code> - запись в файл</p>\n</li>\n<li>\n<p><code>sendto</code> - отправка данных по сети</p>\n</li>\n<li>\n<p><code>recvfrom</code> - получение данных по сети</p>\n</li>\n<li>\n<p>сетевая активность может осуществляться и через <code>read/write</code></p>\n</li>\n</ul>\n<h2>Пример</h2>\n<p>Смотрим вызовы SSH-сессии:</p>\n<p><code>strace -f -o ssh.txt ssh mybox</code></p>\n<p>Смотрим, какие файлы открывает dropbox (PID, например, 230):</p>\n<p><code>strace -f -p 230 -e open</code></p>\n<h1>dstat</h1>\n<p>Показывает, сколько данных посылается по сети/пишется на диск каждую секунду.</p>\n<p>Пример запуска:</p>\n<p><code>dstat</code></p>\n<p>Вывод:</p>\n<pre><code>----total-cpu-usage---- -dsk/total- -net/total- ---paging-- ---system--\nusr sys idl wai hiq siq| read  writ| recv  send|  in   out | int   csw \n  2   1  96   0   0   0| 165k 1183k|   0     0 |   0     0 |2665  4578 \n  6   6  84   4   0   1|   0    12M|  14k 3348B|   0     0 |4468    12k\n  3   5  85   5   0   1|   0    12M|8681B 3348B|   0     0 |4156  9436 \n  4   3  86   7   0   1|   0  7880k|  14k 9010B|   0     0 |4368  9721 q\n</code></pre>\n<ul>\n<li><code>usr</code> - потребление CPU пользовательскими процессами</li>\n<li><code>sys</code> - потребление CPU системными процессами</li>\n<li><code>idl</code> - количество простаивающих (idle) процессов</li>\n<li><code>wai</code> - количество ожидающих (wait) процессов</li>\n<li><code>hiq</code> - количество аппаратных прерываний (hard interrupt)</li>\n<li><code>siq</code> - количество программных прерываний (soft interrupt)</li>\n<li><code>read</code> - количество операций записи</li>\n<li><code>read</code> - количество операций чтения</li>\n<li><code>recv</code> - количество байт, полученных по сети</li>\n<li><code>send</code> - количество байт, отправленных по сети</li>\n<li><code>in</code> - количество раз, когда данные были скопированы <strong>в</strong> память</li>\n<li><code>out</code> - количество раз, когда данные были скопированы <strong>из</strong> памяти</li>\n<li><code>int</code> - количество прерываний</li>\n<li><code>csw</code> - количество переключений контекста (context switch)</li>\n</ul>\n<p>Дополнительные столбцы по процессам и виртуальной памяти появляютя прииспользовании флага <code>--vmstat</code>.</p>\n<p>Пример:</p>\n<p><code>dstat --vmstat</code></p>\n<p>Вывод:</p>\n<pre><code>---procs--- ------memory-usage----- ---paging-- -dsk/total- ---system-- ----total-cpu-usage----\nrun blk new| used  buff  cach  free|  in   out | read  writ| int   csw |usr sys idl wai hiq siq\n  0 0.0 6.4|8356M 1474M 7517M  707M|   0     0 | 173k 1238k|2677  4626 |  3   1  96   0   0   0\n1.0   0  69|8357M 1474M 7519M  703M|   0     0 |4096B 4440k|3888  7102 |  2   2  87   8   0   0\n  0 1.0  73|8358M 1474M 7521M  701M|   0     0 |   0  5972k|4442  8457 |  3   2  86   8   0   1\n1.0   0  68|8363M 1475M 7522M  694M|   0     0 |  20k 6068k|4032  7931 |  4   3  86   7   0   1\n</code></pre>\n<p>Здесь добавились столбцы:</p>\n<ul>\n<li><code>run</code> - количество работающих процессов</li>\n<li><code>blk</code> - количество заблокированных процессов</li>\n<li><code>new</code> - количество новых процессов</li>\n<li><code>used</code> - количество использованной памяти</li>\n<li><code>buff</code> - количество буфферизированной памяти</li>\n<li><code>cach</code> - количество закешированной памяти</li>\n<li><code>free</code> - количество свободной памяти</li>\n</ul>\n<h2>Флаги</h2>\n<ul>\n<li><code>-c</code> - вывод инфы по процессору</li>\n<li><code>-d</code> - вывод инфы по диску</li>\n<li><code>-n</code> - вывод инфы по сети</li>\n<li><code>-g</code> - вывод инфы по пейджингу</li>\n<li><code>-y</code> - вывод инфы по системе</li>\n</ul>\n<p>По умолчанию, если не указано никаких флагов, <code>dstat</code> запускается с флагами <code>cdngy</code>.</p>\n<ul>\n<li>\n<p><code>--top-cpu</code> - вывод процесса, использующего больше всех CPU</p>\n</li>\n<li>\n<p><code>--top-mem</code> - вывод процесса, потребляющего больше всех памяти</p>\n</li>\n<li>\n<p><code>--output</code> - вывод в csv файл, например, <code>dstat --output out.csv</code></p>\n</li>\n</ul>\n<h1>tcpdump</h1>\n<p>Позволяет сдампить сетевой трафик в файл, чтобы потом его открыть через <code>wireshark</code>.</p>\n<p>Пример:</p>\n<pre><code class="language-shell">sudo tcpdump -i wlan 0 \\\n              src port 80 or dst port 80 \\\n              -w port-80-recording.pcap`\n</code></pre>\n<p>А потом открываем результат <code>wireshark</code>-ом:</p>\n<pre><code class="language-shell">wireshark port-80-recording.pcap\n</code></pre>\n<p><code>wireshark</code> работает на уровне tcp и ничего не знает про http. Если нужно работать с HTTP-трафиком, то может помочь <code>tshark</code>, но у меня на дебиане он не запустился.</p>\n<h2>Правила фильтрации</h2>\n<p><a href="http://www.tcpdump.org/manpages/pcap-filter.7.html">http://www.tcpdump.org/manpages/pcap-filter.7.html</a></p>\n<ul>\n<li>\n<p><code>dst port ya.ru</code> - порт назначения = 80 (работает только с ip/tcp, ip/udp, ip6/tcp, ip6/udp)</p>\n</li>\n<li>\n<p><code>src port ya.ru</code> - порт источника = 80</p>\n</li>\n<li>\n<p><code>dst host ya.ru</code> - хост назначения = ya.ru</p>\n</li>\n<li>\n<p><code>src host ya.ru</code> - хост источника = ya.ru</p>\n</li>\n<li>\n<p><code>host ya.ru</code> - хост назначения или источника = ya.ru</p>\n</li>\n</ul>\n<p>Перед <code>host</code> можно писать <code>ip</code>, <code>arp</code>, <code>rarp</code>, <code>ip6</code> для указани протокола, например:</p>\n<p><code>ip host ya.ru</code></p>\n<ul>\n<li><code>proto protocol</code> - пакет является ip4 или ip6 пакетом указанного протокола (tcp, udp, icmp)</li>\n<li><code>tcp, udp, icmp</code> - аббревиатура для <code>proto p</code>, где p - протокол</li>\n</ul>\n<h2>Wireshark</h2>\n<p>В wireshark свой язык фильтрации, вот как, например, отфильтровать по ip-адресу источника:</p>\n<pre><code>ip.src == 192.168.1.3\n</code></pre>\n<p>Для назначения, соответственно:</p>\n<pre><code>ip.dst == 192.168.1.3\n</code></pre>\n<p>Если нужно в обе стороны, то:</p>\n<pre><code>ip.src == 192.168.1.3 or ip.dst == 192.168.1.3\n</code></pre>\n<p>либо же воспользоваться алиасом addr:</p>\n<pre><code>ip.addr == 192.168.1.3\n</code></pre>\n<h1>perf</h1>\n<p>Поможет ответить на следующие вопросы:</p>\n<ul>\n<li>почему ядро так грузит процессор?</li>\n<li>какие ветки кода генерят промахи кэша L2?</li>\n<li>сильно ли чтения памяти тормозят процессор?</li>\n<li>какие ветки кода выделяют память и сколько?</li>\n<li>из-за чего происходит переотправка пакетов TCP?</li>\n<li>вызывается ли определенная функция ядра, и как часто?</li>\n<li>по какой причине потоки покидают процессор?</li>\n</ul>\n<h2>Установка</h2>\n<pre><code class="language-shell">sudo apt-get install linux-tools\n</code></pre>\n<h2>Пример использования</h2>\n<pre><code class="language-shell">sudo perf record -e block:block_rq_issue -ag\nsudo perf report\n</code></pre>\n<p>1 строчка запускает сбор счетчика <code>block:block_rq_issue</code>, который отслеживает обращения к диску. Эта команда ничего не выдает на экран, но в фоне собирает и записывает инфу в файл <code>perf.data</code> до тех пор, пока ее не остановим через Ctrl-C.</p>\n<p>2 строчка открывает отчет. Окно интерактивное, можно стрелочками выбрать строку и раскрыть ее (Enter). Кнопка <strong>E</strong> раскрывает все узлы.</p>\n<p>Если в стектрейсах вместо названий функций 16-ричные числа - значит, нужно установить символы отладки для этой программы. Часто их можно установить через <code>apt-get</code>, добавив суффикс <code>-dbgsym</code>, например: <code>libc6-dbgsym</code>.</p>\n<p>При использовании с джавой или NodeJS нужно, чтобы JIT-компилятор писал символы отладки в файл <code>/tmp/perf-PID.map</code>. Для джавы это делает <a href="https://github.com/jvm-profiling-tools/perf-map-agent">perf-map-agent</a>, для ноды - флаг <code>--perf_basic_prof</code>. <a href="http://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html">Здесь</a> есть инструкции, как их использовать.</p>\n<h2>Полезные команды</h2>\n<p><strong>Трейсить</strong> - собирать инфу по каждому ивенту</p>\n<p><strong>Сэмплить</strong> - собирать инфу по подмножеству ивентов, например один раз на каждые 50 выстрелов</p>\n<p>Эти команды выдают результат в терминал</p>\n<ul>\n<li>\n<p><code>perf stat *command*</code> - статистика процессора при выполнении указанной команды</p>\n</li>\n<li>\n<p><code>perf stat -d *command*</code> - расширенная статистика</p>\n</li>\n<li>\n<p><code>perf stat -p *PID*</code> - статистика процессора для указанного процесса, собирается пока не нажато Ctrl-C</p>\n</li>\n<li>\n<p><code>perf stat -a sleep 5</code> - собирать статистику процессора для всей системы в течение 5 секунд</p>\n</li>\n<li>\n<p><code>perf stat -e cycles,instructions,cache-references,cache-misses,bus-cycles -a sleep 10</code> - разные статистики процессора для всей системы в течение 10 секунд</p>\n</li>\n<li>\n<p><code>perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores *command*</code> - статистики кэша L1 для указанной команды</p>\n</li>\n<li>\n<p><code>perf stat -e dTLB-loads,dTLB-load-misses,dTLB-prefetch-misses *command*</code> - статистики TLB для указанной команды</p>\n</li>\n<li>\n<p><code>perf stat -e LLC-loads,LLC-load-misses,LLC-stores,LLC-prefetches **command**</code> - статистики кэша LLC для указанной команды</p>\n</li>\n<li>\n<p><code>perf stat -e raw_syscalls:sys_enter -I 1000 -a</code> - считать количество сисколлов в секунду для всей системы</p>\n</li>\n<li>\n<p><code>perf stat -e \'syscalls:sys_enter_*\' -p **PID**</code> - считать количество сисколлов и группировать их по типу для указанного процесса, пока не будет нажато Ctrl-C</p>\n</li>\n<li>\n<p><code>perf stat -e \'syscalls:sys_enter_*\' -a sleep 5</code> - считать количество сисколлов и группировать их по типу для всей системы в течение 5 секунд</p>\n</li>\n<li>\n<p><code>perf record -e sched:sched_process_exec -a</code> - трейсить все новые процессы до Ctrl-C</p>\n</li>\n<li>\n<p><code>perf record -e context-switches -a</code> - сэмплить контекст-свитчи до Ctrl-C</p>\n</li>\n<li>\n<p><code>perf record -e context-switches -c 1 -a</code> - трейсить все контекст-свитчи до Ctrl-C</p>\n</li>\n<li>\n<p><code>perf probe --add tcp_sendmsg</code> - добавить возможность отслеживания вызовов функции <code>tcp_sendmsg</code></p>\n</li>\n<li>\n<p><code>perf probe -d tcp_sendmsg</code> - удалить возможность отслеживания вызовов функции <code>tcp_sendmsg</code></p>\n</li>\n</ul>\n<h2>Флэйм-графы</h2>\n<pre><code class="language-shell">git clone https://github.com/brendangregg/FlameGraph  # or download it from github\ncd FlameGraph\nperf record -F 99 -ag -- sleep 60\nperf script | ./stackcollapse-perf.pl > out.perf-folded\ncat out.perf-folded | ./flamegraph.pl > perf-kernel.svg\n</code></pre>\n<h1>vmstat</h1>\n<p>Использование:</p>\n<pre><code class="language-shell">vmstat 2 6\n</code></pre>\n<p>С такими аргументами статистика использования виртуальной памяти будет показываться каждые 2 секунды 6 раз. Первая строчка всегда дает средние значения с последней перезагрузки. Последующие дают средние значения за время <em>delay</em>, указывающееся первым числовым аргументом.</p>\n<p>Можно выводить статистику по использованию диска: <code>vmstat -d 2 6</code>.</p>\n<p>Пример вывода на Debian в режиме VM:</p>\n<pre><code class="language-shell">procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 1  0 5866632 302212 1028888 4434828    0    1    13    61    2    2  3  2 95  0  0\n 0  0 5866632 291460 1028896 4435540    0    0     0   220 9818 17977  4  2 94  0  0\n 6  0 5866632 293752 1028896 4435996    0    0     0     0 10499 21794  8  4 88  0  0\n 0  0 5866632 290568 1028896 4436376    0    0     0  2328 10009 18690  4  3 93  0  0\n 0  0 5866632 289300 1028912 4436496    0    0     0   738 9977 18418  3  3 95  0  0\n 0  0 5866632 289728 1028924 4436684    0    0     0   120 10139 19331  3  2 95  0  0\n</code></pre>\n<h2>Описание полей:</h2>\n<h3>Procs</h3>\n<ul>\n<li>r: The number of runnable processes (running or waiting for run time).</li>\n<li>b: The number of processes in uninterruptible sleep.</li>\n</ul>\n<h3>Memory</h3>\n<ul>\n<li>swpd: the amount of virtual memory used.</li>\n<li>free: the amount of idle memory.</li>\n<li>buff: the amount of memory used as buffers.</li>\n<li>cache: the amount of memory used as cache.</li>\n<li>inact: the amount of inactive memory.  (-a option)</li>\n<li>active: the amount of active memory.  (-a option)</li>\n</ul>\n<h3>Swap</h3>\n<ul>\n<li>si: Amount of memory swapped in from disk (/s).</li>\n<li>so: Amount of memory swapped to disk (/s).</li>\n</ul>\n<h3>IO</h3>\n<ul>\n<li>bi: Blocks received from a block device (blocks/s).</li>\n<li>bo: Blocks sent to a block device (blocks/s).</li>\n</ul>\n<h3>System</h3>\n<ul>\n<li>in: The number of interrupts per second, including the clock.</li>\n<li>cs: The number of context switches per second.</li>\n</ul>\n<h3>CPU</h3>\n<p>These are percentages of total CPU time.</p>\n<ul>\n<li>us: Time spent running non-kernel code.  (user time, including nice time)</li>\n<li>sy: Time spent running kernel code.  (system time)</li>\n<li>id: Time spent idle.  Prior to Linux 2.5.41, this includes IO-wait time.</li>\n<li>wa: Time spent waiting for IO.  Prior to Linux 2.5.41, included in idle.</li>\n<li>st: Time stolen from a virtual machine.  Prior to Linux 2.6.11, unknown.</li>\n</ul>\n<h2>Дисковый режим</h2>\n<pre><code class="language-shell">vmstat -d 1 1\n</code></pre>\n<p>Результат:</p>\n<pre><code>disk- ------------reads------------ ------------writes----------- -----IO------\n       total merged sectors      ms  total merged sectors      ms    cur    sec\nsda   4875777 1816309 473984778 5311008 18301794 32203707 2244809614 197933460      0  18362\ndm-0  4802238      0 458568874 6456436 43560867      0 2203748144 777588792      0  17997\ndm-1  1908554      0 15272184 2384716 5123066      0 40984528 200874876      0   1287\nloop0 227474      0  457018   57800      0      0       0       0      0      2\nloop1    535      0    3100      76      0      0       0       0      0      0\nloop2    538      0    3102      68      0      0       0       0      0      0\nloop3     33      0     120       0      0      0       0       0      0      0\nloop4      0      0       0       0      0      0       0       0      0      0\nloop5      0      0       0       0      0      0       0       0      0      0\nloop6      0      0       0       0      0      0       0       0      0      0\nloop7      0      0       0       0      0      0       0       0      0      0\n</code></pre>\n<h2>Описание полей</h2>\n<h3>Reads</h3>\n<ul>\n<li>total: Total reads completed successfully</li>\n<li>merged: grouped reads (resulting in one I/O)</li>\n<li>sectors: Sectors read successfully</li>\n<li>ms: milliseconds spent reading</li>\n</ul>\n<h3>Writes</h3>\n<ul>\n<li>total: Total writes completed successfully</li>\n<li>merged: grouped writes (resulting in one I/O)</li>\n<li>sectors: Sectors written successfully</li>\n<li>ms: milliseconds spent writing</li>\n</ul>\n<h3>IO</h3>\n<ul>\n<li>cur: I/O in progress</li>\n<li>s: seconds spent for I/O</li>\n</ul>',frontmatter:{path:"/blog/linux-debugging",title:"Linux debugging"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-linux-debugging-2d1eabdd3caf05008f62.js.map