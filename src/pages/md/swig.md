---
title: "SWIG"
path: "/blog/swig"
---
# SWIG

## Python - C++

Чтобы передать внутрь функции массив:

```
///example.i
%include "carrays.i"
...
%array_class(int, intArray)
```

В .py сгенерятся функции для работы с массивами, пример использования:

```
import example

arr = example.intArray(3)
for i in range(3):
    arr[i] = i

arr2 = example.intArray_frompointer(example.transform(arr, 3))
for i in range(3):
    print(arr2[i])
```

Здесь используются функции intArray и intArray_frompointer, так как функция transform возвращает int*

## cdata.i

cdata преобразует intArray в питоновский str

memmove преобразует питоновский str в intArray