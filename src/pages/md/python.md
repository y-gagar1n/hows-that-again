---
title: "Python"
path: "/blog/python"
---
# Python

## Конфигурация

Можно создать файл `config.py`:

```python
key = "YOUR_KEY"
secret = "YOUR_SECRET"
```

В основном тексте программы ссылаться на него так:

```python
import config

config.key
```

## Чтение из стандартного инпута

### В цикле

```python
import sys

for line in sys.stdin:
    print(line.rstrip()) # rstrip нужен, чтобы не выводить символ перевода строки

```

### Чтение всех разом

```python
import sys

lines = sys.stdin.readlines()
for line in lines:
	print(line)
```

### Проверка

```sh
$ echo "qwe\nasd" > text && cat text | python3 main.py
qwe
asd
```

Если вводим инпут через терминал, то можем завершить ввод через `Ctrl + D`.

### Чтение бинарного файла и запись его в кодировке UTF-8

```python
input = open("/home/y/photos/4.jpeg", "rb")
output = open("/home/y/photos/dump4.txt", "wb+")

input_text = input.read().decode("latin-1") // read возвращает bytes, decode возвращает строку
output.write(input_text.encode("utf-8"))  // encode принимает строку, возвращает строку, но в другой кодировке
```