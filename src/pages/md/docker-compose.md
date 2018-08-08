---
title: "Docker Compose"
path: "/blog/docker-compose"
---
# Docker Compose

https://docs.docker.com/compose/gettingstarted/

https://docs.docker.com/compose/compose-file/

Позволяет управлять приложениями, которые используют функциональность нескольких контайнеров сразу.

## Создаем YAML-файл

**C:/tutorial/docker-compose.yml** 

```
version: '2'

services:
tarantool:
container_name: mytarantool
image: tarantool/tarantool:1.7
command: tarantool /usr/local/share/tarantool/app.init.lua
ports:
  - 3301:3301
volumes:
  - c:/tarantool/app:/usr/local/share/tarantool
  - c:/tarantool/data:/var/lib/tarantool
```

Если не указан ``container_name``, то будет использоваться одноименный с сервисом, т.е. в этом случае - tarantool.

Если в сервисе указать `build: .` - это означает искать Dockerfile в той же директории, что и compose-файл. Тогда он попытается сбилдится. (При установке kafka было такое, что из-за windows почему-то не мог сбилдиться докерфайл, пришлось заменить build на Image и использовать готовый)

**ports** - маппинг портов. Первый идет порт хоста, второй - порт контейнера.

**volumes** - маунт директорий хоста на директории контейнера. Сначала директория хоста, потом - контейнера.

**environment** - переменные среды

## Создание и запуск контейнера

`docker-compose -f C:/tutorial/docker-compose.yml up -d`

При этом будут остановлены входящие контейнеры, а потом созданы и запущены заново.

**-f** - путь к compose-файлу 

**up** - команда "создать и стартовать контейнер"

**-d** - аналогично detach в docker, стартовать в фоне

После этого желательно проверить запущенные контейнеры: `docker-compose ps`

Если какой-то из контейнеров не запустился, то можно попробовать поднять еще раз, но без -d, и искать ошибки в логах: `docker-compose up`

Можно поднять только некоторые сервисы: `docker-compose up service1`

При этом зависимости будут подняты автоматически.

Чтобы зависимости не останавливались, не перестраивались и не поднимались, можно указать флаг **--no-dep**

## Остановка и удаление

`docker-compose -f C:/tarantool/docker-compose.yml down`

Чтобы удалить все волюмы, созданные этим компоузом на диске хоста, нужно указать флаг `--v`:

`docker-compose down --v`

## Логи

`docker-compose logs service1 service2` - выдаст аггрегированный лог с этих двух сервисов

## Построение образов

`docker-compose build`

## Скачивание образов

`docker-compose pull`

## Масштабирование

`docker-compose up --scale service1=5` - запустит 4 дополнительных контейнера

## Рестарт контейнера

`docker-compose -f C:/tarantool/docker-compose.yml restart`

## Остановка сервиса

`docker-compose stop kafka` - остановятся все контейнеры, принадлежащие службе kafka

То есть если мы запускали с параметром `--scale kafka=5`, то остановятся все 5.

Если нужно остановить какой-то один, то можем сделать `docker stop <id контейнера>`, а **id** посмотреть через `docker ps`

А вот как завести какой-то один - не понятно, можно конечно через `docker run`, но если в **docker-compose.yml** прописаны какие-то специальные параметры запуска, и мы их не укажем, то может и не стартануть. 

Поэтому на данный момент известен только один выход: `docker start kafka` - все остановленные контейнеры службы **kafka** перезапустятся.

## Пример compose-файла для Kafka с 3 брокерами

```
version: '2' 
services: 
	zookeeper: 
		image: wurstmeister/zookeeper 
		ports: 
			- "2181:2181" 
	kafka0: 
		image: wurstmeister/kafka 
		ports: 
			- "9092:9092"
		environment: 
			KAFKA_ADVERTISED_HOST_NAME: 192.168.1.65
			KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
		volumes:
			- /var/run/docker.sock:/var/run/docker.sock
	kafka1: 
		image: wurstmeister/kafka 
		ports: 
			- "9093:9092"
		environment: 
			KAFKA_ADVERTISED_HOST_NAME: 192.168.1.65
			KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
		volumes:
			- /var/run/docker.sock:/var/run/docker.sock
	kafka2: 
		image: wurstmeister/kafka 
		ports: 
			- "9094:9092"
		environment: 
			KAFKA_ADVERTISED_HOST_NAME: 192.168.1.65
			KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
		volumes:
			- /var/run/docker.sock:/var/run/docker.sock
```