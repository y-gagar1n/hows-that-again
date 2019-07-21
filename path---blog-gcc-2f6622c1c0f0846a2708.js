webpackJsonp([0x5edeaff87db3],{435:function(n,p){n.exports={data:{markdownRemark:{html:'<h1>gcc</h1>\n<h3>Построение файла:</h3>\n<pre><code>gcc -I/usr/local/cpu/include example.cpp\n</code></pre>\n<p><strong>-I</strong> указывает папку с хидерами, которые нужно включить</p>\n<h3>Статические и разделяемые библиотеки</h3>\n<p>Разделяемые библиотеки имеют расширение <strong>.so</strong> (.dll в Windows, .dylib в OS X). Внутри файла находится весь код, относящийся к библиотеке, программы ссылаются на нее динамически в рантайме. Программа, использующая разделяемую библиотеку, ссылается только на код, который она реально использует в ней.</p>\n<p>Статические библиотеки имеют расширение <strong>.a</strong> (.lib в Windows). Внутри файла так же находится весь код, относящийся к библиотеке, но программы ссылаются на нее о время компиляции. Программа, использующая статическую библиотеку, делает копии используемого кода и вставляет его в свой код.</p>\n<p>Разделяемые уменьшают общий размер, если один и тот же код используется в нескольких программах. Позволяют динамически подменять библиотеку. Однако замедляют вызов.</p>\n<p>Статические увеличивают размер бинарника, но ненужно тащить дополнительные файлы.</p>\n<p>Разделяемая библиотека - это книжная библиотека, куда каждый приходит и "одалживает" нужный метод/функцию. Статическая библиотека - это книжный магазин, куда можно прийти и купить свою копию нужной книги/функции.</p>',frontmatter:{path:"/blog/gcc",title:"gcc"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-gcc-2f6622c1c0f0846a2708.js.map