webpackJsonp([0x8761e0317f78],{473:function(a,n){a.exports={data:{markdownRemark:{html:'<h1>RabbitMQ</h1>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/3931949bb4852036ab995b325a182592/13bd6/rabbitmq-architecture.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 635px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 46.92913385826771%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAAB1UlEQVQoz4WSzW7TQBSF85K8Bgs2rFlV4gHYdMH/AgmQqAgUhFS1EFVVVRpS0pDaTlzHduzYieN/O7bzMXZSIWXDkc6ckUZz7r1npsUW6/W60SLPScKAOApJBbNYqOAqjWElWCaQR2RJzC5qj1a9VFvWiDyXwBhR2iqhUFeTWeojdGlA+6THs/ZPvv64wjdVsiyjqkocLyYvyuZ+a7dK5i/QxjLvehoDWWGuDpkqA6SrS15/6/L4/Tlvj34JwzFJkpCJiUxniblImqZaVbVGNn0mTkhRlni2ifKnz6euxI0s4QrDhejSGN/w6PiMex+O2Ds5I5reNmY1gmSFs8yph2yVVcXpwKKn2ERxhGcZDAd9Xl6onPd+M1P6OKqELl+z3/nIw8PnPD1t403G+IGP7/sMRyY9y6YQ47dyUWWiaZim2VRL/TnWrUKnL6GORH4TGU9kaIyueXL8ggcHe+x/f0U41UWGKUVREEQZkmNtDHczjJdzjGEP5aKD2u8SWJNNXjOdaKKidS8b9S2tedU0TdF1Hce2/73yHWus8ozY9wjEKKEwSV2DYOnhuTYLd4YvCkbivP5Sd/dKkX0pumsMd//RdreR7gG8uY9uTvl8+AVlrPI//AU006EoZCmAfQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Architecture"\n        title=""\n        src="/hows-that-again/static/3931949bb4852036ab995b325a182592/13bd6/rabbitmq-architecture.png"\n        srcset="/hows-that-again/static/3931949bb4852036ab995b325a182592/12084/rabbitmq-architecture.png 163w,\n/hows-that-again/static/3931949bb4852036ab995b325a182592/49552/rabbitmq-architecture.png 325w,\n/hows-that-again/static/3931949bb4852036ab995b325a182592/13bd6/rabbitmq-architecture.png 635w"\n        sizes="(max-width: 635px) 100vw, 635px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Отличия от Кафки смотреть в <a href="/hows-that-again/blog/kafka">статье про Кафку</a></p>\n<h2>Терминология</h2>\n<p>Queue - очередь</p>\n<p>Binding - привязка</p>\n<p>Exchange - точка обмена</p>\n<p>Topic - топик</p>\n<p>Routing key - ключ роутинга</p>\n<p>Binding key - ключ привязки</p>\n<p>Payload - тело сообщения</p>\n<p>Acknowledgement - подтверждение</p>\n<h2>Принципы работы</h2>\n<p>Продюсеры создают сообщения и шлют их на брокера.</p>\n<p>Сообщения состоят из ключа роутинга, идентификатора точки обмена и тела сообщения.</p>\n<p>Консюмеры подсоединяются к брокеру, подписываются на <em>очередь</em> и принимают из нее сообщения. Ключ сообщения и идентификатор точки обмена консюмер не получает - только тело. После получения <strong>каждого</strong> сообщения консюмер должен послать <strong>acknowledgement</strong>, вручную или автоматически. Пока не послать подтверждение, следующее сообщение в этот консюмер не придет.</p>\n<p>Прежде чем читать или писать сообщения в очередь, приложение должно поднять <em>AMQP-канал</em>. Это виртуальный канал связи внутри TCP-соединения, по которому посылаются команды AMQP. Таких каналов может быть много внутри одного TCP-соединения и они нужны, чтобы каждому потоку не приходилось открывать свое TCP-соединение, что было бы очень дорого (TCP-соединения не потокобезопасны, могут использоваться не больше чем одним потоком на запись и не больше чем одним - на чтение).</p>\n<h3>Создание новых очередей</h3>\n<p>И консюмеры и продюсеры могут создавать новые очереди командой <em>queue.declare</em>, но консюмеры не могут использовать команду, пока подписаны на другую очередь в этом же канале.</p>\n<p>Для очередей могут быть заданы специальные свойства:</p>\n<ul>\n<li><strong>exclusive</strong>: очередь становится приватной и только текущее приложение может быть ее консюмером</li>\n<li><strong>auto-delete</strong>: очередь автоматически удаляется, когда от нее отписывается последний консюмер.</li>\n<li><strong>durable</strong>: сообщения не теряются при рестарте RabbitMQ. </li>\n</ul>\n<p>Если нужна временная очередь для текущего приложения, то можно создать ее со свойствами <strong>exclusive</strong> и <strong>auto-delete</strong>.</p>\n<p>Если попытаться записать сообщение в несуществующую очередь, то оно будет просто проигнорировано, поэтому лучше всегда заранее ее явно создавать. Если при попытке создания окажется, что очередь с такими же параметрами уже есть, то Rabbit не сделает ничего и вернет успех.</p>\n<h3>Точки обмена / exchanges</h3>\n<p>Продюсеры шлют сообщения не напрямую в очереди, а в точки обмена (exchange). Очереди <em>привязываются</em> к эксченджам посредством ключей привязок. Получив сообщение в эксчендж, канал на сервере сравнивает ключ роутинга сообщения (который может быть и пустым), с имеющимся ключами привязок. Найдя соответствие, канал посылает сообщение в нужную очередь. Если соответствие не найдено, то сообщение игнорируется.</p>\n<p>Такое разделение позволяет изолировать продюсера от логики распределения сообщений по очередям.</p>\n<p>Используя такую схему, можно реализовывать разные паттерны рассылки сообщений:</p>\n<ul>\n<li><strong>direct</strong>: сообщение шлется в одну конкретную очередь. Создаем дефолтную точку обмена с пустым именем. При создании очереди, она автоматически будет привязана к дефолтной точке обмена, используя имя очереди в качестве ключа привязки. После этого достаточно слать сообщения в точку обмена без имени с названием очереди вместо ключа роутинга.</li>\n<li><strong>fanout</strong>: каждое сообщение шлется сразу на несколько очередей. Для реализации нужно привязать все заинтересованные очереди к одной точке обмена под одним и тем же ключом привязки. Потом этот ключ используем в качестве ключа роутинга и готово.</li>\n<li><strong>topic</strong>: используем символ * в ключах привязок, легче объяснить картинкой</li>\n</ul>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/121add905627856b09592f0a3fc25b54/c8ef7/rabbitmq-topic-exchange.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 129.4478527607362%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAABYlAAAWJQFJUiTwAAAECUlEQVRIx5VV22sjdRTOP+CjPvugPikIBX1RBKH4tPiwdB+EhQV9qCDLLiuo4IMIBQuCRUFc8Gm7tnarabNtUrtJTWhzncR0kpnMJM1MMsnkfk/TXE3yOZdOnDa1xJOETM45v+98v3OLAToZj8eT7+FoiOFwiNF4NLFrOvmj99WLQQ+mGcVyAmwhAK4SBi0S8ET+RJBzKr9PSqRiSxX5qXPTgNJLfnO5COiiB3TBC0fIjIe/rGB16ye4I3+AyXvAlLxgUyGo7jMA8nkWsarEsErC6jPBRpjw9Og3rO2vI1QKga0dIyrMCiilTCjG4E3Y8P2TZaxsLMEcNEIsOJD2fouUaxlx3gRWZGYDlGuQqfLYIdYx9/5rePW9V3Bv5T6K7CP477+A40+eQ/JoSbq6lMPReDbAdIWDg93Fwr0b+Prh57CEdiDGN8H9+C5Cv36MGLeFWI5VbnM94LkhlqbhPTmA78QOP+dAMHkEN2NFkHeAzBDw8YegueMZqnxuaDab4Hke6XQKJpMJTqcTu2YzdnbNSCYSko1TfK4FvNzcspRKJcTjcTQaDSSTSXAcp+iu8r2W4WikTofT5UKv10MulwPDsuj3+wpbvc/MDIvFIgKBgDo5ogiKopRngiAmLK8aP8NlIC2y1+tFrVZTnnP5POhIRHmuVCog/P7/d+VqtYrIOcBgMIAgCEhIxdAkHA4rwfTXvgB4mR3DMKjX6xNnuTBaAC0dNE3/97bRs5Mr6pPypKwraU3JUigUlCB6nZySVqs1dTvDZXbBYBB5KWd6XSaTmTDSALPZLEiSnKq4QY8uR3S73VNR5cMaoHxY07uktup0Ohf8FUAtKhkKSdORPj84vsBQy6Gs0/SCkATLRCbMJ4CydM662DJuXzkFLBOF80ht6LGOoSybxh1U6v/m0iBHKzYzcARs2LZuIipSaJxV1RS0T+EJH2LXbgTBeFEe1NHqnqnz3mmiUqIQdm0gydhQaYro/z2Aod/vwUaaMP/h23jj5utYXLoNLq9e45gJYP7OW5i79SaWv7mFtO0zpDi1qeNlHnHTIoJfvozcD3Og6E1UT09h6PW6sEv/G/N33sEHDxbw3foSYqI6Zkycws27N3D3q9t4tPgiyAfPQwjuKTaunETsyUcIfPESqJ8XQEfNEmADhrN2C5ECAaNzFQehpxDaYbBpUlnv2VIKgaxLao8N8OZPEQmvQhCjCiBfiCGZt4IMPkasTEgYftQaFRja7Tbc1AGeeUywHP4OB2nBXxGvOsPFDFzUM2zsPYbZtwc7ZUVC5FT2fAgH5D7WLGvY92zDHrCgVq+qVZYnQV6mmWxGmdtmQ12e8rqS2yiXyyIjppCWbN1Od9KzqZSAvGQTxbSy4uTW+QckMHuAUQEukQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Topic exchange"\n        title=""\n        src="/hows-that-again/static/121add905627856b09592f0a3fc25b54/10273/rabbitmq-topic-exchange.png"\n        srcset="/hows-that-again/static/121add905627856b09592f0a3fc25b54/9b14a/rabbitmq-topic-exchange.png 163w,\n/hows-that-again/static/121add905627856b09592f0a3fc25b54/94962/rabbitmq-topic-exchange.png 325w,\n/hows-that-again/static/121add905627856b09592f0a3fc25b54/10273/rabbitmq-topic-exchange.png 650w,\n/hows-that-again/static/121add905627856b09592f0a3fc25b54/c8ef7/rabbitmq-topic-exchange.png 652w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Для того, чтобы указать правило привязки <em>match-all</em>, нужно использовать символ "#". Его отличие от * в том, что * считает знак "." разделителем частей и матчит любой текст только лишь в соответствующей части ключа. То есть logs.* === logs.critical, но logs.* != logs.critical.minor.</p>\n<h3>Виртуальные хосты</h3>\n<p>Внутри одного сервера RabbitMQ можно запустить несколько виртуальных инстансов RabbitMQ, которые будут друг от друга полностью изолированы. При старте RabbitMQ автоматически создает один дефолтный vhost. </p>\n<p>Добавление и удаление виртуальных хостов осуществляется командами <code>rabbitmqctl add_vhost [vhost_name]</code> и <code>rabbitmqctl delete_vhost [vhost_name]</code>.</p>\n<h3>Гарантии доставки</h3>\n<p>Чтобы сообщения не терялись никогда, должны быть выполнены 3 условия:</p>\n<ol>\n<li>очередь должна быть durable</li>\n<li>точка обмена тоже должна быть durable</li>\n<li>для сообщения должен быть указан <em>delivery mode=2</em>. </li>\n</ol>\n<p>Только в этом случае гарантируется надежное хранение сообщения вплоть до момента, когда поступит подтверждение от консюмера, получившего его. После этого RabbitMQ помечает сообщение, как мусор для сборщика мусора.</p>\n<h4>Confirm mode</h4>\n<p>Для повышенных гарантий доставки на стороне продюсера, можно перевести канал в confirm mode. В этом режиме каждому сообщению присваивается уникальный идентификатор. Когда сообщение доставлено всем нужным очередям, канал отправит продюсеру <em>publisher confirm</em> с идентификатором сообщения и атрибутом метода = Ack. Если сообщение и очереди устойчивы (durable), то конфирм придет только после того, как сообщение будет записано на диск.</p>\n<p>Если из-за внутренних ошибок RabbitMQ сообщение утеряно, то в продюсер будет отправлен конфирм с атрибутом метода = Nack.</p>\n<h3>Dead letter queue</h3>\n<p>Можно настроить очереди так, чтобы недоставленные сообщния отсылались на специальный exchange при следующих условиях:</p>\n<ul>\n<li>очередь превышает заданное количество сообщений</li>\n<li>очередь превышает заданное количество байт</li>\n<li>TTL истекло</li>\n</ul>\n<h2>Кластеризация</h2>\n<h3>Очереди</h3>\n<p>По дефолту в кластере содержимое очередей - <strong>не реплицируется</strong>. Сообщения очереди хранятся только на владельце очереди - то есть узле, к которому был присоединен клиент, создающий очередь. Всем остальным узлам доступны только метаданные об очереди и указатель на владельца очереди. </p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/1433c/rabbitmq-clustering.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 77.47440273037543%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAACrklEQVQ4y6WT+U5TQRTG+wS+gonxIUzUxP/VuCVGQQVjQoKCgpqogKAgi1YuhQtoDJLgggvKclu2YpCtUFxTZbFQEIsgS0otSAv3tv05aSmRxGgCk3xzZuZkvvOdc2Z0rIxgMBiyU655HjS9515dD70D46u+iP9/QxdZBALhC4NjU8RJJqKzX/Kg+WPYtxHCIec0l8paSS41U/X608YJPzu+c0LfzO68Fu4q1vUT+gOBkLXYRtm8J4oD2/eTLRtXg62bsNU2zqETUeTv20V6SWPY5w+sqvwX/krY8WGYLUdkNh0q5IxUF3kD/1UWIdVFNoEVwqlZNxVKJ2UvWrHa7KEzl0cTUJlbWMY17w1hTsC9oAos41nUVoPq/pS7tkzhADU9Dq49fULW83JuVncjGUcE7ALDZD1rIaWinIxKE9bB6bUpLwXmxKyF1l6fjyWfl5GJBbJMMntTs9kWW0B8SRJSfS+SMklubR3J9+M5V5pCanUSReaXeOY1oRCVWmsDF4plipWHuBdn8GuiBNoSlv4fXG+4zIGcdHYmGTj7MI6rlXrSHlWS8jidfMtJDD0JFL6JJadexjH+C93QrIVjxefZerCSHRfTMPXfw6+KhDWv6Pgs2cYq8swxZCrR6NvjuPIkhUT5Bhm1F7jVFkdGTTS5zYnk1HXQN+pCZ3N2kPAohsO5V4i5c4qqtzLaMiGFXX0T6I1OCs2ido2d6F/dosAai9R5Gqk7Bn1TBVJTm0jXxm3lK3bxy3Q+Ua/H7RKZ1UcpMCUxNukgKPqhqUsMO2fQKw7klhlkswfJ3EVuSyLXlONCVSqG5iGKzW4RcJoi0yAu989wU/xqkDHnN+Y9v0JNUVUVr9cniP1UtQ1QWG+npPGLwBgGxULO0wqK6m1iP0ppkx2DcZDWd0Ohu78B9JAXxmZTQnoAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Clustering"\n        title=""\n        src="/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/10273/rabbitmq-clustering.png"\n        srcset="/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/9b14a/rabbitmq-clustering.png 163w,\n/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/94962/rabbitmq-clustering.png 325w,\n/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/10273/rabbitmq-clustering.png 650w,\n/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/2fc6f/rabbitmq-clustering.png 975w,\n/hows-that-again/static/ce22777567c69b59edc41a4f5a7065c0/1433c/rabbitmq-clustering.png 1172w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Когда узел умирает, все его очереди и привязки пропадают. При этом если на нем была durable очередь и после смерти узла мы попытаеся ее пересоздать на другом узле, то получим ошибку 404 NOT FOUND. Это нужно, чтобы сообщения из очереди не пропали, если умерший узел вдруг оживет. Таким образом, единственный способ получить доступ к этой очереди опять - это оживить умерший узел. Если же очередь не была durable, то ее можно пересоздать без проблем.</p>\n<h3>Точки обмена</h3>\n<p>Всей маршрутизацией занимаются каналы, поэтому на эксченджи ограничения, касающиеся очередей, не накладываются. Эксченджи реплицируются и переобъявлять их в случае смерти узлов не нужно. </p>\n<p>Если же узел, на котором находится канал, умирает до того как канал успел отправить сообщение в нужную очередь, то сообщение теряется. Решение - AMQP-транзакции, или publisher confirms.</p>\n<h3>Mirrored queues</h3>\n<p>В версии 2.6.0 было реализовано отражение очередей. То есть, очереди теперь реплицируются, но в режиме master-slave. Если мастер умирает, то старейший слэйв становится новым мастером.</p>\n<p>При создании очереди нужно указать атрибут <code>x-ha-policy</code>. ЗНачение может быть либо <code>all</code> - тогда очередь будет реплицироваться на все узлы, либо <code>nodes</code> - и тогда в атрибуте <code>x-ha-policy-params</code> можно перечислить список узлов, на которые нужно реплицировать, но тогда, если хоть один из узлов недоступен, то очередь создать не удастся.</p>\n<p>В случае зеркальных очередей канал при роутинге вернет мастер-очередь и список зеркальных очередей. А при использовании publisher confirmation, он придет только после того как сообщение досттигнет всех зеркальных очередей.</p>',frontmatter:{path:"/blog/rabbitmq",title:"RabbitMQ"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-rabbitmq-f591f04c8eff604d8f41.js.map