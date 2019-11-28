---
title: "sh"
path: "/blog/sh"
---
# sh


## Parameter expansion

```bash
for i in 1 2 
do
	my_secret_process ${i}_tmp
done
```

Такая форма записи позволит подставить 1_tmp и 2_tmp. Если делать без скобок, то получится пустота, так как у нас нет переменной i_tmp

## Чтение переменных

```sh
FOO=bar
echo "Hello, $FOO!"   # Hello, bar! - сработает только с двойными кавычками, так как они слабые
echo 'Hello, $FOO!'   # Hello, $FOO! - не сработает, так как одинарные кавычки - строгие
```

## Специальные переменные

- `$0` - название скрипта
- `$1, $2, $3...` - первый, второй, третий аргумент
- `$#` - количество аргументов
- `$@` - все аргументы
- `$$` - текущий PID
- `$?` - exit code последней выполненной команды

## Условия

```sh
if [ "$1" = "hi" ]; then
	echo "hello"
else
	echo "bye"
fi
```

Кавычки вокруг `$1` и `hi` не обязательнц, но нужны на случай, если в `$1` будет пустота, либо слова со спец. символами.

Причем **[** здесь - это симлинк к команде  **test**:

```sh
$ type -a [
[ is a shell builtin
[ is /bin/[
```

Таким образом, `if` просто проверяет, равен ли 0 результат следующего за ним `test`.

**Проверки для файлов:**

- `-f`: есть ли такой обычный файл на диске (`if [ -f 'filename.txt' ]`)
- `-d`: есть ли такая директория
- `-e`: есть ли такой файловый дескриптор
- `-s`: true, если файл есть и не пустой
- `-h`: есть ли такой симлинк
- `-a`: логическое "и" (`if [ -f file1 -a file2 ]`)
- `-o`: логическое "или"
- `-r`: читаемый
- `-w`: редактируемый
- `-x`: выполняемый
- `-nt`: newer than (`if [ file1 -nt file2 ]`)
- `-ot`: older than

Все эти команды (кроме `-h`) поддерживают симлинки. То есть если **link** это симлинк на файл, то `[ -f link ]` вернет 0.

**Проверки для строк:**

- `-z`: true, если строка пуста
- `-n`: true, если строка не пуста

**Арифметические проверки:**

ВАЖНО: `=` проверяет на равенство только строки, **но не числа**.

Обратить условие можно, добавив **!** перед ним: `if [ ! -f 'filename.txt' ]`. Для проверки чисел на равенство, нужно использовать `-eq`.

- `-eq`: equal
- `-ne`: not equal
- `-lt`: less than
- `-gt`: greater than
- `-le`: less than or equal
- `-ge`: greater than or equal

Вслед за `if` может идти любая команда, поэтому и нужна ";" перед `then`. Если не указать точку с запятой, то `then` будет распознана как аргумент команды. Можно не писать точку с запятой, но тогда `then` должен быть на следующей строчке.

Пример другой команды:

```sh
if grep -q daemon /etc/passwd; then
   echo The daemon user is in the passwd file.
else
   echo There is a big problem. daemon is not in the passwd file.
fi
```

## switch-case

```sh
case $1 in
	bye)
		echo Fine, bye.
		;; 
	hi|hello)
		echo Nice to see you.
		;;
	what*)
		echo Whatever.
		;; 
	*)
		echo 'Huh?'
		;; 
esac
```

## Циклы

### for

```sh
for str in one two three four; do
   echo $str
done
```

```sh
FLAGS=(foo bar baz)
for f in $FLAGS; do
	echo $f
done
```

Можно фориться по списку файлов:

```sh
for file in *.gif; do
	echo $file
done
```

### while

```sh
FILE=/tmp/whiletest.$$;
echo firstline > $FILE
while tail -10 $FILE | grep -q firstline; do
	# add lines to $FILE until tail -10 $FILE no longer prints "firstline" 
	echo -n Number of lines in $FILE:' '
	wc -l $FILE | awk '{print $1}'
	echo newline >> $FILE
done

rm -f $FILE
```

### IFS

**IFS** = **i**nternal **f**ield **s**eparator. Значение этой переменной используется для представления строки в виде массива.

Пример (не сработает в **zsh**, сработает в **bash**):

```sh
words=foo,bar,baz

for word in $words
do
	echo $word
done
```

В результате будет выведено:

```sh
foo
bar
baz
```

### Подстроки

```sh
FOO=Hello!
BAR={FOO:1:3}	# взять 3 символа, начиная с 1-го. то есть получится "ell"
```

Если второе число не указано, то возьмется до конца строки:

```sh
FOO=Hello!
BAR={FOO:3}	# lo!
```

### Парсинг опций

```sh
# command.sh

while getopts 'srd:f:' c
do
  case $c in
    s) ACTION=SAVE ;;
    r) ACTION=RESTORE ;;
    d) DB_DUMP=$OPTARG ;;
    f) TARBALL=$OPTARG ;;
  esac
done
``` 

`srd:f:` - это список флагов, которые могут быть использованы. Причем если после флага стоит двоеточие, то для этого флага можно указать значение.

Скрипт из примера можно запускать с такими параметрами:

```sh
./command.sh -sr -d dump.db -f ball.TARBALL
```

### Стили и цвета

Для использования стилей текста сильно поможет такая функция:

```sh
#!/bin/bash
# ANSI color--Use these variables to make output in different colors
# and formats. Color names that end with 'f' are foreground colors,
# and those ending with 'b' are background colors.
initializeANSI()
{
 esc="\033" # If this doesn't work, enter an ESC directly.
 # Foreground colors
 blackf="${esc}[30m"; redf="${esc}[31m"; greenf="${esc}[32m"
 yellowf="${esc}[33m" bluef="${esc}[34m"; purplef="${esc}[35m"
 cyanf="${esc}[36m"; whitef="${esc}[37m"
 # Background colors
 blackb="${esc}[40m"; redb="${esc}[41m"; greenb="${esc}[42m"
 yellowb="${esc}[43m" blueb="${esc}[44m"; purpleb="${esc}[45m"
 cyanb="${esc}[46m"; whiteb="${esc}[47m"
 # Bold, italic, underline, and inverse style toggles
 boldon="${esc}[1m"; boldoff="${esc}[22m"
 italicson="${esc}[3m"; italicsoff="${esc}[23m"
 ulon="${esc}[4m"; uloff="${esc}[24m"
 invon="${esc}[7m"; invoff="${esc}[27m"
 reset="${esc}[0m"
}
```

Использовать ее можно вот так:

```sh
initializeANSI

echo ${boldon}this is in bold and ${italicson}this is \
italics${italicsoff}within the bold${reset}
```

## Утилиты

### basename

Позволяет получить имя файла без пути, или имя файла без расширения, или и то и то.

```sh
basename ~/temp/readme.md # readme.md
basename readme.md .md # readme
basename ~/temp/readme.md .md # readme
```

### awk

Вообще-то это целый язык программирования, но в большинстве случаев он используется просто чтобы распарсить колоночный вывод от других программ:

```sh
ls -l | awk '{print $5}'   # выведет 5-ю колонку, то етсь размер
```

Если нужно вывести несколько колонок:

```sh
ls -l | awk '{print $6 " " $7 " " $8}'   # выведет 5,6,7 колонку через пробел
```

### sed

**sed** принимает первым аргументом адрес и операцию, а вторым - путь к файлу. Либо можно пайплайнить в него вывод другой программы, тогда ворой аргумент не нужен:

```sh
ls -l | sed 's/июл/авг/'  # заменяет месяц в выводе с июля на август
```

sed работает построчно, и по умолчанию он будет заменять первое встретившееся значение в каждой строчке. Если нужно чтобы точно заменил все значения, то в конце надо приписывать модификатор **g**:

```sh
sed 's/foo/bar/g' tmp.txt
```

В предыдущих примерах адрес был опущен. В качестве адреса могут быть указаны, например, первая и последняя строчка, над которыми проводить операцию:

```sh
sed '1,3s/foo/bar/g' tmp.txt 	# замена произойдет в строчках 1-3
sed '2,4d' tmp.txt 				# будут удалены строчки 2-4
```

Вместо адреса может быть использовано даже регулярное выражение:

```sh
sed '/exp/d' tmp.txt	# удалит все строки, подходящие под указанный регэксп
```

### xargs

Принимает на вход аргументы и подставляет их в команду последним аргументом

```sh
ls | xargs file 	# выведет тип для каждого файла в текущей директории
```

Можно подставлять любым аргументом, но тогда нужно использовать такую конструкцию:

```sh
ls | xargs -I % file %
```

Здесь `-I %` означает, что плейсхолдер будет обозначаться знаком процента, а `%` в конце - это как раз плейсхолдер.

### grep

`grep -R def .` - рекурсивно ищет "def" во всех файлах текущей директории

`grep -E [a-z]{10}` - регулярное выражение

`grep a[[:blank:]]` - ищем все слова, кончающиеся на а

`grep -c PATTERN` - выводит не строчки, а количество вхождений паттерна в файле

### find

`find . -name "*setup*"` - рекурсивно искать все файлы с именем, содержащим **setup**, начиная с текущей директории

`find -type f -exec grep PATTERN {} \;` : **-exec** позволяет выполнить указанную после него команду для каждого найденного файла. {} - плейсхолдер для полного пути файла. \; - конец команды. 

`find / -name FILENAME -print 2>/dev/null` : поиск файла FILENAME по всей файловой системе

### tar

#### Распаковка архива

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

### Работа с пакетами

#### Поиск файлов, установленных пакетом

`dpkg -L <имя пакета>`

Пример: 

```sh
apt-get install yasm 
dpkg -L yasm
```

#### Поиск пакета, установившего файл

`dpkg -S /usr/lib/python3.4/bz2.py`

#### Поиск пакета, содержащего файл

Ищет даже по не установленным пакетам, то есть можно использовать, когда нужно узнать, какой пакет нужно установить для отсутствующего заголовка или утилиты.

`apt-file search pkg.h`

#### Установка deb-пакетов
    
```sh    
dpkg -i NAME.deb
sudo apt-get -f install
```

После первой строчки может выдать ошибки - не волноваться, вторая все исправит.

#### apt-get

Запустить симуляцию установки:
    
```sh    
apt-get install -s PACKAGE
```
    
Вывод установленной версии пакета:
    
```sh
apt-cache policy PACKAGE
```

## Работа с либами
 
### Вывод .so, которые нужны библиотеке и путей, по которым она их ищет:
     
```sh
ldd file.so
``` 

### Вывод всех папок, в которых gcc ищет хидеры:
    
```sh
LC_ALL=C gcc -v -E -xc - > /dev/null 2>&1 |
LC_ALL=C sed -ne '/starts here/,/End of/p'
```
### Вывод флагов компиляции для установленной библиотеки

```sh
pkg-config --cflags --libs LIBRARY_NAME
```

Пример использования:

```sh
gcc -Wall -o main main.cpp $(pkg-config --cflags --libs gstreamer-1.0)
```

После выполнения выражения, получим:

```sh
gcc -Wall -o main main.cpp -pthread -I/usr/include/gstreamer-1.0 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -lgstreamer-1.0 -lgobject-2.0 -lglib-2.0
```

`pkgconfig` знает только про те либы, для которых есть **pc** файл в одной из его поисковых директорий. Список таких директорий можно узнать командой:

```sh
pkg-config --variable pc_path pkg-config
```

### Поиск библиотеки на диске

```shell
ldconfig -p | grep gstreamer
```

Выведет путь к либе, если найдет такую.

## Службы

### System V

```sh
service --status-all # вывод всех служб
service <service> start/stop # старт/остановка службы
service <service> status # вывод статуса службы
```

### systemd

```sh
systemctl # вывод всех служб
systemctl --failed # вывод упавших служб
systemctl start/stop/reload/restart/status [service-name] # запуск/остановка/чтение конфига/перезапуск/вывод статуса службы
systemctl enable/disable [service-name] # включение/выключение службы
systemctl is-enabled/is-active [service-name] # проверка, запускается ли на старте системы/запущена ли сейчас служба
systemctl daemon-reload # перезапуск systemd
```

```sh
journalctl -t [service-name] # вывод логов службы
tail -f /var/log/messages # вывод логов для служб, которые не пишут в journalctl
tail -f /var/log/secure # вывод логов для привилегированных служб
tail -f /var/log/[service-name] # если служба не пишет в /var/log/messages, возможно у нее свой личный лог

## Tips & tricks

### Отладка

`sh -n <script>` -проверка на синтаксические ошибки

`sh -v <script>` - выводит все команды на экран перед выполнением

`sh -x <script>` - тоже выводит, но после подстановки всех переменных и прочей обработки

`sh -u <script>` - выводит ошибку, если используется неопределенная переменная

```sh
set -o xtrace
...
set +o xtrace
```

Такой код можно написать вокруг проблемного участка кода, чтобы только в этом коде выводить на экран команды с подстановкой переменных.

`trap ‘echo Exiting: critical variable = $critical_variable’ EXIT` - а так мы можем выводить значение интересующей нас переменной перед выходом из скрипта


### Выход из скрипта после первой провалившейся команды

Нужно вставить в начало скрипта:

```sh
set -e
```

### Перемещение в директорию, в которой лежит скрипт

```sh
cd "${0%/*}"
```

Если нужно в другую папку, относительно скрипта (например, в корень репозитория), то можно в конце добавлять относительный путь, например:

```sh
cd "${0%/*}/.."
```

https://stackoverflow.com/questions/28894290/what-does-cd-0-mean-in-bash

### here document

Используя специальный синтаксис, можно прямо в команду вставить текст, который будет сохранен в файл:

```sh
$ cat > test.txt << EOF
> hello
> this
> is
> test
> file
> EOF
```

Здесь `EOF` - это плейсхолдер, обозначающий последнюю строчку файла. Он необязательно должен быть `EOF`, может быть любой.

### Сравнение бинарных файлов

```sh
cmp -l file1.bin file2.bin | gawk '{printf "%08X %02X %02X\n", $1, strtonum(0$2), strtonum(0$3)}'
```

### Вывод кода нажатой клавиши

```shell
showkey -a
```

Выводит в том числе и коды сочетаний клавиш, например, `Ctrl+Shift+F8`

### Вывод процессов, отжирающих больше всего памяти

`ps aux --sort=-%mem | head`

### Показать, сколько осталось свободной памяти

`free -m`

В колонке available показано, сколько памяти доступно процессам

### Отправка почты

```sh
apt-get install mailutils ssmtp
nano /etc/ssmtp/smtp.conf
```

Там вписать строчки:

    root=yuriy.timofeev@vocord
    mailhub=smtp.gmail.com:465
    FromLineOverride=YES
    AuthUser=yuriy.timofeev@vocord.ru
    AuthPass=testing123
    UseTLS=YES
    

Отправка письма:
    
```sh
echo "Тело письма" | mail -s "Пришел" -a "From: Юрий Тимофеев&lt;yuriy.timofeev@vocord.ru&gt;" yuriy.timofeev@vocord.ru
```

### Вывод процесса, занимающего порт:   

```sh
lsof -i -P -n | grep :<port>;
```

### Вывод файлов, занятых процессом

```sh
lsof -p <pid>
```

### Вывод процесса, занимающего файл

```sh
lsof <path>
```

### Вывод размера директории:
    
```sh 
du -k DIRECTORY
```
    
- `-k` выводит размер в килобайтах 
- `-b`, `-m` - в байтах и мегабайтах, соответственно

### Логирование вывода в консоль и в файл

Нужно вставить в начало скрипта:

```sh
exec > >(tee script.log)
exec 2>&1
```

### Вывод информации о дистрибутиве

```sh
$ uname –srmpio
Linux 3.13.0-36-generic x86_64 x86_64 x86_64 GNU/Linux
```
Либо
```sh
$ cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=14.04
DISTRIB_CODENAME=trusty
DISTRIB_DESCRIPTION="Ubuntu 14.04.1 LTS"
```
