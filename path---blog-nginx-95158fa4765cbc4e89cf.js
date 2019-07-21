webpackJsonp([28480827339995],{465:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>Nginx</h1>\n<h2>Методы балансировки нагрузки Nginx</h2>\n<ul>\n<li><code>round-robin</code> – запросы к приложению распределяются в цикле по очереди</li>\n<li><code>least-connected</code> – каждый последующий запрос отправляется серверу с наименьшей загруженностью</li>\n<li><code>ip-hash</code> – сервер, которому будет отправляться запрос выбирается с помощью хэш-функции, основанной на IP адресах клиентов</li>\n</ul>\n<h2>Метод round-robin</h2>\n<p>Метод является методом по умолчанию, пример простой конфигурации с тремя серверами nginx:</p>\n<pre><code class="language-javascript">http {\n    upstream facematicd {\n        server ip.fmt.1;\n        server ip.fmt.2;\n        server ip.fmt.3;\n    }\n\n    server {\n        listen 80;\n\n        location / {\n            proxy_pass http://facematicd;\n        }\n    }\n}\n</code></pre>\n<p>Все запросы балансируются по принципу round-robin и перенаправляются nginx-ом к группе серверов facematicd. Помимо HTTP также для балансировки нагрузки поддерживаются протоколы HTTPS, FastCGI, uwsgi, SCGI, memcached и gRPC.\nДля использования HTTPS нужно только поменять протокол в секции <code>location</code>, с <code>http</code> на <code>https</code>.\nДля использования других протоколов необходимо только менять proxy<em>pass ключ в секции location на соответствующий: `fastcgi</em>pass<code>,</code>uwsgi<em>pass<code>,</code>scgi</em>pass<code>,</code>memcached<em>pass<code>,</code>gprc</em>pass`.</p>\n<h2>Метод least-connected</h2>\n<p>Метод позволяет более осознанно распределять нагрузку, в ситуациях, когда запросы требуют длительного времени на исполнение.\nМетод не будет загружать серверы избыточными запросами, будет стараться отправлять новые запросы на наименее загруженные серверы.\nДля активации метода нужно только указать соответствующую директиву <code>least_conn</code>, в конфигурации upstream группы серверов:</p>\n<pre><code class="language-javascript">     upstream facematicd {\n        least_conn;\n        server ip.fmt.1;\n        server ip.fmt.2;\n        server ip.fmt.3;\n    }\n</code></pre>\n<h2>Метод поддержания сессии, ip_hash</h2>\n<p>Методы балансировки <code>round-robin</code> и <code>least-connected</code> подразумевают, что любой запрос потенциально может попасть на любой из указанных серверов, отсутствует гарантия, что один и тот же клиент будет работать с одним сервером. Используется, если есть необходимость “привязать” клиента к конкретному серверу с приложением.\nДля определения группы сервера для отправки запросов используются IP адреса клиента, в качестве hashing key(хэш ключа). Метод гарантирует, что один клиент будет всегда обращаться к конкретному серверу, за исключением ситуации, когда этот сервер оказался недоступным.\nДля активации метода нужно только указать соответствующую директиву <code>ip_hash</code>, в конфигурации upstream группы серверов:</p>\n<pre><code class="language-javascript">    upstream facematicd {\n        ip_hash;\n        server ip.fmt.1;\n        server ip.fmt.2;\n        server ip.fmt.3;\n    }\n}\n</code></pre>\n<h2>Вес(приоритетность) серверов группы</h2>\n<p>В предыдущих примеров не были указаны веса серверов и nginx расценивал их как равнозначные, в такой конфигурации нагрузка распределяется наиболее равномерно между всеми участниками кластера, при условии, что запросы единообразны, и достаточно быстро обрабатываются.\nПараметр веса(weight) участвует в принятии решения по балансировке нагрузки и выборе сервера для запроса.</p>\n<pre><code class="language-javascript">    upstream facematicd {\n        server ip.fmt.1 weight=3;\n        server ip.fmt.2;\n        server ip.fmt.3;\n    }\n</code></pre>\n<p>С такой конфигурацией каждые 5 новых запросов будут распределятся по участникам кластера со следующей логикой: 3 запроса на первый сервер, и по одному на второй и третий. Веса можно использовать во всех схемах балансировки нагрузки – <code>round-robin</code>, <code>least-connected</code>, <code>ip-hash</code>.</p>\n<h2>Health checks, проверка работоспособности</h2>\n<p>Nginx включает проверки работоспособности сервера. Если ответ на запрос с определенного сервера приходит с ошибкой, то nginx помечает данный сервер как неработоспособный и не будет направлять на него запросы некоторое время.\nДиректива <code>max_fails</code> устанавливает какое количество ошибочных ответов от сервера можно получить за время <code>fail_timeout</code>. По умолчанию <code>max_fails</code> равен единице. Если установить в 0, то проверки работоспособности для этого сервера будут отключены. <code>fail_timeout</code> также определяет насколько долго сервер будет отмечен как неработоспособный. После того как пройдет <code>fail_timeout</code> nginx направит на сервер несколько запросов клиента, и если они будут удачными, то сервер снова будет отмечен как живой.</p>',frontmatter:{path:"/blog/nginx",title:"Nginx"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-nginx-95158fa4765cbc4e89cf.js.map