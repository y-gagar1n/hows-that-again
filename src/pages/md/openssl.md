---
title: "OpenSSL "
path: "/blog/openssl"
---
# OpenSSL

## Проверка валидности самоподписанного ЦА для подключения к сайту

```
openssl s_client -CAfile <Path to .pem root CA certificate>  -connect <host>:<port>
```

При этом не забыть, что для **https** подключений стандартный порт - 443.

Если в первых строках вывода есть ошибки вида:

```
verify error:num=19:self signed certificate in certificate chain
```

значит проверка цепочки сертификатов не прошла.