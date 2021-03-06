---
title: "How Linux works"
path: "/blog/books/how-linux-works"
---

# How Linux works

```toc
exclude: How Linux works
```

# Disks, files

## Партиционирование диска

Основные виды таблицы партиций - MBR (старый) и GPT (новый).

Основные тулзы для партиционирования:

- parted - текстовая утилита, поддерживает MBR и GPT
- gparted - графическая версия parted
- fdisk - текстовая, поддерживает только MBR
- gdisk - версия fdisk, которая поддерживает только GPT

`parted -l` - вывод текущей таблицы партиций

## mkfs

Создает файловую систему на указанном девайсе

`mkfs -t ext4 /dev/sdf2`

## mount

Синтаксис:

`mount -t type device mountpoint`

Пример:

`mount -t ext4 /dev/sdf2 /home/extra`

В конце можно указать список опций под общим флагом `-o` и через запятую:

`mount -t vfat /dev/hda1 /dos -o ro,conv=auto`

Наиболее часто используемые опции:

- **exec,noexec** - разрешить или запретить выполнение программ
- **ro** - read-only
- **rw** - read-write
- **conv=rule** (для FAT) - конвертит символы перевода строки в файлах в зависимости от указанного правила (binary/text/auto).

Чтобы примаунтить по UUID:

`mount UUID=a9011c2b-1c03-4288-b3fe-8ba961ab089 /home/extra`

Список подключенных файловых систем и их UUID можно получить командой `blkid`.

`mount -a` - примаунтит все вхождения из `/etc/fstab`, для которых не указан атрибут **noauto**.

## umount

`umount mountpoint`

## /etc/fstab

В файле `/etc/fstab` перечислены манутпойнты, автоматически подключаемые на старте системы.

Пример:

```
proc /proc proc nodev,noexec,nosuid 0 0
UUID=70ccd6e7-6ae6-44f6-812c-51aab8036d29 / ext4 errors=remount-ro 0 1
UUID=592dcfd1-58da-4769-9ea8-5f412a896980 none swap sw 0 0
/dev/sr0 /cdrom iso9660 ro,user,nosuid,noauto 0 0
```

В каждой строчке указаны: 

- девайс или его UUID
- mountpoint
- тип файловой системы
- опции, разделенные запятой
- информация о бэкапе, здесь всегда ставить 0
- порядок проверки на целостность, здесть для корневых систем ставить 1, для остальных систем на жестком диске - 2. 0 - для всего остального, чтобы отключить проверку на старте.

## fsck

Утилита для поиска и исправления ошибок в файловой системе.

`lost+found` - в эту папку fsck перемещает файлы, у которых нет имени. Все файлы в этой папке имеют числовые имена и пользователь может по содержанию предположить, какое было имя.

`fsck -p` (либо `fsck -a`) - автоматически исправляет типичные ошибки, не спрашивая пользователя, и абортится в случае обнаружения серьезных ошибок.

# Boot

Старт системы выглядит так:

1. Загружается BIOS, запускает boot loader
2. boot loader находит образ ядра на диске, загружает его в память, запускает
3. Ядро инициализирует устройства и их драйвера
4. Ядро маунтит корневую файловую систему
5. Ядро запускает программу `init` с PID=1. Здесь начинается юзер-спейс
6. `init` запускает оставшиеся системные процессы
7. В какой-то момент ближе к концу  `init` запускает процесс, позволяющий пользователю залогиниться.

На 1 этапе биосу нужно найти на диске ядро, но у него нет доступа ни к файловой системе, ни к драйверам для работы с диском, так как ядро еще не загружено. 

Для решения проблемы работы диском на все диски устанавливается прошивка, которая позволяет биосу обращаться к содержимому диска, используя **Logical Block Addressing (LBA)**. Этот способ обеспечивает универсальный доступ к диску, но при этом очень низкую производительность. Поэтому этот способ используется только бутлоадером. 

А для работы с файловой системой все бутлоадеры умеют читать таблицы партиций и имеют поддержку read-only доступа к файловым системам. То есть они могут находить и читать файлы.

## GRUB

Главная фича, отличающая GRUB от остальных бутлоадеров - возможность навигации по файловой системе.

Чтобы попасть в меню GRUB, нужно зажать SHIFT при загрузке BIOS.

Конфиги лежат в папке `/boot/grub` или `/boot/grub2`. Но их не нужно модифицировать вручную, нужно использовать утилиту `grub-mkconfig`.

Утилитой `grub-install` можно установить GRUB и его конфигурацию на любой диск или внешнее хранилище. Для установки на внешнее хранилище, нужно указать примаунченную корневую директорию этого устройства. Например, если устройство `/dev/sdc` примаунчено как `/mnt`,то делаем так:

```sh
grub-install --boot-directory=/mnt/boot /dev/sdc
``` 

## Старт юзер-спейса

1. init
2. низкоуровневые сервисы: udevd, syslogd, ...
3. настройка сети
4. средне- и высокоуровневые сервисы (cron, printing, ...)
5. Запрос авторизации, GUI и прочие высокоуровненые приложения

# Процессы, ресурсы

## Файловые дескрипторы

`lsof` - выводит список открытых файловых ресурсов, для каждого выводит путь, тип дескриптора, процесс.

Если нужно отфильтровать по директории, то, нужно например так: `lsof +d /home/y`

Можно отфильтровать по конкретному процессу: `lsof -p pid`.

## Вызовы функций

- `strace` - выводит системные вызовы, их аргументы и возвращаемые значения
- `ltrace`- то же самое, но для вызовов к разделяемым библиотекам

## Потоки

`ps m` - выводит список процессов и под каждым - список его потоков.

Если нужно увидеть ID тредов, то нужно указать кастомный формат:

```shell
ps m -o pid,tid,command
```
## Мониторинг ресурсов

`vmstat 2` - каждые 2 секунды выводит инфу по использованию CPU, RAM, IO

Колонки:

- `swpd` - Кб памяти засваплено на диск
- `si` - Кб взять в память из свапа за секунду
- `so` - Кб памяти засваплено на диск за секунду
- `buff` - Кб памяти используется для дискового буфера
- `us`, `sy`, `id`, `wa` - сколько % процессорного времени тратится на пользовательские процессы, системные, idle time и ожидание (waiting) ввода-вывода.

## Мониторинг использования I/O

Тут помогут команды `iostat` и `iotop`, но их по дефолту в убунте нет, надо отдельно устанавливать.

## Мониторинг для процесса

`pidstat -p PID 1` - вывод статистики по ресурсам процесса PID, каждую секунду.

# Шаринг файлов

Простейший способ пошарить папку:

```python
python -m SimpleHTTPServer
```

После этого на порту 8000 будет запущен веб-сервер, раздающий файлы из текущей директории.

## rsync

```sh
rsync -av src-folder/ user@host:dest-folder		# скопирует все файлы из папки ./src-folder в домашнюю папку пользователя user на машине host
rsync -av src-folder user@host:dest-folder		# здесь тоже самое, но слэша после src-folder нет, поэтому скопирована будет сама папка
```

- `-a` - означает, что будет полностью сохранена структура папок - в том числе симлинки, права доступа и прочее
- `-v` - выведет список копируемых файлов
- `-n` - не копирует файлы, но выводит их список
- `--delete` - удалить в папке-назначении файлы, которых нет в папке-источнике (по умолчанию они не удаляются)
- `--exclude=.git` - не копировать папку `.git`
- `--exclude-from=.rsyncignore` - не копировать файлы, перечисленные в `.rsyncignore`
- `-c` - сравнивать файлы по чексумме (по умолчанию сравнивает по размеру и дате модификации)
- `-b` - бэкапить файлы, которые перезапишутся в папке-назначении
- `-u` - не трогать файлы в назначении, которые свежее, чем соответствующие файлы в источнике
- `-z` - сжимать файлы перед отправкой

## NFS

```sh
 mount -t nfs server:directory mountpoint
 ```

 Для автомонтирования можно использовать `automount`, или его более новую версию `amd`, или **automount init type** в `systemd`.