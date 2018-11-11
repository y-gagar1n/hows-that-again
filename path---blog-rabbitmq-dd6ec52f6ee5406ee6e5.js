webpackJsonp([0x8761e0317f78],{451:function(n,a){n.exports={data:{markdownRemark:{html:'<h1>RabbitMQ</h1>\n<h2>Терминология</h2>\n<p>Queue - очередь</p>\n<p>Binding - привязка</p>\n<p>Exchange - точка обмена</p>\n<p>Topic - топик</p>\n<p>Routing key - ключ роутинга</p>\n<p>Binding key - ключ привязки</p>\n<p>Payload - тело сообщения</p>\n<p>Acknowledgement - подтверждение</p>\n<h2>Принципы работы</h2>\n<p>Продюсеры создают сообщения и шлют их на брокера.</p>\n<p>Сообщения состоят из ключа роутинга, идентификатора точки обмена и тела сообщения.</p>\n<p>Консюмеры подсоединяются к брокеру, подписываются на <em>очередь</em> и принимают из нее сообщения. Ключ сообщения и идентификатор точки обмена консюмер не получает - только тело. После получения <strong>каждого</strong> сообщения консюмер должен послать <strong>acknowledgement</strong>, вручную или автоматически. Пока не послать подтверждение, следующее сообщение в этот консюмер не придет.</p>\n<p>Прежде чем читать или писать сообщения в очередь, приложение должно поднять <em>AMQP-канал</em>. Это виртуальный канал связи внутри TCP-соединения, по которому посылаются команды AMQP. Таких каналов может быть много внутри одного TCP-соединения и они нужны, чтобы каждому потоку не приходилось открывать свое TCP-соединение, что было бы очень дорого (TCP-соединения не потокобезопасны, могут использоваться не больше чем одним потоком на запись и не больше чем одним - на чтение).</p>\n<h3>Создание новых очередей</h3>\n<p>И консюмеры и продюсеры могут создавать новые очереди командой <em>queue.declare</em>, но консюмеры не могут использовать команду, пока подписаны на другую очередь в этом же канале.</p>\n<p>Для очередей могут быть заданы специальные свойства:</p>\n<ul>\n<li><strong>exclusive</strong>: очередь становится приватной и только текущее приложение может быть ее консюмером</li>\n<li><strong>auto-delete</strong>: очередь автоматически удаляется, когда от нее отписывается последний консюмер.</li>\n<li><strong>durable</strong>: сообщения не теряются при рестарте RabbitMQ. </li>\n</ul>\n<p>Если нужна временная очередь для текущего приложения, то можно создать ее со свойствами <strong>exclusive</strong> и <strong>auto-delete</strong>.</p>\n<p>Если попытаться записать сообщение в несуществующую очередь, то оно будет просто проигнорировано, поэтому лучше всегда заранее ее явно создавать. Если при попытке создания окажется, что очередь с такими же параметрами уже есть, то Rabbit не сделает ничего и вернет успех.</p>\n<h3>Точки обмена / exchanges</h3>\n<p>Продюсеры шлют сообщения не напрямую в очереди, а в точки обмена (exchange). Очереди <em>привязываются</em> к эксченджам посредством ключей привязок. Получив сообщение в эксчендж, Rabbit сравнивает ключ роутинга сообщения (который может быть и пустым), с имеющимся ключами привязок. Найдя соответствие, Rabbit посылает сообщение в нужную очередь. Если соответствие не найдено, то сообщение игнорируется.</p>\n<p>Такое разделение позволяет изолировать продюсера от логики распределения сообщений по очередям.</p>\n<p>Используя такую схему, можно реализовывать разные паттерны рассылки сообщений:</p>\n<ul>\n<li><strong>direct</strong>: сообщение шлется в одну конкретную очередь. Создаем дефолтную точку обмена с пустым именем. При создании очереди, она автоматически будет привязана к дефолтной точке обмена, используя имя очереди в качестве ключа привязки. После этого достаточно слать сообщения в точку обмена без имени с названием очереди вместо ключа роутинга.</li>\n<li><strong>fanout</strong>: каждое сообщение шлется сразу на несколько очередей. Для реализации нужно привязать все заинтересованные очереди к одной точке обмена под одним и тем же ключом привязки. Потом этот ключ используем в качестве ключа роутинга и готово.</li>\n<li><strong>topic</strong>: используем символ * в ключах привязок, легче объяснить картинкой</li>\n</ul>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/121add905627856b09592f0a3fc25b54/c8ef7/rabbitmq-topic-exchange.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 129.4478527607362%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAABYlAAAWJQFJUiTwAAAECUlEQVRIx5VV22sjdRTOP+CjPvugPikIBX1RBKH4tPiwdB+EhQV9qCDLLiuo4IMIBQuCRUFc8Gm7tnarabNtUrtJTWhzncR0kpnMJM1MMsnkfk/TXE3yOZdOnDa1xJOETM45v+98v3OLAToZj8eT7+FoiOFwiNF4NLFrOvmj99WLQQ+mGcVyAmwhAK4SBi0S8ET+RJBzKr9PSqRiSxX5qXPTgNJLfnO5COiiB3TBC0fIjIe/rGB16ye4I3+AyXvAlLxgUyGo7jMA8nkWsarEsErC6jPBRpjw9Og3rO2vI1QKga0dIyrMCiilTCjG4E3Y8P2TZaxsLMEcNEIsOJD2fouUaxlx3gRWZGYDlGuQqfLYIdYx9/5rePW9V3Bv5T6K7CP477+A40+eQ/JoSbq6lMPReDbAdIWDg93Fwr0b+Prh57CEdiDGN8H9+C5Cv36MGLeFWI5VbnM94LkhlqbhPTmA78QOP+dAMHkEN2NFkHeAzBDw8YegueMZqnxuaDab4Hke6XQKJpMJTqcTu2YzdnbNSCYSko1TfK4FvNzcspRKJcTjcTQaDSSTSXAcp+iu8r2W4WikTofT5UKv10MulwPDsuj3+wpbvc/MDIvFIgKBgDo5ogiKopRngiAmLK8aP8NlIC2y1+tFrVZTnnP5POhIRHmuVCog/P7/d+VqtYrIOcBgMIAgCEhIxdAkHA4rwfTXvgB4mR3DMKjX6xNnuTBaAC0dNE3/97bRs5Mr6pPypKwraU3JUigUlCB6nZySVqs1dTvDZXbBYBB5KWd6XSaTmTDSALPZLEiSnKq4QY8uR3S73VNR5cMaoHxY07uktup0Ohf8FUAtKhkKSdORPj84vsBQy6Gs0/SCkATLRCbMJ4CydM662DJuXzkFLBOF80ht6LGOoSybxh1U6v/m0iBHKzYzcARs2LZuIipSaJxV1RS0T+EJH2LXbgTBeFEe1NHqnqnz3mmiUqIQdm0gydhQaYro/z2Aod/vwUaaMP/h23jj5utYXLoNLq9e45gJYP7OW5i79SaWv7mFtO0zpDi1qeNlHnHTIoJfvozcD3Og6E1UT09h6PW6sEv/G/N33sEHDxbw3foSYqI6Zkycws27N3D3q9t4tPgiyAfPQwjuKTaunETsyUcIfPESqJ8XQEfNEmADhrN2C5ECAaNzFQehpxDaYbBpUlnv2VIKgaxLao8N8OZPEQmvQhCjCiBfiCGZt4IMPkasTEgYftQaFRja7Tbc1AGeeUywHP4OB2nBXxGvOsPFDFzUM2zsPYbZtwc7ZUVC5FT2fAgH5D7WLGvY92zDHrCgVq+qVZYnQV6mmWxGmdtmQ12e8rqS2yiXyyIjppCWbN1Od9KzqZSAvGQTxbSy4uTW+QckMHuAUQEukQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Topic exchange"\n        title=""\n        src="/hows-that-again/static/121add905627856b09592f0a3fc25b54/10273/rabbitmq-topic-exchange.png"\n        srcset="/hows-that-again/static/121add905627856b09592f0a3fc25b54/9b14a/rabbitmq-topic-exchange.png 163w,\n/hows-that-again/static/121add905627856b09592f0a3fc25b54/94962/rabbitmq-topic-exchange.png 325w,\n/hows-that-again/static/121add905627856b09592f0a3fc25b54/10273/rabbitmq-topic-exchange.png 650w,\n/hows-that-again/static/121add905627856b09592f0a3fc25b54/c8ef7/rabbitmq-topic-exchange.png 652w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Для того, чтобы указать правило привязки <em>match-all</em>, нужно использовать символ "#". Его отличие от * в том, что * считает знак "." разделителем частей и матчит любой текст только лишь в соответствующей части ключа. То есть logs.* === logs.critical, но logs.* != logs.critical.minor.</p>\n<h3>Виртуальные хосты</h3>\n<p>Внутри одного сервера RabbitMQ можно запустить несколько виртуальных инстансов RabbitMQ, которые будут друг от друга полностью изолированы. При старте RabbitMQ автоматически создает один дефолтный vhost. </p>\n<p>Добавление и удаление виртуальных хостов осуществляется командами <code>rabbitmqctl add_vhost [vhost_name]</code> и <code>rabbitmqctl delete_vhost [vhost_name]</code>.</p>\n<h3>Гарантии доставки</h3>\n<p>Чтобы сообщения не терялись никогда, должны быть выполнены 3 условия:</p>\n<ol>\n<li>очередь должна быть durable</li>\n<li>точка обмена тоже должна быть durable</li>\n<li>для сообщения должен быть указан <em>delivery mode=2</em>. </li>\n</ol>\n<p>Только в этом случае гарантируется надежное хранение сообщения вплоть до момента, когда поступит подтверждение от консюмера, получившего его. После этого RabbitMQ помечает сообщение, как мусор для сборщика мусора.</p>\n<h4>Confirm mode</h4>\n<p>Для повышенных гарантий доставки на стороне продюсера, можно перевести канал в confirm mode. В этом режиме каждому сообщению присваивается уникальный идентификатор. Когда сообщение доставлено всем нужным очередям, канал отправит продюсеру <em>publisher confirm</em> с идентификатором сообщения и атрибутом метода = Ack. Если сообщение и очереди устойчивы (durable), то конфирм придет только после того, как сообщение будет записано на диск.</p>\n<p>Если из-за внутренних ошибок RabbitMQ сообщение утеряно, то в продюсер будет отправлен конфирм с атрибутом метода = Nack.</p>\n<h2>Кластеризация</h2>\n<p>TODO: все очень плохо с репликацией</p>',frontmatter:{path:"/blog/rabbitmq",title:"RabbitMQ"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-rabbitmq-dd6ec52f6ee5406ee6e5.js.map