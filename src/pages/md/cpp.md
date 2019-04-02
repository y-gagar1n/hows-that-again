---
title: "C++"
path: "/blog/cpp"
---

# Suggestions for C++ programmers (C++11 features)

1. Use constructors to establish invariants (§2.4.3.2, §13.4, §17.2.1).
2. Use constructor/destructor pairs to simplify resource management (RAII; §5.2, §13.3).
3. Avoid ‘‘naked’’ new and delete (§3.2.1.2, §11.2.1).
4. Use containers and algorithms rather than built-in arrays and ad hoc code (§4.4, §4.5,
§7.4, Chapter 32).
5. Prefer standard-library facilities to locally developed code (§1.2.4).
6. Use exceptions, rather than error codes, to report errors that cannot be handled locally
(§2.4.3, §13.1).
7. Use move semantics to avoid copying large objects (§3.3.2, §17.5.2).
8. Use unique_ptr to reference objects of polymorphic type (§5.2.1).
9. Use shared_ptr to reference shared objects, that is, objects without a single owner that is
responsible for their destruction (§5.2.1).
10. Use templates to maintain static type safety (eliminate casts) and avoid unnecessary use
of class hierarchies (§27.2).

# Suggestions for C Programmers

1. Don’t think of C++ as C with a few features added. C++ can be used that way, but only
suboptimally. To get really major advantages from C++ as compared to C, you need to
apply different design and implementation styles.
2.  Don’t write C in C++; that is often seriously suboptimal for both maintenance and perfor-
mance.
3. Use the C++ standard library as a teacher of new techniques and programming styles.
Note the difference from the C standard library (e.g., = rather than strcpy() for copying
and == rather than strcmp() for comparing).
4. Macro substitution is almost never necessary in C++. Use const (§7.5), constexpr (§2.2.3,
§10.4), enum or enum class (§8.4) to define manifest constants, inline (§12.1.5) to avoid
function-calling overhead, template s (§3.4, Chapter 23) to specify families of functions
and types, and namespace s (§2.4.2, §14.3.1) to avoid name clashes.
5. Don’t declare a variable before you need it, and initialize it immediately. A declaration
can occur anywhere a statement can (§9.3), in for -statement initializers (§9.5), and in con-
ditions (§9.4.3).
6. Don’t use malloc() . The new operator (§11.2) does the same job better, and instead of
realloc() , try a vector (§3.4.2). Don’t just replace malloc() and free() with ‘‘naked’’ new and
delete (§3.2.1.2, §11.2.1).
7. Avoid void∗ , unions, and casts, except deep within the implementation of some function
or class. Their use limits the support you can get from the type system and can harm per-
formance. In most cases, a cast is an indication of a design error. If you must use an
explicit type conversion, try using one of the named casts (e.g., static_cast ; §11.5.2) for a
more precise statement of what you are trying to do.
8. Minimize the use of arrays and C-style strings. C++ standard-library string s (§4.2), array s
(§8.2.4), and vector s (§4.4.1) can often be used to write simpler and more maintainable
code compared to the traditional C style. In general, try not to build yourself what has
already been provided by the standard library.
9. Avoid pointer arithmetic except in very specialized code (such as a memory manager) and
for simple array traversal (e.g., ++p ).
10. Do not assume that something laboriously written in C style (avoiding C++ features such
as classes, templates, and exceptions) is more efficient than a shorter alternative (e.g.,
using standard-library facilities). Often (but of course not always), the opposite is true.

# Suggestions for Java/C# Programmers

1. Don’t simply mimic Java style in C++; that is often seriously suboptimal for both main-
tainability and performance.
2. Use the C++ abstraction mechanisms (e.g., classes and templates): don’t fall back to a C
style of programming out of a false feeling of familiarity.
3. Use the C++ standard library as a teacher of new techniques and programming styles.
4. Don’t immediately invent a unique base for all of your classes (an Object class). Typi-
cally, you can do better without it for many/most classes.
5. Minimize the use of reference and pointer variables: use local and member variables
(§3.2.1.2, §5.2, §16.3.4, §17.1).
6. Remember: a variable is never implicitly a reference.
7. Think of pointers as C++’s equivalent to Java references (C++ references are more lim-
ited; there is no reseating of C++ references).
8. A function is not virtual by default. Not every class is meant for inheritance.
9. Use abstract classes as interfaces to class hierarchies; avoid "brittle base classes", that is, base classes with data members.
10. Use scoped resource management ("Resource Acquisition Is Initialization"; RAII) when-
ever possible.
11. Use a constructor to establish a class invariant (and throw an exception if it can’t).
12. If a cleanup action is needed when an object is deleted (e.g., goes out of scope), use a de-
structor for that. Don’t imitate finally (doing so is more ad hoc and in the longer run far
more work than relying on destructors).
13. Avoid "naked" `new` and `delete` ; instead, use containers (e.g., `vector`, `string`, and `map`) and handle classes (e.g., `lock` and `unique_ptr` ).
14. Use freestanding functions (nonmember functions) to minimize coupling (e.g., see the
standard algorithms), and use namespaces (§2.4.2, Chapter 14) to limit the scope of free-
standing functions.
15. Don’t use exception specifications (except `noexcept`; §13.5.1.1).
16. A C++ nested class does not have access to an object of the enclosing class.
17. C++ offers only the most minimal run-time reflection: `dynamic_cast` and `typeid` (Chapter
22). Rely more on compile-time facilities (e.g., compile-time polymorphism; Chapter 27,
Chapter 28).

# Ключевые слова

## constexpr

`const` - константное выражение, которое может быть вычислено на этапе выполнения.

`constexpr` - константное выражение, которое должно быть вычислено на этапе компиляции. Необходимо для экономии ресурсов, а так же в некоторых синтаксических конструкциях. 

- Переменная может быть объявлена как `constexpr`, если она имеет **литеральный тип** и инициализирована. Если инициализация осуществляется через конструктор, то конструктор должен быть помечен как `constexpr`. 

- Ссылка может быть объявлена как `constexpr`, если объект, на который она ссылается инициализирован константным выражением и все преобразования, выполняемые при инициализации, тоже являются константными выражениями.

# Указатели

Проверка, указывает ли указатель на объект:

`if (p==nullptr) return 0;`

## Разница между указателями и ссылками


1. Указатель может быть переназначен сколько угодно раз, ссылка - не может.
2. Указатель может указывать в никуда (`nullptr`), ссылка - не может.
3. Адрес ссылки получить нельзя.
4. Нет "арифметики ссылок".
5. Можно иметь указатель на указатель на указатель и т.д. У ссылок может быть только один уровень.
6. Чтобы получить значение по ссылке, не нужно использовать символы \* и ->.

## Когда использовать ссылки

- аргументы функций
- возвращаемые значения функций

## Когда использовать указатели

- в алгоритмах
- в структурах данных

# Конструктор инициализации

```
class Vector {
public:
    Vector(int s) :elem{new double[s]}, sz{s} {}
private:
    double* elem;
    int sz;
};
```

Здесь запись `Vector(int s) :elem{new double[s]}, sz{s} {}` означает, что при использовании этого конструктора нужно приватные поля `elem` и `sz` инициализировать указанными значениями.

# Ассершны

Ассерты в рантайме осуществляются командой `static_assert`:

`static_assert(4<=sizeof(int), "Integers are too small");`

# RAII

Формулируется так: владение ресурсом есть инварианта класса. Это означает, что захват ресурса должен производиться в конструкторе, а освобождение - в деструкторе.

Рантайм обеспечивает, что деструктор вызывается только, если конструктор не возбудил исключения. Поэтому если в конструкторе не удалось захватить ресурс - нужно стрелять исключение. Если в деструкторе не удалось освободить - тоже стрелять исключение.

# initializer_list

Если мы инициализируем контейнер следующей конструкцией:

`Vector v = {1,2,3,4,5};`

то у него вызывается вот такой конструктор:

`Vector(initializer_list<double> lst)`

## Пример реализации

```cpp
#include <initializer_list>
#include <algorithm>

Vector(std::initializer_list<double> lst) {
	std::copy(lst.begin(), lst.end(), elem);
}
```

# Конструктор

Если у класса есть конструктор, принимающий один аргумент, то этот конструктор будет вызываться при инициализации аргументов этого типа.

Пример:

```cpp
class uri {
public:
    uri(const char* s): _c{s} {}
private:
    const char* _c;
};

uri u = "http://www.ya.ru";   // будет вызван конструктор
```

# Копирование объектов

По дефолту при присваивании происходит полное копирование всех членов объекта.

Например,

```cpp
1 Vector bad_copy(Vector v1) 
2 {
3 	Vector v2 = v1;
4 	v1[0] = 2;   // v2[0] теперь тоже равен 2
5 	v2[1] = 3;   // v1[1] теперь тоже равен 3
6 	return v2;
7 }
```

В большинстве случаев это совсем не то, чего мы хотели, так как это может нарушить RAII. Простое правило - если у класса есть деструктор, то это скорее всего означает, что дефолтная семантика копирования нам не подходит.

Варианта решения два: *конструктор копирования* и *присваивание копированием*.

## Конструктор копирования

Этот конструктор будет неявно вызываться каждый раз, когда мы передаем значение в функцию (не по ссылке), либо возвращаем из функции (опять же не по ссылке).

```cpp
Vector::Vector(const Vector& a)
	:elem{new double[sz]},
	sz{a.sz}
{
	for(int i=0; i<sz; ++i)
		elem[i]=a.elem[i];
}
```

В вышеуказанном примере конструктор копирования будет вызван в строчках 1 и 6.

## Присваивание копированием

Этот метод будет вызываться, когда происходит присваивание не по ссылке.

```cpp
Vector& Vector::operator=(const Vector& a)
{
	double* p = new double[a.sz];
	for(int i=0; i < sz; ++i)
		p[i]=a.elem[i];
	delete[] elem;
	elem=p;
	sz=a.sz;
	return *this;
}
```

В вышеуказанном примере конструктор копирования будет вызван в строчке 3.

# Перемещение объектов

Допустим, у нас есть такой код:

```cpp
1 Vector operator+(const Vector& a, const Vector& b)
2 {
3     Vector res(a.size());
4     for (int i=0; i!=a.size(); ++i)
5         res[i]=a[i]+b[i];
6     return res;
7 }
```

Аргументы передаются по ссылке, тут все нормально. Но возвращать ссылку мы не можем (переменная на стеке res будет уничтожена как только мы выйдем из функции). Поэтому возвращаем значение и тут опять будет вызван конструктор копирования. Если вектор большой, то это будет весьма затратная операция.

Более того, если клиент будет использовать суммирование так:

`Vector v = v1 + v2 + v3`

то в процессе будет осуществлено как минимум одно побочное копирование, которое нам в конечном счете совсем не нужно.

Чтобы избежать копирования большого количества полей объекта, можно реализовать семантику перемещения через *конструктор перемещения* или *присваивание перемещением*. 

Обе эти конструкции используют `&&`, что означает не ссылку на ссылку, а **rvalue reference**, то есть ссылку, к которой можно привязать правую часть выражения (об этом позже).

Реализуется конструктор/присваивание таким образом, чтобы нужные поля "переместились" из правой части в левую, то есть из правой части значения пропадают, а в левой - появляются.

Также мы можем "помочь" компилятору, указав явное перемещение командой `std::move`.

## Конструктор перемещения

Имеет сигнатуру `Vector(Vector&& a)`.

Пример реализации:

```cpp
Vector::Vector(Vector&& a)
	:elem{a.elem},
	sz{a.sz}
{
	a.elem = nullptr;
	a.sz = 0;
}
```

В указанном примере компилятор распознает возможность и вызовет конструктор перемещения в строке 6.

## Присваивание перемещением

Имеет сигнатуру `Vector& operator=(Vector && a)`.

# Шаблоны

Синтаксис такой:

```cpp
template<typename T>
class Vector {
private:
	T* elem;
	...
}
```

Причем если есть функции, определенные снаружи скоупа класса, то для них шаблон должен быть определен точно так же:

```cpp
template<typename T>
T& Vector<T>::operator[](int i) const
{
    return elem[i];
}
```

Причем придется так писать даже если тип внутри метода не используется:

И еще **важное примечание**. Шаблонные реализации методов **не могут** быть описаны в файле .cpp, только в .h! Поэтому если у нас в .h заголовке описывается шаблонный класс, то это нормально, если у него нет соответствующего .cpp файла и все реализации описаны прямо в заголовке!

Причина этого - в том, что все .cpp файлы компилируются по отдельности (а потом соединяются воедино линковщиком). В .cpp файле у нас, допустим, встречается `Vector<int>`. Чтобы скомпилировать эту строчку, компилятору нужно сгенерить новый класс, а для этого он должен видеть реализацию шаблона. Если реализация описана в другом файле .cpp, то на данном этапе у компилятора нет к нему доступа, а есть только к тем, которые описаны в текущем файле в секциях `#include` (обычно это файлы заголовков). Когда же он дойдет до компиляции того файла .cpp, в котором описана реализация шаблона, то он уже забудет, что нужно было сгенерить `Vector<int>`, так как (см. выше) все файлы компилятся отдельно.

Еще часто делают так:

```cpp
// Foo.h
template <typename T>
struct Foo
{
    void doSomething(T param);
};

#include "Foo.tpp"

// Foo.tpp
template <typename T>
void Foo<T>::doSomething(T param)
{
    //implementation
}
```

# Вариативные шаблоны

Вариативные шаблоны - это шаблоны с заранее неисвестным числом аргументов.

Пример:

```cpp
template<typename T, typename ... Tail>
void f(T head, Tail... tail)
{
	g(head); // сделать что-то с первым параметром
	f(tail...); // рекурсивно вызвать себя с оставшимися параметрами
}

void f() { }  // когда ничего не осталось в списке типов - не делать ничего

template<typename T>
void g(T x)
{
	cout << x << " ";
}

f(1, 0.2, "hello")  // выведет 1 0.2 hello
```

# Функторы

Функторы - это объекты-функции, то есть объекты, которые могут быть вызваны как функции.

Чтобы создать функтор, нужно всего лишь у класса переопределить ооператор `()`.

```cpp
template<typename T>
class Less_than {
	const T val;  // value to compare against
public:
	Less_than(const T& v) :val(v) { }
	bool operator()(const T& x) const { return x<val; } // call operator
};

Less_than<int> lti {42};
// lti(i) will compare i to 42 using < (i<42)
Less_than<string> lts {"Backus"}; // lts(s) will compare s to "Backus" using < (s<"Backus")

void fct(int n, const string & s)
{
	bool b1 = lti(n);  // true if n<42
	bool b2 = lts(s);  // true if s<"Backus"
	// ...
}
```

# Лямбды

Лямбды описываются так:

`[&](int a){ return a<x; }`

Здесь `[&]` - это capture list, или лист захвата. Возможные значения:

- `[&]` что все переменные, используемые в теле лямбды, будут переданы по ссылке
- `[&x]` - передается только `x`, по ссылке
- `[=]` что все переменные, используемые в теле лямбды, будут переданы в виде копий
- `[=x]` - передается только `x`, в виде копии
- `[]` - не передается ничего

# Стандартная библиотека

## Коллекции

- `vector<T>` - стандартный массив с динамическим размером. Проверок на выход за границы не делает, выдает мусор в этом случае
- `list<T>` - двойной связанный список
- `forward_list<T>` - одинарный связанный список
- `deque<T>` - очередь с двумя концами
- `set<T>` - множество
- `multiset<T>` - множество, в котором значение может встречаться несколько раз
- `map<K,V>` - ассоциативный массив, реализованный в виде красно-черного дерева поиска. Сложность поиска - **O(log(n))**.
- `multimap<K,V>` - ассоциативный массив, в котором значение может встречаться несколько раз
- `unordered_map<K,V>` - ассоциативный массив, реализованный в виде хэш-таблицы.
- `unordered_multimap<K,V>` - ассоциативный мульти-массив, реализованный в виде хэш-таблицы.
- `unordered_set<T>` - множество, реализованное как хэш-таблица
- `unordered_multiset<T>` - мультимножество, реализованное как хэш-таблица

Все эти коллекции представлены в заголовках: `<vector>, <list>, <map>`.

Помимо перечисленных есть еще:

- `queue<T>`
- `stack<T>`
- `priority_queue<T>`


### list

Вставка и удаление реализуются с использованием итераторов:

```cpp
void f(const Entry& ee, list<Entry>::iterator p, list<Entry>::iterator q)
{
	list.insert(p, ee);
	list.erase(q);
}
```

### map

Инициализация:

```cpp
map<string, int> book {
	{"Ann", 123},
	{"John", 456}
};
```

### unordered_map

Инициализация такая же, как и у `map`.

### Итерирование по любой коллекции

Через begin-end:

```cpp
for(auto p = list.begin(); p!=list.end(); ++p)
	cout << p->name;
```

Через местный форыч:

```cpp
for(const auto& p: list)
{
	cout << p.name;
}
```

# Управление ресурсами

В первую очередь нужно использовать RAII и контейнеры. Указатели стоит использовать лишь тогда, когда нужна именно семантика указателей, и даже в этом случае стоит по минимуму использовать `new` и `delete`, а вместо этого прибегать к смарт-указателям: `unique_ptr` и `shared_ptr`.

## unique_ptr

```cpp
1  void f(int i, int j)
2  {
3  	X* p = new X;
4	unique_ptr<X> sp {new X};
5
6	if(i<99) throw Z{};
7	if(j<77) return;
8	p->do_something();
9	sp->do_something();
10	//...
11	delete p;
12 }
```

В строчках 6-9 может произойти преждевременный выход и тогда указатель `p` не освободится. А указатель `sp` гарантирует, что его объект будет уничтожен не зависимо от того, каким образом мы выйдем из функции.

Кстати, если бы мы объявили `x` как `X x;`, то достигли бы того же эффекта.

## shared_ptr

Семантика похожа на `unique_ptr`, только эти указатели копируются, а не перемещаются.

```cpp
void f(shared_ptr<fstream>);
void g(shared_ptr<fstream>);

void user(const string& name, ios_base::openmode mode)
{
	shared_ptr<fstream> fp {new fstream(name, mode)};
	if (!∗fp) throw No_file{}; // make sure the file was properly opened
	f(fp);
	g(fp);
	// ...
}
```

Файл, открытый конструктором `fp` будет уничтожен, когда последняя из использующих его функций (`user`, `f`, `g`) уничтожит свою копию указателя.

`shared_ptr` усложняет рассуждения о времени жизни объекта, поэтому его стоит использовать только когда точно нужно разделяемое владение.

# Многопоточность

Чтобы создать новый поток, нужно создать объект `std::thread` и передать ему функтор в качестве аргумента:

```cpp
void f();

struct F {
	void operator()();
}

void user()
{
	thread t1 {f};
	thread t2 {F()};

	t1.join();
	t2.join();
}
```

Если в функтор нужно передать аргументы, то они перечисляются как остальные аргументы `thread` после самого функтора:

```cpp
void f(int a);

thread t1 {f, 42};
```

Если из потоков нужно что-то вернуть, то придется одним из аргументов передавать указатель на место, куда вернуть результат:

```cpp
void f(int a, int* res);

int res;
thread t1 {f, 52, &res};
```

## Синхронизация

### mutex

Вот так используем мютексы, чтобы синхронизировать доступ к разделяемой переменной из нескольких потоков:

```cpp
mutex m;
int sh;

void f() 
{
	unique_lock<mutex> lck{m};
	sh+=7;
}
```

Структура `unique_lock` поддерживает RAII, поэтому мютекс будет автоматически захвачен (`m.lock()`) в ее конструкторе и автоматически освобожден (`m.unlock()`) в ее деструкторе по выходу из функции `f`.

### condition_variable

Механизм, позволяющий одному потоку ждать другого. В частности, позволяет потоку ждать выполнения некоего условия (собыия), которое выполняется как результат работы другого потока.

Функция `wait(unique_lock<mutex>& lock)` блокирует текущий поток, пока кто-то не вызовет `notify_one` или `notify_all`. Автоматически отпускает `lock`, а когда события дождались - захватывает его обратно. Иногда бывают ложные выстрелы события, поэтому лучше использовать в виде `while(mcond.wait(lck))`. Перед вызовом `wait` блокировка `lock` должна быть уже захвачена.

В качестве второго параметра может принимать предикат, который будет автоматически проверяться для избежания ложных выстрелов события.

На этом основании можно решить классичекую задачу producer-consumer:

```cpp
class Message { ...}

queue<Message> mqueue;
condition_variable mcond;
mutex mmutex;

void consumer() 
{
	while(true) {
		unique_lock<mutex> lck{mmutex};			// захватываем lck
		while(mcond.wait(lck))  /*do nothing*/; // lck отпускается, а мы ждем события mcond
												// когда дождались события mcond, lck автоматически захватывается вновь
		auto m = mqueue.front();
		mqueue.pop();
		lck.unlock();							// совсем отпускаем lck
		// ... process m...
	}
}

void producer() 
{
	while(true) {
		Message m;
		unique_lock<mutex> lck {mmutex};	// захватываем lck
		mqueue.push(m);
		mcond.notify_one();					// "стреляем" событие, означающее, что в mqueue появились элементы
											// lck автоматически отпускается
	}
}
```

## Таски

Есть несколько конструкций, более высокоуровневых, чем треды:

- `future`, `promise`
- `packaged_task`
- `async()`

Все они находятся в заголовке `<future>`.

### `future` и `promise`

Позволяют передавать значение между тасками без использования локов.

Футуры получаются из промисов методом `get_future()`. В промис можно записать значение методом `set_value` или эксепшн методом `set_Exception`, а из футура потом его прочитать методом `get()`. При этом текущий поток будет заблокирован, пока результат не будет записан в соответствующий промис, а если в промис записан эксепшн, то `get()` выстрелит его же.

```cpp
void product(std::promise<int>&& intPromise, int a, int b){
  intPromise.set_value(a*b);
}

int main(){

  int a= 20;
  int b= 10;

  std::promise<int> prodPromise;

  std::future<int> prodResult= prodPromise.get_future();

  std::thread prodThread(product,std::move(prodPromise),a,b);

  std::cout << "20*10= " << prodResult.get() << std::endl;

  prodThread.join();
}
```

# Утилиты

## Время

```cpp
using namespace std::chrono;

auto t0 = high_resolution_clock::now();
do_work();
auto t1 = high_resolution_clock::now();
cout << duration_cast<milliseconds>(t1-t0).count() << "msec\n";
```

## Type functions

Это такие функции, выполняемые во время компиляции и принимающие в качестве аргументов типы, или возвращающие типы.

Примеры:

```cpp
constexpr float min = numeric_limits<float>::min();
constexpr int szl = sizeof(int);
vector<decltype(*beg)> v;
```

Отдельно проходят предикаты над типами:

```cpp
bool b = is_arithmetic<int>();
```

Еще есть `is_class`, `is_pod`, `is_literal_type`, `has_virtual_destructor`, и `is_base_of`.

### iterator_traits

Это такая функция над типом, позволяющая получить некоторые свойства типа итератора.

Пример:

```cpp
template<class Iterator>
void some_algorithm(Iterator start, Iterator end)
{
	typename std::iterator_traits<Iterator>::value_type value = *start;  // так получили тип значения, используемого в итераторе Iterator
	...
}
```

Структура `iterator_traits` содержит следующие поля:

```cpp
template <class T>
struct iterator_traits {
  typedef typename T::value_type value_type;
  typedef typename T::difference_type difference_type;
  typedef typename T::iterator_category iterator_category;
  typedef typename T::pointer pointer;
  typedef typename T::reference reference;
}
```

### `pair`, `tuple`

