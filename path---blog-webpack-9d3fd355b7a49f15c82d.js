webpackJsonp([0x77c0d35544e4],{497:function(e,s){e.exports={data:{markdownRemark:{html:'<h1>Webpack</h1>\n<h2>Dynamic requires</h2>\n<p>Если в тексте есть динамические <code>require</code>, например:</p>\n<pre><code class="language-js">let list = [\'a\', \'b\', \'c\'];\nlet arr = list.map(name => require(\'my-package/\' + name + ".json"));\n</code></pre>\n<p>то <code>webpack</code> всегда включает в бандл весь пакет <code>my-package</code> так как не знает наверняка, что нужно включать. Более того, он это сделать даже если массив <code>list</code> будет пустым.</p>\n<p><a href="https://github.com/webpack/webpack/issues/5639">Ишью</a></p>\n<h2>resolve.modules</h2>\n<h3>Проблема</h3>\n<p>Используем подприложение, которая ссылается на файл <strong>postcss_vars.json</strong>,\nкоторый всегда лежит в корне приложения. Ссылается так:</p>\n<pre><code class="language-js">import "../../../../postcss_vars.json"\n</code></pre>\n<p>Для подприложения, когда оно работает автономно - это нормально, но когда мы\nего включаем как модуль в другое приложение, этот путь больше не работает, так\nкак теперь postcss_vars.json лежит в корне НАД-приложения.</p>\n<h3>Решение</h3>\n<p>В обоих конфигах вебпака прописываем:</p>\n<pre><code class="language-json">resolve: {\n    modules: [\n      path.resolve(__dirname),\n      path.resolve(__dirname + "/node_modules")\n    ]\n  }\n</code></pre>\n<p>А импорт меняем на следующее:</p>\n<pre><code class="language-js">import "postcss_vars.json";\n</code></pre>\n<p>Конструкция <code>resolve.modules</code> указывает, где искать импортируемые модули.\nВ нашем случае мы указали, что надо искать в папке <strong>node_modules</strong> и в корне приложения.</p>\n<h2>rules</h2>\n<h3>Проблема</h3>\n<p>Нужно для некоторой папки применить особое правило postcss.</p>\n<h3>Решение</h3>\n<p>Вебпак применяет правила и лоадеры от последнего к первому. Поэтому нужно это особое правило написать <strong>под</strong> основным.</p>\n<pre><code class="language-json">  {\n        test: /\\.s?css$/,\n        loader: "style-loader!css-loader!postcss-loader",\n        exclude: /node_modules\\/(?!(vocord-ui)|(react-datetime)|(react-dropdown)\\/).*/\n      },\n      {\n        test: /apps\\/license\\/.*\\.s?css$/,\n        use: [\n          {\n            loader: "postcss-loader",\n            options: {\n              plugins: [\n                require("postcss-prefix-selector")({\n                  prefix: ".license-server "\n                })\n              ]\n            }\n          }\n        ],\n        exclude: /node_modules\\/(?!(vocord-ui)|(react-datetime)|(react-dropdown)\\/).*/\n      },\n</code></pre>\n<p>в этом случае у лоадеры применятся в следующем порядке:</p>\n<ol>\n<li>На стили из папки <code>apps/license</code> -  postcss с плагином <code>postcss-prefix-selector</code></li>\n<li>На все стили - postcss с правилами из конфига</li>\n<li>css-loader</li>\n<li>style-loader</li>\n</ol>\n<h3>Проблема</h3>\n<p>Есть проект верстки, js в нем нет, нужно организовать лайв-релоуд</p>\n<h3>Решение</h3>\n<pre><code class="language-shell">npm i -g live-server\ncd %project dir%\nlive-server\n</code></pre>',frontmatter:{path:"/blog/webpack",title:"Webpack"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-webpack-9d3fd355b7a49f15c82d.js.map