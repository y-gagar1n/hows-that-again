webpackJsonp([97711108842923],{434:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>Docker</h1>\n<h2>Запуск контейнера</h2>\n<pre><code> docker run --name mytarantool -d -p 3301:3301 -v c:/tarantool/data:/var/lib/tarantool tarantool/tarantool:1.7\n</code></pre>\n<p><strong>--name</strong> - задает имя для контейнера</p>\n<p><strong>-d</strong> - detach, означает что контейнер будет запущен в фоне. Следует использовать для всяких бэкграундных сервисов/демонов</p>\n<p><strong>-p</strong> - проброс портов от контейнера на хост. Первое значение - порт хоста, второе - порт контейнера.</p>\n<p><strong>-v</strong> - маунт папки хоста в папку контейнера. Формат - key:value, где key - папка хоста, value - папка контейнера (можно не указывать key, тогда будет создана docker-managed volume, см. ниже). При этом если у образа уже есть такая папка с каким-то содержимым, то это содержимое будет стерто полностью. Чтобы этого избежать, можно маунтить не директории, а отдельные файлы.</p>\n<p><code>Если на windows ошибок при маунте директорий нет, а директории в образе все равно пустые, то надо в настройках докера поставить галочки у дисков в разделе Shared Drives. Если уже стоят - снять и поставить обратно</code></p>\n<p><strong>-v key:value:ro</strong> - указание :ro в конце позволяет замаунтить папку как read-only. </p>\n<p><strong>--volumes-from</strong> - позволяет указать ранее созданный контейнер, с которым будут шариться волюмы</p>\n<h2>Еще полезные аргументы:</h2>\n<p><strong>-i --interactive</strong> - оставлять стандартный поток ввода открытым даже если не приаттачено никакого терминала</p>\n<p><strong>-t --tty</strong> - выделить виртуальный терминал для контейнера, что позволит передавать сигналы внутрь контейнера</p>\n<p>Обычно для интерактивных программ используется сразу <strong>-it</strong></p>\n<p><strong>-e --env</strong> - позволяет задать переменную окружения, например, <code>-e MY_ENVIRONMENT_VAR="test"</code></p>\n<p><strong>--restart always</strong> - указывает, что после завершения работы контейнер нужно рестартануть. Первый раз рестартует через 1 секунду, потом через 2, 4 и так далее.</p>\n<pre><code>docker run -it &#x3C;image_name> /bin/sh \\- запускает контейнер и сразу в интерактивном режиме баш в нем\n\ndocker logs &#x3C;container_name> \\- выводит все, что вывелось в контейнере в stdout и stderr\n\ndocker create &#x3C;image_name% \\- то же, что и run, только запускается остановленным\n\ndocker ps \\- показывает список ==запущенных== контейнеров. Если нужны все, то указать флаг **-a**\n</code></pre>\n<h2>Запуск команды в контейнере:</h2>\n<pre><code>docker exec -it mytarantool bash\n</code></pre>\n<p>здесь mytarantool - имя контейнера, <code>bash</code> - команда</p>\n<h2>Остановка контейнера</h2>\n<p><code>docker stop mytarantool</code></p>\n<h2>Удаление контейнера</h2>\n<p><code>docker rm mytarantool</code></p>\n<p><em>Чтобы docker for windows имел доступ к дискам, нужно сделать диск доступным в меню Settings -> Shared Drives</em></p>\n<h2>Просмотр всех созданных контейнеров</h2>\n<p><code>docker ps</code></p>\n<p>Создание своего образа: <a href="https://docs.docker.com/engine/getstarted/step_four/#step-2-build-an-image-from-your-dockerfile">https://docs.docker.com/engine/getstarted/step_four/#step-2-build-an-image-from-your-dockerfile</a></p>\n<h2>Запуск консоли в контейнере винды:</h2>\n<p><code>docker run -it microsoft/windowsservercore cmd</code></p>\n<p>\ufeff## Поиск образов:</p>\n<p>Искать образы удобнее в консоли:</p>\n<p><code>docker search rabbitmq</code></p>\n<p>Найдя нужный образ, качаем его:</p>\n<p><code>docker pull rabbitmq</code></p>\n<h2>Сохранение образа в файл:</h2>\n<p><code>docker save -o myfile.tar busybox:latest</code></p>\n<h2>Загрузка образа из файла:</h2>\n<p><code>docker load -i myfile.tar</code></p>\n<h2>Удаление образа с диска:</h2>\n<p><code>docker rmi busybox</code></p>\n<h2>Список образов:</h2>\n<p><code>docker images</code></p>\n<h2>Удаление всех образов с тэгом none:</h2>\n<p><code>docker rmi $(docker images -f \'dangling=true\' -q)</code></p>\n<h2>Удаление всех образов с rancher в названии:</h2>\n<p><code>docker rmi $(docker images | gren \'rancher\' | tr -s \' \' | cut -d \' \' -f 3)</code></p>\n<h2>Вывод инфы об контейнере:</h2>\n<p><code>docker inspect &#x3C;container id></code></p>\n<p>Выдастся большой json, если нужен его определенный узел, то можно через <strong>-f</strong> указать узел, пример:</p>\n<p><code>docker inspect -f "{{json .HostConfig.Binds}}" bmweb</code> выдаст все мапы волюмов</p>\n<p><code>docker inspect -f "{{json .Mounts}}" bmweb</code> аналогично, но более подробно</p>\n<h2>Построение образа из Dockerfile:</h2>\n<p><code>docker build -t dia_ch3/dockerfile:latest ch3_dockerfile</code></p>\n<p><strong>-t</strong> - имя полученного образа. По умолчанию будет установлен в локальный регистр с указанным именем.</p>\n<p>последний аргумент - папка, в которой лежит Dockerfile и все сопутствующие файлы</p>\n<p>Волюмы бывают двух типов:</p>\n<p><strong>bind mount</strong> - обычный, где папка контейнера мапится на пользовательскую папку хоста</p>\n<p><strong>docker-managed volume</strong> - папка контейнера маппится на папку хоста, созданную демоном докера (<code>/var/lib/docker/vfs/dir/&#x3C;some volume ID></code>)</p>\n<p>Быстрое поднятие веб-сервера, раздающего папку с файлами с локального диска:</p>\n<pre><code>docker run -d --name bmweb -v c:\\userfiles:/usr/local/apache2/htdocs -p 80:80 httpd:latest**\n</code></pre>\n<p><strong>Volume container</strong> - контейнер, предоставляющий волюм, чтобы остальные контейнерымогли использовать его в флаге --volumes-from. Так же позволяет избежать orphane volume, когда на волюм не осталось ссылок и его никто не удалил и он занимает место на диске.</p>\n<p><strong>Data-packed volume container</strong> - это такой контейнер, который не содержит в себе никакого приложения, но содержит контент, который при старте копируется в шаренный волюм.</p>\n<p><strong>Полиформный контейнер</strong> - такой контейнер, поведение которого определяется содержимым его волюма. Например, контейнер содержит NodeJS и запускает приложение по адресу /app/app.js, а это волюм и определяется хостом.</p>\n<p>А вот так можно задавать разные конфиги одному и тому же приложению в образе:</p>\n<pre><code>docker run --name devConfig -v /config dockerinaction/ch4_packed_config:latest /bin/sh -c \'cp /development/* /config/\'\n\ndocker run --name prodConfig -v /config dockerinaction/ch4_packed_config:latest /bin/sh -c \'cp /production/* /config/\'\n\ndocker run --name devApp --volumes-from devConfig dockerinaction/ch4_polyapp\n\ndocker run --name prodApp --volumes-from prodConfig dockerinaction/ch4_polyapp\n</code></pre>\n<p>4 архетипа контейнеров по отношению к закрытости сети:</p>\n<p>- closed container</p>\n<p>- bridged container</p>\n<p>- joined container</p>\n<p>- open container</p>\n<h3>Closed container**</h3>\n<p>Может общаться только с собой через loopback-интерфейс. Создается, используя <code>--net none</code> при создании контейнера</p>\n<h3>Bridged container</h3>\n<p>Дефолтный вариант. Имеет loopback-интерфейс и приватный интерфейс, соединенный с хостом через мост. Создается, используя <code>--net bridge</code>.</p>\n<p><code>docker port &#x3C;container id></code>- показывает список всех замапленных портов.</p>\n<p>--hostname - задает имя хоста, видимое только изнутри этого же самого контейнера.</p>\n<p>--dns - задает главный DNS-сервер. Можно задать несколько таких серверов, а еще можно этот флаг задать демону dockerd и эти сервера будут по умолчанию заданы всем создаваемым контейнерам. </p>\n<p>--dns-search - позволяет задать задать домен, по которому будут искаться все адреса, для которых не указан домен. Таким образом можно, например, различать тестовое и продакшн-окружение.</p>\n<p>--add-host - позволяет задать ip для определенного хоста (как запись в hosts в Windows)</p>\n<p>-p/--publish - позволяет задать порт-форвардинг</p>\n<p>-P//--publish-all - паблишит все порты, которые заданы через EXPOSE</p>\n<p>--expose - заэкспоузить дополнительный порт</p>\n<p>--icc=false - отключает inter-container communication</p>\n<p>--bip - позволяет задать IP-адрес контейнера и его subnet range, пример: --bip "192.168.0.128/25"</p>\n<p>--mtu - задает MTU, максимальный размер пакета в байтах</p>\n<p>-b/--bridge - позволяет задать собственный интерфейс моста</p>\n<h3>Joined container</h3>\n<p>Это несколько контейнеров, которые шарят общий сетевой стэк.</p>\n<p>Docker в этом случае предоставляет интерфейсы, созданные специально для одного контейнера, другим контейнерам.</p>\n<p>Для этого типа соединения первый контейнер создается как угодно, а затем к нему присоединяются остальные.</p>\n<p>Присоединяются так: <code>docker run --net container:&#x3C;first container id> ...</code></p>\n<p>Полезно, когда нужно чтобы 2 контейнера могли общаться меж собой, но не могли общаться с внешним миром. Тогда создаем первый закрытым и присоединяем к нему второй.</p>\n<h2>Open container</h2>\n<p><strong>--net host</strong> Никакой изоляции, видит все те же сетевые интерфейсы, что и хост.</p>\n<h2>Links</h2>\n<p>Можно связать контейнеры однонаправленной связью через --link. </p>\n<p>Пример:</p>\n<p><code>docker run -d --name a mysql</code></p>\n<p><code>docker run -d --name b --link a:db</code></p>\n<p>При этом в контейнер b будут добавлены:</p>\n<p>- переменные окружения для связи с a</p>\n<p>- запись в dns, сопоставляющая ip контейнера a с хостом db</p>\n<p>- если icc=false, то будут также добавлены правила в фаерволлы контейнеров для сетевого взаимодействия между ними</p>\n<p>Сценарий использования: в контейнере b сервис ожидает, что по адресу tcp://db:3306 будет база данных. Или же он может брать порт базы из переменной окружения DB_PORT. Когда делаем --link оба этих значения будут автоматически заполнены.</p>\n<p>Хорошей практикой считается на старте контейнера проверять, что заданы все необходимые переменные окружения/записи днс. Пример такого скрипта:</p>\n<pre><code class="language-sh">if [ -z ${DATABASE_PORT+x} ]\nthen\necho "Link alias \'database\' was not set!"\nexit\nelse\nexec "$@"\nfi \n</code></pre>\n<p>Список переменных окружения, задаваемых при линке:</p>\n<pre><code>docker run -d --name mydb --expose 2222 --expose 3333 --expose 4444/udp alpine:latest nc -l 0.0.0.0:2222\n\ndocker run -it --rm --link mydb:database dockerinaction/ch5_ff env\n\nDATABASE_PORT=tcp://172.17.0.23:3333 - любой из полных адресов для exposed-портов\n\nDATABASE_PORT_3333_TCP=tcp://172.17.0.23:3333\nDATABASE_PORT_2222_TCP=tcp://172.17.0.23:2222\nDATABASE_PORT_4444_UDP=udp://172.17.0.23:4444\nDATABASE_PORT_2222_TCP_PORT=2222\nDATABASE_PORT_3333_TCP_PORT=3333\nDATABASE_PORT_4444_UDP_PORT=4444\nDATABASE_PORT_3333_TCP_ADDR=172.17.0.23\nDATABASE_PORT_2222_TCP_ADDR=172.17.0.23\nDATABASE_PORT_4444_UDP_ADDR=172.17.0.23\nDATABASE_PORT_2222_TCP_PROTO=tcp\nDATABASE_PORT_3333_TCP_PROTO=tcp\n\nDATABASE_PORT_4444_UDP_PROTO=udp\n\nDATABASE_NAME=/furious_lalande/database - имя текущего контейнера + / + имя алиаса\n</code></pre>\n<p>Проблема с линками в том, что если контейнер-зависимость перезапустится, то у него будет новый Ip и все эти переменные станут неактуальными. Решением может быть использование DNS, либо же включение nter-process communication.</p>\n<h2>Вывод всех образов в приватном репозитории:</h2>\n<p><code>curl -X GET gitlab.factory.vocord.ru:5000/v2/_catalog</code></p>\n<h2>Ограничение контейнеров**</h2>\n<pre><code>-m/--memory - ограничение по памяти, пример --memory 256m\n\n\\--cpu-shares - относительное ограничение CPU. Если одному связанному контейнеру указать 512, а другому 256, то второй будет получать 1 цикл на каждые 2цикла первого.\n\n\\--cpuset-cpus - указывает контейнерам, что они должны выполняться только на определенных ядрах\n\n\\--device /dev/video0:/dev/video0 - маппит девайсы внутрь контейнера\n\n\\--ipc container:&#x3C;container id> \\- шарит shared memory с указанным контейнером\n\n\\--ipc host - шарить всю память с хостом\n</code></pre>\n<h2>Пользователи</h2>\n<p><code>docker run --rm --entrypoint "" busybox:latest whoami</code> - вывод дефолтного пользователя внутри контейнера</p>\n<p><strong>-u/--user</strong> - указывает пользователя, под которым запустить контейнер</p>\n<p>Пример: <code>docker run -u nobody:default</code> - устанавливает юзера nobody и группу default</p>\n<h2>Создание образа из контейнера:**</h2>\n<ol>\n<li>Скачиваем образ </li>\n<li>Делаем изменения в его файловой системе <code>docker run --name hw_container ubuntu:latest touch /HelloWorld</code></li>\n<li>Коммитим эти изменения как новый контейнер <code>docker commit hw_container hw_image</code></li>\n</ol>\n<p>Флаги commit:</p>\n<p>-a - подписывает образ авторской строкой</p>\n<p>-m - commit message</p>\n<p>-c --change - позволяет дописывать строки в Dockerfile, пример: docker commit -c "CMD /notebook.sh" notebook notebook-my</p>\n<p>Пример:</p>\n<pre><code>docker commit -a "@dockerinaction" -m "Added git" image-dev ubuntu-git\n</code></pre>\n<p><code>entrypoint</code> - Это программа, которая будет запущена при старте. Она тоже коммитится в образ.</p>\n<pre><code>docker run --name cmd-git --entrypoint git ubuntu-git\n</code></pre>\n<p>Кроме этого коммитятся:</p>\n<ul>\n<li>все переменные окружения</li>\n<li>рабочая директория</li>\n<li>открытые порты</li>\n<li>объявления волюмов</li>\n<li>точка входа в контейнер</li>\n<li>сама команда и все ее аргументы</li>\n</ul>\n<p><code>docker diff &#x3C;container id></code>- выводит список изменений в файловой системе контейнера относительно образа, из которого он создан. A - added, C - changed, D - deleted.</p>\n<h2>Union file system</h2>\n<p>В докере используется UFS, в которой файловая система представляется в виде объединения слоев. Редактируемый слой - только верхний, остальные все read-only. Новый слой сохраняется при коммите образа.</p>\n<p>Благодаря такой системе, слои могут переиспользоваться в нескольких контейнерах, вместо того чтобы каждый раз копироваться. Однако есть и недостаток - старые слои никогда не удаляются, а значит образ может только увеличиваться в размерах и никогда не уменьшаться.</p>\n<p>Максимальное количество слоев - <strong>42</strong>.</p>\n<p><code>docker history</code> - выводит все коммиты/слои файловой системы</p>\n<p><code>docker export --output export.tar ubuntu</code> - сохраняет всю файловую систему контейнера в архив на хосте</p>\n<p><code>docker import -c "ENTRYPOINT [\\"/hello\\"]" hello.tar dockerinaction/ch7_static</code> - берет .tar с файлами и создает из них образ</p>\n<h2>Dockerfile</h2>\n<h3>Пример докерфайла:</h3>\n<pre><code class="language-Dockerfile">FROM ubuntu:latest\n\nMAINTAINER "dockerinaction@allingeek.com"\n\nRUN apt-get update\n\nRUN apt-get install -y git\nENTRYPOINT ["git"] \n</code></pre>\n<h3>Построение:</h3>\n<p><code>docker build --tag ubuntu-git:auto .</code> - точка на конце означает текущую директорию</p>\n<p>Все команды, описанные в докерфайле (включая <code>RUN</code>) будут выполнены на этапе построения образа.</p>\n<p>Первая команда всегда должна быть <code>FROM</code>. Если нужен пустой родитель, то можно указать <code>FROM scratch</code>.</p>\n<p>Каждая инструкция в докерфайле создает новый слой в образе. Поэтому лучше эти инструкции по максимуму объединять, чтобы уменьшить размер образа. Если возникла ошибка на шаге N, то при повторной попытке шаги 1..N-1 будут взяты из кэша. Но если хочется не юзать кэш, то можно указать флаг <code>--no-cache</code>. </p>\n<p>Всего есть 14 инструкций Dockerfile. </p>\n<p>В файле <code>.dockerignore</code> можно перечислить, какие файлы не включать в образ.</p>\n<h3>Инструкции</h3>\n<p><strong>ENV</strong> - задает переменные окружения, пример: ENV APPROOT="/app" APP="mailer.sh" VERSION="0.6" (здесь задается 3 переменных). Заданные переменные окружения можно использовать в последующих инструкциях, используя синтаксис ${NAME}</p>\n<p>** LABEL** - дополнительные пары ключ-значение, записываемые в метаданные образа. Пример: <code>LABEL base.name="Mailer Archetype" base.version="${VERSION}"</code></p>\n<p><strong>WORKDIR</strong>- задает working directory, то есть ту директорию, в которой начнется исполнение образа. Пример: <code>WORKDIR $APPROOT</code> </p>\n<p><strong>EXPOSE</strong>- Открывает порт. Пример: <code>EXPOSE 33333</code></p>\n<p><strong>ENTRYPOINT</strong>- команда, которую запускать при старте образа. Можно либо задать команду консоли (shell form), либо массив строк, в котором первая строка - путь к исполняемому файлу, а остальные - аргументы запуска (exec form). shell form при этом менее гибок, так как не позволяет задавать последний аргумент в docker run или предоставлять дополнительные аргументы в инструкции CMD. Дефолтный entrypoint - /bin/sh</p>\n<p><strong>COPY</strong> - копирует файлы в образ. Принимает массив строк, где последний аргумент - папка назначения, а все остальные - копируемые файлы. Пример: <code>COPY ["./log-impl", "${APPROOT}"]</code> </p>\n<p><strong>VOLUME</strong>- создает волюм, то же самое что и --volume. Только нельзя задать bind-mount или read-only волюм. В массиве аргументов для каждого значения будет создан волюм. Пример: <code>VOLUME ["/var/log"]</code>.</p>\n<p><strong>CMD</strong>- задает аргументы для entrypoint. Если entrypoint не задан, либо задан в shell-форме, то это может быть команда для шелла, так как будет использован дефолтный entrypoint.</p>\n<p><strong>ONBUILD</strong>- инструкция, которая будет выполняться, если текущий образ будет использован как базовый для другого образа. Эти инструкции записываются в метаданные текущего образа. С их помощью можно, например, сбилдить программу, предоставляемую образом-потомком. ONBUILD-инструкции выполняются сразу после FROM в потомке. </p>\n<h2>Docker file system</h2>\n<p>Используется файловая система overlay2.</p>\n<p><a href="https://docs.docker.com/storage/storagedriver/overlayfs-driver/#how-the-overlay2-driver-works">https://docs.docker.com/storage/storagedriver/overlayfs-driver/#how-the-overlay2-driver-works</a></p>\n<p>Слои для каждого контейнера перечислены здесь:</p>\n<p><code>/var/lib/docker/image/overlay2/layerdb/mounts/%CONTAINER_ID%</code></p>\n<p>Там есть 3 файла:</p>\n<ul>\n<li><strong>init-id</strong> - это идентификатор слоя, используемый при создании контейнера</li>\n<li><strong>mount-id</strong> - идентификатор слоя, который был образован в процессе работы контейнера</li>\n<li><strong>parent</strong> - какой-то идентификатор, видимо, родительского слоя</li>\n</ul>\n<p>По идентификатору слоя можно получить его содержимое так:</p>\n<p><code>/var/lib/docker/overlay2/%LAYER_ID%</code></p>\n<h2>Network problems</h2>\n<p>Если во всех образах перестала работать сеть, то можно пересоздать мост:</p>\n<pre><code>pkill docker\niptables -t nat -F\nifconfig docker0 down\nip link del docker0\nsystemctl start docker\n</code></pre>\n<p>Если <code>ifconfig</code> не найден, то <code>apt install net-tools</code></p>\n<h1>Автоматическая очистка места на диске</h1>\n<p>По адресу <code>/etc/cron.daily/docker-gc</code> создаем скрипт следующего содержания:</p>\n<pre><code class="language-shell">#!/bin/sh -e\n\n# Delete all stopped containers (including data-only containers).\ndocker ps -a -q --no-trunc --filter "status=exited" | xargs --no-run-if-empty docker rm -v\n\n# Delete all tagged images more than a month old\ndocker images --no-trunc --format \'{{.ID}} {{.CreatedSince}}\' | grep \' months\' | awk \'{ print $1 }\' | xargs --no-run-if-empty docker rmi -f || true\n\n# Delete all \'untagged/dangling\' (&#x3C;none>) images\n# Those are used for Docker caching mechanism.\ndocker images -q --no-trunc --filter dangling=true | xargs --no-run-if-empty docker rmi\n\n# Delete all dangling volumes.\ndocker volume ls -qf dangling=true | xargs --no-run-if-empty docker volume rm\n</code></pre>\n<p>Даем ему права:</p>\n<pre><code class="language-shell">sudo chmod +x /etc/cron.daily/docker-gc\n</code></pre>\n<p>Добавляем новый джоб в <code>crontab</code>:</p>\n<pre><code class="language-shell">crontab -e\n</code></pre>\n<p>Открывается текстовый редактор, нужно в него добавить строчку:</p>\n<pre><code>0 0 * * * /etc/cron.daily/docker-gc\n</code></pre>\n<p>не забыть последнюю строчку сделать пустой (иначе кронтаб ругаться будет) и выйти с сохранением</p>\n<h1>Файловая система докера</h1>\n<p>По умолчанию находится в папке <code>/var/lib/docker</code></p>\n<p><strong>Структура файловой системы зависит от используемого драйвера хранилища. У меня на Debian это по уомлчанию overlay2, поэтому дальнейшая информация справедлива для него. Узнать свой драйвер можно командой <code>docker info</code> в графе Storage Driver</strong> </p>\n<p><a href="https://docs.docker.com/storage/storagedriver/#how-the-overlay2-driver-works">Оригинал документации</a></p>\n<p>В <code>/var/lib/docker</code> можем найти следующие подпапки:</p>\n<ul>\n<li>builder</li>\n<li>buildkit</li>\n<li>containerd</li>\n<li>containers</li>\n<li>image</li>\n<li>network</li>\n<li>overlay2</li>\n<li>plugins</li>\n<li>runtimes</li>\n<li>swarm</li>\n<li>tmp</li>\n<li>trust</li>\n<li>volumes</li>\n</ul>\n<p>Описания образов лежат по адресу: <code>/var/lib/docker/image/overlay2/imagedb/content/sha256</code>.</p>\n<p>Например, если мы ходим посмотреть описание образа с идентификатором <code>ebaee1a37cda...</code>, то нам нужно в текстовом редакторе открыть файл <code>/var/lib/docker/image/overlay2/imagedb/content/sha256/ebaee1a37cda...</code>. В этом текстовом файле лежит в основном та же инфа, которую мы получаем через <code>docker inspect ebaee1a37cda</code>, только иначе структурирована.</p>\n<p>Но в этом файле мы не найден идентификаторы слоев образа для overlay2, те идентификаторы которые там указаны - они для RootFS (так и не понял, зачем нужны). Полезные идентификаторы будем брать из вывода <code>docker inspect ebaee1a37cda</code>:</p>\n<pre><code>"GraphDriver": {\n    "Data": {\n        "LowerDir": "/var/lib/docker/overlay2/1ef930458b9b7c4b107589bfa8708a5a905c0bff78fe82c04db1b65908ca356f/diff:/var/lib/docker/overlay2/990d47bc6c20549415caca3a6f6cfffc43b34491f128eeafffc2a8214c86ff1a/diff:/var/lib/docker/overlay2/6465e9cbb477e85f312139fd430c82649d5559190f2eed4fe32d1b2c2ca9bd9b/diff:/var/lib/docker/overlay2/7a924b04842adb199e077c02c4661955fb318d5d276c5c66b2e07628a69fc49d/diff:/var/lib/docker/overlay2/b4cf7f55f924b2167262f246ecdd8d2400adfbac69d0258049c619293228b6f0/diff",\n        "MergedDir": "/var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/merged",\n        "UpperDir": "/var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/diff",\n        "WorkDir": "/var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/work"\n    },\n    "Name": "overlay2"\n},\n</code></pre>\n<p>Верхний слой описан в поле <code>MergedDir</code>. Пройдем по этому адресу:</p>\n<pre><code class="language-shell">$ cd /var/lib/docker/overlay2/cf7ef417035f8dcbaabecdb4897a94ef1ad00b0919ddf4f7af0b1150b9c7bd8f/\n$ ls\ndiff link lower work    \n</code></pre>\n<p>В файле <code>link</code> содержится сокращенный идентификатор слоя:</p>\n<pre><code class="language-shell">$ cat link\nHRKAB26PG22YEF25QW3DFUSPVO\n</code></pre>\n<p>В <code>lower</code> - сокращенные идентификаторы нижних слоев, разделенные двоеточием:</p>\n<pre><code class="language-shell">$ cat lower\nl/ZJPNNPNGB2QUT7UHS6FGJAJEXS:l/ITT6VDHHVLTL4XSV4MKXFARWZX:l/D73DFE6U73XW47KLW2IWYFN3X4:l/GPI73DKAIBG4M4HEPH22KTQBLS:l/AIQ55Z4PNLZZZTY5PWAD7EY74K\n</code></pre>\n<p>В папке <code>/var/lib/docker/overlay2/l</code> содержатся симлинки от сокращенных идентификаторов слоев к нормальным:</p>\n<pre><code class="language-shell">y# ls /var/lib/docker/overlay2/l/ZJPNNPNGB2QUT7UHS6FGJAJEXS -l\nlrwxrwxrwx 1 root root 72 Jan 22 11:17 /var/lib/docker/overlay2/l/ZJPNNPNGB2QUT7UHS6FGJAJEXS -> ../1ef930458b9b7c4b107589bfa8708a5a905c0bff78fe82c04db1b65908ca356f/diff\n</code></pre>\n<p>Как видим, второй сверху слой нашего образа <code>ZJPNNPNGB2QUT7UHS6FGJAJEXS</code> соответствует слою <code>1ef930458b9b7c4b107589bfa8708a5a905c0bff78fe82c04db1b65908ca356f</code>. А его содержимое можем посмотреть в папке <code>diff</code> (посмотрим самый нижний слой нашего образа, содержащий файловую систему базового образа):</p>\n<pre><code class="language-shell">y# ls /var/lib/docker/overlay2/l/AIQ55Z4PNLZZZTY5PWAD7EY74K \nbin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var\n</code></pre>',frontmatter:{path:"/blog/docker",title:"Docker"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-docker-9d4ff6fc5df7945b590e.js.map