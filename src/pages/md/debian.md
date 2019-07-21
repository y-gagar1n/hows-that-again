---
title: "Debian"
path: "/blog/debian"
---
# Debian

## CD-ROM

После установки при манипуляциях с `apt-get` часто спрашивает cd-rom. Чтобы от этого избавиться, нужно отредактировать файл `/etc/apt/sources.list` и удалить оттуда строчку, начинающуюся с `deb cdrom`

## Тачпад

После установки не работал левый клик по нажатию на тачпад. Решение - подключить мышь, зайти в Settings -> Mouse и включить там Tap To Click

## Ctrl-Alt-T

Чтобы назначить вызов консоли по шорткату ctrl-alt-t, нужно зайти в Settings-Keyboard и создать новый шорткат для команды `gnome-terminal`

## sudo

После установки `sudo` в системе отсутствует. Нужно сделать:
    
    
    su
    apt install sudo
    

## apt-get

Если не может найти многих пакетов, то нужно отредактировать `/etc/apt/sources.list` и добавить туда источники:
    
    
    deb http://deb.debian.org/debian/ stretch-updates main non-free
    deb-src http://deb.debian.org/debian/ stretch-updates main non-free
    

## Alt-Shift

Чтобыустановить смену раскладки на Alt+Shift,нужно:

Tweak tool >> Typing >> Modifiers of input sources switch >> Alt shift.

## DNS

Прописывается в файле **/etc/resolv.conf**

Чтобы добавить туда новый DNS-server, нужно дописать:
     
    nameserver 8.8.8.8
    
## Переменные окружения и оболочки

Переменные оболочки (shell variables) работают только в шелле.

### Установка переменной оболочки

`KEY=value`

### Чтение переменной оболочки

`$KEY`

### Установка переменной окружения

Осуществляется через экспорт переменной оболочки:
    
    
    KEY=value
    export KEY
    

Можно объединить в одну строчку:

`export KEY=value`

### Снятие переменной окружения

`export -n KEY`

### Вывод всех переменных окружения

`printenv`

Установка будет работать только на текущий сеанс. Если нужно установить навсегда, то можно так:

`nano ~/.profile`

и в этом файле добавлять свои переменные в обычном формате

## Распаковка архива

`tar -xvf file.tar`

Если имеет расширение **.tar.gz** , то:

`tar -xzvf file.tar.gz`

Если **.tar.bz2** :

`tar -xjvf file.tar.bz2`

**-x** : распаковка архива

**-v** : verbose-вывод и показ прогресса

**-f** : из файла

**-j** : архив bzip2

**-z** : архив gzip

Если нужно экстрактнуть 1 файл, то:

`tar -xvf file.tar foo.txt`

## Поиск файлов, установленных пакетом

`dpkg-query -l <имя пакета>`

Пример: `apt-get install yasm dpkg-query -l yasm`

## Поиск пакета, установившего файл

`dpkg -S /usr/lib/python3.4/bz2.py`

## Алиасы

Чтобы сохранить алиас навсегда, его нужно писать в:
    
    
    sudo nano ~/.bashrc
    

## Вывод процессов, отжирающих больше всего памяти

`ps aux --sort=-%mem | head`

## Убить все процессы питона

`pkill -9 python`

## Показать, сколько осталось свободной памяти

`free -m`

В колонке available показано, сколько памяти доступно процессам

## Почта
    
    
    apt-get install mailutils ssmtp
    nano /etc/ssmtp/smtp.conf
    

Там вписать строчки:
    
    
    root=yuriy.timofeev@vocord
    mailhub=smtp.gmail.com:465
    FromLineOverride=YES
    AuthUser=yuriy.timofeev@vocord.ru
    AuthPass=testing123
    UseTLS=YES
    

Отправка письма:
    
    
    echo "Тело письма" | mail -s "Пришел" -a "From: Юрий Тимофеев&lt;yuriy.timofeev@vocord.ru&gt;" yuriy.timofeev@vocord.ru
    

## Установка deb-пакетов
    
    
    dpkg -i &lt;name&gt;.deb
    sudo apt-get -f install
    

После первой строчки может выдать ошибки - не волноваться, вторая все исправит.

## apt-get

Запустить симуляцию установки:
    
    
    apt-get install -s PACKAGE
    

Вывод установленной версии пакета:
    
    
    apt-cache policy PACKAGE
    

## gcc

Вывод всех папок, в которых gcc ищет хидеры:
    
    
    LC_ALL=C gcc -v -E -xc - &lt; /dev/null 2>&1 |
    LC_ALL=C sed -ne '/starts here/,/End of/p'
    

## find

Поиск файла по всей файловой системе: 

    find / -name FILENAME -print 2>/dev/null

## Вывод процесса, занимающего порт:   
    
    lsof -i -P -n | grep :<port>;
    

## Вывод .so, которые нужны библиотеке и путей, по которым она их ищет:
     
    ldd file.so
    

## Вывод размера директории:
    
    
    du -k DIRECTORY
    

-k выводит размер в килобайтах -b, -m - в байтах и мегабайтах, соответственно

## Установка прокси

Нужно установить две переменные окружения:
    
    
    export HTTP_PROXY=http://192.168.2.102:3128
    export HTTPS_PROXY=http://192.168.2.102:3128
    

**ВАЖНО**, чтобы схема (http://) присутсвовала в адресе, иначе, например, питоновский urlparse может тупить (было такое в geeknote)

## Вывод флагов компиляции для установленной библиотеки

```shell
pkg-config --cflags --libs LIBRARY_NAME
```

Пример использования:

```shell
gcc -Wall -o main main.cpp $(pkg-config --cflags --libs gstreamer-1.0)
```

После выполнения выражения, получим:

```shell
gcc -Wall -o main main.cpp -pthread -I/usr/include/gstreamer-1.0 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -lgstreamer-1.0 -lgobject-2.0 -lglib-2.0
```

`pkgconfig` знает только про те либы, для которых есть **pc** файл в одной из его поисковых директорий. Список таких директорий можно узнать командой:

```shell
pkg-config --variable pc_path pkg-config
```

## Поиск библиотеки на диске

```shell
ldconfig -p | grep gstreamer
```

Выведет путь к либе, если найдет такую.
