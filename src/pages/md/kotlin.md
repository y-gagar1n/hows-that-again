---
title: "Kotlin"
path: "/blog/kotlin"
---

# Kotlin

Полная грамматика языка: https://kotlinlang.org/docs/reference/grammar.html
Полная документация: https://kotlinlang.org/docs/kotlin-docs.pdf

## Определение функций

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

Если содержит не более одного выражения, то можно использовать сокращенную версию:

```kotlin
fun sum(a: Int, b: Int) = a + b
```

Если ничего не возвращает, то возвращаемый тип должен быть `Unit`.

## Function types

Тип-функция имеет такой синтаксис:

```kotlin
# (Int) -> String 
val onClick: () -> Unit = ...
val a = { i: Int -> i + 1 }
```

### Receiver type

Для типов-фукнций может быть указан тип-получатель:

```kotlin
A.(B) -> C
```

Это значит, что будет вызываться функция с заголовком `(B) -> C` для инстанса типа `A`. К инстансу в теле функции можно будет обратиться через **this**.

Пример:

```kotlin
val repeatFun: String.(Int) -> String = { times -> this.repeat(times) }
```

Причем тип "функция с ресивером" взаимозаменяем с типом "функция без ресивера", если ресивер во втором случае передавать первым аргументом:

```kotlin
val repeatFun: String.(Int) -> String = { times -> this.repeat(times) }
val twoParameters: (String, Int) -> String = repeatFun // OK

fun runTransformation(f: (String, Int) -> String): String {
    return f("hello", 3)
}
val result = runTransformation(repeatFun) // OK
```

## Лямбды

```kotlin
max(strings, { a, b -> a.length < b.length })
val sum: (Int, Int) -> Int = { x: Int, y: Int -> x + y }
val sum = { x, y -> x + y }
```

Есть такое соглашение: если последний аргумент функции является функцией, то его можно вынести за скобки:

```kotlin
val product = items.fold(1) { acc, e -> acc * e }
```

Этот синтаксис называется *trailing lambda*.

### it

Если у лямбды только 1 аргумент, то при объявлении лямбды список аргументов можно опустить и потом в теле обращаться к аргументу через **it**:

```kotlin
ints.filter { it > 0 } // this literal is of type '(it: Int) -> Boolean'
```

### Возврат значения из лямбды

```
ints.filter {
    val shouldFilter = it > 0 
    shouldFilter                # автоматически возвращается результат последнего выражения
}

ints.filter {
    val shouldFilter = it > 0 
    return@filter shouldFilter  # если сделать просто return, то произойдет выход из функции, в которой объявляется эта лямбда
}
```


## Интерполяция строк

```kotlin
println("i = $i")
println("Hello, ${args[0]}!") # для выражений нужно использовать фигурные скобки
```

## Raw strings

```kotlin
val text = """
    for (c in "foo")
        print(c)
"""
```

## Arrays

```kotlin
val a = arrayOf(1,2,3,4,5)	# [1,2,3,4,5]
val b = arrayOfNulls(3)		# [Null,Null,Null]
val c = Array(5) { i -> (i * i).toString() }	# [0,1,4,9,16]
```

В последней строчке вызывается конструктор `Array`, принимающий количество элементов и лямбду-инициализатор, принимающую в `it` индекс элемента. Объявление такого конструктора выглядит так: `<init>(size: Int, init: (Int) -> T)`

## Приведение типов

```kotlin
fun getStringLength(obj: Any): Int? {
    if (obj is String)
        return obj.length // no cast to String is needed
    return null
}
```

### Небезопасное

Если мы не хотим предварительно проверять тип через `is` и уверены в себе, то можно сразу привести:

```kotlin
val x: String = y as String
```

Но следует помнить, что в случае несовместимости типов будет выброшено `ClassCastException`. Если такой вариант не подходит, можно воспользоваться **безопасным приведением**.

### Безопасное приведение

Обычное приведение типа может выбросить ClassCastException если типы несовместимы. Можно использовать безопасное приведение, которое в этом случае вернет null:

```kotlin
val aInt: Int? = a as? Int
```


## For loop

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}
```

## When

Аналог switch-case, только более умный, потому что проверяет не только на равенство, но и другие выражения:

```kotlin
fun describe(obj: Any): String =
    when (obj) {
        1          -> "One"
        "Hello"    -> "Greeting"
        is Long    -> "Long"
        !is String -> "Not a string"
        else       -> "Unknown"
    }
```

Выражение when можно даже использовать как значение:

```kotlin
println(when (language) {
    "EN" -> "Hello!"
    "FR" -> "Salut!"
    "IT" -> "Ciao!"
    else -> "Sorry, I can't greet you in $language yet"
})
```

Выражение `when` может быть хорошей заменой цепочке if-else. Еще примеры:

```kotlin
when (x) {
    parseInt(s) -> print("s encodes x")
    else -> print("s does not encode x")
}
```

```kotlin
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}
```

```kotlin
fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}
```

Можно даже захватывать субъект when (начиная с версии 1.3), пример:

```kotlin
fun Request.getBody() =
        when (val response = executeRequest()) {
            is Success -> response.body
            is HttpError -> throw HttpException(response.status)
        }
```

## Проверка на вхождение

```kotlin
val list = listOf("a", "b", "c")

if (2 in 0..list.lastIndex) {
    println("2 is in range")
}
if (list.size !in list.indices) {
    println("list size is out of valid list indices range, too")
}
```

## Интервалы

```kotlin
for (x in 1..5) {
    print(x)
}
for (x in 1..10 step 2) {
    print(x)
}
for (x in 9 downTo 0 step 3) {
    print(x)
}
```

## Тернарный оператор

```kotlin
val language = if (args.size == 0) "EN" else args[0]
```

## Классы

### Конструкторы

У класса может быть первичный конструктор и несколько вторичных.

#### Первичный конструктор

Первичный конструктор является частью заголовка класса и не содержит кода:

```kotlin
class Person constructor(firstName: String) { /*...*/ }	# вот здесь constructor(firstName: String) - это и есть первичный конструктор
```

Если нет никаких атрибутов и модификаторов видимости, то ключевое слово `constructor` можно опустить:

```kotlin
class Person(firstName: String) { /*...*/ }
```

Если нужен какой-то код инициализации, то он должен быть помещен в **initializer block**, обозначаемый ключевым словом `init`. Причем таких блоков может быть несколько и при инициализации инстанса они будут выполняться в порядке объявления:

```kotlin
class InitOrderDemo(name: String) {
    val firstProperty = "First property: $name".also(::println)
    
    init {
        println("First initializer block that prints ${name}")
    }
    
    val secondProperty = "Second property: ${name.length}".also(::println)
    
    init {
        println("Second initializer block that prints ${name.length}")
    }
}
```

В блоках инициализации и в инициализаторах пропертей могут быть использованы аргументы первичного конструктора:

```kotlin
class Customer(name: String) {
    val customerKey = name.toUpperCase()
}
```

Для объявления и инициализации полей есть специальный синтаксис:

```kotlin
class Customer(val name: String) { }
```

Эта запись аналогична:

```kotlin
class Custom(name: String) {
	val name: String

	init {
		this.name = name
	}
}
```

#### Вторичный конструктор

Вторичный конструктор обязательно должен иметь ключевое слово `constructor`.

Если класс имеет первичный конструктор, то каждый вторичный должен ссылаться на него либо прямо, либо опосредованно через другой вторичный конструктор:

```kotlin
class Person(val name: String) {
    var children: MutableList<Person> = mutableListOf<Person>();
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
```

## Null safety

```kotlin
var b: String? = "abc"
# val l = b.length // error: variable 'b' can be null
var l = if (b != null) b.length else -1		// OK
l = b?.length
```

Функция `let` позволит выполнить non-null операцию над nullable типом:

```kotlin
b?.let { println(it) }
```

### Elvis operator

Позволяет указать дефолтное значение для случая, когда выражение под вопросом равно null:

```kotlin
val l = b?.length ?: -1		# аналогично val l: Int = if (b != null) b.length else -1
```

### Оператор !!

Превращает любое значение в non-null значение и бросает NUllPointerException если значение равно null.

```kotlin
val l = b!!.length
```

## Data classes

Это классы, которые нужны исключительно для хранения данных.

Объявление:

```kotlin
data class User(val name: String, val age: Int)
```

Для таких классов компилятор автоматически генерирует реализации функций:

- `equals()/hashCode()`, если отсутствует явная пользовательская реализация;
- `toString()` в форме `"User(name=John, age=42)"`, если отсутствует явная пользовательская реализация;
- функции `componentN()`, необходимые для мульти-деклараций https://kotlinlang.org/docs/reference/multi-declarations.html
- `copy()`

В сгенерированных функциях участвуют только аргументы первичного конструктора. Если должно быть поле, не участвующее в этих реализациях, то его нужно обновить внутри тела класса:

```kotlin
data class Person(val name: String) {
    var age: Int = 0
}
```

## Итерирование по словарю

```kotlin
fun main(args: Array<String>) {
    val map = hashMapOf<String, Int>()
    map.put("one", 1)
    map.put("two", 2)

    for ((key, value) in map) {
        println("key = $key, value = $value")
    }
}
```