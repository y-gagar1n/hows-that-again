webpackJsonp([0xce62c1a7b954],{489:function(n,p){n.exports={data:{markdownRemark:{html:'<iframe width="640" height="360" src="https://www.youtube.com/embed/_ZbwXm8-VsE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n<h2>The pre-fork model</h2>\n<p>Используется в Apache. Для каждого (на самом деле каждый форк обрабатывает несколько запросов, это количество определяется конфигом) запроса делается свой форк (копия процесса в unix). Каждый форк имеет.1 поток и обрабатывает лишь один запрос в каждый момент времени. <code>pre</code> означает, что форки создаются заранее. Получается как бы "пул форков".</p>\n<ul>\n<li>Модель полезна, когда используются не-потокобезопасные библиотеки. </li>\n<li>Проблемы, возникающие при обработке запроса повлияют только на этот форк, а не на весь сервер. </li>\n<li>Мастер-процесс определяет размер пула форков, может динамически его изменять.</li>\n</ul>\n<p>Помимо этой модели, в Apache есть еще mpm<em>worker (создаются несколько воркеров, каждый имеет несколько потоков) и mpm</em>event (похож на mpm_worker, но оптимизирован под работу с keep-alive соединениями, для которых выделяет отдельные потоки)</p>\n<h2>Throughput</h2>\n<p>Максимальная пропускная способность сети TP &#x3C;= window / RTT</p>\n<p>где:</p>\n<p>TP = Throughput\nwindow = TCP window (buffer) size - размер одного пакета, на моем макбуке = 128 КБ\nRTT = round-trip time, он же пинг - время отправки запроса + время получения на него ответа.</p>\n<h2>HTTP Keep-Alive</h2>\n<p>При установке заголовка Keep-Alive соединения переиспользуются при следующих запросах. В этом случае нам не нужно заново делать рукопожатие и постепенное нарастание window size (flow control).</p>\n<p>Конфликтует с моделью <strong>prefork</strong>, так как соединения не рвутся и даже небольшое количество пользователей исчерпывает пул форков полностью. </p>\n<h2>Apache VS Nginx</h2>\n<p>Nginx хорош для обработки статики и проксирования динамических запросов на другие сервера. Очень легковесный и быстрый. Легко масштабируется. Был создан для решения проблемы C10K. Решает ее благодаря асинхронной event-driven архитектуре. </p>\n<p>Apache хорош для динамических запросов. Имеет много интеграций со сторонним софтом. </p>\n<p>Nginx создает однопоточные воркеры, каждый из которых может обрабатывать тысячи соединений. Каждое событие помещается в event loop. В этом цикле события обрабатываются асинхронно. </p>\n<h2>Балансировка через DNS</h2>\n<p>Большинство клиентов использует первый IP-адрес в полученном списке, поэтому обычно сервера шлют список адресов каждый раз в разном порядке.</p>\n<p>По RFC 1123 ответы от DNS должны сообщаться по UDP и иметь размер не более 512 байт.\nРазмер 1 записи A-record - 16 байт.\nРазмер заголовка пакета - 100 байт.\nИтого можем иметь не более, чем (512 - 100) / 16 = 25 серверов.</p>\n<p>Главный недостаток такого подхода в том, что между нашим DNS-сервером и браузером обычно еще есть DNS на стороне провайдера, роутера, возможно локальный DNS на машине пользователя - и все со своими кэшами, возможно, с разным TTL.</p>\n<p>Статические данные в этом случае нужно хранить на отдельных серверах, чтобы:</p>\n<ul>\n<li>не хранить несколько копий всех картинок (по одной на каждый сервер)</li>\n<li>запросы картинок не блокировали быстрые запросы к API</li>\n</ul>\n<h3>Перебор адресов на стороне клиента</h3>\n<p>Допустим, клиент получил от DNS несколько IP-адресов и выбрал один из них, к которому будет обращаться. После этого, при отказе этого сервера:</p>\n<ul>\n<li>если он лежит напрочь и никто по этому адресу не отвечает, то клиент будет честно ждать таймаут прежде чем обратиться к лседующему адресу</li>\n<li>если же сервер поднят, но на нем не запущен веб-сервис и никто не принимает соединение на порту 80, то клиент получает от него отказ за время, равное пингу, и клиент сразу же идет на следующий адрес</li>\n</ul>\n<h2>Балансировка через Nginx</h2>\n<p>Все просто - ставим сервер Nginx, настраиваем его как прокси с балансировкой. </p>\n<p>Если нужно, можно несколько таких серверов поставить и настроить VRRP, то есть использование Virtual-IP, чтобы они работали под одним IP. При использовании VRRP один сервер маршрутизации становится мастер-роутером, а остальные - бэкап-роутерами. Если мастер становится недоступен, то его роль берет на себя один из бэкап-роутеров. Недостаток такого подхода - требуется сеть L2 между серверами.</p>\n<h2>Динамическая маршрутизация</h2>\n<p>Основные протоколы: BGP, OSPF.</p>\n<h3>Использование автономных систем</h3>\n<p>Автономная система - набор сетей под управлением одного администратора.</p>\n<p>Подход заключается в том, что несколько точек в разных географических точках анонсируют один и тот же IP. Дальше маршрут от клиента до ДЦ автоматически выбирается провайдером на основании минимальной метрики. </p>',frontmatter:{path:"/blog/video/http-balancing",title:"Балансировка HTTP-трафика / Антон Резников (Mail.Ru Group)"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-video-http-balancing-6eec4894584ee04d7a77.js.map