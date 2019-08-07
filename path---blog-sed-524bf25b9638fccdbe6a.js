webpackJsonp([73744929748382],{486:function(n,a){n.exports={data:{markdownRemark:{html:'<h1>sed</h1>\n<h2>Регэкспы</h2>\n<p>Чтобы искалось по регэкспу, нужно указать флаг <code class="language-text">-r</code></p>\n<h2>Замена строки в файле</h2>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">sed</span> -i -- <span class="token string">"s/hello/goodbye/g"</span> ./example.txt</code></pre></div>\n<h2>Экранирование</h2>\n<p>Символы <code class="language-text">$.*/[\\]^</code> экранируются бэкслэшэм (\\)</p>\n<h2>Сложные примеры</h2>\n<h3>Массовый реплэйс в файлах</h3>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">find</span> <span class="token builtin class-name">.</span> -name <span class="token string">"*.js"</span> -exec <span class="token function">sed</span> -r -i -- <span class="token string">"s/\\.\\.\\/(Ok|Cancel|Dropdown)Button/..\\/..\\/common\\/components\\/<span class="token entity" title="\\1">\\1</span>Button/g"</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span></code></pre></div>\n<p>Ищет во всех .js файлах и заменяет:\n<code class="language-text">../OkButton</code> на <code class="language-text">../../common/components/OkButton</code>\n<code class="language-text">../CancelButton</code> на <code class="language-text">../../common/components/CancelButton</code>\n<code class="language-text">../DropdownButton</code> на <code class="language-text">../../common/components/DropdownButton</code></p>\n<h3>Массовое перемещение файлов</h3>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell"><span class="token function">find</span> -name <span class="token string">"*PrimaryButton*"</span> -exec <span class="token function">sh</span> -c <span class="token string">\'mv {} <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">"s/Primary/Ok/g"</span><span class="token variable">)</span></span>\'</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span></code></pre></div>\n<p>Изначально пробовал вариант c <code class="language-text">-exec mv</code>, однако он не подошел, так как видимо shell выполняет выражение в <code class="language-text">$()</code> до того, как <code class="language-text">find</code> подставит в <code class="language-text">{}</code> пути к файлам. В результате пути к файлам оставались неизменными.</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">find . -name &quot;*.js&quot; -exec sed -r -i -- &quot;s/\\.\\.\\/Picture/..\\/..\\/common\\/components\\/Picture/g&quot; {} \\; &amp;&amp; mv Picture ../common/components</code></pre></div>',frontmatter:{path:"/blog/sed",title:"sed"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sed-524bf25b9638fccdbe6a.js.map