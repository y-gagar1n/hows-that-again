---
title: "ASP.NET MVC - HTTP modules and handlers"
path: "/blog/mvc-modules-handlers"
---
# ASP.NET MVC - HTTP modules and handlers

Модули и хэндлеры позволяют общаться напрямую с HTTP-запросом. Каждый запрос проходит через несколько модулей (сессия, аутентификация и пр.), а потом обрабатывается одним хэндлером и снова проходит через все модули.

Чтобы сделать свой модуль, нужно реализовать интерфейс IHttpModule, имеющий 2 метода: Init(HttpApplication) и Dispose.

Класс HttpApplication содержит 22 разных события, соответствующие различным этапам жизни запроса, на которые можно подписаться в методе Init.

Все, что мы делаем в модуле, можно сделать и в Global.asax, однако тогда мы не сможем переиспользовать модуль в других приложениях.

Хэндлеры обрабатывают индивидуальные запросы. Хэндлеры реализуют интерфейс IHttpHandler. Главный метод в нем - ProcessRequest(HttpContext context) В web.config можно настроить какой запрос идет к какому хэндлеру, основываясь на глаголе, пути и типе запроса.

Начиная с ASP.NET 4.5 можно писать асинхронные хэндлеры и модули. Чтобы использовать асинхронные методы в HttpApplication, нужно вызывать методы .Add...Async и передавать внутрь делегаты начала и конца обработки.

Чтобы реализовать асинхронный хэндлер, нужно унаследоваться от HttpTaskAsyncHandler и переопределить метод ProcessRequestAsync.

## Что выбрать

Хэндлеры стоит выбирать, когда тот или иной способ обработки запроса зависит от url/расширения. Если же нужно обрабатывать каждый запрос, независимо от url, то нужно выбрать модуль.