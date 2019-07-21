webpackJsonp([69801897094251],{416:function(n,i){n.exports={data:{markdownRemark:{html:'<h1>Паттерны мастабируемости, доступности, стабильности</h1>\n<p><a href="https://www.slideshare.net/jboner/scalability-availability-stability-patterns/">https://www.slideshare.net/jboner/scalability-availability-stability-patterns/</a></p>\n<h2>Трейдоффы</h2>\n<h3>Производительность vs Масштабируемость</h3>\n<p>Проблемы с <strong>производительностью</strong> - это когда приложение работает медленно для одного юзера.</p>\n<p>Проблемы с <strong>масштабируемостью</strong> - это когда быстро работает для одного юзера, но медленно под большой нагрузкой</p>\n<h3>Задержка vs Пропускная способность</h3>\n<p>В идеале нужно стремиться к <strong>максимальной</strong> пропускной способности с <strong>приемлемыми</strong> задержками.</p>\n<h3>Доступность vs Консистентность</h3>\n<p>См. CAP-теорему.</p>\n<p>В современных NoSQL-системах обычно находятся посередине между CP и AP, поэтому их относят к BASE-системам:</p>\n<ul>\n<li>Basically Available</li>\n<li>Soft state</li>\n<li>Eventually consistent</li>\n</ul>\n<p>К BASE-системам относятся:</p>\n<ul>\n<li>Cassandra</li>\n<li>Riak</li>\n<li>Voldemort</li>\n<li>Dynomite</li>\n<li>SimpleDB</li>\n<li>и другие</li>\n</ul>\n<p>На другом конце спектрума находятся ACID-системы:</p>\n<ul>\n<li>Atomicity</li>\n<li>Consistency</li>\n<li>Isolation</li>\n<li>Durability</li>\n</ul>\n<p>К ACID-системам относятся:</p>\n<ul>\n<li>Реляционные БД (MySQL, Oracle, Postgres)</li>\n<li>Объектные БД (Gemstone, db4o)</li>\n<li>Кластеризующие продукты (Coherence, Terracotta, Hazelcast, GigaSpaces, GemStone)</li>\n<li>Большинство кэшей (ehcache)</li>\n</ul>\n<h1>Паттерны доступности</h1>\n<h2>Failover &#x26;&#x26; Failback</h2>\n<h3>Актив-пассив</h3>\n<p>Когда узел или вся система перестает отвечать, нужно выдавать какой-то статичный ответ на запросы к нему, либо же поставить на его место другой, рабочий сервер. Для этого активный сервер шлет пассивному серверу heartbeat-сообщения. Если сообщения перестали приходить, пассивный сервер берет себе IP-адрес активного и продолжает работу. </p>\n<p>Обычно процесс переключения не так прост:</p>\n<p><a href="failback.png">Failback</a></p>\n<h2>Репликация</h2>\n<p>4 паттерна репликации:</p>\n<ul>\n<li>мастер-слейв</li>\n<li>мастер-мастер</li>\n<li>Tree Replication</li>\n<li>Buddy Replication</li>\n</ul>\n<h3>Tree Replication</h3>\n<p><a href="tree-replication.png">Tree Replication</a></p>\n<h3>Buddy Replication</h3>\n<p><a href="buddy-replication1.png">Buddy Replication before</a></p>\n<p><a href="buddy-replication2.png">Buddy Replication after</a></p>\n<h1>Паттерны масштабируемости</h1>\n<h2>Паттерны состояния</h2>\n<h3>Партишнинг</h3>\n<h3>Репликация</h3>\n<h3>HTTP-кэширование</h3>\n<p>Через заголовок <code>Cache-Control</code>.</p>\n<ul>\n<li>Reverse-proxy</li>\n<li>CDN</li>\n</ul>\n<h3>Распределенное кэширование</h3>\n<ul>\n<li>Write-through: все записи в БД проходят через слой кэша</li>\n<li>Write-behind:  записи пишутся в кэш, а оттуда попадают в очередь, из которой отдельный сервис кладет в БД</li>\n</ul>\n<h4>Политики исключения</h4>\n<ul>\n<li>TTL</li>\n<li>FIFO</li>\n<li>LIFO</li>\n<li>Explicit cache invalidation</li>\n</ul>\n<h3>Concurrency</h3>\n<ul>\n<li>Shared-State Concurrency: </li>\n<li>Message-Passing Concurrency (Actors): ничего не шарится, процессы легковесные, коммуникация через асинхронные и неблокирующие сообщения, каждый актор имеет свою очередь сообщений</li>\n<li>Dataflow Concurrency: декларативное описание, треды блокируются, пока данные не станут доступны, ленивая обработка данных по требованию, нет разницы между параллельным и последовательным кодом. Ограничения: не может иметь сайд-эффектов.</li>\n<li>STM: память (куча и стэк) рассматриваются как транзакционное множество данных. При коллизии транзакции автоматически повторяются. При ошибке откатываются. Ограничения: все операции внутри транзакции должны быть <strong>идемпотентными</strong>.</li>\n</ul>\n<h2>Паттерны поведения</h2>\n<ul>\n<li>Event-Driven Architecture</li>\n<li>Compute Grids</li>\n<li>Load-balancing</li>\n<li>Parallel Computing</li>\n</ul>\n<h3>Event-Driven Architecture</h3>\n<ul>\n<li>Domain Events</li>\n<li>Event Sourcing</li>\n<li>CQRS</li>\n<li>Event Stream Processing</li>\n<li>Messaging</li>\n<li>ESB</li>\n<li>Actors</li>\n<li>Enterprise Integration Architecture</li>\n</ul>\n<h4>Event Sourcing</h4>\n<ul>\n<li>Каждое изменение состояния представляется в виде <strong>Event/события</strong></li>\n<li>Все события шлются в <strong>EventProcessor</strong></li>\n<li>EventProcessor сохраняет все события в <strong>Event Log/журнал событий</strong></li>\n<li>Система может быть перезапущена и журнал событий будет проигран заново</li>\n<li>ORM не нужна, просто сохраняем события</li>\n<li>К EventProcessor может быть добавлено много <strong>EventListeners</strong></li>\n</ul>\n<h4>CQRS</h4>\n<p>Есть БД домена и БД запросов</p>\n<ul>\n<li>все изменения состояния представляются в виде <strong>Domain Events</strong></li>\n<li>корни аггрегации/БД домена <strong>принимают</strong> <em>команды</em> и <strong>паблишат</strong> <em>события</em></li>\n<li>БД запросов <strong>апдейтится</strong> в результате запаблишенных событий</li>\n<li>все запросы от слоя представления идут сразу в БД запросов, а БД домена не затрагивается</li>\n</ul>\n<h4>Event Stream Processing</h4>\n<p>Обслуживает запросы типа:</p>\n<pre><code>select * from Withdrawal(amount>=200).win:length(5)\n</code></pre>\n<p>В этом запросе при каждом новом событии с <code>amount>=200</code> оно будет выдано клиенту. Когда таких событий станет больше 5, то старые начнут выдаваться с пометкой OLD. Новые клиенты увидят только последние 5 таких событий.</p>\n<p>Продукты:</p>\n<ul>\n<li>Esper</li>\n<li>StreamBase</li>\n<li>RuleCast</li>\n</ul>\n<h4>Messaging</h4>\n<ul>\n<li>Pub-sub</li>\n<li>Point-to-Point</li>\n<li>Store-forward (отправитель шлет в медиатор, а он шлет получателю и еще куда-то, например в лог, или сохраняет в БД)</li>\n<li>Request-Reply (отправитель шлет запрос в очередь, получатель получает из очереди, формирует ответ на запрос, вовращает его в очередь, очередь возвращает его отправителю)</li>\n</ul>\n<p>Стандарты:</p>\n<ul>\n<li>AMQP</li>\n<li>JMS</li>\n</ul>\n<p>Продукты:</p>\n<ul>\n<li>RabbitMQ (AMQP)</li>\n<li>ActiveMQ (JMS)</li>\n<li>Tibco</li>\n<li>MQSeries</li>\n<li>и другие</li>\n</ul>\n<h4>ESB</h4>\n<p>Все подключены к одной большой жирной шине, через которую проходят все события.</p>\n<h4>Actors</h4>\n<ul>\n<li>Fire-forget (async send)</li>\n<li>Fire-And-Receive-Eventually (async send + wait on Future for reply)</li>\n</ul>\n<h4>Compute Grids</h4>\n<ul>\n<li>Divide and conquer (джобы разделяются на независимые таски, выполняются параллельно, результаты аггрегируются)</li>\n<li>MapReduce - Master/Worker</li>\n<li>Automatic provisioning</li>\n<li>Load balancing</li>\n<li>Fail-over</li>\n<li>Topology resolution</li>\n</ul>\n<p>Продукты:</p>\n<ul>\n<li>Platform</li>\n<li>DataSynapse</li>\n<li>Google MapReduce</li>\n<li>Hadoop</li>\n<li>GigaSpaces</li>\n<li>GridGain</li>\n</ul>\n<h4>Load balacing</h4>\n<ul>\n<li>Random allocation</li>\n<li>Round robin allocation</li>\n<li>Weighted allocation</li>\n<li>\n<p>Dynamic load balancing</p>\n<ul>\n<li>least connections</li>\n<li>least server CPU</li>\n</ul>\n</li>\n<li>DNS Round Robin</li>\n<li>Reverse Proxy (Apache mod_proxy, HAProxy, Squid, Nginx)</li>\n<li>Hardware Load Balacing (BIG-IP, Cisco)</li>\n</ul>\n<h1>Паттерны стабильности</h1>\n<ul>\n<li>таймауты</li>\n<li>разрыв сети</li>\n<li>Let-it-crash</li>\n<li>Fail fast</li>\n<li>Bulkheads</li>\n<li>Steady state</li>\n<li>Throttling</li>\n</ul>',frontmatter:{path:"/blog/architecture",title:"Architecture"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-architecture-e499ab2115654d6ed9ad.js.map