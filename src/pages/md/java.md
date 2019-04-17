---
title: "Java"
path: "/blog/java"
---


# Запрос сетевого ресурса

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

# Работа с I/O

В Java NIO основные концепции - каналы и буферы. При чтении данных каналы читают их из источника в буффер. При записи - буфер пишет в канал.

## Каналы

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

## Буферы

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

### Создание буфера

Каждый класс-наследник `Buffer` имеет метод `allocate()`, который аллоцирует новый буфер:

```java
ByteBuffer buf = ByteBuffer.allocate(48);
CharBuffer buf2 = CharBuffer.allocate(48);
```

### Запись данных в буфер

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

### Чтение данных из буфера

Так же как и с записью, есть 2 способа.

Читать из буфера в канал:

```java
int bytesWritten = inChannel.write(buf);
```

Читать из буфера в переменную:

```java
byte aByte = buf.get();
```

### Очистка буфера

При вызове `clear()` внутренний `position` выставляется в 0, а `limit` - в `capacity`. Это означает, что данные не очищаются, но следующая запись будет поверх старых данных.