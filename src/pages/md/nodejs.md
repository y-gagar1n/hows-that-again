---
title: "NodeJS"
path: "/blog/nodejs"
---
# NodeJS

[Установка на машину без интернета](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server)

[http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb) \- объяснение, что такое single threaded event-loop в NodeJS

**В NodeJS все работает параллельно кроме пользовательского кода.**

## Минимальное приложение:

```js
'use strict';
var http = require('http');
var app = http.createServer(handler);
app.listen(process.env.PORT || 3000);
function handler (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('It\'s alive!');
}
```

## Прокси

```js
var http = require('http');

const wrappedApi = "http://192.168.1.3:8089";

const proxy = http.createServer((req, clientRes) => {
    const srvUrl = new URL(req.url, wrappedApi);
    const proxyRequest = http.request(srvUrl, req, function (wrappedResponse) {
    	clientRes.writeHead(wrappedResponse.statusCode, wrappedResponse.headers);
        wrappedResponse.pipe(clientRes, {
            end: true
        });
    });
    req.pipe(proxyRequest, {
        end: true
    });
});

proxy.listen(9091);
```