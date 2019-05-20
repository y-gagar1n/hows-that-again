webpackJsonp([0xae111443cb41],{430:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>Flexbox</h1>\n<h2>Пример шаблона страницы с хидером, футером и контентом:</h2>\n<pre><code class="language-css">//main.css\n\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0\n}\n\n.box {\n  display: flex;\n  flex-flow: column;\n  height: 100%;\n}\n\n.box .row {\n  border: 1px dotted grey;\n}\n\n.box .row.header {\n  flex: 0 1 auto;\n  /* The above is shorthand for:\n  flex-grow: 0,\n  flex-shrink: 1,\n  flex-basis: auto\n  */\n}\n\n.box .row.content {\n  flex: 1 1 auto;\n}\n\n.box .row.footer {\n  flex: 0 1 40px;\n}\n</code></pre>\n<pre><code class="language-html">//index.html\n\n&#x3C;div class="box">\n  &#x3C;div class="row header">\n    &#x3C;p>&#x3C;b>header&#x3C;/b>\n      &#x3C;br />\n      &#x3C;br />(sized to content)&#x3C;/p>\n  &#x3C;/div>\n  &#x3C;div class="row content">\n    &#x3C;p>\n      &#x3C;b>content&#x3C;/b>\n      (fills remaining space)\n    &#x3C;/p>\n  &#x3C;/div>\n  &#x3C;div class="row footer">\n    &#x3C;p>&#x3C;b>footer&#x3C;/b> (fixed height)&#x3C;/p>\n  &#x3C;/div>\n&#x3C;/div>\n</code></pre>',frontmatter:{path:"/blog/flexbox",title:"Flexbox"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-flexbox-d2727e853a6da977e9a1.js.map