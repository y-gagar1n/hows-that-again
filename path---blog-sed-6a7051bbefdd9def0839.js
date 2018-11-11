webpackJsonp([73744929748382],{458:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>sed</h1>\n<h2>Регэкспы</h2>\n<p>Чтобы искалось по регэкспу, нужно указать флаг <code>-r</code></p>\n<h2>Замена строки в файле</h2>\n<pre><code class="language-shell">sed -i -- "s/hello/goodbye/g" ./example.txt\n</code></pre>\n<h2>Экранирование</h2>\n<p>Символы <code>$.*/[\\]^</code> экранируются бэкслэшэм (\\)</p>\n<h2>Сложные примеры</h2>\n<h3>Массовый реплэйс в файлах</h3>\n<pre><code class="language-shell">find . -name "*.js" -exec sed -r -i -- "s/\\.\\.\\/(Ok|Cancel|Dropdown)Button/..\\/..\\/common\\/components\\/\\1Button/g" {} \\;\n</code></pre>\n<p>Ищет во всех .js файлах и заменяет:\n<code>../OkButton</code> на <code>../../common/components/OkButton</code>\n<code>../CancelButton</code> на <code>../../common/components/CancelButton</code>\n<code>../DropdownButton</code> на <code>../../common/components/DropdownButton</code></p>\n<h3>Массовое перемещение файлов</h3>\n<pre><code class="language-shell">find -name "*PrimaryButton*" -exec sh -c \'mv {} $(echo {} | sed "s/Primary/Ok/g")\' \\;\n</code></pre>\n<p>Изначально пробовал вариант c <code>-exec mv</code>, однако он не подошел, так как видимо shell выполняет выражение в <code>$()</code> до того, как <code>find</code> подставит в <code>{}</code> пути к файлам. В результате пути к файлам оставались неизменными.</p>\n<pre><code>find . -name "*.js" -exec sed -r -i -- "s/\\.\\.\\/Picture/..\\/..\\/common\\/components\\/Picture/g" {} \\; &#x26;&#x26; mv Picture ../common/components\n</code></pre>',frontmatter:{path:"/blog/sed",title:"sed"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sed-6a7051bbefdd9def0839.js.map