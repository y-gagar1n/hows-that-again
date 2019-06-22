webpackJsonp([0x850d68a35af4],{460:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>ASP.NET MVC - WebSocket Strategy</h1>\n<p>Веб-сокеты позволяют организовать двунаправленное общение между клиентом и сервером, а так же позволяют устанавливать новое соединение не при каждом запросе, а единожды на сессию. </p>\n<h2>Как делали раньше</h2>\n<h3>HTTP Polling</h3>\n<p>После каждого ответа отправляем новый AJAX-запрос, тем самым создаем иллюзию непрекращающегося соединения. Очень расточительный метод.</p>\n<h3>HTTP Long polling</h3>\n<p>Клиент делает AJAX-запрос к серверу, а сервер держит его до тех пор, пока у него не появятся данные для отсылки клиенту. То есть соединение устанавливается как бы заранее.</p>\n<h2>Как сейчас</h2>\n<p>Веб-сокеты выступают как замена HTTP в качестве протокола взаимообщения. Не стоит его использовать в качестве основного средства коммуникации, а только для двунаправленных и продолжительных взаимодействий.</p>\n<p>Соединение через веб-сокеты включает клиентскую и серверную часть. Состоит из 3 шагов:</p>\n<ol>\n<li>Установление соединения путем хэндшейка</li>\n<li>Запрос, чтобы убедиться, что сервер начал ждать взаимодействия</li>\n<li>Передача данных</li>\n</ol>\n<p>Когда запрашивается веб-сокет, браузер сначала открывает простое HTTP-соединение с сервером. Затем браузер шлет запрос на апгрейд соединения до веб-сокетного. Если запрос прошел и хэндшейк удался, то дальнейшее общение происходит в рамках одного TCP-сокета.</p>\n<pre><code class="language-js">var socket;   \n$(document).ready(function () {   \n    socket = new WebSocket("ws://localhost:1046/socket/handle");  \n    socket.addEventListener("open", function (evnt) {  \n        $("#display").append(\'connection\');\n        }, \n    false);   \n    socket.addEventListener("message", function (evnt) {  \n        $("#display ").append(evnt.data);\n    }, false);   \n    socket.addEventListener("error", function (evnt) {  \n        $("#display ").append(\'unexpected error.\');\n    }, false);   \n...   \n});\n</code></pre>\n<p>Когда внедряем в приложение поддержку веб-сокетов, нужно определять, как будем управлять соединением. Обычно это делается в HTTP-хэндлере или модуле. Нужно реализовать процесс апгрейда соединения при соответствующем запросе. Это делается так:</p>\n<pre><code>HttpContext.Current.AcceptWebSocketRequest(Func&#x3C;AspNetWebSocketContext,  \nTask>)\n</code></pre>\n<p>Передаваемый делегат будет вызван после хэндшейка. Пример:</p>\n<pre><code class="language-csharp">public async Task MyWebSocket(AspNetWebSocketContext context)   \n{   \n    while (true)   \n    {   \n        ArraySegment&#x3C;byte> arraySegment = new ArraySegment&#x3C;byte>(new byte[1024]);   \n        // open the result. This is waiting asynchronously  \n        WebSocketReceiveResult socketResult =   \n        await context.WebSocket.ReceiveAsync(arraySegment,   \n            CancellationToken.None);   \n  \n        // return the message to the client if the socket is still open  \n        if (context.WebSocket.State == WebSocketState.Open)   \n        {   \n            string message = Encoding.UTF8.GetString(arraySegment.Array, 0,   \n                socketResult.Count);   \n            userMessage = "Your message: " \\+ message + " at " +   \n            DateTime.Now.ToString();  \n            arraySegment = new   \n                ArraySegment&#x3C;byte>(Encoding.UTF8.GetBytes(message));   \n  \n            // Asynchronously send a message to the client   \n            await context.WebSocket.SendAsync(arraySegment,   \n                WebSocketMessageType.Text,   \n                true, CancellationToken.None);   \n        }   \n        else { break; }   \n    }   \n}\n</code></pre>\n<h2>Connection loss strategy</h2>\n<p>Нужно предусмотреть план действий при потере соединения. Действия эти будут производиться на клиенте. Когда соединение закроется, у клиента вызовется либо onclose либо onerror. В этом случае нужно переоткрывать соединение и слать запрос еще раз.</p>\n<p>Приложение должно слать запрос и ждать ответа, а затем на основании ответа или его отсутствия, решать, приняла ли другая сторона запрос. Если нет - слать еще раз. Однако возможно и такое, что принимающая сторона получила запрос, но не смогла ответить. Нужно быть готовым к нескольким одинаковым запросам.</p>\n<h2>Когда использовать</h2>\n<p>Зачастую используют в мессенджерах и дэшбордах. Следует помнить, что у веб-сокетных запросов нет HTTP-заголовков, хоть они и ведут себя как HTTP-запросы.</p>',frontmatter:{path:"/blog/mvc-web-sockets",title:"ASP.NET MVC - WebSocket Strategy"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mvc-web-sockets-86e449c7694174065fb9.js.map