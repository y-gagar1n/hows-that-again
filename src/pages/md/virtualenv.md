---
title: "virtualenv"
path: "/blog/virtualenv"
---
# virtualenv

С помощью virtualenv можно создавать виртуальные окружения для проектов на python. Окружения необязательно должны лежать в той же папке, что и проект - такой вариант даже предпочтительнее, потому что коммитить файлы, сгенерированные virtualenv - не рекомендуется.

## Установка в Windows/Linux:

```pip install virtualenv```

## Создание виртуального окружения:

```
> virtualenv test
Using base prefix 'c:\\\python34'
New python executable in c:\Projects\virtualenvs\test\Scripts\python.exe
Installing setuptools, pip, wheel...done.
```

## Активация окружения:

```source test/bin/activate```

Пример активации:

```
Юрий@YURY c:\Projects\virtualenvs\test
> pip freeze //сначала пробуем без окружения
aiohttp==0.21.0
certifi==2016.8.8
chardet==2.3.0
future==0.15.2
gpsoauth==0.4.0
pandoc==1.0.0b2
pdb==0.1
pefile==2016.3.28
ply==3.8
py2exe==0.9.2.2
pycryptodomex==3.4.2
PyInstaller==3.2
pypiwin32==219
pyportify==0.3.5
python-gnupg==0.3.8
PyYAML==3.11
requests==2.7.0
six==1.9.0
virtualenv==15.1.0

Юрий@YURY c:\Projects\virtualenvs\test
> source bin\activate //активируем

(test) Юрий@YURY c:\Projects\virtualenvs\test
> pip freeze //пробуем с окружением
appdirs==1.4.0
packaging==16.8
pyparsing==2.1.10
six==1.10.0
```

## Деактивация:

```deactivate```

## Пример использования другого питона:

```
Юрий@YURY c:\Projects\virtualenvs\test
> bin\activate

(test) Юрий@YURY c:\Projects\virtualenvs\test
> python --version
Python 3.4.3

Юрий@YURY c:\Projects\virtualenvs\test
> virtualenv test27 -p c:\python27\python.exe
Running virtualenv with interpreter c:\python27\python.exe
New python executable in c:\Projects\virtualenvs\test\test27\Scripts\python.exe
Installing setuptools, pip, wheel...done.

Юрий@YURY c:\Projects\virtualenvs\test
> source test27\bin\activate

(test27) Юрий@YURY c:\Projects\virtualenvs\test
> python --version
Python 2.7.10
```


## Запись установленных зависимостей в файл:

```
> pip freeze > requirements.txt
```

Затем можно поставить все зависимости из этого файла так:

```
> pip install -r requirements.txt
```

## Использование python3

```
virtualenv -p python3 envname
```
