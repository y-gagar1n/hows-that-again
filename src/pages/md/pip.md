---
title: "pip"
path: "/blog/pip"
---
# pip

pip - устанавливает пакеты для python2

Если нужно для третьего, то понадобится pip3

```
apt-get install python3-pip
```

## Установка конкретной версии пакета

```
pip install PyQt5==5.5
```

Если нужно указывать диапазон версий, то нужно заключить пакет в кавычки:

```
pip install "package>=0.2,<0.3"
```

## Установка pip без интернета:

```shell
python pip-6.0.6-py2.py3-none-any.whl/pip install --no-index pip-6.0.6-py2.py3-none-any.whl
```

.whl можно взять здесь: https://pypi.python.org/simple/pip/