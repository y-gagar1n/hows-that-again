webpackJsonp([0x90d01150ddb9],{421:function(n,a){n.exports={data:{markdownRemark:{html:'<h1>BackstopJS</h1>\n<p>Утилита для сравнения скриншотов приложения.</p>\n<h2>Как использовать</h2>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell">backstop init\nbackstop <span class="token builtin class-name">test</span></code></pre></div>\n<p>Сравнивает актуальные скрины с теми, которые сохранены на диске, открывает веб-страницу с результатами сравнения.</p>\n<p>Если нужно пересохранить скрины, или если запускаем первый раз, то:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell">backstop <span class="token builtin class-name">test</span>    // выдаст ошибки теста, это нормально, так как скрины на диске не актуальны\nbackstop approve</code></pre></div>\n<h2>Настройка сценариев</h2>\n<p>После команды <code class="language-text">backstop init</code> на диске появится файл <code class="language-text">backstop.json</code>. В нем в узле <code class="language-text">scenarios</code> можно добавлять новые сценарии:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text"> &quot;scenarios&quot;: [{\n      &quot;label&quot;: &quot;BackstopJS Album&quot;,\n      &quot;cookiePath&quot;: &quot;backstop_data/engine_scripts/cookies.json&quot;,\n      &quot;url&quot;: &quot;http://192.168.1.3/#/content/albums/4234&quot;,\n      &quot;referenceUrl&quot;: &quot;&quot;,\n      &quot;readyEvent&quot;: &quot;&quot;,\n      &quot;readySelector&quot;: &quot;&quot;,\n      &quot;delay&quot;: 0,\n      &quot;hideSelectors&quot;: [],\n      &quot;removeSelectors&quot;: [],\n      &quot;hoverSelector&quot;: &quot;&quot;,\n      &quot;clickSelector&quot;: &quot;&quot;,\n      &quot;postInteractionWait&quot;: 0,\n      &quot;selectors&quot;: [],\n      &quot;selectorExpansion&quot;: true,\n      &quot;expect&quot;: 0,\n      &quot;misMatchThreshold&quot;: 0.1,\n      &quot;requireSameDimensions&quot;: true,\n      &quot;onBeforeScript&quot;: &quot;puppet/onBefore.js&quot;,\n      &quot;onReadyScript&quot;: &quot;puppet/onReady.js&quot;\n    },</code></pre></div>\n<h2>Преднастройка</h2>\n<p>В конфиге есть строки <code class="language-text">onBeforeScript</code>, <code class="language-text">onAfterScript</code>, они указывают на скрипты, которые будут выполнены перед сценарием. Эти скрипты можно указать глобальные (перед каждым сценарием) и локальные (перед определенным). Скрипты выполняются при помощи <code class="language-text">puppeteer</code>. По умолчанию лежат по адресу: <code class="language-text">backstop_data/engine_scripts/puppet/</code>. </p>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript">module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">page<span class="token punctuation">,</span> scenario<span class="token punctuation">,</span> vp</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  page<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'console\'</span><span class="token punctuation">,</span> <span class="token parameter">msg</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'PAGE LOG:\'</span><span class="token punctuation">,</span> msg<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// это нужно, чтобы в своей консоли видеть то, что выводим в консоль внутри puppeteer</span>\n\n  page<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  \t<span class="token comment">// здесь имеем доступ ко всему браузерному api: document, localStorage и прочее</span>\n  \t<span class="token comment">// эта функция выполняется через eval, поэтому брейкпойнты в ней ставить бесполезно</span>\n\tlocalStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">,</span> <span class="token string">"l"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"LOGIN: --> "</span><span class="token punctuation">,</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" &lt;---"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre></div>\n<h2>Проблемы</h2>\n<p>У меня так и не получилось использовать <code class="language-text">localStorage</code> в <strong>BackstopJS</strong>. Значения нормально выставляются через скрипты <strong>onBefore/onReady</strong>, но потом приложение читает undefined.</p>',frontmatter:{path:"/blog/backstopjs",title:"BackstopJS"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-backstopjs-440f435b6f9dfe842bf7.js.map