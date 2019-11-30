---
title: "Linux debugging"
path: "/blog/linux-debugging"
---

# strace

Выводит все системные вызовы программы. Пример запуска:

`strace ls`

Выводит кучу строк следующего вида:

```
execve("/bin/ls", ["ls"], [/* 93 vars */]) = 0                 
brk(NULL)                               = 0x558f2b6db000                                       
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
mmap(NULL, 12288, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f1ce7ad9000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)           
open("/usr/local/cuda/lib64/tls/x86_64/libselinux.so.1", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
```

Разберем первую строку по частям:

- `execve` - системный вызов
- `("/bin/ls", ["ls"], [/* 93 vars */])` - аргументы вызова
- `= 0` - возвращаемое значение

## Флаги

- `-e` - ограничить показываемые системные вызовы, например, `strace -e open`
- `-f` - (follow) - если программа создает подпроцессы, то следить за их системными вызовами тоже. Лучше использовать этот флаг по умолчанию всегда.
- `-p` - присоединиться к уже запущенному процессу, указав его PID, например, `strace -p 747`
- `-s` - показывать первые N символов для всех выводимых строк (имена файлов строками не считаются), например, `strace -s 800`. Дефолтный размер строк - 32, поэтому лучше указывать побольше.
- `-o` - перенаправлять вывод в указанный файл, например, `strace -o log.txt`

## Основные системные вызовы

- `execve` - запуск программы
- `open` - открытие файла
- `write` - запись в файл
- `sendto` - отправка данных по сети
- `recvfrom` - получение данных по сети

* сетевая активность может осуществляться и через `read/write`

## Пример

Смотрим вызовы SSH-сессии:

`strace -f -o ssh.txt ssh mybox`

Смотрим, какие файлы открывает dropbox (PID, например, 230):

`strace -f -p 230 -e open`

# dstat

Показывает, сколько данных посылается по сети/пишется на диск каждую секунду.

Пример запуска:

`dstat`

Вывод:

```
----total-cpu-usage---- -dsk/total- -net/total- ---paging-- ---system--
usr sys idl wai hiq siq| read  writ| recv  send|  in   out | int   csw 
  2   1  96   0   0   0| 165k 1183k|   0     0 |   0     0 |2665  4578 
  6   6  84   4   0   1|   0    12M|  14k 3348B|   0     0 |4468    12k
  3   5  85   5   0   1|   0    12M|8681B 3348B|   0     0 |4156  9436 
  4   3  86   7   0   1|   0  7880k|  14k 9010B|   0     0 |4368  9721 q
```

- `usr` - потребление CPU пользовательскими процессами
- `sys` - потребление CPU системными процессами
- `idl` - количество простаивающих (idle) процессов
- `wai` - количество ожидающих (wait) процессов
- `hiq` - количество аппаратных прерываний (hard interrupt)
- `siq` - количество программных прерываний (soft interrupt)
- `read` - количество операций записи
- `read` - количество операций чтения
- `recv` - количество байт, полученных по сети
- `send` - количество байт, отправленных по сети
- `in` - количество раз, когда данные были скопированы **в** память
- `out` - количество раз, когда данные были скопированы **из** памяти
- `int` - количество прерываний
- `csw` - количество переключений контекста (context switch)

Дополнительные столбцы по процессам и виртуальной памяти появляютя прииспользовании флага `--vmstat`.

Пример:

`dstat --vmstat`

Вывод:

```
---procs--- ------memory-usage----- ---paging-- -dsk/total- ---system-- ----total-cpu-usage----
run blk new| used  buff  cach  free|  in   out | read  writ| int   csw |usr sys idl wai hiq siq
  0 0.0 6.4|8356M 1474M 7517M  707M|   0     0 | 173k 1238k|2677  4626 |  3   1  96   0   0   0
1.0   0  69|8357M 1474M 7519M  703M|   0     0 |4096B 4440k|3888  7102 |  2   2  87   8   0   0
  0 1.0  73|8358M 1474M 7521M  701M|   0     0 |   0  5972k|4442  8457 |  3   2  86   8   0   1
1.0   0  68|8363M 1475M 7522M  694M|   0     0 |  20k 6068k|4032  7931 |  4   3  86   7   0   1
```

Здесь добавились столбцы:

- `run` - количество работающих процессов
- `blk` - количество заблокированных процессов
- `new` - количество новых процессов
- `used` - количество использованной памяти
- `buff` - количество буфферизированной памяти
- `cach` - количество закешированной памяти
- `free` - количество свободной памяти

## Флаги

- `-c` - вывод инфы по процессору
- `-d` - вывод инфы по диску
- `-n` - вывод инфы по сети
- `-g` - вывод инфы по пейджингу
- `-y` - вывод инфы по системе

По умолчанию, если не указано никаких флагов, `dstat` запускается с флагами `cdngy`.

- `--top-cpu` - вывод процесса, использующего больше всех CPU
- `--top-mem` - вывод процесса, потребляющего больше всех памяти

- `--output` - вывод в csv файл, например, `dstat --output out.csv`

# tcpdump

Позволяет сдампить сетевой трафик в файл, чтобы потом его открыть через `wireshark`.

## Опции запуска

- `-n` - не преобразовывать численные адреса в имена
- `-v/vv/vvv` - verbose output
- `-X` - помимо заголовков пакетов, печатать так же их тела

Пример:

```shell
sudo tcpdump -i wlan 0 \
              src port 80 or dst port 80 \
              -w port-80-recording.pcap`
```

А потом открываем результат `wireshark`-ом:

```shell
wireshark port-80-recording.pcap
```

`wireshark` работает на уровне tcp и ничего не знает про http. Если нужно работать с HTTP-трафиком, то может помочь `tshark`, но у меня на дебиане он не запустился.

## Правила фильтрации

http://www.tcpdump.org/manpages/pcap-filter.7.html

- `dst port ya.ru` - порт назначения = 80 (работает только с ip/tcp, ip/udp, ip6/tcp, ip6/udp)
- `src port ya.ru` - порт источника = 80

- `dst host ya.ru` - хост назначения = ya.ru
- `src host ya.ru` - хост источника = ya.ru
- `host ya.ru` - хост назначения или источника = ya.ru

Перед `host` можно писать `ip`, `arp`, `rarp`, `ip6` для указани протокола, например:

`ip host ya.ru`

- `proto protocol` - пакет является ip4 или ip6 пакетом указанного протокола (tcp, udp, icmp)
- `tcp, udp, icmp` - аббревиатура для `proto p`, где p - протокол

## Wireshark

В wireshark свой язык фильтрации, вот как, например, отфильтровать по ip-адресу источника:

```
ip.src == 192.168.1.3
```

Для назначения, соответственно:

```
ip.dst == 192.168.1.3
```

Если нужно в обе стороны, то:

```
ip.src == 192.168.1.3 or ip.dst == 192.168.1.3
```

либо же воспользоваться алиасом addr:

```
ip.addr == 192.168.1.3
```

## Scapy

Scapy это интерпретатор на основе питона, позволяющий отправлять, перехватывать, декодировать и анализивовать сетевые пакеты.

Отправка пакета:

```sh
$ scapy
>>> send(IP(dst="10.0.0.1")/ICMP()/"This is an ICMP packet") 
```

Анализ .pcap:

```sh
$ scapy
>>> pcap = rdpcap('traffic.pcap')
>>> str = ''.join(str(p.payload.payload.payload) for p in pcap)
```

# perf

Поможет ответить на следующие вопросы:

- почему ядро так грузит процессор?
- какие ветки кода генерят промахи кэша L2?
- сильно ли чтения памяти тормозят процессор?
- какие ветки кода выделяют память и сколько?
- из-за чего происходит переотправка пакетов TCP?
- вызывается ли определенная функция ядра, и как часто?
- по какой причине потоки покидают процессор?

## Установка

```shell
sudo apt-get install linux-tools
```

## Пример использования

```shell
sudo perf record -e block:block_rq_issue -ag
sudo perf report
```

1 строчка запускает сбор счетчика `block:block_rq_issue`, который отслеживает обращения к диску. Эта команда ничего не выдает на экран, но в фоне собирает и записывает инфу в файл `perf.data` до тех пор, пока ее не остановим через Ctrl-C.

2 строчка открывает отчет. Окно интерактивное, можно стрелочками выбрать строку и раскрыть ее (Enter). Кнопка **E** раскрывает все узлы.

Если в стектрейсах вместо названий функций 16-ричные числа - значит, нужно установить символы отладки для этой программы. Часто их можно установить через `apt-get`, добавив суффикс `-dbgsym`, например: `libc6-dbgsym`.

При использовании с джавой или NodeJS нужно, чтобы JIT-компилятор писал символы отладки в файл `/tmp/perf-PID.map`. Для джавы это делает [perf-map-agent](https://github.com/jvm-profiling-tools/perf-map-agent), для ноды - флаг `--perf_basic_prof`. [Здесь](http://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html) есть инструкции, как их использовать.

## Полезные команды

**Трейсить** - собирать инфу по каждому ивенту

**Сэмплить** - собирать инфу по подмножеству ивентов, например один раз на каждые 50 выстрелов

Эти команды выдают результат в терминал

- `perf stat *command*` - статистика процессора при выполнении указанной команды
- `perf stat -d *command*` - расширенная статистика
- `perf stat -p *PID*` - статистика процессора для указанного процесса, собирается пока не нажато Ctrl-C
- `perf stat -a sleep 5` - собирать статистику процессора для всей системы в течение 5 секунд
- `perf stat -e cycles,instructions,cache-references,cache-misses,bus-cycles -a sleep 10` - разные статистики процессора для всей системы в течение 10 секунд
- `perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores *command*` - статистики кэша L1 для указанной команды
- `perf stat -e dTLB-loads,dTLB-load-misses,dTLB-prefetch-misses *command*` - статистики TLB для указанной команды
- `perf stat -e LLC-loads,LLC-load-misses,LLC-stores,LLC-prefetches **command**` - статистики кэша LLC для указанной команды
- `perf stat -e raw_syscalls:sys_enter -I 1000 -a` - считать количество сисколлов в секунду для всей системы
- `perf stat -e 'syscalls:sys_enter_*' -p **PID**` - считать количество сисколлов и группировать их по типу для указанного процесса, пока не будет нажато Ctrl-C
- `perf stat -e 'syscalls:sys_enter_*' -a sleep 5` - считать количество сисколлов и группировать их по типу для всей системы в течение 5 секунд

- `perf record -e sched:sched_process_exec -a` - трейсить все новые процессы до Ctrl-C
- `perf record -e context-switches -a` - сэмплить контекст-свитчи до Ctrl-C
- `perf record -e context-switches -c 1 -a` - трейсить все контекст-свитчи до Ctrl-C

- `perf probe --add tcp_sendmsg` - добавить возможность отслеживания вызовов функции `tcp_sendmsg`
- `perf probe -d tcp_sendmsg` - удалить возможность отслеживания вызовов функции `tcp_sendmsg`

## Флэйм-графы

```shell
git clone https://github.com/brendangregg/FlameGraph  # or download it from github
cd FlameGraph
perf record -F 99 -ag -- sleep 60
perf script | ./stackcollapse-perf.pl > out.perf-folded
cat out.perf-folded | ./flamegraph.pl > perf-kernel.svg
```

# vmstat

Использование:

```shell
vmstat 2 6
```

С такими аргументами статистика использования виртуальной памяти будет показываться каждые 2 секунды 6 раз. Первая строчка всегда дает средние значения с последней перезагрузки. Последующие дают средние значения за время *delay*, указывающееся первым числовым аргументом.

Можно выводить статистику по использованию диска: `vmstat -d 2 6`.

Пример вывода на Debian в режиме VM:

```shell
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0 5866632 302212 1028888 4434828    0    1    13    61    2    2  3  2 95  0  0
 0  0 5866632 291460 1028896 4435540    0    0     0   220 9818 17977  4  2 94  0  0
 6  0 5866632 293752 1028896 4435996    0    0     0     0 10499 21794  8  4 88  0  0
 0  0 5866632 290568 1028896 4436376    0    0     0  2328 10009 18690  4  3 93  0  0
 0  0 5866632 289300 1028912 4436496    0    0     0   738 9977 18418  3  3 95  0  0
 0  0 5866632 289728 1028924 4436684    0    0     0   120 10139 19331  3  2 95  0  0
```
## Описание полей:

### Procs

- r: The number of runnable processes (running or waiting for run time).
- b: The number of processes in uninterruptible sleep.

### Memory

- swpd: the amount of virtual memory used.
- free: the amount of idle memory.
- buff: the amount of memory used as buffers.
- cache: the amount of memory used as cache.
- inact: the amount of inactive memory.  (-a option)
- active: the amount of active memory.  (-a option)

### Swap

- si: Amount of memory swapped in from disk (/s).
- so: Amount of memory swapped to disk (/s).

### IO

- bi: Blocks received from a block device (blocks/s).
- bo: Blocks sent to a block device (blocks/s).

### System

- in: The number of interrupts per second, including the clock.
- cs: The number of context switches per second.

### CPU

These are percentages of total CPU time.

- us: Time spent running non-kernel code.  (user time, including nice time)
- sy: Time spent running kernel code.  (system time)
- id: Time spent idle.  Prior to Linux 2.5.41, this includes IO-wait time.
- wa: Time spent waiting for IO.  Prior to Linux 2.5.41, included in idle.
- st: Time stolen from a virtual machine.  Prior to Linux 2.6.11, unknown.

## Дисковый режим

```shell
vmstat -d 1 1
```

Результат:

```
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda   4875777 1816309 473984778 5311008 18301794 32203707 2244809614 197933460      0  18362
dm-0  4802238      0 458568874 6456436 43560867      0 2203748144 777588792      0  17997
dm-1  1908554      0 15272184 2384716 5123066      0 40984528 200874876      0   1287
loop0 227474      0  457018   57800      0      0       0       0      0      2
loop1    535      0    3100      76      0      0       0       0      0      0
loop2    538      0    3102      68      0      0       0       0      0      0
loop3     33      0     120       0      0      0       0       0      0      0
loop4      0      0       0       0      0      0       0       0      0      0
loop5      0      0       0       0      0      0       0       0      0      0
loop6      0      0       0       0      0      0       0       0      0      0
loop7      0      0       0       0      0      0       0       0      0      0
```

## Описание полей

### Reads

- total: Total reads completed successfully
- merged: grouped reads (resulting in one I/O)
- sectors: Sectors read successfully
- ms: milliseconds spent reading

### Writes

- total: Total writes completed successfully
- merged: grouped writes (resulting in one I/O)
- sectors: Sectors written successfully
- ms: milliseconds spent writing

### IO

- cur: I/O in progress
- s: seconds spent for I/O






