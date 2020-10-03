---
title: "Java"
path: "/blog/java"
---

# Java

## Многопоточность

https://github.com/LeonardoZ/java-concurrency-patterns

### Java concurrency API

Базовые классы:

- класс `Thread`
- интерфейс `Runnable`
- класс `ThreadLocal`
- интерфейс `ThreadFactory`

Механизмы синхронизации:

- ключевое слово `synchronized`
- интерфейс `Lock`  и его реализации
  - `ReentrantLock`
  - `ReentrantReadWriteLock`
  - `StampedLock`

- класс `Semaphore` - позволяет ограничивать доступ к общему ресурсу
- класс `CountDownLatch` (https://howtodoinjava.com/java/multi-threading/when-to-use-countdownlatch-java-concurrency-example-tutorial/) - позволяет дождаться завершения нескольких операций
- класс `CyclicBarrier` - для сихнронизации нескольких потоков в одной точке
- класс `Phaser` - для контроля над выполнением таска, состоящего из нескольких фаз. Следующая таска не начинается, пока все потоки не завершили текущую.

Экзекуторы:

- интерфейсы `Executor` и `ExecutorService`
- класс `ThreadPoolExecutor` - тред-пул
- класс `ScheduledThreadPoolExecutor` - тред-пул с возможностью отложенного либо периодического выполнения
- класс `Executors` - статический класс, упрощающий создание экзекуторов
- интерфейс `Callable` - альтернатива `Runnable`: таска, возвращающая значение
- интерфейс `Future` - интерфейс, позволяющий получить значение, возвращенное из `Callable`

Конкурентные структуры данных:

- `ConcurrentLinkedDeque`
- `ConcurrentLinkedQueue`
- `LinkedBlockingDeque`
- `LinkedBlockingQueue`
- `PriorityBlockingQueue`
- `ConcurrentSkipListMap`
- `ConcurrentHashMap`
- `AtomicBoolean`, `AtomicInteger`, `AtomicLong`, `AtomicReference`

### Паттерны

#### Сигналирование

Когда использовать: Таска хочет сообщить о событии другой таске. 

Проще всего реализовать, используя семафор `Semaphore`, мьютекс `ReentrantLock`, либо же используя методы `wait()` и `notify()` класса `Object`:

```java
public void task1() {
     section1();
     commonObject.notify();
}

public void task2() {
     commonObject.wait();
     section2();
}
```

#### Рандеву

Когда использовать: Таска А ждет события от таски Б, а таска Б ждет события от А. 

То же самое, что и в сигналировании, только нужно два примитива синхронизации:

```java
public void task1() {
     section1_1();
     commonObject1.notify();
     commonObject2.wait();
     section1_2();
   }
   public void task2() {
     section2_1();
     commonObject2.notify();
     commonObject1.wait();
     section2_2();
}
```

#### Мьютекс

Когда использовать: когда только один таск одновременно должен иметь доступ к куску кода.

Реализуется, используя `synchronized`, `ReentrantLock`  или `Semaphore`.

```java
public void task() {
     preCriticalSection();
     lockObject.lock() // The critical section begins
     criticalSection();
     lockObject.unlock(); // The critical section ends
     postCriticalSection();
}
```

#### Мультиплекс

Когда использовать: когда не больше N тасков должны выполнять кусок кода.

То есть как мьютекс, только не один, а N. Для решения подходит `Semaphore`.

```java
public void task() {
    preCriticalSection();
    semaphoreObject.acquire();
    criticalSection();
    semaphoreObject.release();
    postCriticalSection();
}
```

### Барьер

Когда использовать: когда несколько тасков должны сихнронизироваться в одной точке. Ни один из таском не может продолжать выполнение, пока все таски не достигнут этой строчки.

Используется `CyclicBarrier`. Он называется **cyclic**, потому что может быть переиспользован. Первым аргументом принимает количество таском, а вторым может принимать `Runnable`, который будет запущен как только все потоки достигли точки синхронизации, но перед тем, как они пошли дальше.

```java
public void task() {
     preSyncPoint();
     barrierObject.await();
     postSyncPoint();
}
```

#### Read-write lock

Когда использовать: когда потоков, которые хотят писать, меньше, чем потоков, которые хотят читать.

Использовать `ReentrantReadWriteLock`

#### Thread pool

Использовать классы, реализующие интерфейс `ExecutorService`.

## Executor Framework

Базовые компоненты:

- интерфейс [`Executor`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executor.html): имеет единственный метод `execute`, который принимает `Runnable`-таску. Эта таска будет запущена, а вот когда и как - решит конкретная реализация экзекутора.
- интерфейс [`ExecutorService`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/ExecutorService.html): расширение `Executor`, наделяющее его дополнительными возможностями. Позволяет прервать выполнеие тасков и получать футуры для получения прогресса/результата выполнения тасков. Содержит методы `invokeAll`, `invokeAny` для выполнения всех или любого из переданных тасков.
- класс [`ThreadPoolExecutor`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/ThreadPoolExecutor.html) - реализация `ExecutorService`, использующая непосредственно thread pool. Для создания рекомендуется использовать фабричные методы `Executors.newCachedThreadPool()`, `Executors.newFixedThreadPool(int)` и `Executors.newSingleThreadExecutor()`. Предоставляет расширяемые методы `beforeExecute` и `afterExecute`, посредством которых может быть расширен.
- класс [`Executors`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executors.html) - предоставляет статические фабричные методы для создания реализаций `Executor`, `ExecutorService`, `ScheduledExecutorService`, `ThreadFactory`, и `Callable`.

## Запрос сетевого ресурса

```java
URL url = new URL("https://adventofcode.com/2018/day/1/input");
HttpURLConnection conn = (HttpURLConnection)url.openConnection();
InputStream stream;
try {
    stream = conn.getInputStream();
}
catch(IOException e)
{
    stream = conn.getErrorStream(); // без этого, в случае HTTP-статуса, отличного от 200, мы получим просто исключение и не сможем получить тело ответа
}
InputStreamReader reader = new InputStreamReader(stream);
BufferedReader in = new BufferedReader(reader);

String inputLine;
while ((inputLine = in.readLine()) != null)
    System.out.println(inputLine);
in.close();
```

Если нужно обратиться к HTTPS, то нужно `HttpURLConnection` просто заменить на `HttpsURLConnection`.

Если нужно использовать прокси, то делаем так:

```java
HttpsURLConnection conn = (HttpsURLConnection)url.openConnection(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("192.168.2.102", 3128)));
```

Добавить заголовок можно так:

```java
conn.setRequestProperty("cookie", "COOKIE_CONTENTS");
```

## Работа с I/O

В Java NIO основные концепции - каналы и буферы. При чтении данных каналы читают их из источника в буффер. При записи - буфер пишет в канал.

### Каналы

Самые важные реализации каналов:

- `FileChannel` - работает с файлами
- `DatagramChannel` - работает с UDP
- `SocketChannel` - работает с TCP
- `ServerSocketChannel` - работает с входящими TCP-соединениями, для каждого входящего соединения создается `SocketChannel`.

Пример использования `FileChannel`:

```java
RandomAccessFile aFile = new RandomAccessFile("data/nio-data.txt", "rw");
FileChannel inChannel = aFile.getChannel();

ByteBuffer buf = ByteBuffer.allocate(48);

int bytesRead = inChannel.read(buf);
while (bytesRead != -1) {

  System.out.println("Read " + bytesRead);
  buf.flip();

  while(buf.hasRemaining()){
      System.out.print((char) buf.get());
  }

  buf.clear();
  bytesRead = inChannel.read(buf);
}
aFile.close();
```

Строка `buf.flip()` очень важна - она переводит буфер из режима записи **в** буфер в режим чтения **из** буфера.

### Буферы

Работа с буфером состоит из 4 шагов:

1. Пишем данные в буфер
2. Вызываем `buffer.flip()`
3. Читаем данные из буфера
4. Вызываем `buffer.clear()` или `buffer.compact()`.

Основные реализации буферов:

- ByteBuffer
- MappedByteBuffer
- CharBuffer
- DoubleBuffer
- FloatBuffer
- IntBuffer
- LongBuffer
- ShortBuffer

#### Создание буфера

Каждый класс-наследник `Buffer` имеет метод `allocate()`, который аллоцирует новый буфер:

```java
ByteBuffer buf = ByteBuffer.allocate(48);
CharBuffer buf2 = CharBuffer.allocate(48);
```

#### Запись данных в буфер

В буфер можно записать данные 2 способами:

1. Через канал
2. Вручную

Вот пример записи через канал:

```java
int bytesRead = inChannel.read(buf);
```

А вот - вручную:

```java
buf.put(127);
```

У `put()` есть много перегрузок, можно писать одно значение, массив значений, и даже значения из другого буфера.

#### Чтение данных из буфера

Так же как и с записью, есть 2 способа.

Читать из буфера в канал:

```java
int bytesWritten = inChannel.write(buf);
```

Читать из буфера в переменную:

```java
byte aByte = buf.get();
```

#### Очистка буфера

При вызове `clear()` внутренний `position` выставляется в 0, а `limit` - в `capacity`. Это означает, что данные не очищаются, но следующая запись будет поверх старых данных.

## Чтение файла построчно

```java
try (BufferedReader br = new BufferedReader(new FileReader(file))) {
    String line;
    while ((line = br.readLine()) != null) {
       // process the line.
    }
}
```

## List to array

```java
List<Double> exampleList = new ArrayList<Double>();
...
Double[] example = new Double[exampleList.size()];
example = exampleList.toArray(example);
```

## Map array to array

```java
String[] parts = Stream.of(line.split(";")).map(x -> x.trim())
    .toArray(String[]::new);
```