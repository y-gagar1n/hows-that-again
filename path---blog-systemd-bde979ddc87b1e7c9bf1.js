webpackJsonp([0x93d6eb60c8dd],{491:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>systemd</h1>\n<p>Разберем работу с systemd на примере службы запуска vpn</p>\n<h2>Создание нового сервиса</h2>\n<p>Создаем файл по адресу <code>/etc/systemd/system/vpn.service</code> следующего содержания:</p>\n<pre><code>[Unit]\nAfter=network.target\n\n[Service]\nExecStart=/usr/local/bin/start-vpn.sh\nUser=user\nRestart=always\n\n[Install]\nWantedBy=default.target\n</code></pre>\n<p><code>After=network.target</code> - означает, что нашу службу надо запускать после того, как будет поднята сеть. В зависимости от целей службы могут быть и другие таргеты, нужно гуглить.</p>\n<p><code>ExecStart=/usr/local/bin/start-vpn.sh</code> - адрес скрипта, который нужно запустить. Содержание скрипта любое.</p>\n<p><code>User=user</code> - указать пользователя, под которым будет запускаться служба. </p>\n<p><code>Restart=always</code> - что делать, если служба упала. Эта настройка указывает, что нужно несколько раз пытаться перезапустить службу с интервалом в 100мс между попытками. Если все попытки неудачны, то <code>systemd</code> сдается.</p>\n<p><code>WantedBy=default.target</code> - к какому таргету относится сама наша служба. Дефолтного в большинстве случаев должно хватить.</p>\n<h3>Регистрация сервиса</h3>\n<p>После создания сервис нужно зарегистрировать.</p>\n<p>Для начала перезапускаем systemd, чтобы он увидел наш vpn.service:</p>\n<pre><code class="language-shell">sudo systemctl daemon-reload\n</code></pre>\n<p>Потом регистрируем:</p>\n<pre><code class="language-shell">sudo systemctl enable vpn\n</code></pre>\n<p>Протестировать запуск службы можно так:</p>\n<pre><code class="language-shell">sudo systemctl start vpn\n</code></pre>\n<h3>Логи</h3>\n<p>Просмотр логов службы:</p>\n<pre><code class="language-shell">sudo journalctl -u vpn.service\n</code></pre>',frontmatter:{path:"/blog/systemd",title:"systemd"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-systemd-bde979ddc87b1e7c9bf1.js.map