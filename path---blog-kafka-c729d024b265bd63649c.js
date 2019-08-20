webpackJsonp([0xd0f4f4520238],{460:function(a,t){a.exports={data:{markdownRemark:{html:'<h1>Kafka</h1>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">I thought that since Kafka was a system optimized for writing, \nusing a writer’s name would make sense. I had taken a lot of \nlit classes in college and liked Franz Kafka. \nPlus the name sounded cool for an open source project.\n\nSo basically there is not much of a relationship.\n\nJay Kreps, CEO at Confluent</code></pre></div>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/8945b19de010fe4a33ccb3e416cada93/a86fc/kafka-architecture.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 51.41242937853108%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAABwklEQVQoz42S647TMBCF8/7PgngFkGjVgrTsLlJZaKFLmoTmUtvxJY6TODmMs6m0VPzA0pEdxT7zzSWapglh1TWDtQ2cc/DegzMGWSv8zwoeV59o3sYJ7z68RXz6gfvP9yirCqv1Cp9Wb2C8he0dOt/DDd28937AQBqnESOmv4yjcPDjCKMkRiKznYO2BkwJlDxDys4o6gsu9C2Nmv81zs7GHQXQjYGgty0FnQlfo7uhhzYaSim6VENKTbQlykuFc1lACIEL0WdZBkPlGSaP4/MR+/2BgrQYxgFR23mcKoVKaUImUkMRZQ1WC2gyZmQgOAMrSxitsNvtsNlswLnARAZ3+wxfY74AdYhyYfH+S4ZTKeFai4oMzjmlGZT8QpWdwPLf4GVOTapn+pp2zjn6rkNSSJx5QyXoqHQekdEaSZJA0KWRajmnS6k9pzGlV8wPgxgpTVMURQEWJkBKNI3F3aHAxz3Ru3/UMHSpbVt8e3rCw+MjjVELTQFvFQKE0gzUxMMxxvefMfrBL2OzzNB1jkKnA0EgCRTBIDwOCuemaSiQxXL9pTSkBemF8Gr22jgM+Ha7pY6mWK/Xs/K8wO392wz/AIhr/iPU/+4TAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Architecture"\n        title=""\n        src="/hows-that-again/static/8945b19de010fe4a33ccb3e416cada93/10273/kafka-architecture.png"\n        srcset="/hows-that-again/static/8945b19de010fe4a33ccb3e416cada93/9b14a/kafka-architecture.png 163w,\n/hows-that-again/static/8945b19de010fe4a33ccb3e416cada93/94962/kafka-architecture.png 325w,\n/hows-that-again/static/8945b19de010fe4a33ccb3e416cada93/10273/kafka-architecture.png 650w,\n/hows-that-again/static/8945b19de010fe4a33ccb3e416cada93/a86fc/kafka-architecture.png 708w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Умные </p>\n<h2>Установка</h2>\n<p>Проще всего установить через Docker</p>\n<p>Образ: wurstmeister/kafka</p>\n<p>Запускается через docker-compose,брать с гитхаба этого докерфайла</p>\n<p>После установки все .sh скрипты лежат по адресу <code class="language-text">/opt/kafka/bin</code>, либо <code class="language-text">$KAFKA_HOME/bin</code></p>\n<p>Дальнейшие инструкции описаны в соответствии с этим способом установки</p>\n<h2>Принципы работы</h2>\n<p><strong>Сообщение</strong> - массив байт. Кафка не требует какого-либо формата передаваемых данных.</p>\n<p><strong>Ключ сообщения</strong> - тоже массив байт, для кафки никакого специального значения не имеет. Ключи используются лишь для разделения сообщений по партишнам. Сообщения с одинаковым ключом всегда идут в один и тот же партишн.</p>\n<p><strong>Топики</strong> - ну тут все понятно, топики и топики. Топики в кафке не имеют гарантий упорядоченности, точнее имеют только в пределах одного партишна.</p>\n<p><strong>Партишны</strong> - каждый топик разделяется на несколько партишнов. Каждому партишну соответствует один журнал. Каждый партишн может быть расположен на отдельном сервере и иметь несколько реплик, благодаря чему обеспечивается устойчивость. Но при этом всегда у каждого партишна есть <strong>лидер</strong>, который принимает запросы на чтение и запись.</p>\n<p><strong>Продюсер</strong> - пишет сообщения в топик. По дефолту пишет равномерно во все партишны, но можно реализовать специальный партишнер, который будет выбирать партишн по ключу сообщения. Запись происходит всегда в лидера партишна.</p>\n<p><strong>Консюмер</strong> - читает данные из топика в том порядке, в котором они были в него записаны (но опять же, порядок не гарантирован). Консюмеры следят за тем, какие сообщения они уже прочитали из топика, поддерживая в актуальном состоянии <em>оффсет</em> партишна. Читает всегда из лидера партишна.</p>\n<p><strong>Оффсет</strong> - целочисленное значение, которое Кафка добавляет к каждому добавленному сообщению. Каждое сообщение имеет уникальный для партишна оффсет. Консюмеры запоминают (в кафе или зукипере) оффсет последнего прочитанного сообщения и благодаря этому могут продолжить с этого же места после перезапуска.</p>\n<p><strong>Группа консюмеров</strong> - это один или несколько консюмеров, которые работают вместе над одним топиком. Внутри группы консюмеров каждый партишн используется только одним консюмером. Благодаря этому внутри группы каждое сообщение читается только один раз одним консюмером (при нормальной работе системы). Если один консюмер фэйлится, то остальные делают ребаланс партишнов, чтобы подхватить партишны упавшего консюмера.</p>\n<p><strong>Лидер группы</strong> - выделенный брокер, один для каждой группы, который управляет распределеним партишнов между консюмерами. Инфу о распределении он шлет <em>координатору групп</em>, а тот уже сообщает каждому консюмеру, какой у того партишн.</p>\n<p><strong>Координатор групп</strong> - выделенный брокер, который следит за принадлежностью других брокеров к группам. Разным группам могут быть назначены разные координаторы. Консюмеры шлют координатору heartbeat-сообщения. Если консюмер перестал слать heartbeats, то координатор считает его мертвым и запускает ребаланс партишнов в соответствующей группе.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/45cda/kafka-consumer-group.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 43.64963503649635%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAB3klEQVQozzWOW3OaUBSF+f+vnUartWlqJ4OJN9BEBUcrXrBURFAUvBxERQ9IvEAikRItpu3MN9+svV/WQhzHmUMTaMZ0aSjvgDnk2r0G0y7Vf8pT7fLRdN8qNJ2jez6fh7KsAOAHZLlaoQQdTP8I41QIq/ghglMZvIpma2G8EkqWPqC5j7HC1T0RSBTHYPZiW72+NAZTtt1GzqeT/fyy2Vvb/1j+qc6MqbpeLJ+01V43rAu6vTbd3a7N9QIYFc7WgpGvyArC+zL7+aFxnWt+eaRvcvRjnkGJXxGydV1gboqsulr7C99OJ9+e5+0sawX1zXZHkiTieW/TuSaNJsMJkMeTkTJVWE5mOZFp9Tle6vZsHZ6dg2fbrmV5liUI/UimEs3Xo7cxxDSfSEZMUR28xmM1Pl3tJCkOr7SpAp0rtZLl1h3ZvCsy86XhN/92XQh1fjCSJiqWySCO88pJoN4Z0LzU6Ei+fZq8JA4A2x02BLnWEmhW3Gy2l9mOo6gLqqs0B7N4CkMOB0eaQQFoXbB851/ggcZPFqIKh6woCkOGH5nQ8PeLPel7thTLV6O3KGIYBlqoXcWJULL4KUkGE8Rfh1PFQJwIJ8hEuvQNK4ew8kyDfvnx+Oo6z97R2e93fwA8Ur9hC9UCsgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Consumer group"\n        title=""\n        src="/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/10273/kafka-consumer-group.png"\n        srcset="/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/9b14a/kafka-consumer-group.png 163w,\n/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/94962/kafka-consumer-group.png 325w,\n/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/10273/kafka-consumer-group.png 650w,\n/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/2fc6f/kafka-consumer-group.png 975w,\n/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/a8a2c/kafka-consumer-group.png 1300w,\n/hows-that-again/static/0d0071122235d3be9fec42df00c39b7f/45cda/kafka-consumer-group.png 1370w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>А если консюмеров в группе больше, чем партишнов в топике, то некоторые консюмеры останутся без работы. Поэтому лучше создавать заведомо много партишнов, чтобы потом можно было спокойно добавлять консюмеров.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/20d5b6bc75e437bbf8efe5afae06e16c/99256/kafka-too-much-consumers.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 83.09859154929579%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAIAAABSJhvpAAAACXBIWXMAAC4jAAAuIwF4pT92AAADMklEQVQ4y3WT6W/aWBTF+dNnOiqplEKUIWBjG7xiMIvxboyxwRhjs4elSdNsGiUhZQlJk2kyn5IxhJHmS5+Orq6e9NO571y9gNgcS85Qdsdq64vYOJSaI7E5EszmPy/Pb29v9b7Hebo2sEsDW+1bSs/yG7lble3K0+NTQPj2Uzr9eSB1PtE6Yh4JJ0/S6XOct5aLuQ8LXRPyuJBK+gprqT2d3pWI9JGJmuzN1XUg271KGT1Sb2Oqw1hDstzOti5xzbtfLX1YGznZL0ZSIahKmq4yvhARTQ9KRJW7vZ4GqNr47OTYbTp23Wq3vOPxIZCRdhL58ehwfjuD+PQu/vm6QV3WyaMyfGER970cJiWTpg/fBIjahBUVKltAUxm/ZnKFaK4c5+uz71PfuegZkEbx1C5L7jLoDk+H1EwY4GGsxq9hyv6aKkgpVvbFiBrBsHHBRqTGcj7zYbFbwx02S+8JHMAXY74KmT1Eo/AtXBtdXZ67jbqha71Oe/rXeZTmg4ncZDScf5/FOfoTvHPbIE91ZChGz030rsOgAvLf2PXjSJKOp/IbFcJgMspZhN5Z3S3WgY3ddF8FoCBGhlEi5AuMf4zJGGFtnSeu54mywnJ8uWI4DTte0Pcz6uXF2cvfz5Qh7OdiHRHwRMBmIy0JGJdgTEHR6saZsiZuu63phiCrpYrpOM0ILYZI4eTr8Y/VPVFm9/NAV4EbIljJ7TsSMNITiIBsYdw6+hMhQSILUXmEZkNRGBRsUu9ux564dE+JxT6QZCiVChNUCAQ+AApOWMIaTm0Ca24C67Tcq4tv68BgZnjYv72ZAiwVjAfnrfR5DRvJ4EUVX/p7lv09Fzdw84xgVaygJHMSzqpJhgMFB5Gby8V6VVK/jtp5MPobAn2EwT8ScBCO/n7AI1vnpNyAuCpUrK7rujHXNxnh8cfDGh7YTEd0S0jbwJ1SwtOxgYHjOrV9891i9rBa/k93q+Xi8eHh9fXVh5Whk2txI+Ggy0Xs9Oc+f3BWghAWxN6d335x3mGuZaA9KSomQBkFFRSUsUgRQtwipDFT/1e9/vr48GA8FCtquVFT6+a7NLtasioVq/ry/PIvgP/9aOUWaWsAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Too much consumers"\n        title=""\n        src="/hows-that-again/static/20d5b6bc75e437bbf8efe5afae06e16c/10273/kafka-too-much-consumers.png"\n        srcset="/hows-that-again/static/20d5b6bc75e437bbf8efe5afae06e16c/9b14a/kafka-too-much-consumers.png 163w,\n/hows-that-again/static/20d5b6bc75e437bbf8efe5afae06e16c/94962/kafka-too-much-consumers.png 325w,\n/hows-that-again/static/20d5b6bc75e437bbf8efe5afae06e16c/10273/kafka-too-much-consumers.png 650w,\n/hows-that-again/static/20d5b6bc75e437bbf8efe5afae06e16c/99256/kafka-too-much-consumers.png 710w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p><strong>Брокер</strong> - один сервер кафки. Брокер получает сообщения от продюсеров, приваивает им оффсеты и сохраняет на диск. Консюмерам он рассказывает о распределении партишнов и выдает им сообщения со своего диска. Каждый брокер может содержать несколько партишнов или реплик пкартишнов разных топиков</p>\n<p><strong>Контроллер кластера</strong> - один специальный брокер внутри кластера, выбираемый голосованием. Контроллер занимается административными операциями, включая назначение партишнов брокерам и мониторинг отказов брокеров.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/92dfc/kafka-partition-replication.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 61.582381729200655%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAACXBIWXMAAC4jAAAuIwF4pT92AAACMElEQVQoz1VSa1PaQBTN3++HfugMap22U51RiFERFHkEERECBZKQB5AgBAJBk/AICSTZBAG7LWWq58Pdvbt79u45e5G3d1itVi4E8F9Xm648aDSFTlcG3tJbvroA+L7/9hHIdthsNjAubHsxt8b9hvkszIbii8TDOBsKhtIYq8P5wt7s8IG8hecvLUOXiJBCRVp5tBo7aBdCAzIil9AmlfP817cd7R/ZcRzP86bTqWEYqqbzdPnsjthL0N+zzVw2EczWvlxXfuAknozpmm7s4Diu5/vIU6vFMczcMv8+29Wf5dhtOPDz5NspWs5gl9HwEXYRusCKDziA6pdLeMwyZzWKbDYaSG+oEoxAi7KijQEApjEhM+eZyDGbv+7SaYnCK2m0nr/qCKwLPMjUp1aREbNlVpRkJMfL+zi/n67fEOzCmkHZra5SrdXXOxdr9RYrSHDdtm2YPvK9vRQXSDLRAoewYuc2X43nSU7swMrAsc0B+1RJjtqVXr047dF97mHcLk+0geMCSJYUNXxXOE/lSE5AWqLAs7XF/I9muD0bv4jQ4VpcIC7J+KFQwHpUrFPC+ErWAd72LZZpshQJiQhsCtO0VFWHfkO3GbJ0gv/6dFUN4MJ9NnV0z32OUgdJOpm4GemjyWQCrdY0OBvDb/rfJBDQkommxKOnISyIYkEqg0bCwcDh1zP0qPyIA89fr9cfmuR9Ai+z55bEPg7qRJ8vyDwhMTk6n2hT90rvaav5fbHfc3V09KgwEBsAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Partition replication"\n        title=""\n        src="/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/10273/kafka-partition-replication.png"\n        srcset="/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/9b14a/kafka-partition-replication.png 163w,\n/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/94962/kafka-partition-replication.png 325w,\n/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/10273/kafka-partition-replication.png 650w,\n/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/2fc6f/kafka-partition-replication.png 975w,\n/hows-that-again/static/91e365e544ace6d2aacbd6d21a0ce0a9/92dfc/kafka-partition-replication.png 1226w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p><strong>Ретеншн</strong> - период времени, в течение которого сообщения доступны для чтения и по истечении которого они будут удалены с диска. Может быть настроен как по времени, так и по максимальному размеру лога. По дефолту составляет 7 дней, но это зависит от версии кафки. </p>\n<p><strong>Переизбрание лидера</strong> - голосование между репликами, обычно происходящее когда лидер перестает отвечать (но может происходит и когда все идет хорошо, см. <a href="/hows-that-again/blog/video/kafka-under-highload">доклад</a>). Реплики всегда отстают от лидера на некую дельту, поэтому при переизбрании лидера <strong>всегда происходит потеря данных</strong>.</p>\n<h2>Использование</h2>\n<h3>Вывод всех топиков:</h3>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token variable">$KAFKA_HOME</span>/bin/kafka-topics.sh --list --zookeeper zookeeper:2181</code></pre></div>\n<h3>Создание топика:</h3>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 3 --partitions 1 --topic my-replicated-topic</code></pre></div>\n<h3>Вывод информации о состоянии кластера:</h3>\n<p><code class="language-text">bash-4.3# $KAFKA_HOME/bin/kafka-topics.sh --describe --zookeeper zookeeper:2181** **Topic:my-replicated-topic PartitionCount:1 ReplicationFactor:3 Configs:** ** Topic: my-replicated-topic Partition: 0 Leader: 1004 Replicas: 1004,1003,1005 Isr: 1004,1003,1005</code></p>\n<p>1003,1004,1005 - это id брокеров</p>\n<p><code class="language-text">leader</code> - ответственный за все записи и чтения в партишне</p>\n<p><code class="language-text">replicas</code> - реплики, перечисляются независимо от того, живы они сейчас или нет</p>\n<p><code class="language-text">isr</code> - in-sync-replicas, т.е. реплики, которые сейчас живы и имеют последнюю версию</p>\n<h3>Паблиш сообщений через консоль:</h3>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$KAFKA_HOME/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic my-replicated-topic\ntest message 1\ntest message 2</code></pre></div>\n<h3>Консюм сообщений и вывод их в консоль:</h3>\n<p><code class="language-text">$KAFKA_HOME/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic my-replicated-topic</code></p>\n<h3>Вывод id всех брокеров:</h3>\n<p><code class="language-text">bash-4.3# $KAFKA_HOME/bin/zookeeper-shell.sh zookeeper:2181 ls /brokers/ids</code></p>\n<h3>Вывод инфы по id конкретного брокера:</h3>\n<p><code class="language-text">bash-4.3# $KAFKA_HOME/bin/zookeeper-shell.sh zookeeper:2181 get /brokers/id/1004</code></p>\n<h2>Возможные проблемы</h2>\n<h3>После перезапуска брокеров клиенты валятся с по таймауту</h3>\n<p>Так может происходить из-за того, что после перезапуска брокерам назначились новые ID, а партишны в зукипере остались назначенными на старых. Самое простое решение - брокерам задавать id на старте, чтобы каждый раз был один и тот же. Либо можно вручную ребалансить партишны после перезапуска брокеров</p>\n<h3>После падения одного брокера продюсер начал выдавать ошибки</h3>\n<p>Наверно replication.factor стоял 1, это значение по умолчанию. Он задается либо при создании топика, либо как default.replication.factor при запуске брокера.</p>\n<p>А еще должен быть <code class="language-text">auto.leader.rebalance.enable</code> установлен в <code class="language-text">true</code>? но это и так значение по умолчанию.</p>\n<p>А еще <code class="language-text">leader.imbalance.check.interval.seconds</code> указывает интервал проверки на необходимость ребаланса, по дефолту 300.</p>\n<p>А еще <code class="language-text">leader.imbalance.per.broker.percentage</code> указываем максимум нагрузки на одного брокера, после которого начинается ребалансировка. Дефолт - 10%.</p>\n<h3>После подключения новых брокеров им не назначаются автоматически партишны</h3>\n<p>Ага, так и задумано by-design, и ничего с этим не поделать. Только вручную назначать. Автоматически новым брокерам могут быть назначены только партишны новых топиков.</p>\n<h2>Отличия от RabbitMQ</h2>\n<table>\n<thead>\n<tr>\n<th>Kafka</th>\n<th>RabbitMQ</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Умные консюмеры, глупый брокер</td>\n<td>Умный брокер, глупые консюмеры</td>\n</tr>\n<tr>\n<td>Хранит сообщения в течение указанного времени, после чего удаляет</td>\n<td>Удаляет сообщение только после того, как оно прочитано всеми консюмерами</td>\n</tr>\n<tr>\n<td>Консюмеры сами должны отслеживать свое положение в каждом логе</td>\n<td>Брокер отслеживает положение консюмеров в логе</td>\n</tr>\n<tr>\n<td>Благодаря тому, что много логики перенесено на косюмеров, может поддерживать большое количество консюмеров и хранить большое количество данных с малым оверхедом</td>\n<td>???</td>\n</tr>\n<tr>\n<td>Требует для работы внешний ZooKeeper</td>\n<td>Автономен</td>\n</tr>\n<tr>\n<td>Основной юзкейс - обработка потоков</td>\n<td>Основной юзкейс - доставка сообщений, асинхронная реакция серверов на запросы клиентов</td>\n</tr>\n<tr>\n<td>Скудная маршрутизация посредством групп консюмеров</td>\n<td>Возможность сложной маршрутизации через точки обмена</td>\n</tr>\n<tr>\n<td>Сообщения вытягиваются консюмерами (pull-модель)</td>\n<td>Сообщения проталкиваются брокерами (push-модель)</td>\n</tr>\n<tr>\n<td>100K+/sec</td>\n<td>20K+/sec</td>\n</tr>\n</tbody>\n</table>\n<h3>Сценарии, в которых лучше использовать Kafka</h3>\n<ul>\n<li>поток из точки А в точку Б без слошной маршрутизации, с максимальной пропускной способностью, доставляемый <strong>at-least-once</strong> в <strong>partitioned order</strong> (под partitioned order видимо имеется в виду, что порядок соблюдается только для сообщений, принадлежащих к одному партишну)</li>\n<li>когда приложению требуется доступ к истории потока. До тех пор пока Кафка не удалила сообщения из-за их старости, клиенты могут заказать "повтор" потока, просто указав другой сдвиг.</li>\n<li>Stream Processing</li>\n<li>Event Processing</li>\n</ul>\n<p>При этом <strong>обязательно</strong> должно быть допустимо то, что консюмеры сами управляют сдвигом.</p>\n<h3>Сценарии, в которых лучше использовать RabbitMQ</h3>\n<ul>\n<li>когда нужно, чтобы веб-сервера асинхронно запускали сложные процедуры, не заставляя клиента ждать</li>\n<li>распределение сообщений на несколько получателей</li>\n<li>распределение нагрузки между воркерами</li>\n<li>когда нужен больший контроль над сообщениями</li>\n<li>сложная маршрутизация, интеграция нескольких сервисов/приложений с нетривиальной логикой распределения сообщений</li>\n</ul>\n<p>Когда нужна история потока, RabbitMQ используют совместно с Apache Cassandra.</p>',frontmatter:{path:"/blog/kafka",title:"Kafka"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-kafka-c729d024b265bd63649c.js.map