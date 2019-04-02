---
title: "Architecture"
path: "/blog/architecture"
---

# Паттерны мастабируемости, доступности, стабильности

https://www.slideshare.net/jboner/scalability-availability-stability-patterns/

## Трейдоффы

### Производительность vs Масштабируемость

Проблемы с **производительностью** - это когда приложение работает медленно для одного юзера.

Проблемы с **масштабируемостью** - это когда быстро работает для одного юзера, но медленно под большой нагрузкой

### Задержка vs Пропускная способность

В идеале нужно стремиться к **максимальной** пропускной способности с **приемлемыми** задержками.

### Доступность vs Консистентность

См. CAP-теорему.

В современных NoSQL-системах обычно находятся посередине между CP и AP, поэтому их относят к BASE-системам:

- Basically Available
- Soft state
- Eventually consistent

К BASE-системам относятся:

- Cassandra
- Riak
- Voldemort
- Dynomite
- SimpleDB
- и другие

На другом конце спектрума находятся ACID-системы:

- Atomicity
- Consistency
- Isolation
- Durability

К ACID-системам относятся:

- Реляционные БД (MySQL, Oracle, Postgres)
- Объектные БД (Gemstone, db4o)
- Кластеризующие продукты (Coherence, Terracotta, Hazelcast, GigaSpaces, GemStone)
- Большинство кэшей (ehcache)

# Паттерны доступности

## Failover && Failback

### Актив-пассив

Когда узел или вся система перестает отвечать, нужно выдавать какой-то статичный ответ на запросы к нему, либо же поставить на его место другой, рабочий сервер. Для этого активный сервер шлет пассивному серверу heartbeat-сообщения. Если сообщения перестали приходить, пассивный сервер берет себе IP-адрес активного и продолжает работу. 

Обычно процесс переключения не так прост:

[Failback](failback.png)

## Репликация

4 паттерна репликации:

- мастер-слейв
- мастер-мастер
- Tree Replication
- Buddy Replication

### Tree Replication

[Tree Replication](tree-replication.png)

### Buddy Replication

[Buddy Replication before](buddy-replication1.png)

[Buddy Replication after](buddy-replication2.png)

# Паттерны масштабируемости

## Паттерны состояния

### Партишнинг

### Репликация

### HTTP-кэширование

Через заголовок `Cache-Control`.

- Reverse-proxy
- CDN

### Распределенное кэширование

- Write-through: все записи в БД проходят через слой кэша
- Write-behind:  записи пишутся в кэш, а оттуда попадают в очередь, из которой отдельный сервис кладет в БД

#### Политики исключения

- TTL
- FIFO
- LIFO
- Explicit cache invalidation


### Concurrency

- Shared-State Concurrency: 
- Message-Passing Concurrency (Actors): ничего не шарится, процессы легковесные, коммуникация через асинхронные и неблокирующие сообщения, каждый актор имеет свою очередь сообщений
- Dataflow Concurrency: декларативное описание, треды блокируются, пока данные не станут доступны, ленивая обработка данных по требованию, нет разницы между параллельным и последовательным кодом. Ограничения: не может иметь сайд-эффектов.
- STM: память (куча и стэк) рассматриваются как транзакционное множество данных. При коллизии транзакции автоматически повторяются. При ошибке откатываются. Ограничения: все операции внутри транзакции должны быть **идемпотентными**.

## Паттерны поведения

- Event-Driven Architecture
- Compute Grids
- Load-balancing
- Parallel Computing

### Event-Driven Architecture

- Domain Events
- Event Sourcing
- CQRS
- Event Stream Processing
- Messaging
- ESB
- Actors
- Enterprise Integration Architecture

#### Event Sourcing

- Каждое изменение состояния представляется в виде **Event/события**
- Все события шлются в **EventProcessor**
- EventProcessor сохраняет все события в **Event Log/журнал событий**
- Система может быть перезапущена и журнал событий будет проигран заново
- ORM не нужна, просто сохраняем события
- К EventProcessor может быть добавлено много **EventListeners**

#### CQRS

Есть БД домена и БД запросов

- все изменения состояния представляются в виде **Domain Events**
- корни аггрегации/БД домена **принимают** *команды* и **паблишат** *события*
- БД запросов **апдейтится** в результате запаблишенных событий
- все запросы от слоя представления идут сразу в БД запросов, а БД домена не затрагивается

#### Event Stream Processing

Обслуживает запросы типа:

```
select * from Withdrawal(amount>=200).win:length(5)
```

В этом запросе при каждом новом событии с `amount>=200` оно будет выдано клиенту. Когда таких событий станет больше 5, то старые начнут выдаваться с пометкой OLD. Новые клиенты увидят только последние 5 таких событий.

Продукты:

- Esper
- StreamBase
- RuleCast

#### Messaging

- Pub-sub
- Point-to-Point
- Store-forward (отправитель шлет в медиатор, а он шлет получателю и еще куда-то, например в лог, или сохраняет в БД)
- Request-Reply (отправитель шлет запрос в очередь, получатель получает из очереди, формирует ответ на запрос, вовращает его в очередь, очередь возвращает его отправителю)

Стандарты:

- AMQP
- JMS

Продукты:

- RabbitMQ (AMQP)
- ActiveMQ (JMS)
- Tibco
- MQSeries
- и другие

#### ESB

Все подключены к одной большой жирной шине, через которую проходят все события.

#### Actors

- Fire-forget (async send)
- Fire-And-Receive-Eventually (async send + wait on Future for reply)

#### Compute Grids

- Divide and conquer (джобы разделяются на независимые таски, выполняются параллельно, результаты аггрегируются)
- MapReduce - Master/Worker
- Automatic provisioning
- Load balancing
- Fail-over
- Topology resolution

Продукты:

- Platform
- DataSynapse
- Google MapReduce
- Hadoop
- GigaSpaces
- GridGain

#### Load balacing

- Random allocation
- Round robin allocation
- Weighted allocation
- Dynamic load balancing
	- least connections
	- least server CPU
- DNS Round Robin
- Reverse Proxy (Apache mod_proxy, HAProxy, Squid, Nginx)
- Hardware Load Balacing (BIG-IP, Cisco)

# Паттерны стабильности

- таймауты
- разрыв сети
- Let-it-crash
- Fail fast
- Bulkheads
- Steady state
- Throttling