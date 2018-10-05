webpackJsonp([0x79bd3db25a66],{434:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>npm</h1>\n<p>Вся документация по npm здесь: <a href="https://docs.npmjs.com/all">https://docs.npmjs.com/all</a></p>\n<h2>Синтаксис версий</h2>\n<p><a href="https://docs.npmjs.com/files/package.json#dependencies">Источник</a></p>\n<ul>\n<li><code>version</code> Must match <code>version</code> exactly</li>\n<li><code>>version</code> Must be greater than <code>version</code></li>\n<li><code>>=version</code> etc</li>\n<li><code>&#x3C;version</code></li>\n<li><code>&#x3C;=version</code></li>\n<li><code>~version</code> "Approximately equivalent to version" See <a href="https://docs.npmjs.com/misc/semver">semver</a></li>\n<li><code>^version</code> "Compatible with version" See <a href="https://docs.npmjs.com/misc/semver">semver</a></li>\n<li><code>1.2.x</code> 1.2.0, 1.2.1, etc., but not 1.3.0</li>\n<li><code>http://...</code> See \'URLs as Dependencies\' below</li>\n<li><code>*</code> Matches any version</li>\n<li><code>""</code> (just an empty string) Same as <code>*</code></li>\n<li><code>version1 - version2</code> Same as <code>>=version1 &#x3C;=version2</code>.</li>\n<li><code>range1 || range2</code> Passes if either range1 or range2 are satisfied.</li>\n<li><code>git...</code> See \'Git URLs as Dependencies\' below</li>\n<li><code>user/repo</code> See \'GitHub URLs\' below</li>\n<li><code>tag</code> A specific version tagged and published as <code>tag</code> See <code>[npm-dist-tag](https://docs.npmjs.com/cli/dist-tag)</code></li>\n<li><code>path/path/path</code> See <a href="https://docs.npmjs.com/files/package.json#local-paths">Local Paths</a> below</li>\n</ul>\n<p>Создание нового package.json: <code>npm init</code></p>\n<p>Если все настройки нужны дефолтные, то можно <code>npm init --yes</code></p>\n<p>При дефолтных настройках будет создан package.json следующего содержания:</p>\n<pre><code class="language-json">{\n    "name": "npm",\n    "version": "1.0.0",\n    "description": "",\n    "main": "index.js",\n    "scripts": {\n        "test": "echo \\"Error: no test specified\\""\n    },\n    "author": "",\n    "license": "ISC"\n}\n</code></pre>\n<p><code>main</code> - указывает, какой скрипт будет запущен (через <code>require</code>), когда кто-то сделает <code>require(\'./module\')</code>, где <strong>module</strong> - это папка, в которой лежит наш <code>package.json</code></p>\n<p><strong>Корневой папкой</strong> для npm считается первая папка по иерархии вверх, начиная с текущей, в которой есть package.json.</p>\n<p><code>npm install &#x3C;module></code> - установит модуль в корневую папку, но не сохранит его в <code>package.json</code>. По умолчанию качается последняя версия.</p>\n<p><code>npm install --save &#x3C;module></code> - установит модуль в корневую папку и сохранит его в <code>package.json</code>. Туда добавляется версия с префиксом ^, то есть версия, совместимая с последней на данный момент.</p>\n<p>Если в <code>require</code> указан путь, начинающийся с /, ./ или ../, то ищется файл по указанному относительному пути, начиная с расположения текущего исполняемого файла.</p>\n<p>Когда делается <code>require(\'&#x3C;module>\')</code> то сначала в <em>текущей</em> папке ищется папка <strong>node_modules</strong>, затем в ней ищется папка <code>&#x3C;module></code>, а в ней <code>package.json</code>, из которого берется <code>main</code> и запускается этот файл. Если что-то в этом пути не найдено, то ищется <code>node_modules</code> в папке на 1 уровень выше, затем еще выше и т.д. Если так ничего и не нашлось, то ищет среди глобальных модулей.</p>\n<h2>Глобальные модули</h2>\n<p>Если есть переменная окружения <strong>NODE_PATH</strong>, где через точку с запятой перечислены пути, то сначала модуль ищется там.</p>\n<p>Затем модули ищутся по следующим адресам:</p>\n<ul>\n<li>1: <code>$HOME/.node_modules</code></li>\n<li>2: <code>$HOME/.node_libraries</code></li>\n<li>3: <code>$PREFIX/lib/node</code></li>\n</ul>\n<p>где $HOME - домашняя папка юзера, а $PREFIX - переменная node_prefix (???)</p>\n<p>У меня на домашней машине все глобальные модули ставятся в <strong>"C:\\Users\\Y\\Application Data\\npm"</strong></p>\n<p>Если нужно удалить все глобальные модули, то, <em>кажется</em>, можно удалить эту папку. А для локальных - удалить соответствующую <strong>node_modules</strong>. У меня так сработало, но возможно это не во всех случаях поможет. Вообще на этот случай есть модуль <strong>rimraf.</strong></p>\n<p>Документация по модулям в NodeJS: <a href="https://nodejs.org/api/modules.html">https://nodejs.org/api/modules.html</a></p>\n<p><code>npm list</code> - выводит список всех установленных в текущем проекте модулей и их версий. Если какой-то модуль перечислен в <strong>packages.json</strong>, но не установлен в текущем проекте, то про него будет ошибка.</p>\n<p><code>npm list -g</code> - выводит список глобальных модулей</p>\n<p>В packages.json могут быть описаны несколько скриптов, например:</p>\n<pre><code class="language-js">"scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test --env=jsdom",\n    "eject": "react-scripts eject"\n}\n</code></pre>\n<p>Вызываются эти скрипты так:</p>\n<p><code>npm run start</code>\n<code>npm run build</code></p>\n<h2>Локальный тест упаковки пакета**</h2>\n<pre><code class="language-shell">npm pack //пакуем\ntar -tf packagename-version.tgz //смотрим, что внутри\nnpm install ../path/to/your/npm/packagename-vesion.tgz //устанавливаем\n</code></pre>\n<h2>Локальный дебаг пакета</h2>\n<p>Допустим, разрабатываем плагин для PostCSS в виде пакета <code>postcss-simple-plugin</code> и хотим затестить его в проекте <code>postcss-test</code>. Делаем так:</p>\n<pre><code class="language-shell">cd ~/postcss-simple-plugin\nnpm link\ncd ~/postcss-test\nnpm link postcss-simple-plugin\n</code></pre>\n<h2>Размер</h2>\n<h3>Размер бандла</h3>\n<p>Для подсчета размера бандла можно воспользоваться утилитой <code>size-limit</code>.</p>\n<p>Пишем в <code>package.json</code>:</p>\n<pre><code class="language-json">"size-limit": [\n  {\n    "path": "index.js"\n  }\n],\n</code></pre>\n<p>И запускаем в консоли <code>size-limit</code> без параметров - он выдаст размер бандла со всеми зависимостями и в сжатом виде.</p>\n<p>Если нужно разобраться, то <code>size-limit --why</code>.</p>\n<h3>Размер пакета</h3>\n<p>Здесь поможет утилита <code>package-size</code>. Она качает и устанавливает пакет во временную директорию, но работает только для уже опубликованных пакетов. </p>\n<p><code>package-size react</code> </p>',frontmatter:{path:"/blog/npm",title:"npm"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-npm-4f38b5dbca23541666f7.js.map