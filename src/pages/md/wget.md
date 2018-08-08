---
title: "wget"
path: "/blog/wget"
---
# wget

## Скачивание файла 

`wget https://raw.githubusercontent.com/github/gitignore/master/Python.gitignore`

Без аргументов команда создаст сохранит результат в файл Python.gitignore в текущей папке

Если нужно задать имя файла, то нужен флаг `-O`

`wget -O .gitignore https://raw.githubusercontent.com/github/gitignore/master/Python.gitignore`