---
title: "ASP.NET MVC - WebSocket Strategy"
path: "/blog/mvc-web-sockets"
---
# ASP.NET MVC - WebSocket Strategy

Веб-сокеты позволяют организовать двунаправленное общение между клиентом и сервером, а так же позволяют устанавливать новое соединение не при каждом запросе, а единожды на сессию. 

## Как делали раньше

### HTTP Polling

После каждого ответа отправляем новый AJAX-запрос, тем самым создаем иллюзию непрекращающегося соединения. Очень расточительный метод.

### HTTP Long polling

Клиент делает AJAX-запрос к серверу, а сервер держит его до тех пор, пока у него не появятся данные для отсылки клиенту. То есть соединение устанавливается как бы заранее.

## Как сейчас

Веб-сокеты выступают как замена HTTP в качестве протокола взаимообщения. Не стоит его использовать в качестве основного средства коммуникации, а только для двунаправленных и продолжительных взаимодействий.

Соединение через веб-сокеты включает клиентскую и серверную часть. Состоит из 3 шагов:

1. Установление соединения путем хэндшейка
2. Запрос, чтобы убедиться, что сервер начал ждать взаимодействия
3. Передача данных

Когда запрашивается веб-сокет, браузер сначала открывает простое HTTP-соединение с сервером. Затем браузер шлет запрос на апгрейд соединения до веб-сокетного. Если запрос прошел и хэндшейк удался, то дальнейшее общение происходит в рамках одного TCP-сокета.

```js
var socket;   
$(document).ready(function () {   
	socket = new WebSocket("ws://localhost:1046/socket/handle");  
	socket.addEventListener("open", function (evnt) {  
		$("#display").append('connection');
		}, 
	false);   
	socket.addEventListener("message", function (evnt) {  
		$("#display ").append(evnt.data);
	}, false);   
	socket.addEventListener("error", function (evnt) {  
		$("#display ").append('unexpected error.');
	}, false);   
...   
});
```

Когда внедряем в приложение поддержку веб-сокетов, нужно определять, как будем управлять соединением. Обычно это делается в HTTP-хэндлере или модуле. Нужно реализовать процесс апгрейда соединения при соответствующем запросе. Это делается так:

	HttpContext.Current.AcceptWebSocketRequest(Func<AspNetWebSocketContext,  
	Task>)

Передаваемый делегат будет вызван после хэндшейка. Пример:

```csharp
public async Task MyWebSocket(AspNetWebSocketContext context)   
{   
	while (true)   
	{   
		ArraySegment<byte> arraySegment = new ArraySegment<byte>(new byte[1024]);   
		// open the result. This is waiting asynchronously  
		WebSocketReceiveResult socketResult =   
		await context.WebSocket.ReceiveAsync(arraySegment,   
			CancellationToken.None);   
  
		// return the message to the client if the socket is still open  
		if (context.WebSocket.State == WebSocketState.Open)   
		{   
			string message = Encoding.UTF8.GetString(arraySegment.Array, 0,   
				socketResult.Count);   
			userMessage = "Your message: " \+ message + " at " +   
			DateTime.Now.ToString();  
			arraySegment = new   
				ArraySegment<byte>(Encoding.UTF8.GetBytes(message));   
  
			// Asynchronously send a message to the client   
			await context.WebSocket.SendAsync(arraySegment,   
				WebSocketMessageType.Text,   
				true, CancellationToken.None);   
		}   
		else { break; }   
	}   
}
```
  


## Connection loss strategy

Нужно предусмотреть план действий при потере соединения. Действия эти будут производиться на клиенте. Когда соединение закроется, у клиента вызовется либо onclose либо onerror. В этом случае нужно переоткрывать соединение и слать запрос еще раз.

Приложение должно слать запрос и ждать ответа, а затем на основании ответа или его отсутствия, решать, приняла ли другая сторона запрос. Если нет - слать еще раз. Однако возможно и такое, что принимающая сторона получила запрос, но не смогла ответить. Нужно быть готовым к нескольким одинаковым запросам.

## Когда использовать

Зачастую используют в мессенджерах и дэшбордах. Следует помнить, что у веб-сокетных запросов нет HTTP-заголовков, хоть они и ведут себя как HTTP-запросы.
