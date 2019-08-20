webpackJsonp([0x93d6eb60c8dd],{498:function(e,a){e.exports={data:{markdownRemark:{html:'<h1>systemd</h1>\n<p>Разберем работу с systemd на примере службы запуска vpn</p>\n<h2>Создание нового сервиса</h2>\n<p>Создаем файл по адресу <code class="language-text">/etc/systemd/system/vpn.service</code> следующего содержания:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">[Unit]\nAfter=network.target\n\n[Service]\nExecStart=/usr/local/bin/start-vpn.sh\nUser=user\nRestart=always\n\n[Install]\nWantedBy=default.target</code></pre></div>\n<p><code class="language-text">After=network.target</code> - означает, что нашу службу надо запускать после того, как будет поднята сеть. В зависимости от целей службы могут быть и другие таргеты, нужно гуглить.</p>\n<p><code class="language-text">ExecStart=/usr/local/bin/start-vpn.sh</code> - адрес скрипта, который нужно запустить. Содержание скрипта любое.</p>\n<p><code class="language-text">User=user</code> - указать пользователя, под которым будет запускаться служба. </p>\n<p><code class="language-text">Restart=always</code> - что делать, если служба упала. Эта настройка указывает, что нужно несколько раз пытаться перезапустить службу с интервалом в 100мс между попытками. Если все попытки неудачны, то <code class="language-text">systemd</code> сдается.</p>\n<p><code class="language-text">WantedBy=default.target</code> - к какому таргету относится сама наша служба. Дефолтного в большинстве случаев должно хватить.</p>\n<h3>Регистрация сервиса</h3>\n<p>После создания сервис нужно зарегистрировать.</p>\n<p>Для начала перезапускаем systemd, чтобы он увидел наш vpn.service:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">sudo</span> systemctl daemon-reload</code></pre></div>\n<p>Потом регистрируем:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> vpn</code></pre></div>\n<p>Протестировать запуск службы можно так:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">sudo</span> systemctl start vpn</code></pre></div>\n<h3>Логи</h3>\n<p>Просмотр логов службы:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">sudo</span> journalctl -u vpn.service</code></pre></div>',frontmatter:{path:"/blog/systemd",title:"systemd"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-systemd-3c5d81a37ef2bf9633a3.js.map