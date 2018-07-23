---
title: "Python"
path: "/blog/python 2"
---
# Python

## Чтение аргументов командной строки

```python
import sys
file = sys.argv[0]   # название запущенного файла
arg0 = sys.argv[1]   # первый аргумент командной строки
```

## Декодирование байт в строку

```python
str = bytes.decode('utf-8') # преобразует массив байт (тип bytes в строку)
```

## Десериализация json

```python
import json

data = json.loads(str)
```

## Чтение из файла

```python
open(path, 'r').read() # читает и возвращает весь файл как строку в кодировке utf-8 
```

Если же нужно прочитать байты из файла, то:

```python
b = open(path, 'rb').read()
type(b) # <class 'bytes'>
```

## Перечисление файлов

```python
import os

os.listdir('/home/y/my') # ['1.jpg', '2.jpg', '3.jpg']
```

## Работа с путями

```python
import os

file = 'photo.jpg'
dir = '/home/y/my'
os.path.join(dir, file) # /home/y/my/photo.jpg
```

## Асинхронные функции

```
import asyncio

async def foo():
    print('Running in foo')
    await asyncio.sleep(0)
    print('Explicit context switch to foo again')


async def bar():
    print('Explicit context to bar')
    await asyncio.sleep(0)
    print('Implicit context switch back to bar')


ioloop = asyncio.get_event_loop()
tasks = [ioloop.create_task(foo()), ioloop.create_task(bar())]
wait_tasks = asyncio.wait(tasks)
ioloop.run_until_complete(wait_tasks)
ioloop.close()
```

`async def foo()` и `async def bar()` - это объявления **корутин**.

Корутины могут быть запущены только из другой корутины, или обёрнуты в задачу с помощью `create_task`

Объединяем 2 задачи в одну, используя `asyncio.wait`

Отправляем задачу на выполнение в цикл событий через `ioloop.run_until_complete`

Используя `await` в какой-либо корутине, мы объявляем, что корутина может отдавать управление обратно в `event loop`, который запустит какую-либо следующую задачу. Переключение тасков происходит ТОЛЬКО по достижению **await** либо по завершению таска.

## Потоки

```
import threading
import time

def sleeper():
	print("start sleeping!")
	time.sleep(10)
	print("finish sleeping!")

def writer(x, event_for_wait, event_for_set):
    for i in range(10):
        ##event_for_wait.wait() # wait for event
        ##event_for_wait.clear() # clean event for future        
        print(x)
        time.sleep(1)
        ##event_for_set.set() # set event for neighbor thread

# init events
e1 = threading.Event()
e2 = threading.Event()

# init threads
t1 = threading.Thread(target=writer, args=(0, e1, e2))
t2 = threading.Thread(target=sleeper)

# start threads
t1.start()
t2.start()

#e1.set() # initiate the first event

# join threads to the main thread
t1.join()
t2.join()
```


## Enum

```python
class Severity(Enum):
    INFO = 0
    WARN = 1000
    CRIT = 2000
```

Если потом нужно получить значение (0/1000/200), то `e._value_`.

Если нужно название (INFO/WARN/CRIT), то `e._name_`

Преобразование значения к енуму:

```python
s = Severity(1000)
```

## Сериализация

Самый простой способ сериализовать дженерик объект:

```
import json
json.dumps(self.__dict__)
```

Однако если среди членом класса есть **Enum**, то такой выдаст ошибку. Я нашел такое решение:

```python
class Serializable:
    def toJSON(self):
        return json.dumps(self.__dict__, sort_keys=True, cls=EnumEncoder)

class EnumEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.name
        else:
            return obj.__dict__
```

## @staticmethod

Таким декоратором объявляется обычный статический метод:

```python
class Date(object):

    def __init__(self, day=0, month=0, year=0):
        self.day = day
        self.month = month
        self.year = year

	@staticmethod
	def is_date_valid(date_as_string):
	    day, month, year = map(int, date_as_string.split('-'))
	    return day <= 31 and month <= 12 and year <= 3999

# usage:
is_date = Date.is_date_valid('11-09-2012')
```

## @classmethod

Тоже статический метод, но первым аргументом всегда приходит объект типа:

```python
class Date(object):

    def __init__(self, day=0, month=0, year=0):
        self.day = day
        self.month = month
        self.year = year

	@classmethod
	def from_string(cls, date_as_string):
	    day, month, year = map(int, date_as_string.split('-'))
	    date1 = cls(day, month, year)
	    return date1

date2 = Date.from_string('11-09-2012')
```

Это лучше, чем просто делать `date = Date(day, month, year)`, потому что будет работать и для классов-наследников Date.

## args/kwargs

\*args - это список неименованных аргументов функции, передаваемый массивом:

```python
def test_var_args(f_arg, *argv):
    print "first normal arg:", f_arg
    for arg in argv:
        print "another arg through *argv :", arg

test_var_args('yasoob','python','eggs','test') // выводит python, eggs, test
```

Можно и наоборот:

```python
def test_args_kwargs(arg1, arg2, arg3):
    print "arg1:", arg1
    print "arg2:", arg2
    print "arg3:", arg3

args = ("two", 3,5)
test_args_kwargs(*args)
```

/*/*kwargs - список *именованных* аргументов, передаваемый как словарь:

```python
def greet_me(**kwargs):
    if kwargs is not None:
        for key, value in kwargs.iteritems():
            print "%s == %s" %(key,value)
 
greet_me(name="yasoob")
```

Или наоборот:

```python
def test_args_kwargs(arg1, arg2, arg3):
    print "arg1:", arg1
    print "arg2:", arg2
    print "arg3:", arg3

kwargs = {"arg3": 3, "arg2": "two","arg1":5}
test_args_kwargs(**kwargs)
```