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

## Используйте auto вместо явных определений типов

### auto не даст создать неинициализированный объект

```cpp
int x;	// не инициализирован!

auto x; // не скомпилится!
```

### Позволяет не писать сложные типы

```cpp
template<typename It>
void dwim(It b, It e)
{
  while (b != e) {
	typename std::iterator_traits<It>::value_type currValue = *b;
	auto currValue2 = *b;
	...
  }
}
```

### Экономить память при использовании функторов

Тип лямбды неизвестен до компиляции, поэтому описать его точно - невозможно. Приходится использовать тип `std::function`. 

```cpp
std::function<bool(const std::unique_ptr<Widget>&, const std::unique_ptr<Widget>&)>
	funcs = [](const std::unique_ptr<Widget>& a, const std::unique_ptr<Widget>& b) {
		return *a < *b;
	}
```

Но у него есть недостаток - он всегда занимает фиксированный размер в памяти, и если его не хватает, то аллоцирует память в куче. Тогда как реальный тип замыкания, выводимый во время компиляции и используемый с помощью **auto** всегда занимает ровно столько места, сколько ему требуется.

Плюс к этому, из-за особенностей реализации, при вызове функции через `std::function` запрещается инлайнинг и добавляется непрямой вызов функции (indirect function calls), что ухудшает производительность по сравнению с **auto**.

### Неявные приведения типов

Допустим, есть такой код:

```cpp
std::vector<int> v;
unsigned sz = v.size();
```

Все бы ничего, да только `v.size()` возвращает вовсе не **unsigned**, а `std::vector<int>::size_type`.

Другой пример:

```cpp
std::unordered_map<std::string, int> m;

for(const std::pair<std::string, int>& p: m) {
	...
}
```

Реальный тип элементов, содержащихся в `unordered_map` - `std::pair<const std::string, int>`. В результате компилятор не сможет привести `std::pair<const std::string, int>` к `std::pair<std::string, int>` и будет для каждого члена создавать временный объект, ссылку на который копировать в **p**. После каждой итерации временный объект будет уничтожен.

Использование **auto** в этом случае делает код проще и производительнее:

```cpp
std::unordered_map<std::string, int> m;

for(const auto& p: m) {...}
```

## Иногда auto выводит не то, что нужно

```cpp
std::vector<bool> features(const Widget& w);

Widget w;
auto highPriority = features(w)[5];
processWidget(w, highPriority);
```

Как ни удивительно, этот код приводит к undefined behavior. Дело в том, что оператор `[]` для `std::vector<bool>` возвращает `std::vector<bool>::reference`. Так происходит потому, что булевого типа у вектора есть специальная реализация, которая хранит по одному биту на элемент. Теперь оператор `[]` должен возвращать ссылку на бит, но в C++ запрещены ссылки на биты. Поэтому приходится возвращать тип, который *ведет себя* как `bool&`. ЭТо означает, что он, помимо прочего, должен быть неявно приводим к `bool`. 

Получается, что когда мы делаем `bool highPriority = features(w)[5]`, то возвращается `std::vector<bool>::reference`, который приводится к `bool` и дальше все нормально.

А вот когда мы делаем `auto highPriority = features(w)[5]`, то дальше все зависит от реализации типа `std::vector<bool>::reference`. Одна из реализаций представляет из себя:

- указатель на машинное слово вектора, в котором содержится интересующий бит
- сдвиг в этом слове

Итак, вызов `features` возвращает временный объект-вектор. Оператор `[]` возвращает `std::vector<bool>::reference`, в котором содержится ссылка на элемент внутри временного объекта-вектора. Мы записываем это в `highPriority`, после чего временный объект уничтожается, а в `highPriority` остается висячая ссылка на уничтоженный объект.

Здесь `std::vector<bool>::reference` - это прокси-класс, который не предназначен для того, чтобы жить дольше, чем одно выражение. Поэтому **auto** очень плохо дружит с прокси-классами.

Такие прокси-классы очень тяжело найти заранее, однако когда стало понятно, что проблема в прокси-классе, не стоит избавляться от **auto**. Лучший способ - использовать явное приведение типа:

```cpp
auto highPriority = static_cast<bool>(features(w)[5]);
```

## Различия между () и {} при инициализации объектов

Для начало важно отличать инициализацию от присвоения:

```cpp
Widget w1;			// инициализация, вызван дефолтный конструктор
Widget w2 = w1;		// инициализация, вызывается конструктор копирования
w1 = w2;			// присвоение, вызывается оператор =
```

В C++ 11 представлена *uniform initialization* - предпочтительный способ инициализации:

```cpp
int x{0};
std::vector<int> v{1,2,3,4,5};
```

Тот же синтаксис можно использовать и для задания дефолтных значений не-статическим полям классов, наравне с синтаксисом через **=**:

```cpp
class Widget {
private:
	int x{0};	// ОК
	int y = 0;	// тоже ок
	int z(0);	// ошибка компиляции!
}
```

Однако если инициализируем не-копируемый тип, то **{}** валиден наравне с синтаксисом через **()**:

```cpp
std::atomic<int>ai1{0};		// OK
std::atomic<int>ai2(0);		// OK
std::atomic<int>ai3 = 0;	// ошибка!
```

Поэтому, чтобы не путаться, лучше всегда использовать универсальную (uniform) инициализацию вида `int x{0};`.

### {} запрещает преобразование типа с потерей точности

```cpp
double x,y,z;
int sum1{ x+y+z };		// не скомпилится, так как сумма даблов может быть невыразима через int
int sum2( x+y+z );		// спокойно компилится и приводит к неожиданному поведению при выполнении
int sum3 = x + y + z;	// аналогично sum2
```

### {} не подвержена most vexing parse

В С++ есть такое правило - все, что может быть интерпретировано как объявелние, должно быть интерпретировано как объявление.

Поэтому часто, когда хотим инициализировать переменную дефолтным конструктором через скобки, вместо этого получается объявление функции:

```cpp
Widget w1(10);	// когда у конструктора есть параметры, то все норм
Widget w2();	// а вот когда хотис использовать дефолтный конструктор, то получается объявление функции
```

С использованием **{}** код выглядит так и не содержит этой проблемы:

```cpp
Widget w3{};
```

### Недостаток: опять проблемы с initializer_list

Если при инициализации через **{}** имеется конструктор, принимающий `initializer_list`, и он может быть теоретически использован, то будет использован именно он:

```cpp
class Widget {
public:
	Widget(int i, bool b);
	Widget(int i, double d);
	Widget(std::initializer_list<long double> il);
};

Widget w1(10, true);	// будет вызван первый конструктор
Widget w2{10, true};	// 3-й
Widget w3(10, 5.0);		// 2-й
Widget w4{10, 5.0};		// 3-й
```

Причем иногда путь довольно непрост:

```cpp
class Widget {
public:
  Widget(int i, bool b);
  Widget(int i, double d);
  Widget(std::initializer_list<long double> il);
  operator float() const;		// оператор преобразования Widget во float

  // конструктор копирования
  // конструктор перемещения
... };
Widget w5(w4);				// вызывается конструктор копирования 
Widget w6{w4};				// вызывается преобразование к float и затем конструктор с initializer_list, так как float может быть преобразован к long double
Widget w7(std::move(w4));	// конструктор перемещения
Widget w8{std::move(w4)};	// опять конструктор с initializer_list через преобразование к float
```

Более того, компилятор настолько сильно хочет использовать `initializer_list`, что даже идеально подходящие другие конструкторы ему не помеха:

```cpp
class Widget {
public:
  Widget(int i, bool b);
  Widget(int i, double d);
  Widget(std::initializer_list<bool> il);
... 
};

Widget w{10, 5.0};	// ошибка компиляции!
```

Компилятор, несмотря на то, что есть конструктор, принимающий **int** и **double**, опять попытался использовать конструктор с `initializer_list` и не смог, потому что для этого требуется сужающее приведение **int** и **double** к **bool**, а сужающие приведения запрещены в инициализации через **{}**.

Однако и из этого правила есть исключение - если есть дефолтный конструктор и мы вызываем инициализацию без параметров, то дефолтный конструктор имеет высший приоритет над конструктором с `initializer_list`:

```cpp
 class Widget {
public:
  Widget();
  Widget(std::initializer_list<int> il);
... };
Widget w1;		// дефолтный конструктор
Widget w2{};	// дефолтный конструктор
Widget w3();	// most vexing parse! объявляет функцию

Widget w4({});	// только так мы в этом случае можем вызвать конструктор с initializer_list
Widget w5{{}};	// ну или так
```


Один из выводов из всего этого - если вы автор библиотеки, то не стоит добавлять конструктор, принимающий `initializer_list`, так как тогда возможно клиенты не смогут использовать ваши остальные конструкторы.

## Используйте nullptr вместо 0 и NULL

В С++98 использование 0 и NULL приводило к тому, что перегрузки, принимающие указатель, могли не вызываться:

```cpp
void f(int);
void f(bool);
void f(void*);

f(0);			// f(int)
f(NULL);		// могло не скомпилиться, но если компилилось, то вызывало f(int)
```

Все потому, что 0 - это целочисленный тип и NULL часто был определен тоже как численный тип.

Преимущество **nullptr** - он не может быть интерпретирован как численный тип, только как указатель. Тип **nullptr** - `std::nullptr_t`. ЭТот тип неявно приводит к себе указатели всех типов, поэтому **nullptr** - универсальный указатель.

```cpp
f(nullptr);		// f(void*)
```

## Используйте alias вместо typedef

В С++98 были **typedef**:

```cpp
typedef
     std::unique_ptr<std::unordered_map<std::string, std::string>>
     UPtrMapSS;
```

Они устарели, когда в C++11 появились алиасы:

```cpp
 using UPtrMapSS =
     std::unique_ptr<std::unordered_map<std::string, std::string>>;
```

Еще один пример, демонстрирующий повышенную читаемость алиасов по сравнению с тайпдефом:

```cpp
typedef void (*FP)(int, const std::string&);

using FP = void (*)(int, const std::string&);
```

Основное преимущество - алиасы могут быть шаблонизированы, а тайпдефы - нет. В С++98 приходилось извращаться и определять тайпдефы внутри шаблонизированных структур:

```cpp
template<typename T>
struct MyAllocList { 
	typedef std::list<T, MyAlloc<T>> type;
};

MyAllocList<Widget>::type lw;
```

Если же после этого мы захотим использовать этот шаблно внутри другого шаблонизированного класса, то придется писать `typename`:

```cpp
template<typename T>
class Widget {
private:
	typename MyAllocList<T>::type list;
... };
```

Кстати, при использовании type traits так и приходится писать, так как они были реализованы с использованием тайпдефов, а не алиасов, несмотря на то, что были введены в C++11. В С++14 признали эту ошибку и для каждого класса `std::transformation<T>::type` теперь есть соответствующий `std::transformation_t<T>`, реализованный через алиасы.

Так вот, в С++11 есть алиасы и использовать их мы можем так:

```cpp
template<typename T>
using MyAllocList = std::list<T, MyAlloc<T>>;

MyAllocList<Widget> lw;
```

## Используйте scoped enums вместо unscoped enums

Есть такое правило, что имя, объявленное внутри фигурных скобок, видно только внутри области, ограниченной этими скобками. Это правило соблюдается всегда, кроме енумов в C++98.

Поэтому енумы в C++98 - unscoped enums:

```cpp
enum Color {red, black, white};

auto white = false;		// ОШИБКА КОМПИЛЯЦИИ! white уже определен
```

В С++11 им на замену пришли scoped enums:

```cpp
enum class Color {red, black, white};

auto white = false;		// все норм
Color c = white;		// ОШИБКА КОМПИЛЯЦИИ! нет имени white в текущем скоупе
Color c = Color::white;	// ok
auto c = Color::white;	// ok
```

Помимо ограниченной видимости, вторая причина, по которой стоит использовать scoped enums - более строгая типизация. Unscoped enums свободно неявно приводятся к целочисленным типам и типам с плавающей точкой:

```cpp
Color c = Color::red;

if(c < 14.5) {	// ОШИБКА КОМПИЛЯЦИИ
	...
}

if(static_vast<double>(c) < 14.5) {		// OK
	...
}
```

И еще одно преимущество - при использовании scoped enums не нужно перекомпиливать клиентов енума при добавлении в него нового значения. А с unscoped enums - нужно.

Дефолтный тип для scoped enums - int, для unscoped enums - нет дефолтного.

## Используйте deleted функции вместо private undefined

В С++98 когда нужно запретить вызов какой-либо функции (обычно конструктора присваивания или копирования), то определяют ее как private и просто не пишут ее реализацию:

```cpp
template <class charT, class traits = char_traits<charT> >
   class basic_ios : public ios_base {
   public:
...
private:
     basic_ios(const basic_ios& );            // not defined
     basic_ios& operator=(const basic_ios&);  // not defined
   };
```

**private** гарантирует, что внешний код не имеет доступ к этим функциям. Отсутствие реализации для таких функций гарантирует, что даже если какой-то какой-то код, имеющий к ним доступ, попытается их вызвать, он получит ошибку на этапе линковки.

В C++11 такие функции определяются как удаленные:

```cpp
template <class charT, class traits = char_traits<charT> > 
class basic_ios : public ios_base {
public:
	...
	basic_ios(const basic_ios& ) = delete; 
	basic_ios& operator=(const basic_ios&) = delete; 
	...
}
```

Удаленные функции никак не могут быть использованы и такие попытки приведт к ошибкам на этапе компиляции.

А еще, используя удаленные функции, можно запредить использование шаблонных функций с определенными типами:

```cpp
template<typename T>
void processPointer(T* ptr);

template<>
void processPointer<void>(void*) = delete;
template<>
void processPointer<char>(char*) = delete;
template<>
void processPointer<const void>(const void*) = delete;
template<>
void processPointer<const char>(const char*) = delete;
```