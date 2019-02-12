---
title: "Docker"
path: "/blog/docker"
---
# Docker

## Запуск контейнера


```
 docker run --name mytarantool -d -p 3301:3301 -v c:/tarantool/data:/var/lib/tarantool tarantool/tarantool:1.7
```

**--name** - задает имя для контейнера

**-d** - detach, означает что контейнер будет запущен в фоне. Следует использовать для всяких бэкграундных сервисов/демонов

**-p** - проброс портов от контейнера на хост. Первое значение - порт хоста, второе - порт контейнера.

**-v** - маунт папки хоста в папку контейнера. Формат - key:value, где key - папка хоста, value - папка контейнера (можно не указывать key, тогда будет создана docker-managed volume, см. ниже). При этом если у образа уже есть такая папка с каким-то содержимым, то это содержимое будет стерто полностью. Чтобы этого избежать, можно маунтить не директории, а отдельные файлы.


`Если на windows ошибок при маунте директорий нет, а директории в образе все равно пустые, то надо в настройках докера поставить галочки у дисков в разделе Shared Drives. Если уже стоят - снять и поставить обратно`



**-v key:value:ro** - указание :ro в конце позволяет замаунтить папку как read-only. 

**\--volumes-from** - позволяет указать ранее созданный контейнер, с которым будут шариться волюмы

## Еще полезные аргументы:

**-i --interactive** - оставлять стандартный поток ввода открытым даже если не приаттачено никакого терминала

**-t --tty** - выделить виртуальный терминал для контейнера, что позволит передавать сигналы внутрь контейнера

Обычно для интерактивных программ используется сразу **-it**

**-e --env** - позволяет задать переменную окружения, например, `-e MY_ENVIRONMENT_VAR="test"`

**--restart always** - указывает, что после завершения работы контейнер нужно рестартануть. Первый раз рестартует через 1 секунду, потом через 2, 4 и так далее.

```
docker run -it <image_name> /bin/sh \- запускает контейнер и сразу в интерактивном режиме баш в нем

docker logs <container_name> \- выводит все, что вывелось в контейнере в stdout и stderr

docker create <image_name% \- то же, что и run, только запускается остановленным

docker ps \- показывает список ==запущенных== контейнеров. Если нужны все, то указать флаг **-a**
```

## Запуск команды в контейнере:

```
docker exec -it mytarantool bash
```

здесь mytarantool - имя контейнера, ```bash``` - команда

## Остановка контейнера

`docker stop mytarantool`

## Удаление контейнера

`docker rm mytarantool`

_Чтобы docker for windows имел доступ к дискам, нужно сделать диск доступным в меню Settings -> Shared Drives_

## Просмотр всех созданных контейнеров

`docker ps`

Создание своего образа: <https://docs.docker.com/engine/getstarted/step_four/#step-2-build-an-image-from-your-dockerfile>

## Запуск консоли в контейнере винды:

`docker run -it microsoft/windowsservercore cmd`

﻿## Поиск образов:

Искать образы удобнее в консоли:

`docker search rabbitmq`

Найдя нужный образ, качаем его:

`docker pull rabbitmq`


## Сохранение образа в файл:

`docker save -o myfile.tar busybox:latest`

## Загрузка образа из файла:

`docker load -i myfile.tar`

## Удаление образа с диска:

`docker rmi busybox`

## Список образов:

`docker images`

## Удаление всех образов с тэгом none:

`docker rmi $(docker images -f 'dangling=true' -q)`

## Удаление всех образов с rancher в названии:

`docker rmi $(docker images | gren 'rancher' | tr -s ' ' | cut -d ' ' -f 3)`

## Вывод инфы об контейнере:

`docker inspect <container id>`


Выдастся большой json, если нужен его определенный узел, то можно через **-f** указать узел, пример:

`docker inspect -f "{{json .HostConfig.Binds}}" bmweb` выдаст все мапы волюмов

`docker inspect -f "{{json .Mounts}}" bmweb` аналогично, но более подробно


## Построение образа из Dockerfile:

`docker build -t dia_ch3/dockerfile:latest ch3_dockerfile`

**-t** - имя полученного образа. По умолчанию будет установлен в локальный регистр с указанным именем.

последний аргумент - папка, в которой лежит Dockerfile и все сопутствующие файлы

Волюмы бывают двух типов:

**bind mount** \- обычный, где папка контейнера мапится на пользовательскую папку хоста

**docker-managed volume** \- папка контейнера маппится на папку хоста, созданную демоном докера (`/var/lib/docker/vfs/dir/<some volume ID>`)

Быстрое поднятие веб-сервера, раздающего папку с файлами с локального диска:

	docker run -d --name bmweb -v c:\userfiles:/usr/local/apache2/htdocs -p 80:80 httpd:latest**

**Volume container** - контейнер, предоставляющий волюм, чтобы остальные контейнерымогли использовать его в флаге --volumes-from. Так же позволяет избежать orphane volume, когда на волюм не осталось ссылок и его никто не удалил и он занимает место на диске.

**Data-packed volume container** - это такой контейнер, который не содержит в себе никакого приложения, но содержит контент, который при старте копируется в шаренный волюм.

**Полиформный контейнер** - такой контейнер, поведение которого определяется содержимым его волюма. Например, контейнер содержит NodeJS и запускает приложение по адресу /app/app.js, а это волюм и определяется хостом.

А вот так можно задавать разные конфиги одному и тому же приложению в образе:

	docker run --name devConfig -v /config dockerinaction/ch4_packed_config:latest /bin/sh -c 'cp /development/* /config/'

	docker run --name prodConfig -v /config dockerinaction/ch4_packed_config:latest /bin/sh -c 'cp /production/* /config/'

	docker run --name devApp --volumes-from devConfig dockerinaction/ch4_polyapp

	docker run --name prodApp --volumes-from prodConfig dockerinaction/ch4_polyapp

4 архетипа контейнеров по отношению к закрытости сети:

\- closed container

\- bridged container

\- joined container

\- open container

### Closed container**


Может общаться только с собой через loopback-интерфейс. Создается, используя `--net none` при создании контейнера

### Bridged container

Дефолтный вариант. Имеет loopback-интерфейс и приватный интерфейс, соединенный с хостом через мост. Создается, используя `--net bridge`.

```docker port <container id> ```\- показывает список всех замапленных портов.

\--hostname - задает имя хоста, видимое только изнутри этого же самого контейнера.

\--dns - задает главный DNS-сервер. Можно задать несколько таких серверов, а еще можно этот флаг задать демону dockerd и эти сервера будут по умолчанию заданы всем создаваемым контейнерам. 

\--dns-search - позволяет задать задать домен, по которому будут искаться все адреса, для которых не указан домен. Таким образом можно, например, различать тестовое и продакшн-окружение.

\--add-host - позволяет задать ip для определенного хоста (как запись в hosts в Windows)

-p/--publish - позволяет задать порт-форвардинг

-P//--publish-all - паблишит все порты, которые заданы через EXPOSE

\--expose - заэкспоузить дополнительный порт

\--icc=false - отключает inter-container communication

\--bip - позволяет задать IP-адрес контейнера и его subnet range, пример: --bip "192.168.0.128/25"

\--mtu - задает MTU, максимальный размер пакета в байтах

-b/--bridge - позволяет задать собственный интерфейс моста

### Joined container

Это несколько контейнеров, которые шарят общий сетевой стэк.

Docker в этом случае предоставляет интерфейсы, созданные специально для одного контейнера, другим контейнерам.

Для этого типа соединения первый контейнер создается как угодно, а затем к нему присоединяются остальные.

Присоединяются так: ```docker run --net container:<first container id> ...```

Полезно, когда нужно чтобы 2 контейнера могли общаться меж собой, но не могли общаться с внешним миром. Тогда создаем первый закрытым и присоединяем к нему второй.

## Open container

**\--net host** Никакой изоляции, видит все те же сетевые интерфейсы, что и хост.

## Links

Можно связать контейнеры однонаправленной связью через --link. 

Пример:

`docker run -d --name a mysql`

`docker run -d --name b --link a:db `

При этом в контейнер b будут добавлены:

\- переменные окружения для связи с a

\- запись в dns, сопоставляющая ip контейнера a с хостом db

\- если icc=false, то будут также добавлены правила в фаерволлы контейнеров для сетевого взаимодействия между ними

Сценарий использования: в контейнере b сервис ожидает, что по адресу tcp://db:3306 будет база данных. Или же он может брать порт базы из переменной окружения DB_PORT. Когда делаем --link оба этих значения будут автоматически заполнены.

Хорошей практикой считается на старте контейнера проверять, что заданы все необходимые переменные окружения/записи днс. Пример такого скрипта:

```sh
if [ -z ${DATABASE_PORT+x} ]
then
echo "Link alias 'database' was not set!"
exit
else
exec "$@"
fi 
```

Список переменных окружения, задаваемых при линке:

	docker run -d --name mydb --expose 2222 --expose 3333 --expose 4444/udp alpine:latest nc -l 0.0.0.0:2222

	docker run -it --rm --link mydb:database dockerinaction/ch5_ff env

	DATABASE_PORT=tcp://172.17.0.23:3333 - любой из полных адресов для exposed-портов

	DATABASE_PORT_3333_TCP=tcp://172.17.0.23:3333
	DATABASE_PORT_2222_TCP=tcp://172.17.0.23:2222
	DATABASE_PORT_4444_UDP=udp://172.17.0.23:4444
	DATABASE_PORT_2222_TCP_PORT=2222
	DATABASE_PORT_3333_TCP_PORT=3333
	DATABASE_PORT_4444_UDP_PORT=4444
	DATABASE_PORT_3333_TCP_ADDR=172.17.0.23
	DATABASE_PORT_2222_TCP_ADDR=172.17.0.23
	DATABASE_PORT_4444_UDP_ADDR=172.17.0.23
	DATABASE_PORT_2222_TCP_PROTO=tcp
	DATABASE_PORT_3333_TCP_PROTO=tcp

	DATABASE_PORT_4444_UDP_PROTO=udp

	DATABASE_NAME=/furious_lalande/database - имя текущего контейнера + / + имя алиаса

Проблема с линками в том, что если контейнер-зависимость перезапустится, то у него будет новый Ip и все эти переменные станут неактуальными. Решением может быть использование DNS, либо же включение nter-process communication.

## Вывод всех образов в приватном репозитории:

`curl -X GET gitlab.factory.vocord.ru:5000/v2/_catalog`

## Ограничение контейнеров**

```
-m/--memory - ограничение по памяти, пример --memory 256m

\--cpu-shares - относительное ограничение CPU. Если одному связанному контейнеру указать 512, а другому 256, то второй будет получать 1 цикл на каждые 2цикла первого.

\--cpuset-cpus - указывает контейнерам, что они должны выполняться только на определенных ядрах

\--device /dev/video0:/dev/video0 - маппит девайсы внутрь контейнера

\--ipc container:<container id> \- шарит shared memory с указанным контейнером

\--ipc host - шарить всю память с хостом
```

## Пользователи

`docker run --rm --entrypoint "" busybox:latest whoami` - вывод дефолтного пользователя внутри контейнера

**-u/--user** - указывает пользователя, под которым запустить контейнер

Пример: `docker run -u nobody:default` - устанавливает юзера nobody и группу default

## Создание образа из контейнера:**

  1. Скачиваем образ 
  2. Делаем изменения в его файловой системе `docker run --name hw_container ubuntu:latest touch /HelloWorld`
  3. Коммитим эти изменения как новый контейнер `docker commit hw_container hw_image`

Флаги commit:

-a - подписывает образ авторской строкой

-m - commit message

-c --change - позволяет дописывать строки в Dockerfile, пример: docker commit -c "CMD /notebook.sh" notebook notebook-my

Пример:

	docker commit -a "@dockerinaction" -m "Added git" image-dev ubuntu-git

`entrypoint` - Это программа, которая будет запущена при старте. Она тоже коммитится в образ.

	docker run --name cmd-git --entrypoint git ubuntu-git

Кроме этого коммитятся:

- все переменные окружения
- рабочая директория
- открытые порты
- объявления волюмов
- точка входа в контейнер
- сама команда и все ее аргументы

```docker diff <container id> ```\- выводит список изменений в файловой системе контейнера относительно образа, из которого он создан. A - added, C - changed, D - deleted.

## Union file system

В докере используется UFS, в которой файловая система представляется в виде объединения слоев. Редактируемый слой - только верхний, остальные все read-only. Новый слой сохраняется при коммите образа.

Благодаря такой системе, слои могут переиспользоваться в нескольких контейнерах, вместо того чтобы каждый раз копироваться. Однако есть и недостаток - старые слои никогда не удаляются, а значит образ может только увеличиваться в размерах и никогда не уменьшаться.

Максимальное количество слоев - **42**.

`docker history` - выводит все коммиты/слои файловой системы

`docker export --output export.tar ubuntu` - сохраняет всю файловую систему контейнера в архив на хосте

`docker import -c "ENTRYPOINT [\"/hello\"]" hello.tar dockerinaction/ch7_static` - берет .tar с файлами и создает из них образ

## Dockerfile

### Пример докерфайла:

```Dockerfile
FROM ubuntu:latest

MAINTAINER "dockerinaction@allingeek.com"

RUN apt-get update

RUN apt-get install -y git
ENTRYPOINT ["git"] 
```

### Построение:

`docker build --tag ubuntu-git:auto .` - точка на конце означает текущую директорию

Все команды, описанные в докерфайле (включая `RUN`) будут выполнены на этапе построения образа.

Первая команда всегда должна быть `FROM`. Если нужен пустой родитель, то можно указать `FROM scratch`.

Каждая инструкция в докерфайле создает новый слой в образе. Поэтому лучше эти инструкции по максимуму объединять, чтобы уменьшить размер образа. Если возникла ошибка на шаге N, то при повторной попытке шаги 1..N-1 будут взяты из кэша. Но если хочется не юзать кэш, то можно указать флаг `--no-cache`. 

Всего есть 14 инструкций Dockerfile. 

В файле `.dockerignore` можно перечислить, какие файлы не включать в образ.

### Инструкции

**ENV** \- задает переменные окружения, пример: ENV APPROOT="/app" APP="mailer.sh" VERSION="0.6" (здесь задается 3 переменных). Заданные переменные окружения можно использовать в последующих инструкциях, используя синтаксис ${NAME}

** LABEL** \- дополнительные пары ключ-значение, записываемые в метаданные образа. Пример: `LABEL base.name="Mailer Archetype" base.version="${VERSION}"`

**WORKDIR**\- задает working directory, то есть ту директорию, в которой начнется исполнение образа. Пример: `WORKDIR $APPROOT` 

**EXPOSE**\- Открывает порт. Пример: `EXPOSE 33333`

**ENTRYPOINT**\- команда, которую запускать при старте образа. Можно либо задать команду консоли (shell form), либо массив строк, в котором первая строка - путь к исполняемому файлу, а остальные - аргументы запуска (exec form). shell form при этом менее гибок, так как не позволяет задавать последний аргумент в docker run или предоставлять дополнительные аргументы в инструкции CMD. Дефолтный entrypoint - /bin/sh

**COPY** \- копирует файлы в образ. Принимает массив строк, где последний аргумент - папка назначения, а все остальные - копируемые файлы. Пример: `COPY ["./log-impl", "${APPROOT}"]` 

**VOLUME**\- создает волюм, то же самое что и --volume. Только нельзя задать bind-mount или read-only волюм. В массиве аргументов для каждого значения будет создан волюм. Пример: `VOLUME ["/var/log"]`.

**CMD**\- задает аргументы для entrypoint. Если entrypoint не задан, либо задан в shell-форме, то это может быть команда для шелла, так как будет использован дефолтный entrypoint.

**ONBUILD**\- инструкция, которая будет выполняться, если текущий образ будет использован как базовый для другого образа. Эти инструкции записываются в метаданные текущего образа. С их помощью можно, например, сбилдить программу, предоставляемую образом-потомком. ONBUILD-инструкции выполняются сразу после FROM в потомке. 

## Docker file system

Используется файловая система overlay2.

https://docs.docker.com/storage/storagedriver/overlayfs-driver/#how-the-overlay2-driver-works

Слои для каждого контейнера перечислены здесь:

`/var/lib/docker/image/overlay2/layerdb/mounts/%CONTAINER_ID%`

Там есть 3 файла:

- **init-id** - это идентификатор слоя, используемый при создании контейнера
- **mount-id** - идентификатор слоя, который был образован в процессе работы контейнера
- **parent** - какой-то идентификатор, видимо, родительского слоя

По идентификатору слоя можно получить его содержимое так:

`/var/lib/docker/overlay2/%LAYER_ID%`

## Network problems

Если во всех образах перестала работать сеть, то можно пересоздать мост:

```
pkill docker
iptables -t nat -F
ifconfig docker0 down
ip link del docker0
systemctl start docker
```

Если `ifconfig` не найден, то `apt install net-tools`

# Автоматическая очистка места на диске

По адресу `/etc/cron.daily/docker-gc` создаем скрипт следующего содержания:

```shell
#!/bin/sh -e

# Delete all stopped containers (including data-only containers).
docker ps -a -q --no-trunc --filter "status=exited" | xargs --no-run-if-empty docker rm -v

# Delete all tagged images more than a month old
docker images --no-trunc --format '{{.ID}} {{.CreatedSince}}' | grep ' months' | awk '{ print $1 }' | xargs --no-run-if-empty docker rmi -f || true

# Delete all 'untagged/dangling' (<none>) images
# Those are used for Docker caching mechanism.
docker images -q --no-trunc --filter dangling=true | xargs --no-run-if-empty docker rmi

# Delete all dangling volumes.
docker volume ls -qf dangling=true | xargs --no-run-if-empty docker volume rm
```

Даем ему права:

```shell
sudo chmod +x /etc/cron.daily/docker-gc
```

Добавляем новый джоб в `crontab`:

```shell
crontab -e
```

Открывается текстовый редактор, нужно в него добавить строчку:

```
0 0 * * * /etc/cron.daily/docker-gc
```

не забыть последнюю строчку сделать пустой (иначе кронтаб ругаться будет) и выйти с сохранением

# Файловая система докера

По умолчанию находится в папке `/var/lib/docker`

**Структура файловой системы зависит от используемого драйвера хранилища. У меня на Debian это по уомлчанию overlay2, поэтому дальнейшая информация справедлива для него. Узнать свой драйвер можно командой `docker info` в графе Storage Driver** 

[Оригинал документации](https://docs.docker.com/storage/storagedriver/#how-the-overlay2-driver-works)

В `/var/lib/docker` можем найти следующие подпапки:

- builder
- buildkit
- containerd
- containers
- image
- network
- overlay2
- plugins
- runtimes
- swarm
- tmp
- trust
- volumes

Описания образов лежат по адресу: `/var/lib/docker/image/overlay2/imagedb/content/sha256`.

Например, если мы ходим посмотреть описание образа с идентификатором `ebaee1a37cda...`, то нам нужно в текстовом редакторе открыть файл `/var/lib/docker/image/overlay2/imagedb/content/sha256/ebaee1a37cda...`. В этом текстовом файле лежит в основном та же инфа, которую мы получаем через `docker inspect ebaee1a37cda`, только иначе структурирована.

Но в этом файле мы не найден идентификаторы слоев образа для overlay2, те идентификаторы которые там указаны - они для RootFS (так и не понял, зачем нужны). Полезные идентификаторы будем брать из вывода `docker inspect ebaee1a37cda`:

```
"GraphDriver": {
    "Data": {
        "LowerDir": "/var/lib/docker/overlay2/1ef930458b9b7c4b107589bfa8708a5a905c0bff78fe82c04db1b65908ca356f/diff:/var/lib/docker/overlay2/990d47bc6c20549415caca3a6f6cfffc43b34491f128eeafffc2a8214c86ff1a/diff:/var/lib/docker/overlay2/6465e9cbb477e85f312139fd430c82649d5559190f2eed4fe32d1b2c2ca9bd9b/diff:/var/lib/docker/overlay2/7a924b04842adb199e077c02c4661955fb318d5d276c5c66b2e07628a69fc49d/diff:/var/lib/docker/overlay2/b4cf7f55f924b2167262f246ecdd8d2400adfbac69d0258049c619293228b6f0/diff",
        "MergedDir": "/var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/merged",
        "UpperDir": "/var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/diff",
        "WorkDir": "/var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/work"
    },
    "Name": "overlay2"
},
```

Верхний слой описан в поле `MergedDir`. Пройдем по этому адресу:

```shell
$ cd /var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/
$ ls
diff link lower work	
```

В файле `link` содержится сокращенный идентификатор слоя:

```shell
$ cat link
HRKAB26PG22YEF25QW3DFUSPVO
```

В `lower` - сокращенные идентификаторы нижних слоев, разделенные двоеточием:

```shell
$ cat lower
l/ZJPNNPNGB2QUT7UHS6FGJAJEXS:l/ITT6VDHHVLTL4XSV4MKXFARWZX:l/D73DFE6U73XW47KLW2IWYFN3X4:l/GPI73DKAIBG4M4HEPH22KTQBLS:l/AIQ55Z4PNLZZZTY5PWAD7EY74K
```

В папке `/var/lib/docker/overlay2/l` содержатся симлинки от сокращенных идентификаторов слоев к нормальным:

```shell
y# ls /var/lib/docker/overlay2/l/ZJPNNPNGB2QUT7UHS6FGJAJEXS -l
lrwxrwxrwx 1 root root 72 Jan 22 11:17 /var/lib/docker/overlay2/l/ZJPNNPNGB2QUT7UHS6FGJAJEXS -> ../1ef930458b9b7c4b107589bfa8708a5a905c0bff78fe82c04db1b65908ca356f/diff
```

Как видим, второй сверху слой нашего образа `ZJPNNPNGB2QUT7UHS6FGJAJEXS` соответствует слою `1ef930458b9b7c4b107589bfa8708a5a905c0bff78fe82c04db1b65908ca356f`. А его содержимое можем посмотреть в папке `diff` (посмотрим самый нижний слой нашего образа, содержащий файловую систему базового образа):

```shell
y# ls /var/lib/docker/overlay2/l/AIQ55Z4PNLZZZTY5PWAD7EY74K 
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

