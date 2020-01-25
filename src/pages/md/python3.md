---
title: "Python 3"
path: "/blog/python3"
---
# Python 3

## SSL в requests

Если для доступа к каким-либо внутренним ресурсам нужно использовать самоподписанный сертификат, то придется немного поприседать

### Python 3.5 и раньше

Нужно указать путь к самоподписанному сертификату в переменной окружения `REQUESTS_CA_BUNDLE`

### Python 3.6 (Mac OS X)

В Mac OS X Начиная с 3.6 requests использует центры сертификации, которые берет из модуля `certifi`.

Поэтому чтобы добавить туда свой CA, нужно сделать так:

Создаем скрипт import_ca.py:

```python
import certifi
import requests
import sys
# source: https://incognitjoe.github.io/adding-certs-to-requests.html
if __name__ == '__main__':
  cafile = certifi.where()

  with open('{}.pem'.format(sys.argv[1]), 'rb') as infile:
    customca = infile.read()

  with open(cafile, 'ab') as outfile:
    outfile.write(customca)

  print('That might have worked.') 
```

Затем в шелле выполняем:

```sh
export CERT_NAME=<путь к сертификату CA без расширения>

openssl x509 -in $CERT_NAME.crt -out $CERT_NAME.pem -outform PEM
pip3 install certifi
python3 ./import_ca.py $CERT_NAME
```

Обязательно после этого нужно удалить свой `REQUESTS_CA_BUNDLE` из переменных окружения, иначе все еще будет использоваться неверный сертификат.

Если используется venvs, то это нужно сделать для каждого виртуального окружения.