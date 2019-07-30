---
title: "Effective Modern C++"
path: "/blog/books/effective-modern-cpp"
---

# Effective Modern C++

## Вывод типов через auto

Тип для `auto` выводится так же, как и для шаблонов. В том выводе типов у нас есть определение шаблона и его вызов:

```cpp
template<typename T>
void f(ParamType param);

f(expr);
```

Когда переменная объявляется через `auto`, то `auto` выступает в роли **T**, а спецификатор типа - как `ParamType`. Например:

```cpp
auto x = 27;			// auto -> T, auto -> ParamType
const auto cx = x;		// auto -> T, const auto -> ParamType
const auto& rx = x;		// auto -> T, const auto& -> ParamType
```

Для вывода представим соответствующие им шаблоны и их вызовы:

```cpp
template<typename T>
void func_x(T param);

func_x(27);		// ParamTYpe -> int, T -> int

template<typename T>
void func_cx(const T param);

func_cx(x);		// ParamType -> const int, T -> int

template<typename T>
void func_rx(const T& param);

func_rx(x);		// ParamType -> const int&, T -> int
```

Во всех остальных случаях логика точно такая же как и для вывода типа шаблона. Но есть одно исключение, о нем дальше.

### Особый случай для initializer_list

```cpp
auto x1 = 27;		// int
auto x2(27);		// int
auto x3 = {27};		// std::initializer_list<int> = {27}
auto x4{27};		// std::initializer_list<int> = {27}
```

Так происходит потому что в выводе типов через `auto` прописано особое правило: **если значение для авто-объявленной переменной заключено в фигурные скобки, то тип ВСЕГДА выводится как std::initializer_list**.

При этом в выводе типов для шаблонов такого правила нет и это единственное место где алгоритмы различаются:

```cpp
template<typename T>
void f(T param);

f({ 11, 23, 9 }); // ОШИБКА КОМПИЛЯЦИИ!

template<typename T>
void f2(std::initializer_list<T> list);

fw({11,23,9});		// все ок, тип T выводится как int
```

## decltype

**decltype** - это функция, которая принимает переменную, а возвращает ее тип. Может быть использована там, где ожидается указание типа.

```cpp
const int i = 0;			// decltype(i) -> const int
bool f(const Widget&);		// decltype(w) -> const Widget&, decltype(f) -> bool(const Widget&)
```

Обычно используется там, где тип возвращаемого значения зависит от типа аргумента:

```cpp
template<typename Container, typename Index>
auto authAndAccess(Container& c, Index i) -> decltype(c[i]) {
	authenticateser();
	return c[i];
}
```

здесь `auto` не имеет отношения к выводу типов, а лишь указывает, что возвращаемый тип будет указан после списка параметров (trailing return type syntax). Такой синтаксис необходимо использовать, когда тип возвращаемого значения зависит от типов параметров.

В C++14 можно возвращать из функций `auto`, не указывая тип после стрелочки, но с этим бывают проблемы, поэтому рекомендуется возвращать `decltype(auto)`.

С `authAndAccess` осталась одна проблема - она не сможет принимать rvalue для контейнера. Модифицируем так, чтобы мог:

```cpp
template<typename Container, typename Index>
auto get(Container&& c, Index i) -> decltype(std::forward<Container>(c)[i]) {
  authenticateUser();
  return std::forward<Container>(c)[i];
}
```

Теперь для **c** типа lvalue функция будет возвращать lvalue, а для rvalue - rvalue.

### Особенность поведения decltype

Применение **decltype** к имени переменной возвращает тип этого имени. Однако применение к lvalue, котороя является чем-то более сложным, чем имя, возвращает ссылку на lvalue. То есть **decltype** над выражением не-именем, имеющим тип **T** вернет тип **T&**. Такое поведение редко на что-либо влияет, однако есть интересное следствие:

```cpp
int x = 0;
decltype(x);	// int
decltype((x));	// int&
```

Как видно, оборачивание значения в скобки может поменять значение, возвращаемое **decltype**. Это особенно важно в C++14, где можно возвращать из функции `decltype(auto)` и случайно можно вернуть ссылку на элемент вместо элемента.