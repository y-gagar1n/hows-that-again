webpackJsonp([0xa97f3d17fa68],{479:function(n,e){n.exports={data:{markdownRemark:{html:'<iframe width="660" height="375" src="https://www.youtube.com/embed/BtmYjTO1EpI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n<h1>Брокер сообщений Kafka в условиях повышенной нагрузки</h1>\n<p>Вот так сейчас выглядит система сбора информации о пользователях с разных сервисов раблера:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/18e4c275de5c03171d45d00dbb6e6d6e/7b5a7/rambler-architecture.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 56.13636363636364%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsSAAALEgHS3X78AAABsElEQVQoz2VT2W7bMBDU/39W0T4Frq0kLmz6iF35qG5RB0U7KaY7K6lwkIfBkrvD2YNkEOcnLE2I8OUJ680Crk/R+wxdn6HtS1gveG/Q3Qrxp3AS60dMXCdc9cs+sF2K6Gyw3YY4RisRSZXYCVqKugTWZbp3I/rJjqIDhnXQdrEG7u+FQKqpL6ib6380tG2Mpv2jqOwZRRmpnc4+IsiL3zDmJ9brGbLsACvE6TDBBKVlkmG/2z9jvviOJH0bRMXnfC4d5EOFzLbdhQqup1b8LVcxO1ZSiWBZnZRDMa6ZIM+PsE2MWkZXiS9gWxThIQpMYkQ7Vqmtu1TjFDBmjut1qxWWkoCxWubM5IEOdhwuCZkcOF8M4ningqfzGrPZN0SnlSarm4tWSXHyo+gXNvsXvK7mwjUI3MONsZo42cNs5jgclnqIldNPjrVDhcfjEkkytF1yJFJh0xca/yLI9e1ewgu4Z+sff+040+HmKUTbyZOq1Ddd4PWrIEmPY1jJ7S/CH3g7vML7Ybb+Xqglv+0SqY6fINfP8EmQVi/g4dlwnhSjVd8Yn3idL9Dea/QftT6ff1SVPr7xWYVZAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Rambler architecture"\n        title=""\n        src="/hows-that-again/static/18e4c275de5c03171d45d00dbb6e6d6e/10273/rambler-architecture.png"\n        srcset="/hows-that-again/static/18e4c275de5c03171d45d00dbb6e6d6e/9b14a/rambler-architecture.png 163w,\n/hows-that-again/static/18e4c275de5c03171d45d00dbb6e6d6e/94962/rambler-architecture.png 325w,\n/hows-that-again/static/18e4c275de5c03171d45d00dbb6e6d6e/10273/rambler-architecture.png 650w,\n/hows-that-again/static/18e4c275de5c03171d45d00dbb6e6d6e/7b5a7/rambler-architecture.png 880w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Разные сервисы публикуют нужную информацию в Kafka.</p>\n<p><strong>Gobblin</strong> - решение от LinkedIn для ETL информации из разных источников в Hadoop. Говоря проще, это map-reduce задача, которая крутится на Hadoop, берет данные из кафки и кладет в HDFS.</p>\n<p><strong>Spark streaming</strong> - постоянно висит на хадупе, откусывает от кафки микробатчи информации, обрабатывает их и кладет в базу. HDFS полностью минуется, все происходит в памяти, поэтому можно обрабатывать потоковые данные в реал-тайме.</p>\n<p>Не-потоковые данные кладутся в HDFS, потом оттуда берутся спарком и хайвом, обрабатываются и результаты обработки кладутся в базу Aerospike для пользования внешним миром.</p>\n<p>Благодаря такой архитектуре, задержка между наступлением события и его появлением в Aerospike составляет около минуты.</p>\n<h2>Переизбрание лидеров</h2>\n<p>При переизбрании лидеров всегда происходит потеря данных. При этом переизбрание может происходить само по себе, даже когда все идет хорошо.</p>\n<p>Чтобы при этом не было потери данных, нужно указать параметр <code>request.required.acks</code>, который контроллирует, когда клиенту будет выслано подтверждение.</p>\n<p>Если <code>request.required.acks</code> равен:</p>\n<ul>\n<li>0: подтверждения нет вообще</li>\n<li>1: перед подтверждением запись только в мастер</li>\n<li>-1 или all: количество записей настраивается для каждого топика индивидуально параметром <code>min.insync.replicas.per.topic</code>. </li>\n</ul>\n<p>Если указать <code>min.insync.replicas.per.topic</code>, равное <code>replication.factor</code>, то при выходе из строя любой реплики, запись перестает работать вообще. Поэтому рекомендуется указывать <code>min.insync.replicas.per.topic</code> меньшее, чем <code>replication.factor</code>.</p>\n<p>В рамблере:</p>\n<pre><code>min.insync.replicas.per.topic = 2\nreplication.factor = 3\n</code></pre>\n<h2>Сохранение отступов</h2>\n<ul>\n<li>\n<p><strong>автоматическое сохранение</strong>: возможна потеря данных</p>\n</li>\n<li>\n<p><strong>ручное сохранение</strong>: возможны дубли данных</p>\n</li>\n<li>\n<p><strong>сохранение вне Kafka</strong>: а вот здесь можно обеспечить exactly once. Консюмер после получения данных <strong>атомарно</strong> сохраняет в свою БД и полученные данные и сдвиг. Если база, куда сохраняем, транзакционная, то проблем в атомарном сохранении нет. А вот если это, например, HDFS, то придется костылить:</p>\n</li>\n</ul>\n<pre><code class="language-sh">hdfs dfs -mv /tmp/file1 /logs/file\nhdfs dfs -mv /tmp/file2 /logs/file\nhdfs dfs -mv /tmp/offsets /runtime/offsets\n</code></pre>\n<p>Здесь воркер перемещает 2 файла данных и сдвиг в HDFS. Если он упал после первой операции, то при следующем старте он опять получит это сообщение от кафки, после чего посмотрит в HDFS и увидит, что первый файл уже сохранен. Поэтому сохранит только второй файл и сдвиг.</p>\n<h2>Неравномерное распределение нагрузки</h2>\n<p>Даже при нормальной работе кластера Kafka ошибается. В результате этого она может неравномерно рапределять партиции и лидеров по брокерам.</p>\n<p>Например, у нас есть 3 брокера:</p>\n<ul>\n<li>первый брокер имеет лидера партиции 0, лидера партиции 1, лидера партиции 2</li>\n<li>второй брокер имеет реплику 0, реплику 1, реплику 2</li>\n<li>третий брокер не имеет ничего</li>\n</ul>\n<p>Симптомы: </p>\n<ul>\n<li>сильная задержка в обработке</li>\n<li>резкое возрастание нагрузки на одних нодах и падение на других</li>\n<li>повышение общего количества трафика из-за того, что кафка постоянно запускает переизбрание лидеров</li>\n<li>кафка медленно отвечает на простейшие запросы, отдельные ноды отвечают по несколько минут</li>\n<li>падения консюмеров с ошибками типа "не могу получить лидеров", "не могу получить отступы"</li>\n</ul>\n<p>Решение:</p>\n<p>Автоматизированного решения нет, нужно распределять вручную. В кафку можно скормить конфиг, в котором расписано, на каких нодах какие партиции должны лежать и какие из них должны быть лидерами.</p>\n<p>Конечно, это стоит делать только для самых "толстых" топиков, через которые проходит наибольшее количество информации.</p>\n<p>Другое решение - повысить репликацию. Вот почему оно работает: в описанном выше примере фактор репликации равен 2, потому при отказе брокера 1 кафка переносит все лидеры на брокер 2 и вся нагрузка переезжает на него. Если бы фактор репликации был 3, то лидеры распределились бы равномерно между 2 и 3 брокером и нагрузка бы разделилась между ними.</p>\n<h2>RAID</h2>\n<p>Кафка не дружит с RAID 5. Когда терятся блок данных и начинается восстановление - кафка резко просаживается.</p>\n<p>Рекомендуется использовать RAID 10.</p>\n<h2>Что мониторить?</h2>\n<p>Узкие места:</p>\n<ul>\n<li>сеть</li>\n<li>диски</li>\n<li>распределение нагрузок по нодам</li>\n<li>распределение лидеров толстых топиков</li>\n</ul>\n<p>Переизбрание лидеров</p>\n<p>Рассинхронизация партиций:</p>\n<ul>\n<li>число несинхронных партиций (UnderReplicatedPartitions)</li>\n<li>максимальный лаг репликации (ReplicaFetcherManager.MaxLag)</li>\n</ul>\n<p>Время ответа на простейшие запросы (сигнал того, что с кафкой начало происходить что-то плохое)</p>',frontmatter:{path:"/blog/video/kafka-under-highload/",title:"Брокер сообщений Kafka в условиях повышенной нагрузки"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-video-kafka-under-highload-c9ba43a895234eb619dc.js.map