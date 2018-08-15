webpackJsonp([0xc40881788916],{419:function(t,n){t.exports={data:{markdownRemark:{html:"<h1>ASP.NET MVC - асинхронные контроллеры</h1>\n<h2>Зачем нужны?</h2>\n<p>Запросы к контроллерам обслуживаются ограниченным числов потоков из пула потоков. Если какой-то долгий запрос выполняется синхронно, то этот выделенный поток будет долго недоступен, а если таких запросов возникнет много одновременно, то потоки рано или поздно кончатся (thread starvation)</p>\n<h2>Как сделать?</h2>\n<p>просто меняем action method</p>\n<p>вместо void ActionResult ...</p>\n<p>делаем async Task<ActionResult> ...</p>\n<h2>Когда использовать?</h2>\n<p>Когда есть запросы к диску, или сетевые запросы. Использование на методах, завязанных на CPU, не даст никакой выгоды, а только больше загрузит процессор.</p>\n<p>Так же стоит использовать, когда нужно дать пользователям возможность отменить длительную операцию.</p>",frontmatter:{path:"/blog/mvc-async-controllers",title:"ASP.NET MVC - асинхронные контроллеры"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mvc-async-controllers-c3cc24f140a51a9e6bb0.js.map