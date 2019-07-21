---
title: "Gdb"
path: "/blog/gdb"
---

# GDB

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