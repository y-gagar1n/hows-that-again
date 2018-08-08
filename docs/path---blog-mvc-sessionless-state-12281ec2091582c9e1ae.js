webpackJsonp([94230034957513],{419:function(n,s){n.exports={data:{markdownRemark:{html:"<h1>Sessionless state in ASP.NET MVC</h1>\n<p>Зачем: при использовании сессий ASP.NET предполагает, что одновременно от одной сессии будет только один запрос. Если со страницы идет несколько AJAX-запросов одновременно, то они будут обработаны последовательно. Если же использовать взаимодействие без сессий, то на сервере они могут быть обработаны и параллельно. Особенно это подходит для страниц, которые при загрузке делают несколько запросов чтобы отобразить содержимое каких-нибудь контролов. </p>\n<h2>Как сделать</h2>\n<p>существует несколько механизмов</p>\n<ol>\n<li>создать уникальный идентификатор при первом запросе и передавать его от запроса к запросу в адресной строке</li>\n<li>использовать для передачи элемент hidden</li>\n<li>использовать какой-либо элемент в Master Page, чтобы этот идентификатор отображался сразу на всех страницах</li>\n<li>Хранить его на клиентской стороне в sessionStorage или localStorage и передавать его на сервер когда необходимо</li>\n</ol>",frontmatter:{path:"/blog/mvc-sessionless-state",title:"Sessionless state in ASP.NET MVC"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mvc-sessionless-state-12281ec2091582c9e1ae.js.map