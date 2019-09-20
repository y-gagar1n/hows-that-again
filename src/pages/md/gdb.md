---
title: "Gdb"
path: "/blog/gdb"
---

# GDB

## peda

peda - удобное окружение для GDB

https://github.com/longld/peda

Установка:

```sh
git clone https://github.com/longld/peda.git ~/peda
echo "source ~/peda/peda.py" >> ~/.gdbinit
```

## Сборка

Чтобы было удобно пользоваться gdb, при сборке нужно использовать флаги -g и -O0

## История команд

```sh
set history save on
set history filename ~/.gdb_history
```

## Основные команды

- `b main.c:175` - установить брейкпойнт в main.c:175
- `b start_work` - установить брейкпойнт в начало функции start_work
- `b start_work if b == 0` - установить брейкпойнт с условием
- `p a` - вывод переменной а
- `p *a` - вывод значения по адресу а
- `bt` - текущий бэктрэйс

## Watchpoints

- `watch expr` - установить брейкпойнт на запись выражения expr
- `rwatch expr` - установить брейкпойнт на чтение выражения expr
- `awatch expr` - установить брейкпойнт на чтение и запись выражения expr

Список можно получить по `info watchpoints`.

## Написание скриптов

Вот такой скрипт установит брейкпойнты в функции `gst_object_ref`  и `gst_object_unref`, которые будут срабатывать, когда первый аргумент (`$rdi`) указывает на тот же адрес, что и переменная `audioconvert`. При каждом срабатывании брейкпойнта будет печетаться стектрейс и выполнение продолжится дальше.

```
set pagination off 
break main.cpp:69
run
set $conv=audioconvert
break gst_object_ref if ($rdi == $conv)
commands
bt
cont
end
break gst_object_unref if ($rdi == $conv)
commands
bt
cont
end
cont
```

Ключевое слово `commands` позволяет задать несколько действий, которые будут выполнены, когда сработает этот брейкпойнт. Список действий заключен между `commands` и `end`.

`set pagination off` - указывает, что при выводе стектрейса не нужно останавливать выполнение и выводить "нажмите пробел для следующей страницы".

## Выполнение скрипта

Сохраняем скрипт в файл **script.txt** затем делаем:

```sh
gdb -x script.txt
```