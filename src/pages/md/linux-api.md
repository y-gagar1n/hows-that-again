---
title: "Linux API"
path: "/blog/linux-api"
---

# Linux API

```toc
exclude: Linux API
```

# Работа с аргументами запуска

```cpp
while ((opt = getopt(argc, argv, "nt:")) != -1) {
   switch (opt) {
   case 'n':
       flags = 1;
       break;
   case 't':
       nsecs = atoi(optarg);
       tfnd = 1;
       break;
   default: /* '?' */
       fprintf(stderr, "Usage: %s [-t nsecs] [-n] name\n",
               argv[0]);
       exit(EXIT_FAILURE);
   }
}
```

Третьим аргументом `getopt` принимает список допустимых опций. Если после символа стоит двоеточие, значит эта опция принимает аргумент, тогда `getopt` помещает указатель на текст, последующий за буквой опции, либо весь следующий аргумент, в переменную `optarg`. Если же там 2 двоеточия, то это означает опциональный аргумент, если он отсутствует, то`optarg` будет равен нулю.

`optind` - индекс следующего аргумента, который будет обработан.

# Работа с файлами

3 стандартных дескриптора:

- 0: стандартный ввод
- 1: стандартный вывод
- 2: стандартный поток ошибок

## Системные вызовы для работы с файлами

- `fd = open(pathname, flags, mode)`: открывает указанный файл, возвращает его дескриптор. Если окрыть не удалось, вернется отрицательный дескриптор (ошибку можно будет получить через `errno`). Во флагах через `|` можно указать, что файл открывается на чтение/запись, что его нужно создать, если он не существует. `mode` - разрешения файла, если будет создан новый.
- `numread = read(fd, buffer, count)`: читать `count` байт в буфер. Возвращает количество прочтенных байт, или 0, если достигнут EOF.
- `numwritten = write(fd, buffer, count)`: писать `count` байт из буфера.
- `status = close(fd)`: закрывает дескриптор и все связанные с ним ресурсы ядра

## Пример копирования файла

```c
#include <iostream>
#include <fcntl.h>
#include <unistd.h>

#ifndef BUF_SIZE
#define BUF_SIZE 1024
#endif

int main(int argc, char *argv[]) {
    int inputFd, outputFd, openFlags;

    mode_t filePerms;
    ssize_t numRead;

    char buf[BUF_SIZE];

    if (argc != 3 || argv[1] == "--help") {
        std::cout << "usage: copy old-file new-file" << std::endl;
        exit(EXIT_FAILURE);
    }

    inputFd = open(argv[1], O_RDONLY);
    if (inputFd == -1) exit(EXIT_FAILURE);

    openFlags = O_CREAT | O_WRONLY | O_TRUNC;
    filePerms = S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH;
    outputFd = open(argv[2], openFlags, filePerms);
    if(outputFd == -1) return 1;

    while(numRead = read(inputFd, buf, BUF_SIZE))
    {
        if(write(outputFd, buf, numRead) != numRead) exit(EXIT_FAILURE);
    }
    if(numRead == -1) exit(EXIT_FAILURE);

    if(close(inputFd) == -1) exit(EXIT_FAILURE);
    if(close(outputFd) == -1) exit(EXIT_FAILURE);

    exit(EXIT_SUCCESS);
}
```

ПРИМЕЧАНИЕ: в C++ стандартный способ работы с файлами - через `ofstream`, `ifstream`, `fstream`:

```cpp
#include <iostream>
#include <fstream>

const static int BUF_SIZE = 4096;

using std::ios_base;

int main(int argc, char** argv) {

   std::ifstream in(argv[1],
      ios_base::in | ios_base::binary);  // Use binary mode so we can
   std::ofstream out(argv[2],            // handle all kinds of file
      ios_base::out | ios_base::binary); // content.
   
   // Make sure the streams opened okay...

   char buf[BUF_SIZE];

   do {
      in.read(&buf[0], BUF_SIZE);      // Read at most n bytes into
      out.write(&buf[0], in.gcount()); // buf, then write the buf to
   } while (in.gcount() > 0);          // the output.

   // Check streams for problems...

   in.close();
   out.close();
}
```

## Неблокирующий ввод/вывод

Если в `open` передать флаг `O_NONBLOCK`, то в случае невозможности выполнить системный вызов I/O (открытие, чтение, запись) будет возвращена ошибка `EAGAIN` или `EWOULDBLOCK` в зависимости от вызова, а не блокировка исполнения как обычно.

Неблокирующий I/O может быть использован с пайпами, очередями FIFO, сокетами, терминалами, псевдотерминалами и т.д. Так как файловые дескрипторы для пайпов и сокетов получаются не через `open`, то для них флаг активируется через вызов `fcntl()`.

Для обычных файлов флаг `O_NONBLOCK` игнорируется, так как кэш буфера ядра и так гарантирует, что I/O над обычными файлами не блокирующий. 

## Манипуляции с дескриптором открытого файла

Системным вызовом `fcntl` можно управлять дескриптором уже открытого файла, например, поменять флаги открытия.

```cpp
#include <unistd.h>
#include <fcntl.h>

int fcntl(int fd, int cmd, ... /* arg */ );
```

Последний аргумент зависит от второго аргумента `cmd`, то есть от того действия, которое мы пытаемся осуществить.

Мы можем:

### получить флаги 

```cpp
int flags, accessMode;
flags = fcntl(fd, F_GETFL);
if(flags == -1) 
	errExit("fcntl");
if(flags & O_SYNC)
	printf("writes are synchronized\n");
```

А вот режим доступа проверить не так просто, но все равно можно:

```cpp
accessMode = flags & O_ACCMODE;
if(accessMode == O_WRONLY || accessMode == O_RDWR)
	printf("file is writable\n");
```

### установить флаги

Можно модифицировать флаги: `O_APPEND`, `O_NONBLOCK`, `O_NOATIME`, `O_ASYNC` и `O_DIRECT`. Попытки модификации других флагов - игнорируются.

Причем указание флага `O_ASYNC` в `open()` тоже игнорируется - его можно установить только через `fcntl()`.

```cpp
fcntl(fd, F_SETFL, O_ASYNC | O_NONBLOCK);
```

## Альтернативные модели I/O

Традиционная модель работы с файлами имеет 2 существенных недостатка:

- работает только с одним дескриптором одновременно
- каждый системный вызов блокирует выполнение, пока передача данных не завершилась

В некоторых приложениях нам бывает нужно:

- проверить, возможен ли ввод/вывод в дескриптор, не блокируя исполнение, если невозможен
- монитортиь несколько дескрипторов, пока ввод/вывод станет доступен на любом из них

Для этого можно использовать неблокирующий I/O или многопроцессность/многопоточность:

- при использовании неблокирующего I/O мы можем открыть N дескрипторов и периодически чтением каждого из них проверять, доступно ли для них I/O. Это, конечно, неэффективно по CPU, а так же при больших интервалах реакция приложения на событие I/O может быть слишком долгой.
- при использовании многопроцессности мы можем создавать новый процесс, чтобы выполнять I/O. Тогда родительский процесс не будет заблокирован, а дочерний заблокируется, пока I/O не будет выполнен. Недостаток - сложно создавать процессы и понадобится какой-то IPC, чтобы сообщать родителю о статусе операции I/O.
- при использовании многопоточности можем создавать для I/O не процесс, а поток. Это менее накладно по ресурсам, но IPC все равно понадобится.

Чтобы избежать этих недостатков для решения задачи слежения за несколькими дескрипторами с целью узнать, когда они станут готовы для I/O (без блокирования) применяются следующие техники

### Мультиплексирование I/O

Позволяет процессу одновременно следить за несколькими дескрипторами, чтобы узнать когда на любом из них становится доступен неблокирующий I/O. 

При этом важно понимать, что событие доступности неблокирующего I/O не означает, что последующий вызов I/O сможет *успешно* передать данные. Например, для обычных файлов неблокирующий вызов доступен всегда, потому что будут возвращены либо данные (хотя возможно и после ощутимой задержки), либо EOF, либо ошибка. А вот для сокетов - только когда действительно по сети пришли данные для чтения, или буфер перестал быть заполненным и в него можно написать еще данных.

Самая старая техника, поэтому главное достоинство - портируемость. Главный недостаток - плохая масштабируемость на большие (сотни и тысячи) количества дескрипторов.

Мультиплексирование осуществляется вызовами `select()` и `poll()`.

#### select()

Блокироует выполнение, пока один или несколько дескрипторов не станут готовы

```c
#include <sys/time.h>  /* Включать для портируемости */
#include <sys/select.h>

int select(int nfds, fd_set * readfds, fd_set * writefds, fd_set * exceptfds, struct timeval * timeout );
```

Возвращает количество готовых дескрипторов, 0 при таймауте, -1 при ошибке. Если какой-либо дескриптор указан в нескольких наборах, то он будет учтен соответствующее количество раз.

- `nfds` - число, на 1 большее, чем самый большой дескриптор среди наборов
- `readfds` - набор дескрипторов на чтение
- `writefds` - набор дескрипторов на запись
- `exceptfds` - набор дескрипторов, у которых мы ждем т.н. exception condition (это не имеет ничего общего с ошибками)
- `timeout` - указывает интервал, в течение которого вызов `select()` заблокирует выполнение, либо же `NULL`, если нужно ждать бесконечно. Если указать `timeval { tv_sec=0, tv_usec=0}`, то блокировки не будет вообще, просто сразу ответит, какие дескрипторы уже готовы.

Вместо любого из наборов можно передать `NULL`, если этот класс событий нас не интересует.

Наборы могут иметь размерность, не большую, чем константа `FD_SETSIZE`, в Линуксе она равна 1024. 

С типом `fd_set` работаем посредством следующих операций:

```c
#include <sys/select.h>
void FD_ZERO(fd_set * fdset );	// инициализирует набор, делая его пустым
void FD_SET(int fd , fd_set * fdset );	// добавляет дескриптор в набор
void FD_CLR(int fd , fd_set * fdset );	// удаляет дескриптор из набора
int FD_ISSET(int fd , fd_set * fdset );	// возвращает 1, если дескриптор есть в наборе, иначе 0
```

Вызов `select()` модифицирует переданные в него наборы `fd_set` таким образом, что после завершения они содержат набор готовых дескрипторов. Но чтобы узнать эти дескрипторы, придется для каждого из интересующих нас дескрипторов, вызвать `FD_ISSET`.

#### poll() 

Работает так же, как и `select()`, разница лишь в API. В `poll()` мы предоставляем список дескрипторов, где для каждого указан набор интересующих событий

```c
#include <poll.h>
int poll(struct pollfd fds[], nfds_t nfds, int timeout);

```

Возвращает количество готовых дескрипторов, 0 при таймауте, -1 при ошибке.

`fds[]` содержит массив дескрипторов. Сртуктура `pollfd` имеет следующий вид:

```c
struct pollfd {
	int fd;			// дескриптор
	short events;	// бит-маска интересующих ивентов
	short revents;	// бит-маска выстреливших ивентов
}
```

`nfds` - количество элементов в массиве `fds`.

Далее приведен список битов, которые могут быть выставлены для `events` и `revents`:

![Events & Revents bits](events-revents-bits.png)

Аргумент `timeout` ведет себя так же, как и у `select()`, только с другими ключевыми значениями:

- -1: блокировать без ограничений по времени
- 0: не блокировать,сразу возвращать
- >0: означает миллисекунды, сколько ждем


### Signal-driven I/O

Процесс просит у ядра послать сигнал, когда I/O становится доступен на определенном дескрипторе. На большом количестве дескрипторов эта техника работает лучше, чем мультиплексирование.

Алгоритм использования таков:

1. Создаем хэндлер для сигнала `SIGIO`.
2. Вызовом `fnctl()` устанавливаем владельца дескриптора файла, то есть процесс, который будет получать сигналы о готовности I/O. Обычно это текущий процесс: `fcntl(fd, F_SETOWN, pid);`
3. Через `fcntl()` устанавливаем дескриптору флаг `O_NONBLOCK`
4. Через `fnctl()` включаем signal-driven i/o, выставив флаг `O_ASYNC`. Это может быть объединено с предыдущим шагом:

	```c
	flags = fcntl(fd, F_GETFL); 
	fcntl(fd, F_SETFL, flags | O_ASYNC | O_NONBLOCK);
	```
5. Вызывающий процесс теперь может заниматься своими делами. Когда I/O станет доступен, ядро сгенерит сигнал и вызовет указанный хэндлер
6. Signal-driven I/O генерирует edge-triggered нотификации. Это значит, что при получении нотификации нужно в цикле читать данные из дескриптора до тех пор, пока не получим ошибку `EAGAIN` или `EWOULDBLOCK`.

Пример:

```cpp
#include <csignal>
#include <fcntl.h>
#include <unistd.h>

static void sigioHandler(int sig) {
    gotSigio = 1;
}

int main(int args, char *argv[]) {
  struct sigaction sa;                        //
  sigemptyset(&sa.sa_mask);                   //
  sa.sa_flags = SA_RESTART;                   //
  sa.sa_handler = sigioHandler;               // 1. Создаем хэндлер для сигнала SIGIO.
  if (sigaction(SIGIO, &sa, NULL) == -1) {    //
      printf("sigaction error");              //
      return 1;                               //
  }                                           //

  if (fcntl(STDIN_FILENO, F_SETOWN, getpid()) == -1) {  //
      printf("fcntl(F_SETOWN) error");                  // 2. Вызовом `fnctl()` устанавливаем владельца дескриптора файла
      return 1;                                         //
  }                                                     //

  int flags = fcntl(STDIN_FILENO, F_GETFL);                                 //
  if (fcntl(STDIN_FILENO, F_SETFL, flags | O_ASYNC | O_NONBLOCK) == -1) {   //
    printf("fcntl(F_SETFL) error");                                         // 3,4 - устанавливаем флаги O_NONBLOCK, O_ASYNC
    return 1;                                                               //
  }                                                                         //

  int cnt = 0;
  for (bool done = false; !done; cnt++) {
      for (int j = 0; j < 100000000; j++)
          continue;

      char ch;
      if (gotSigio) {
          while (read(STDIN_FILENO, &ch, 1) > 0 && !done) {   // 6 - читаем, пока не получим ошибку
              printf("cnt=%d; read %c\n", cnt, ch);
              done = ch == '#';
          }
      }

      gotSigio = 0;

  }
}
```

### epoll

Техника, доступная только в линуксе. Объединяет достоинства предыдущих двух техник.

Не может быть использована с обычными файлами, так как они и так всегда работают в неблокирующем режиме (т.е. всегда есть данные, но это не значит, что они будут возвращаться мгновенно). Если попробовать использовать с обычными файлами, то выдаст ошибку.

По сравению с signal-driven имеет преимущества:

- не нужно работать с сигналами
- монжо указать, какой конкретно ивент нас интересует - готовность к чтению, или к записи
- можно выбрать между level-triggered и edge-triggered нотификациями.

Чтобы использовать аналогичные фичи в модели signal-driven I/O, все равно придется использовать непортируемые линукс-специфичные фичи.

По производительности epoll сравним с signal-driven I/O.

Работа с `epoll API` осуществляется через инстанс `epoll`, который содержит следующие структуры:

- **interest list** - список файловых дескрипторов, которые мы мониторим
- **ready list** - список файловых дескрипторов, готовых к неблокирующему I/O

`epoll` API состоит из 3 системных вызовов:

#### `epoll_create()` 

создает инстанс `epoll` и возвращает ссылающийся на него файловый дескриптор, или -1 

```c
#include <sys/epoll.h>

int epoll_create(int size);
```

- `size` - количество дескрипторов, которые будем мониторить. Это не верхняя граница, а подсказка ядру для эффективной инициализации (с версии ядра 2.6.8 аргумент вообще игнорируется).

При завершении работы с файловым дескриптором `epoll`, его надо закрыть как обычно через `close()`.

#### `epoll_ctl()` 

изменяет **interest list**

```c
#include <sys/epoll.h>

int epoll_ctl(int efpd, int op, int fd, struct epoll_event *ev);
```

- `fd` - файловый дескриптор из **interest list**, чьи настройки будем модифицировать (может быть и идентификатором, ссылающимся на другой `epoll`, таким образом можем построить иерархию). Однако он не может быть дескриптором обычного файла или папки.
- `op` - операция. Выбирается из списка `EPOLL_CTL_ADD`, `EPOLL_CTL_MOD`, `EPOLL_CTL_DEL`.
- `ev` - описание ивента, за которым будем следить.

```c
struct epoll_event {
    uint32_t events;
    epoll_data_t data;
}

typedef union epoll_data {
  void *ptr;
  int fd;
  uint32_t u32;
  uint64_t u64;
} epoll_data_t;
```

- `events` - битовая маска, определяющая набор отслеживаемых ивентов. Возможные ивенты перечеслены в таблице ниже.
- `data` - union, один из членов которого может быть испольован, чтобы передать данные процессу, который вызовет `epoll_wait()`.

#### `epoll_wait()` 

возвращает элементы **ready list**.

```c
#include <sys/epoll.h>

int epoll_wait(int epfd, struct epoll_event * evlist, int maxevents, int timeout);
```

Возвращает количество готовых дескрипторов, 0 при таймауте, -1 при ошибке.

Сами готовые дескрипторы будут возвращены в массиве `evlist`. Массив создается вызывающей стороной и в `maxevents` нужно передать его длину. 

В каждом из элементов возвращенного массива поле `events` перечисляет произошедшие с дескриптором события. 

Поле `data` содержит значение, которое было передано через `ev.data` в `epoll_ctl()`. Это поле - **единственный способ узнать, с каким дескриптором произошло событие**.

Аргумент `timeout` работает как всегда, -1 - ждем бесконечно, 0 - не ждем, больше 0 - миллисекунды.

Возможные значения ивентов:

![Epoll events](epoll-events.png)

`EPOLLONESHOT` используется, когда мы хотим быть информированы о дескрипторе только один раз. Если захочется активировать его заново, можно это сделать через `epoll_ctl()` с операцией `EPOLL_CTL_MOD`.

Без использования `EPOLLONESHOT` придется после получения ивента по дескриптору вызывать `epoll_ctl()` с `EPOLL_CTL_DEL`.

#### Edge-triggered notifications

Чтобы использовать edge-triggered нотификации, нужно указать флаг `EPOLLET` в `ev.events`:

```c
struct epoll_event ev;

ev.data.fd = fd;
ev.events = EPOLLIN | EPOLLET;
if(epoll_ctl(epfd, EPOLL_CTL_ADD, fd, ev) == -1)
  errExit("epoll_ctl");
```

edge-triggered нотификации обычно используются в сочетании с `O_NONBLOCK` и чтением в цикле, пока не выстрелит ошибка `EAGAIN/EWOULDBLOCK`.

#### Пример

```c
#include <iostream>
#include <sys/epoll.h>
#include <cstdarg>
#include <fcntl.h>
#include <unistd.h>

#define MAX_BUF 1000
#define MAX_EVENTS 5

int main(int argc, char *argv[]) {
    struct epoll_event evlist[MAX_EVENTS];
    char buf[MAX_BUF];

    if(argc < 2 || argv[1] == "--help")
        usageErr("%s file...\n", argv[0]);


    int epfd = epoll_create(argc-1);
    if(epfd == -1)
        errExit("epoll_create");

    for(int j = 1; j < argc; j++) {
        int fd = open(argv[j], O_RDONLY);
        if(fd == -1)
            errExit("open");
        printf("Opened \"%s\" on fd %d\n", argv[j], fd);

        epoll_event ev;
        ev.events = EPOLLIN;
        ev.data.fd = fd;
        if(epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev) == -1)
            errExit("epoll_ctl");

    }

    int numOpenFds = argc - 1;

    while(numOpenFds > 0) {
        printf("About to epoll_wait()\n");
        int ready = epoll_wait(epfd, evlist, MAX_EVENTS, -1);
        if(ready == -1) {
            if(errno == EINTR)
                continue;
            else
                errExit("epoll_wait");
        }
        printf("Ready: %d\n", ready);

        for(int j = 0; j < ready; j++) {
            printf("  fd=%d; events: %s%s%s\n", evlist[j].data.fd,
                   (evlist[j].events & EPOLLIN) ? "EPOLLIN " : "",
                   (evlist[j].events & EPOLLHUP) ? "EPOLLHUP " : "",
                   (evlist[j].events & EPOLLERR) ? "EPOLLERR " : "");

            if(evlist[j].events & EPOLLIN) {
                size_t s = read(evlist[j].data.fd, buf, MAX_BUF);
                if(s == -1)
                    errExit("read");
                printf("  read %d bytes: %.*s\n", s, s, buf);
            }
            else if(evlist[j].events & (EPOLLHUP | EPOLLERR)) {
                printf("  closing fd %d\n", evlist[j].data.fd);
                if(close(evlist[j].data.fd) == -1)
                    errExit("close");
                numOpenFds--;
            }
        }
    }

    printf("All file descriptors closed; bye\n");
    exit(EXIT_SUCCESS);
}
```


### libevent

Сторонняя библиотека, предоставляющая слой абстракции для мониторинга за файловыми дескрипторами. Использует все вышеперечисленные (и не только) техники и может включать/выключать их в зависимости от ОС.

### Типы нотификаций

- Level-triggered: выстреливается, когда дескриптор становится доступен для осуществления системного вызова I/O без блокирования. После этого можно выполнить (а можно и не выполнять) необходимую I/O операцию и повторить мониторинг, чтобы узнать, когда I/O станет доступен снова. Важно, что нам необязательно читать все доступные данные, можем прочитать сколько угодно и повторить мониторинг, просто если мы прочитали не все, то событие выстрелит сразу же.
- Edge-triggered: выстреливается, когда произошла некоторая I/O активность на дескрипторе (нарпример, стали доступны данные для чтения). Отличие в том, что событие не выстрелит, пока не произойдет следующее событие I/O (например, доступна следующая порция данных на чтение). Кроме того, мы обычно не знаем, сколько именно данных нам стало доступно для неблокирующего I/O. Поэтому обычно мы помещаем дескриптор в неблокирующий режим и совершаем операции в цикле, пока не получим ошибку `EAGAIN` или `EWOULDBLOCK`.

| I/O model        | Level-triggered? | Edge-triggered? |
|------------------|------------------|-----------------|
| select(), poll() |        X         |                 |
| signal-driven    |                  |        X        |
| epoll            |        X         |        X        |

# Сигналы

Сигналы - это, иными словами, "программные прерывания". Они могут быть вызваны ядром в любой момент при наступлении интересующего события, а после выполнения хэндлера, выполнение продолжается с той же строчки, на которой было прервано.

Самые популярные сигналы:

- `SIGINT`: сигнал, генерируемый нажатием `Ctrl+C`, просит программу остановить текущее действие и ожидать пользовательского ввода. Неинтерактивные программы обычно обрабатывают его так же, как и `SIGTERM`
- `SIGTERM`: сигнал убийства процесса, говорит приложению завершиться, но дает время на сохранение стейта, закрытие ресурсов и прочее
- `SIGHUP`: то же, что и `SIGTERM`, но автоматически шлется приложениям, когда пользователь отсоединяется от терминала (hung up)

## Подписка на сигнал | SGINT

Есть два способа: `signal()` и `sigaction()`.

### signal()

Этот вызов более старый, но имеет более простое API. Однако у него есть различия в поведении среди различных имплементаций UNIX, поэтому `signal()` не рекомендуется к использованию в кросс-платформенных системах.

```c
#include <signal.h>

void ( *signal(int sig, void (*handler)(int)) ) (int);
```

- `handler` - указатель на функцию, принимающую `int` (туда придет номер возникшего сигнала) и возвращающую ничего
- `signal` - фукнция, принимающая `int` и `pointer`, а возвращающая указатель на функцию, принимающую `int` и возвращающую ничего.

На самом деле `signal` возвращает указатель на предыдущий хэндлер. Это нужно для установки "временных" хэндлеров, которые можно потом откатить:

```c
void (*oldHandler)(int);

oldHandler = signal(SIGINT, newHandler);

/// здесь сигнал SIGINT обрабатывается новым хэндлером

signal(SIGINT, oldHandler); // возвращаем старый хэндлер
```

Вместо указателя на хэндлер можно подавать:

- `SIG_DFL` - откатиться к дефолтному хэндлеру
- `SIG_IGN` - игнорировать сигнал

Если нужно одним хэндлером обрабатывать несколько сигналов, то нужно несколько раз вызвать функцию, битмаска тут не работает:

```c
signal(SIGHUP, signalHandler);
signal(SIGTERM, signalHandler);
signal(SIGINT, signalHandler);
signal(SIGKILL, signalHandler);
```

### sigaction()

Имеет более сложный API, но зато позволяет получить хэндлер, не меняя его, а так же позволяет установить некоторые атрибуты, контролирующие, что произойдет, когда хэндлер будет вызван. Помимо этого, `sigaction()` более портируем, чем `signal()`.

```c
#include <signal.h>

int sigaction(int sig, const struct sigaction *act, struct sigaction *oldact);

struct sigaction {
	void (*sa_handler)(int);	// адрес хэндлера
	sigset_t sa_mask;			// сигналы, заблокированные во время работы хэндлера
	int sa_flags;				// флаги, контролирующие работу хэндлера
	void (*sa_restorer)(void);	// не для использования
};
```

Так же, как и в `signal()`, вместо поля `sa_handler` можно подать `SIG_IGN` или `SIG_DFL`.

`sa_mask` позволяет перечислить сигналы, которым нельзя прерывать выполнение этого хэндлера. Сигнал, который вызван в хэндлер, автоматически занесен в фильтр, то есть сам себя рекурсивно хэндлер сигнала прервать не может.

Вручную добавлять и убирать сигналы из фильтра процесса можно вызовом `sigprocmask()`.

### Наборы сигналов

Несколько сигналов могут быть объединены в страктуру `sigset_t`. Для управления таким множеством есть специальные функции:

```c
#include <signal.h>

int sigemptyset(sigset_t *set);		// инициализация нулями, то есть исключает все сигналы
int sigfillset(sigset_t *set);		// инициализация единицами, то есть включает все сигналы

int sigaddset(sigset_t *set, int sig);	// добавление сигнала в набор
int sigdelset(sigset_t *set, int sig);	// удаление сигнала из набора

int sigismember(const sigset_t *set, int sig); // 1, если сигнал входит в набор, иначе 0

int sigandset(sigset_t *dest, sigset_t *left, sigset_t *right);	// кладет пересечение left и right в dest
int sigorset(sigset_t *dest, sigset_t *left, sigset_t *right);	// кладет объединение left и right в dest

int sigisemptyset(const sigset_t *set);		// 1, если набор пустой, иначе 0
```


### kill()

С помощью вызова `kill()` можно послать сигнал другому процессу или группе процессов

```c
#include <signal.h>

int kill(pid_t pid, int sig);
```


### pause()

Системный вызов `pause()` прерывает исполнение до тех пор, пока не будет вызван какой-либо хэндлер сигнала

```c
#include <unistd.h>

int pause(void);
```

Всегда возвращает -1 и выставляет `errno` в `EINTR`.

# Сокеты

Сокет открывается так:

```c
int fd = socket(domain, type, protocol);
```

## Основные системные вызовы

- `socket()` - создает новый сокет, возвращает его файловый дескриптор.
- `bind()` - привязывает сокет к адресу, возвращает 0 при успехе, -1 при ошибке.
- `listen()` - разрешает потоковому сокету принимать входящие соединения от других сокетов
- `accept()` - принимает входящее соединение
- `connect()` - устанавливает соединение с другим сокетом

Ввод/вывод данных из сокетов осуществляется стандартными вызовами `read()` и `write()`, или специфичными для сокетов `send()`, `recv()` (для TCP), `sendto()`, `recvfrom()` (для UDP). По умолчанию все эти вызовы блокирующие. Можно сделать их неблокирующими, используя `fcntl()` с операцией `F_SETFL`.

### socket()

```c
#include <sys/socket.h>

int socket(int domain, int type, int protocol)
```

В качестве domain обычно указывается:

- `AF_UNIX` - для коммуникаций в рамках одного хоста. Для адреса используется структура `sockaddr_un`.
- `AF_INET` - для коммуникаций по протоколу IPv4. Для адреса используется структура `sockaddr_in`.
- `AF_INET6` - для коммуникаций по IPv6. Для адреса используется структура `sockaddr_in6`.

`AF` - значит Address Family.

Каждая реализация сокетов предоставляет 2 типа, указываемых вторым аргументом: **stream** (`SOCK_STREAM`) и **datagram** (`SOCK_DGRAM`).

- **stream**: надежный, двунаправленный, потоковый. Обычно использует TCP.
- **datagram**: ненадежный, шлет отдельные сообщения-датаграммы, которые могут прийти в другом порядке, дублироваться, или не прийти вообще. Обычно использует UDP.

`protocol` в большинстве случаев 0.

### bind()

Если не вызывать `bind()`, то при последующем `listen()` сокет будет автоматически привязан к случайному порту. Получить порт можно затем командой `getsockname()`.

```c
#include <sys/socket.h>

int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
```

Здесь `sockfd` - файловый дескриптор сокета, `addr` - структура, описывающая адрес, `addrlen` - размер структуры `addr` (можно получить через `sizeof(addr)`).

Конкретный тип структуры `addr` зависит от указанного при создании сокета `domain`:

- `AF_UNIX` - `sockaddr_un`.
- `AF_INET` - `sockaddr_in`.
- `AF_INET6` - `sockaddr_in6`.

Все они являются расширениями структуры `sockaddr` (хотя и имеют другие поля, но мы все равно можем кастовать их к `sockaddr` для передачи в вызов `bind()`):

```c
struct sockaddr {
  sa_family   sa_family;  /* Константа вида AF_*, например, AF_INET */
  char        sa_data[14];     /* Адрес сокета */
}
```

#### Адрес IPv4

```c
struct sockaddr_in {
  sa_family_t     sin_family;   /* AF_INET */
  in_port_t       sin_port;     /* номер порта */
  struct in_addr  sin_addr;     /* адрес IPv4 */
  unsigned char   __pad[X];     /* служебное поле, не трогать */
};

struct in_addr {
  in_addr_t s_addr; /* беззнаковое 32-битное число */
}; 
```

`sin_port` и `sin_addr` имеют сетевой порядок байт (*network byte order*).

`in_port_t` и `in_addr_t` - беззнаковые целые по 16 и 32 бит соответственно.

#### Адрес IPv6

```c
struct sockaddr_in6 {
  sa_family_t     sin6_family;      /* AF_INET6 */
  in_port_t       sin6_port;        /* номер порта */
  uint32_t        sin6_flowinfo;    /* IPv6 flow information (???) */
  struct in6_addr sin6_addr;        /* адрес IPv6 */
  uint32_t        sin6_scope_id;    /* Scope ID (???) */
};

struct in6_addr {
  uint8_t s6_addr[16]; /* 16 байт = 128 бит */
}; 
```

`sin6_port` и `sin6_addr` имеют сетевой порядок байт (*network byte order*).

`in_port_t` - беззнаковое целое на 16 бит.

`sin6_flowinfo` и `sin6_scope_id` можно указывать 0.

#### Network byte order

Адреса IP и номера портов - целые числа. Чтобы их использовать, нужно привести их от хостового к сетевому порядку байт (big endian, сначала самые значимые байты).

Для конвертации есть несколько функций:

```c
#include <arpa/inet.h>

uint16_t htons(uint16_t host_unit16); /* host-to-network-short, конвертирует 16-битное целое в сетевой порядок байт */

uint32_t htonl(uint32_t host_uint32); /* host-to-network-long, конвертирует 32-битное в сетевой */

uint16_t ntohs(uint16_t net_uint16); /* network-to-host-short */

uint32_t ntohl(uint32_t net_uint32); /* network-to-host-long */
```

#### Приведение IP-адреса

Чтобы привести строковый адрес к типу `in_addr` используются следующие функции:

```c
#include <arpa/inet.h>

const char *inet_ntop(int af, const void *src, char *dst, socklen_t size); // network-to-presentation
```

Преобразует адрес, представленный в виде числа в строку.

- `af`: address family, то есть `AF_INET` или `AF_INET6`.
- `src`: указатель на `in_addr` или `in6_addr`, где лежит адрес, который нужно преобразовать к строке.
- `dst`: указатель на строку, куда положить результат
- `size`: максимальная длина результата

```c
#include <arpa/inet.h>

int inet_pton(int af, const char *src, void *dst); // presentation-to-network
```

Преобразует адрес в виде строки к `in_addr` или `in6_addr`.

- `af`: address family, то есть `AF_INET` или `AF_INET6`.
- `src`: указатель на строку, которую нужно преобразовать.
- `dst`: указатель на `in_addr` или `in6_addr`, куда положить результат

**Эти функции не осуществляют DNS-поисков, для этого нужно вызыват getaddrinfo()**

В коде можно еще встретить функции `inet_ntoa()`, `inet_aton()`, `inet_addr()` - они делают то же самое, но устарели, так как не поддерживают IPv6.

### listen()

```c
#include <sys/socket.h>

int listen(int sockfd, int backlog);
```

Перевести сокет в пассивный режим - режим ожидания входящих соединений. Нельзя вызвать на уже соединенном сокете.

`backlog` - устанавливает ограничение на количество ожидающих соединений. Соединения до этого лимита будут обслужены моментально. Соединения сверх этого количества будут возвращены с ошибкой `ECONNREFUSED`, либо проигнорированы и посланы позже. Максимальное значение `backlog` по умолчанию - 128, но может быть изменено.

### accept()

```c
#include <sys/socket.h>

int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen);
```

Создает новый сокет, который соединяется с внешним сокетом, инициировавшем сединение, и возвращает его файловый дескриптор, либо -1 в случае ошибки. 

Сокет `sockfd` остается открытым и готов принимать следующие входящие соединения.

`addr` и `addrlen` характеризуют адрес внешнего сокета, от которого пришло соединение. Конкретный тип, как и в случае `bind()` зависит от домена. При вызове `addrlen` должен содержать размер буфера, на который указывает поле `sa_data` в `addr`, а по завершении будет содержать количество записанных туда байт. Если адрес входящего сокета нас не интересует, можно передать `NULL` и 0, соответственно. Потом адрес входящего сокета можно получить вызовом `getpeername()`.

### connect()

Соединяет активный сокет (клиентский) с пассивным слушающим (серверным) сокетом.

```c
#include <sys/socket.h>

int connect(int sockfd, const struct sockaddr *addr, socklen_t *addrlen);
```

Возвращает 0 при успехе, -1 при ошибке.

Если получилась ошибка, то нужно закрыть сокет, создать новый и повторить попытку.

#### connect() для UDP-сокетов

В случае UDP-сокета, этот вызов указывает т.н. *peer socket*: это значит, что мы должны принимать входящие сообщения только от сокета с указанным адресом, а посылать можем вызовами `write()` и `send()` и сообщения будут сразу посланы на указанный адрес.

В дальнейшем внешний сокет можно сменить, повторно вызвав `connect()`. Можно и удалить связь совсем, вызвав `connect()` с адресом, у которого *address family* равно `AF_UNSPEC`.

Эта возможность особенно полезна в приложениях, где нам нужно слать много сообщений на один адрес.

### close()

```c
#include <sys/socket.h>

int close(int sockfd);
```

Если на сокет ссылается несколько дескрипторов, то соединение будет завершено, когда закроются все дескрипторы.

### sendto()/recvfrom()

Так как UDP-сокеты не устанавливают соединений, то для них не рекомендуется использовать `read()` и  `write()`, а нужно использовать `recvfrom()`/`sendto()`, в которых аргументом можно указать адрес.

```c
#include <sys/socket.h>

ssize_t recvfrom(int sockfd, void *buffer, size_t length, int flags, struct sockaddr *src_addr, socklen_t *addrlen);

ssize_t sendto(int sockfd, const void *buffer, size_t length, int flags, const struct sockaddr *dest_addr, socklen_t addrlen);
```

Возвращаемое значение и первые 3 аргумента - такие же, как у `read()` и `write()`.

`flags` - описывает специфичные для сокетов I/O фичи, обычно можно указать 0.

`src_addr` и `addrlen` - описывают адрес внешнего сокета. В случае `sendto()` их нужно указать при вызове, а в случае `recvfrom()` - через них будет возвращен адрес после вызова (как у `accept()`).

Независимо от указанного `length`, `recvfrom()` получит только одно сообщение, а если его длина будет меньше `length`, то обрежет его.

### Ошибки чтения из сокета

Ошибки, возникающие из-за багов в коде:

- `[EBADF]`: fildes is not a valid file or socket descriptor open for reading.
- `[EFAULT]`: Buf points outside the allocated address space.
- `[EINVAL]`: The pointer associated with fildes was negative.
- `[ENXIO]`: A requested action cannot be performed by the device.

Ошибки, которые потенциально можно вылечить, но на практике обычно нет, так как лечение требует ручного вмешательства:

- `[EIO]`: An I/O error occurred while reading from the file system.
- `[ENOBUFS]`: An attempt to allocate a memory buffer fails.
- `[ENOMEM]`: Insufficient memory is available.
- `[ETIMEDOUT]`: A transmission timeout occurs during a read attempt on a socket.

Ошибки, означающие, что данных больше не придет, потому что соединение разорвано:

- `[ECONNRESET]`: The connection is closed by the peer during a read attempt on a socket.
- `[ENOTCONN]`: A read is attempted on an unconnected socket.

И наконец излечимые (recoverable) ошибки, которые обычно лечатся повтором попытки, возможно после таймаута:

- `[EAGAIN]`: The file was marked for non-blocking I/O, and no data were ready to be read.
- `[EINTR]`: A read from a slow device was interrupted before any data arrived by the delivery of a signal.

### Ошибки записи в сокет

Ошибки, возникающие из-за багов в коде:

- `[EINVAL]`: The pointer associated with fildes is negative.
- `[EBADF]`: fildes is not a valid file descriptor open for writing.
- `[ECONNRESET]`: A write is attempted on a socket that is not connected.
- `[ENXIO]`: A request is made of a nonexistent device, or the request is outside the capabilities of the device.
- `[EPIPE]`: An attempt is made to write to a socket of type SOCK_STREAM that is not connected to a peer socket.

Ошибки, которые потенциально можно вылечить, но на практике обычно нет, так как лечение требует ручного вмешательства:

- `[EDQUOT]`: The user's quota of disk blocks on the file system containing the file is exhausted.
- `[EFBIG]`: An attempt is made to write a file that exceeds the process's file size limit or the maximum file size.
- `[EIO]`: An I/O error occurs while reading from or writing to the file system.
- `[ENETDOWN]`: A write is attempted on a socket and the local network interface used to reach the destination is down.
- `[ENETUNREACH]`: A write is attempted on a socket and no route to the network is present.
- `[ENOSPC]`: There is no free space remaining on the file system containing the file.

И наконец излечимые (recoverable) ошибки, которые обычно лечатся повтором попытки, возможно после таймаута:

- `[EAGAIN]`: The file was marked for non-blocking I/O, and no data were ready to be read.
- `[EINTR]`: A read from a slow device was interrupted before any data arrived by the delivery of a signal.

## Пример

Сервер:

```c
#include <netinet/in.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define SERVER_BUFFER_SIZE      1024

int main()
{
    int socketId = socket(PF_INET, SOCK_STREAM, 0);

    struct sockaddr_in serverAddr;
    bzero((char*)&serverAddr, sizeof(serverAddr));
    serverAddr.sin_family       = AF_INET;
    serverAddr.sin_port         = htons(8080);
    serverAddr.sin_addr.s_addr  = INADDR_ANY;
    bind(socketId, (struct sockaddr *) &serverAddr, sizeof(serverAddr));

    listen(socketId, 5);

    int                         finished    = 0;
    while(!finished)
    {
        struct  sockaddr_storage    serverStorage;
        socklen_t                   addr_size   = sizeof serverStorage;
        int newSocket = accept(socketId, (struct sockaddr*)&serverStorage, &addr_size);

        char        buffer[SERVER_BUFFER_SIZE];
        int         get = read(newSocket, buffer, SERVER_BUFFER_SIZE - 1);

        buffer[get] = '\0';
        fprintf(stdout, "%s\n", buffer);

        write(newSocket, "OK", 2);

        fprintf(stdout, "Message Complete\n");

        close(newSocket);
    }
    close(socketId);
}
```

Клиент:

```c
#include <arpa/inet.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define CLIENT_BUFFER_SIZE     1024

int main(int argc, char* argv[])
{
    if (argc != 3)
    {
        fprintf(stderr, "Usage: client <host> <Message>\n");
        exit(1);
    }

    int socketId = socket(PF_INET, SOCK_STREAM, 0);

    struct sockaddr_in serverAddr;
    socklen_t addrSize = sizeof(serverAddr);
    bzero((char*)&serverAddr, sizeof(serverAddr));
    serverAddr.sin_family       = AF_INET;
    serverAddr.sin_port         = htons(8080);
    serverAddr.sin_addr.s_addr  = inet_addr(argv[1]);
    connect(socketId, (struct sockaddr*)&serverAddr, addrSize);

    write(socketId, argv[2], strlen(argv[2]));

    shutdown(socketId, SHUT_WR);

    char    buffer[CLIENT_BUFFER_SIZE];
    size_t  get = read(socketId, buffer, CLIENT_BUFFER_SIZE - 1);

    buffer[get] = '\0';
    fprintf(stdout, "%s %s\n", "Response from server", buffer);

    close(socketId);
}
```