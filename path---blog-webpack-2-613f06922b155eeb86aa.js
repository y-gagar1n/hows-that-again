webpackJsonp([48555064563601],{471:function(e,n){e.exports={data:{markdownRemark:{html:"<h1>Webpack</h1>\n<h2>Пример настройки webpack для реакта:</h2>\n<pre><code class=\"language-shell\">npm init\nnpm install -save react react-dom\nnpm install --global webpack\nnpm install -save-dev webpack-dev-server webpack\nnpm install -save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react\n</code></pre>\n<pre><code class=\"language-js\">#webpack.config.js\n\nconst path = require('path'); \n\nmodule.exports = { \n    entry: './index', \n    output: { \n        path: path.resolve('dist'), \n        filename: 'bundle.js',\n        sourceMapFilename: 'bundle.map',\n        publicPath: '/dist/'\n    },\n\n    devtool: '#source-map',\n    module: { \n        loaders: [ \n            { test: /\\.js$/, loader:'babel-loader', exclude: /node_modules/} \n        ] \n    } \n}\n</code></pre>\n<pre><code class=\"language-json\">#.babelrc\n\n{ \n    \"presets\":[ \n        \"es2015\", \"react\"\n    ] \n}\n</code></pre>\n<pre><code class=\"language-html\">#index.html\n\n&#x3C;!doctype html>\n&#x3C;html>\n&#x3C;head>\n&#x3C;title>Sample App&#x3C;/title>\n&#x3C;/head>\n&#x3C;body>\n&#x3C;div id='root'>\n&#x3C;/div>\n&#x3C;script src=\"./dist/bundle.js\">&#x3C;/script>\n&#x3C;/body>\n&#x3C;/html>\n</code></pre>\n<pre><code class=\"language-js\">#index.js\n\nimport React from 'react' \nimport ReactDOM from 'react-dom' \n\nReactDOM.render( \n    &#x3C;h1>Hello!&#x3C;/h1>, \n    document.getElementById(\"root\") \n)\n</code></pre>\n<h3>Построение</h3>\n<pre><code class=\"language-shell\">webpack\n</code></pre>\n<h3>Запуск на дев-сервере</h3>\n<pre><code class=\"language-shell\">webpack-dev-server\n</code></pre>\n<h3>Запуск с hot module replacement</h3>\n<pre><code>webpack-dev-server --inline\n</code></pre>\n<h2>Туториал:</h2>\n<p>Установка: <code>npm install webpack -g</code></p>\n<p>Создаем файл <strong>src\\index.js</strong>:</p>\n<pre><code>console.log('hello!');\n</code></pre>\n<p>Запускаем для него webpack:</p>\n<pre><code>webpack src\\index.js assets\\bundle.js\n</code></pre>\n<p>После этого webpack генерит <strong>bundle.js</strong> с кучей сгенерированного кода. Здесь описан наш index.js и все его зависимости:</p>\n<pre><code class=\"language-js\">/******/ (function(modules) { // webpackBootstrap\n/******/ // The module cache\n/******/ var installedModules = {};\n/******/\n/******/ // The require function\n/******/ function __webpack_require__(moduleId) {\n/******/\n/******/ // Check if module is in cache\n/******/ if(installedModules[moduleId]) {\n/******/ return installedModules[moduleId].exports;\n/******/ }\n/******/ // Create a new module (and put it into the cache)\n/******/ var module = installedModules[moduleId] = {\n/******/ i: moduleId,\n/******/ l: false,\n/******/ exports: {}\n/******/ };\n/******/\n/******/ // Execute the module function\n/******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ // Flag the module as loaded\n/******/ module.l = true;\n/******/\n/******/ // Return the exports of the module\n/******/ return module.exports;\n/******/ }\n/******/\n/******/\n/******/ // expose the modules object (__webpack_modules__)\n/******/ __webpack_require__.m = modules;\n/******/\n/******/ // expose the module cache\n/******/ __webpack_require__.c = installedModules;\n/******/\n/******/ // define getter function for harmony exports\n/******/ __webpack_require__.d = function(exports, name, getter) {\n/******/ if(!__webpack_require__.o(exports, name)) {\n/******/ Object.defineProperty(exports, name, {\n/******/ configurable: false,\n/******/ enumerable: true,\n/******/ get: getter\n/******/ });\n/******/ }\n/******/ };\n/******/\n/******/ // getDefaultExport function for compatibility with non-harmony modules\n/******/ __webpack_require__.n = function(module) {\n/******/ var getter = module &#x26;&#x26; module.__esModule ?\n/******/ function getDefault() { return module['default']; } :\n/******/ function getModuleExports() { return module; };\n/******/ __webpack_require__.d(getter, 'a', getter);\n/******/ return getter;\n/******/ };\n/******/\n/******/ // Object.prototype.hasOwnProperty.call\n/******/ __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ // __webpack_public_path__\n/******/ __webpack_require__.p = \"\";\n/******/\n/******/ // Load entry module and return exports\n/******/ return __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports) {\n\nconsole.log('hello!');\n\n/***/ })\n/******/ ]);\n</code></pre>\n<p>В html после этого достаточно подключить один файл:</p>\n<pre><code class=\"language-html\">&#x3C;!doctype html> &#x3C;html> &#x3C;body> &#x3C;script src=\"assets/bundle.js\">&#x3C;/script> &#x3C;/body> &#x3C;/html>\n</code></pre>\n<p>Теперь создадим более сложную конфигурацию билда:</p>\n<pre><code class=\"language-js\">#build.js\n    \nmodule.exports = {\n    entry: './index.js',\n    output: {\n        filename: 'assets/bundle.js'\n    }\n}\n</code></pre>\n<h3>Запуск сборки:</h3>\n<pre><code class=\"language-shell\">webpack --config build.js\n</code></pre>\n<h3>Плагины</h3>\n<p>Плагины описываются в конфиге в секции plugins:</p>\n<pre><code class=\"language-js\">const webpack = require('webpack');\n\nmodule.exports = {\n    entry: './index.js',\n    output: {\n        filename: 'assets/bundle.js'\n    },\n    plugins: [\n        new webpack.optimize.UglifyJsPlugin()\n    ]\n}\n</code></pre>\n<p>ПРИМЕЧАНИЕ: если при билде будет ругаться на отсутствующий модуль webpack, то надо сделать <code>npm install webpack --save-dev</code></p>\n<p>UglifyJsPlugin - Это плагин минификации, после него bundle.js выглядит так:</p>\n<pre><code class=\"language-js\">!function(e){function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},n.n=function(e){var r=e&#x26;&#x26;e.__esModule?function(){return e.default}:function(){return e};return n.d(r,\"a\",r),r},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p=\"\",n(n.s=0)}([function(e,n){console.log(\"hello!\")}]);\n</code></pre>\n<h3>Загрузчики</h3>\n<p>Описываются в секции loaders</p>\n<p>Позволяют автоматически загружать нужные файлы (когда мы в коде загрузим их через <code>require(...)</code> или <code>import</code>.</p>\n<p>Если где-то в коде есть require/import, а соответствующий лоадер не прописан, то будет ошибка компиляции.</p>\n<p>Например, файлы json, js могут подключаться как модуль.</p>\n<p>А CSS могут автоматически встраиваться в DOM</p>\n<pre><code class=\"language-js\">module: {\n    loaders: [\n        {test: /\\.css$/, loader: 'style-loader!css-loader'},\n        {test: /\\.json$/, loader: 'json-loader'},\n        {test: /\\.hbs$/, loader: 'handlebars-loader'},\n        {\n            test: /\\.(eot|woff|ttf|svg|png|jpg)$/,\n            loader: 'url-loader?limit=30000&#x26;name=[name]-[hash].[ext]'\n        },\n</code></pre>\n<p>Здесь <code>test</code> означает паттерн, по которому искать, а <code>loader</code> - какой загрузчик использовать.</p>\n<pre><code>#src/customer.json:\n    \n    {\"name\": \"Habrahabr\"}\n</code></pre>\n<pre><code class=\"language-src/header.hbs:\">    \n    &#x3C;h1>Hello, dear {{name}}&#x3C;/h1>\n    \n</code></pre>\n<pre><code class=\"language-js\">var $ = require('jquery');\n// загружаем данные из JSON-файла в объект:\nvar customer = require('./customer.json');\n// загружаем и компилируем шаблон:\nvar Header = require('./header.hbs');\nrequire('./header.css');\n// отдаём данные в шаблон и выводим полученный HTML\n$('body').prepend(Header(customer));\n\n\ntest: /\\.(css|scss)$/,\nloaders: ExtractTextPlugin.extract({\n  fallbackLoader: 'style',\n  loader: 'css?minimize!sass!postcss' // \"?\" означает, что все что после, будет передано в css-loader как параметры. \n                                      // а \"!\" означает, что здесь применяется пайплайн справа налево и результат postcss будет передан в sass, потом в minimize\n})\n</code></pre>\n<p>Для загрузки css обычно используется 2 загрузчика:</p>\n<p>     - <strong>css-loader</strong> - просто загружает css, чтобы они могли использоваться как модули через import/require\n     - <strong>style-loader</strong> - встраивает стиль css в страницу</p>\n<p>Типичное применение:</p>\n<pre><code class=\"language-js\">{\n    test: /\\\\.(css|scss)$/,\n    loaders: [ 'style-loader', 'css-loader'] // альтернативная запись: loader:'style!css'``\n},\n</code></pre>\n<p><strong>ExtractTextWebpack</strong> - плагин, позволяющий объединить все css файлы в один большой css-файл и подключать в html только его.</p>\n<pre><code>#loaders:\n\n\n{\ntest: /\\\\.(css|scss)$/,\nloaders: ExtractTextPlugin.extract({\nfallbackLoader: 'style',\nloader: 'css?minimize!sass!postcss'\n})\n},\n\n#plugins:\n new ExtractTextPlugin('index-[contenthash].css')\n</code></pre>\n<p>Такая запись означает, что при загрузке css/scss через require, нужно попытаться прогнать его через пайплайн postcss->sass->minimize и результат записать в один общий файл index-[contenthash].css</p>\n<p>А если при обработке пайплайном произошла какая-либо ошибка, то используем обычный style-loader, который заинлайнит наш стиль прямо в html</p>\n<h3>Скрипты NPM</h3>\n<pre><code>  {\n      ...\n      \"scripts\": {\n        \"build\": \"webpack\"\n      },\n      ...\n    }\n</code></pre>\n<p>После этого можно вместо <strong>webpack</strong> писать <strong>npm run build</strong></p>\n<p>Через Webpack можно загружать:</p>\n<ol>\n<li>CSS (<a href=\"https://webpack.js.org/guides/asset-management/#loading-css\">https://webpack.js.org/guides/asset-management/#loading-css</a>), `</li>\n<li>картинки <a href=\"https://webpack.js.org/guides/asset-management/#loading-images\">https://webpack.js.org/guides/asset-management/#loading-images</a>, `</li>\n<li>шрифты <a href=\"https://webpack.js.org/guides/asset-management/#loading-fonts\">https://webpack.js.org/guides/asset-management/#loading-fonts</a></li>\n</ol>",frontmatter:{path:"/blog/webpack 2",title:"Webpack"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-webpack-2-613f06922b155eeb86aa.js.map