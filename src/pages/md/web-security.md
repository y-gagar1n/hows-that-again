---
title: "CORS (Cross-Origin Resource Sharing)"
path: "/blog/web-security"
---
# CORS (Cross-Origin Resource Sharing)

Сервер в заголовках метода возвращает `Access-Control-Allow-Origin`, где перечислены хосты, с которых к нему можно делать этот запрос.
Браузер сверяет его с реальным ориджином и если совпадения нет, то не показывает результат запроса.

В некоторых случаях браузер может сделать предварительный **preflight request** методом `OPTIONS`, чтобы не совершить действие, но узнать его `Access-Control-Allow-Origin`.

**preflight request** совершается в случае методов, отличных от `GET`, `POST`, `HEAD`, а так же `Content-Type`, отличных от `application/x-www-form-urlencoded`, `multipart/form-data`, или `text/plain`. 
То есть в случае `application/json` такой запрос посылается всегда.