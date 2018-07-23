---
title: "ASP.Net 5"
path: "/blog/asp-net-5"
---
# ASP.Net 5

Сервисы бывают синглтоны, transient и scoped.

transient - временные, инстанцируются каждый раз заново.

scoped - инстанцируются только если их еще нет в текущем скоупе. Для веб-приложений каждый запрос работает в собственном скоупе.

**Web root **- это то место, откуда начинают обслуживаться запросы. Задается в **project.json** в свойстве **webroot**.

**.NET Core **состоит из набора библиотек **CoreFX **и маленького рантайма **CoreCLR**.

Достоинством **CoreCLR** является то, что ее можно поставлять вместе с приложением, не завися от установленной в системе версии .NET.

Библиотеки **CoreFX** поставляются в виде множества nuget-пакетов, все с нейспейсами System.[module]. Каждая из библиотек содержит минимум зависимостей

В \_Layout.cshtml можно указывать элемент environment, это будет аналог #IFDEF. Например,

```html
<**environment** **names**="Development">
<link rel="stylesheet" href ="~/lib/bootstrap/dist/css/bootstrap.css" />
</ **environment**>
<**environment** **names** ="Staging,Production">
<**link** rel="stylesheet" **href** ="//ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/css/bootstrap.min.css"
**asp-fallback-href** ="~/lib/bootstrap/css/bootstrap.min.css"
**asp-fallback-test-class** ="hidden" **asp-fallback-test-property** ="visibility" **asp-fallback-test-value** ="hidden" />
</**environment**>
```

В зависимости от того, какая сейчас среда, css будет браться либо с CDN, либо локальная.

## Async helpers  

В новом Mvc есть асинхронные хелперы, например: `@await Html.PartialAsync("_LoginPartial")`

Еще теперь принято делать не `Html.FormFor...`, а стандартный тэг form, у которого указываем атрибуты `asp-controller="...", asp-action="..."`

Аналогично для других контролов: `<label asp-for="..."/>`

Модель указывается в начале страницы строкой `@model ViewModel`
