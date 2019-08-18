webpackJsonp([0x77c0d35544e4],{512:function(s,n){s.exports={data:{markdownRemark:{html:'<h1>Webpack</h1>\n<h2>Dynamic requires</h2>\n<p>Если в тексте есть динамические <code class="language-text">require</code>, например:</p>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> arr <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">name</span> <span class="token operator">=></span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'my-package/\'</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">".json"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>\n<p>то <code class="language-text">webpack</code> всегда включает в бандл весь пакет <code class="language-text">my-package</code> так как не знает наверняка, что нужно включать. Более того, он это сделать даже если массив <code class="language-text">list</code> будет пустым.</p>\n<p><a href="https://github.com/webpack/webpack/issues/5639">Ишью</a></p>\n<h2>resolve.modules</h2>\n<h3>Проблема</h3>\n<p>Используем подприложение, которая ссылается на файл <strong>postcss_vars.json</strong>,\nкоторый всегда лежит в корне приложения. Ссылается так:</p>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token string">"../../../../postcss_vars.json"</span></code></pre></div>\n<p>Для подприложения, когда оно работает автономно - это нормально, но когда мы\nего включаем как модуль в другое приложение, этот путь больше не работает, так\nкак теперь postcss_vars.json лежит в корне НАД-приложения.</p>\n<h3>Решение</h3>\n<p>В обоих конфигах вебпака прописываем:</p>\n<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json">resolve<span class="token operator">:</span> <span class="token punctuation">{</span>\n    modules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      path.resolve(__dirname)<span class="token punctuation">,</span>\n      path.resolve(__dirname + <span class="token string">"/node_modules"</span>)\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span></code></pre></div>\n<p>А импорт меняем на следующее:</p>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token string">"postcss_vars.json"</span><span class="token punctuation">;</span></code></pre></div>\n<p>Конструкция <code class="language-text">resolve.modules</code> указывает, где искать импортируемые модули.\nВ нашем случае мы указали, что надо искать в папке <strong>node_modules</strong> и в корне приложения.</p>\n<h2>rules</h2>\n<h3>Проблема</h3>\n<p>Нужно для некоторой папки применить особое правило postcss.</p>\n<h3>Решение</h3>\n<p>Вебпак применяет правила и лоадеры от последнего к первому. Поэтому нужно это особое правило написать <strong>под</strong> основным.</p>\n<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json">  <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> /\\.s?css$/<span class="token punctuation">,</span>\n        loader<span class="token operator">:</span> <span class="token string">"style-loader!css-loader!postcss-loader"</span><span class="token punctuation">,</span>\n        exclude<span class="token operator">:</span> /node_modules\\/(?!(vocord-ui)|(react-datetime)|(react-dropdown)\\/).*/\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> /apps\\/license\\/.*\\.s?css$/<span class="token punctuation">,</span>\n        use<span class="token operator">:</span> <span class="token punctuation">[</span>\n          <span class="token punctuation">{</span>\n            loader<span class="token operator">:</span> <span class="token string">"postcss-loader"</span><span class="token punctuation">,</span>\n            options<span class="token operator">:</span> <span class="token punctuation">{</span>\n              plugins<span class="token operator">:</span> <span class="token punctuation">[</span>\n                require(<span class="token string">"postcss-prefix-selector"</span>)(<span class="token punctuation">{</span>\n                  prefix<span class="token operator">:</span> <span class="token string">".license-server "</span>\n                <span class="token punctuation">}</span>)\n              <span class="token punctuation">]</span>\n            <span class="token punctuation">}</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        exclude<span class="token operator">:</span> /node_modules\\/(?!(vocord-ui)|(react-datetime)|(react-dropdown)\\/).*/\n      <span class="token punctuation">}</span><span class="token punctuation">,</span></code></pre></div>\n<p>в этом случае у лоадеры применятся в следующем порядке:</p>\n<ol>\n<li>На стили из папки <code class="language-text">apps/license</code> -  postcss с плагином <code class="language-text">postcss-prefix-selector</code></li>\n<li>На все стили - postcss с правилами из конфига</li>\n<li>css-loader</li>\n<li>style-loader</li>\n</ol>\n<h3>Проблема</h3>\n<p>Есть проект верстки, js в нем нет, нужно организовать лайв-релоуд</p>\n<h3>Решение</h3>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> i -g live-server\n<span class="token builtin class-name">cd</span> %project dir%\nlive-server</code></pre></div>',frontmatter:{path:"/blog/webpack",title:"Webpack"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-webpack-eea4c423ab2c581a7173.js.map