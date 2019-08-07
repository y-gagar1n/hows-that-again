webpackJsonp([0xfe7587039196],{466:function(t,p){t.exports={data:{markdownRemark:{html:"<h1>ASP.NET MVC - HTTP modules and handlers</h1>\n<p>Модули и хэндлеры позволяют общаться напрямую с HTTP-запросом. Каждый запрос проходит через несколько модулей (сессия, аутентификация и пр.), а потом обрабатывается одним хэндлером и снова проходит через все модули.</p>\n<p>Чтобы сделать свой модуль, нужно реализовать интерфейс IHttpModule, имеющий 2 метода: Init(HttpApplication) и Dispose.</p>\n<p>Класс HttpApplication содержит 22 разных события, соответствующие различным этапам жизни запроса, на которые можно подписаться в методе Init.</p>\n<p>Все, что мы делаем в модуле, можно сделать и в Global.asax, однако тогда мы не сможем переиспользовать модуль в других приложениях.</p>\n<p>Хэндлеры обрабатывают индивидуальные запросы. Хэндлеры реализуют интерфейс IHttpHandler. Главный метод в нем - ProcessRequest(HttpContext context) В web.config можно настроить какой запрос идет к какому хэндлеру, основываясь на глаголе, пути и типе запроса.</p>\n<p>Начиная с ASP.NET 4.5 можно писать асинхронные хэндлеры и модули. Чтобы использовать асинхронные методы в HttpApplication, нужно вызывать методы .Add...Async и передавать внутрь делегаты начала и конца обработки.</p>\n<p>Чтобы реализовать асинхронный хэндлер, нужно унаследоваться от HttpTaskAsyncHandler и переопределить метод ProcessRequestAsync.</p>\n<h2>Что выбрать</h2>\n<p>Хэндлеры стоит выбирать, когда тот или иной способ обработки запроса зависит от url/расширения. Если же нужно обрабатывать каждый запрос, независимо от url, то нужно выбрать модуль.</p>",frontmatter:{path:"/blog/mvc-modules-handlers",title:"ASP.NET MVC - HTTP modules and handlers"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mvc-modules-handlers-44f1e163873a16c2c733.js.map