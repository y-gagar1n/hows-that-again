---
title: "Nginx"
path: "/blog/nginx"
---

# Nginx

## Методы балансировки нагрузки Nginx
- `round-robin` – запросы к приложению распределяются в цикле по очереди
- `least-connected` – каждый последующий запрос отправляется серверу с наименьшей загруженностью
- `ip-hash` – сервер, которому будет отправляться запрос выбирается с помощью хэш-функции, основанной на IP адресах клиентов

## Метод round-robin
Метод является методом по умолчанию, пример простой конфигурации с тремя серверами nginx:
```javascript
http {
    upstream facematicd {
        server ip.fmt.1;
        server ip.fmt.2;
        server ip.fmt.3;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://facematicd;
        }
    }
}
```
Все запросы балансируются по принципу round-robin и перенаправляются nginx-ом к группе серверов facematicd. Помимо HTTP также для балансировки нагрузки поддерживаются протоколы HTTPS, FastCGI, uwsgi, SCGI, memcached и gRPC.
Для использования HTTPS нужно только поменять протокол в секции `location`, с `http` на `https`.
Для использования других протоколов необходимо только менять proxy_pass ключ в секции location на соответствующий: `fastcgi_pass`, `uwsgi_pass`, `scgi_pass`, `memcached_pass`, `gprc_pass`.


## Метод least-connected

Метод позволяет более осознанно распределять нагрузку, в ситуациях, когда запросы требуют длительного времени на исполнение.
Метод не будет загружать серверы избыточными запросами, будет стараться отправлять новые запросы на наименее загруженные серверы.
Для активации метода нужно только указать соответствующую директиву `least_conn`, в конфигурации upstream группы серверов:

```javascript
     upstream facematicd {
        least_conn;
        server ip.fmt.1;
        server ip.fmt.2;
        server ip.fmt.3;
    }
```

## Метод поддержания сессии, ip_hash

Методы балансировки `round-robin` и `least-connected` подразумевают, что любой запрос потенциально может попасть на любой из указанных серверов, отсутствует гарантия, что один и тот же клиент будет работать с одним сервером. Используется, если есть необходимость “привязать” клиента к конкретному серверу с приложением.
Для определения группы сервера для отправки запросов используются IP адреса клиента, в качестве hashing key(хэш ключа). Метод гарантирует, что один клиент будет всегда обращаться к конкретному серверу, за исключением ситуации, когда этот сервер оказался недоступным.
Для активации метода нужно только указать соответствующую директиву `ip_hash`, в конфигурации upstream группы серверов:
```javascript
    upstream facematicd {
        ip_hash;
        server ip.fmt.1;
        server ip.fmt.2;
        server ip.fmt.3;
    }
}
```

## Вес(приоритетность) серверов группы
В предыдущих примеров не были указаны веса серверов и nginx расценивал их как равнозначные, в такой конфигурации нагрузка распределяется наиболее равномерно между всеми участниками кластера, при условии, что запросы единообразны, и достаточно быстро обрабатываются.
Параметр веса(weight) участвует в принятии решения по балансировке нагрузки и выборе сервера для запроса.
```javascript
    upstream facematicd {
        server ip.fmt.1 weight=3;
        server ip.fmt.2;
        server ip.fmt.3;
    }
```
С такой конфигурацией каждые 5 новых запросов будут распределятся по участникам кластера со следующей логикой: 3 запроса на первый сервер, и по одному на второй и третий. Веса можно использовать во всех схемах балансировки нагрузки – `round-robin`, `least-connected`, `ip-hash`.

## Health checks, проверка работоспособности

Nginx включает проверки работоспособности сервера. Если ответ на запрос с определенного сервера приходит с ошибкой, то nginx помечает данный сервер как неработоспособный и не будет направлять на него запросы некоторое время.
Директива `max_fails` устанавливает какое количество ошибочных ответов от сервера можно получить за время `fail_timeout`. По умолчанию `max_fails` равен единице. Если установить в 0, то проверки работоспособности для этого сервера будут отключены. `fail_timeout` также определяет насколько долго сервер будет отмечен как неработоспособный. После того как пройдет `fail_timeout` nginx направит на сервер несколько запросов клиента, и если они будут удачными, то сервер снова будет отмечен как живой.
