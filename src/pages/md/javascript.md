---
title: "Javascript"
path: "/blog/javascript"
---
# Javascript

## `__proto__`

Если свойство не находится в объекте (например `obj.property`), то оно ищется в `obj.__proto__.property`. Затем в `obj.__proto__.__proto__.property` и так до тех пор, пока следующий `__proto__` не окажется равным `null`.

## prototype.constructor

Все функции имеют свойство `prototype`, у которого по умолчанию имеется единственное свойство `constructor`, в котором хранится сама функция.

## new()

Когда исполняется `new Foo(...)` , происходит следующее:

1. Создается новый объект, наследующий Foo.prototype. То есть, примерно так: `var newFoo = { __proto__: Foo.prototype}`
2. Вызывается конструктор — функция Foo с указанными аргументами и this, привязанным к только что созданному объекту. new Foo эквивалентно new Foo(), то есть если аргументы не указаны, Foo вызывается без аргументов.
3. Результатом выражения new становится объект, возвращенный конструктором. Если конструктор не возвращает объект явно, или возвращает примитивный тип, то используется объект из п. 1.

### Альтернативное объяснение:

new Test():

1. create `new Object()` obj
2. set `obj.__proto__` to `Test.prototype`
3. `return Test.call(obj) || obj;` // normally obj is returned but constructors in JS can return a value

### Примеры

```js
var Math = function() { };
Math.prototype.add = function(a,b) { return a + b; };
var m = new Math(); // Math.prototype
m.add(5,6); // 11
```

```js
var Math = function() { return { msg: "hello" } };
Math.prototype.add = function(a,b) { return a + b; };
var m = new Math(); // { msg: "hello" }
m.add; // undefined
```

## Object.create()

```js
Object.create(prototype, descriptors)
```

Создает объект "из воздуха", используя переданный первым аргументом объект в качестве `__proto__`. Если в качестве прототипа передать `null`, то полученный объект не будет иметь прототипа. Дескриптор содержит атрибуты `value`, `writable`, `enumerable`, `configurable`.

```js
var newObj = Object.create(null, {
    size: {
        value: "large",
        enumerable: true
    },
    shape: {
        value: "round",
        enumerable: true
    }
});
```

### Отличие от new

Можно сказать, что `new X` это тоже самое, что `Object.create(X.prototype)`, только еще будет запущен конструктор X.

## for...in

Цикл for-in для массива/объекта итерирует не по элементам, а по их индексам/ключам:

```js
var arr = [9, 2, 5];
for(var item in arr) {
    console.log(item); // 1, 2, 3
}
```

В ES6 есть цикл `for...of`, итерирующий по значениям:

```js
var arr = [9, 2, 5];
for(var item of arr) {
    console.log(item); // 9, 2, 5
}
```

## Вопрос про замыкания

```js
var funcs = [];
// create a bunch of functions
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```

Этот код выдаст `3, 3, 3`. Объявить локальную переменную в теле цикла не поможет, так как в JS функции имеют function-scope область видимости.

Приходится использовать IIFE:

```js
var funcs = [];
// create a bunch of functions
for (var i = 0; i < 3; i++) {
    (function() {
        var local = i;
        funcs.push(function() {
        console.log(local);
    })
    })();
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```

В ES6 проблема решается простой заменой `var` на `let` в первом цикле:

```js
var funcs = [];
// create a bunch of functions
for (let i = 0; i < 3; i++) { // Note the use of let
    funcs.push(function() {
        console.log(i);
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```