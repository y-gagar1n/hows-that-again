webpackJsonp([0x90d01150ddb9],{418:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>BackstopJS</h1>\n<p>Утилита для сравнения скриншотов приложения.</p>\n<h2>Как использовать</h2>\n<pre><code class="language-shell">backstop init\nbackstop test\n</code></pre>\n<p>Сравнивает актуальные скрины с теми, которые сохранены на диске, открывает веб-страницу с результатами сравнения.</p>\n<p>Если нужно пересохранить скрины, или если запускаем первый раз, то:</p>\n<pre><code class="language-shell">backstop test    // выдаст ошибки теста, это нормально, так как скрины на диске не актуальны\nbackstop approve\n</code></pre>\n<h2>Настройка сценариев</h2>\n<p>После команды <code>backstop init</code> на диске появится файл <code>backstop.json</code>. В нем в узле <code>scenarios</code> можно добавлять новые сценарии:</p>\n<pre><code> "scenarios": [{\n      "label": "BackstopJS Album",\n      "cookiePath": "backstop_data/engine_scripts/cookies.json",\n      "url": "http://192.168.1.3/#/content/albums/4234",\n      "referenceUrl": "",\n      "readyEvent": "",\n      "readySelector": "",\n      "delay": 0,\n      "hideSelectors": [],\n      "removeSelectors": [],\n      "hoverSelector": "",\n      "clickSelector": "",\n      "postInteractionWait": 0,\n      "selectors": [],\n      "selectorExpansion": true,\n      "expect": 0,\n      "misMatchThreshold": 0.1,\n      "requireSameDimensions": true,\n      "onBeforeScript": "puppet/onBefore.js",\n      "onReadyScript": "puppet/onReady.js"\n    },\n</code></pre>\n<h2>Преднастройка</h2>\n<p>В конфиге есть строки <code>onBeforeScript</code>, <code>onAfterScript</code>, они указывают на скрипты, которые будут выполнены перед сценарием. Эти скрипты можно указать глобальные (перед каждым сценарием) и локальные (перед определенным). Скрипты выполняются при помощи <code>puppeteer</code>. По умолчанию лежат по адресу: <code>backstop_data/engine_scripts/puppet/</code>. </p>\n<pre><code class="language-js">module.exports = async (page, scenario, vp) => {\n  page.on(\'console\', msg => console.log(\'PAGE LOG:\', msg.text()));    // это нужно, чтобы в своей консоли видеть то, что выводим в консоль внутри puppeteer\n\n  page.evaluate((x) => {\n    // здесь имеем доступ ко всему браузерному api: document, localStorage и прочее\n    // эта функция выполняется через eval, поэтому брейкпойнты в ней ставить бесполезно\n    localStorage.setItem("login", "l");\n    console.log("LOGIN: --> ", localStorage.getItem("login") + " &#x3C;---");\n  });\n};\n</code></pre>\n<h2>Проблемы</h2>\n<p>У меня так и не получилось использовать <code>localStorage</code> в <strong>BackstopJS</strong>. Значения нормально выставляются через скрипты <strong>onBefore/onReady</strong>, но потом приложение читает undefined.</p>',frontmatter:{path:"/blog/backstopjs",title:"BackstopJS"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-backstopjs-6e9ff9bcf4f8661b9ce4.js.map