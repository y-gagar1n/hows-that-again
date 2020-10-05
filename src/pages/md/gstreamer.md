---
title: "Gstreamer"
path: "/blog/gstreamer"
---

# Gstreamer

```toc
from-heading: 2
```

https://habr.com/ru/post/251427/

```cpp
#include <gst/gst.h>
int main (int argc, char * argv[]) {

	if (argc != 3) {
		g_print ("Syntax error\n");
		return -1;
	}

	GstElement *pipeline, *src, *dst;
	/* Сюда будет читаться результат попытки запуска потока. */
	GstStateChangeReturn ret;
	/* bus - это шина конвейера. Через нее мы можем получать сообщения о событиях. */
	GstBus *bus;
	GstMessage *msg;

	/* Инициализация GStreamer */
	gst_init (NULL, NULL);

	/* Создаем элементы */
	pipeline = gst_element_factory_make ("pipeline", "pipe");
	src = gst_element_factory_make ("filesrc", "src");
	dst = gst_element_factory_make ("filesink", "dst");
	if ( !pipeline || !src || !dst ) {
		g_printerr ("Unable to create some elements\n");
		return -1;
	}

	/* Добавляем элементы в конвейер */
	gst_bin_add_many (GST_BIN(pipeline), src, dst, NULL);

	/* И связываем их */
	if ( gst_element_link (src, dst) != TRUE ) 	{
		g_printerr ("Elements can not be linked\n");
		gst_object_unref (pipeline);
		return -1;
	}

	/* Задаем элементам свойства */
	g_object_set (src, "location", argv[1], NULL);
	g_object_set (dst, "location", argv[2], NULL);

	/* Запускаем конвейер */
	ret = gst_element_set_state (pipeline, GST_STATE_PLAYING);
	if ( ret == GST_STATE_CHANGE_FAILURE ) {
		g_printerr ("Unable to set pipeline to the playing state\n");
		gst_object_unref (pipeline);
		return -1;
	}

	/* Мало просто установить режим PLAYING. Нужно ждать либо конца потока, либо 
	 * ошибок. Для начала подключаемся к шине конвейера (эти манипуляции будут 
	 * описаны в следующей статье) */
	bus = gst_element_get_bus (pipeline);

	/* И ожидаем события на шине. Когда событие произойдет, функция вернет 
	 * сообщение, которое мы будем парсить. */
	msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE, GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

	/* Парсим сообщение */
	if (msg != NULL)
	{
		GError *err;
		gchar *debug_info;

		switch ( GST_MESSAGE_TYPE (msg) )
		{
			case GST_MESSAGE_ERROR:
				gst_message_parse_error (msg, &err, &debug_info);
				g_printerr ("Error received from element %s: %s\n", GST_OBJECT_NAME (msg->src), err->message);
				g_printerr ("Debugging information: %s\n", debug_info ? debug_info : "none");
				g_clear_error (&err);
				g_free (debug_info);
				break;

			case GST_MESSAGE_EOS:
				g_print ("We reach End-Of-Stream\n");
				break;

			default:
				g_printerr ("Unexpected message received\n");
				break;
		}
		gst_message_unref (msg);
	}

	/* Освобождаем ресурсы */
	gst_object_unref (bus);
	gst_element_set_state (pipeline, GST_STATE_NULL);
	gst_object_unref (pipeline);

	return 0;
}
```

## Типичное создание пайплайна

```cpp
pipeline = gst_pipeline_new ("my-pipeline");

bus = gst_pipeline_get_bus (GST_PIPELINE (pipeline));
gst_bus_add_signal_watch (bus);
g_signal_connect (bus, "message", (GCallback) cb_message,
  pipeline);

src = gst_element_factory_make ("uridecodebin", "src");
if (src == NULL)
g_error ("Could not create 'uridecodebin' element");

g_object_set (src, "uri", argv[1], NULL);

csp = gst_element_factory_make ("videoconvert", "csp");
if (csp == NULL)
g_error ("Could not create 'videoconvert' element");

vs = gst_element_factory_make ("videoscale", "vs");
if (csp == NULL)
g_error ("Could not create 'videoscale' element");

sink = gst_element_factory_make ("autovideosink", "sink");
if (sink == NULL)
g_error ("Could not create 'autovideosink' element");

gst_bin_add_many (GST_BIN (pipeline), src, csp, vs, sink, NULL);
```

## API

`gst_buffer_map` позволяет доставать `GstMapInfo` из `GstBuffer`

У GstMapInfo есть поля:

```cpp
guint8 *data;
gsize size;
```

Pad probes are best suited for looking at data as it passes through the pipeline. If you need to modify data, you should rather write your own GStreamer element. Base classes like GstAudioFilter, GstVideoFilter or GstBaseTransform make this fairly easy.

If you just want to inspect buffers as they pass through the pipeline, you don't even need to set up pad probes. You could also just insert an identity element into the pipeline and connect to its "handoff" signal. The identity element also provides a few useful debugging tools like the dump and last-message properties; the latter is enabled by passing the '-v' switch to gst-launch and setting the silent property on the identity to FALSE.

## tcp

### multifdsink

https://gstreamer.freedesktop.org/documentation/tcp/multifdsink.html?gi-language=c#multifdsink

Может писать поток в указанные файловые дескрипторы. Дескрипторы добавляются и удаляются через сигналы (`add`, `remove`)

### tcpclientsink/tcpserversrc

Сами создают сокеты, достаточно передать лишь номер порта

```shell
gst-launch-1.0 tcpserversrc port=9999 ! decodebin ! alsasink
gst-launch-1.0 filesrc location=/home/yury-timofeev/samples/1.mp3 ! tcpclientsink port=9999
```

Можно и микшировать сразу:

```cpp
gst-launch-1.0 tcpserversrc port=9999 ! decodebin ! audiomixer name=mix ! alsasink tcpserversrc port=9998 ! decodebin ! mix.
gst-launch-1.0 filesrc location=/home/yury-timofeev/samples/1.mp3 ! tcpclientsink port=9999
gst-launch-1.0 filesrc location=/home/yury-timofeev/samples/2.mp3 ! tcpclientsink port=9998
```

При этом если мы хотим использовать `decodebin` на отправляющей стороне, то нужно поизвращаться:

```cpp
gst-launch-1.0 tcpserversrc port=9999 ! audio/x-raw,format=S8,channels=2,rate=48000 ! audioconvert ! alsasink

gst-launch-1.0 filesrc location=/home/yury-timofeev/samples/1.mp3 ! decodebin ! audioconvert ! audioresample ! audio/x-raw,format=S8,channels=2,rate=48000 ! tcpclientsink port=9999
```

## Сигналы

Используется концепция сигналов из GObjects (не имеют ничего общего с UNIX-сигналами): https://developer.gnome.org/gobject/stable/signal.html

Вот так мы посылаем сигнал в элемент:

```cpp
GstElement *sink = gst_bin_get_by_name(GST_BIN(pipeline), "dest");
g_signal_emit_by_name(sink, "add", "192.168.1.25", 5004, NULL);
g_object_unref(sink);
```

## decodebin, oggdemux

https://gstreamer.freedesktop.org/documentation/application-development/basics/pads.html#dynamic-or-sometimes-pads

Декодирующие элементы `decodebin` и `oggdemux` имеют особую природу. Так как `decodebin` может работать со многими форматами, а `oggdemux` может работать с аудио- и видео-потоком, то их синки становятся известны лишь во время выполнения. Поэтому они не могут быть связаны обычным образом и их нужно добавлять динамически. Делается это так:

```cpp
#include <gobject/gsignal.h>
...
GstElement *pipeline = gst_pipeline_new("audio-sender");
GstElement *source = gst_element_factory_make("filesrc", "file-source");
GstElement *decodebin = gst_element_factory_make("decodebin", "decodebin");
GstElement *alsasink = gst_element_factory_make("alsasink", "alsasink");

GstBus* bus = gst_pipeline_get_bus(GST_PIPELINE(pipeline));
guint bus_watch_id = gst_bus_add_watch(bus, bus_call, loop);
gst_object_unref(bus);

gst_bin_add_many(GST_BIN(pipeline), source, decodebin, alsasink, nullptr); // в бин добавляем все 3 элемента
gst_element_link(source, decodebin);  // связываем только первые 2 элемента: filesrc ! decodebin

g_signal_connect(decodebin, "pad-added", G_CALLBACK(on_pad_added), alsasink);	// на decodebin привязываемся к сигналу pad-added, который будет вызван, когда у decodebin появился pad, который sink (в начале работы такого пада у него нет)
```

Коллбэк выглядит так:

```cpp
static void on_pad_added (GstElement *element,
              GstPad     *pad,
              gpointer    data)
{
    GstPad *sinkpad;
    GstElement *alsasink = (GstElement *) data;

    sinkpad = gst_element_get_static_pad (alsasink, "sink");	// берем пад, равный синку (то есть входной) у элемента alsasink

    gst_pad_link (pad, sinkpad);	// связываем наш пад (т.е. decodebin) с синком алсасинка

    gst_object_unref (sinkpad);
}
```

## capsfilter

Когда вместо элемента в пайплайне начинает идти формат: 

```cpp
gst-launch-1.0 tcpserversrc port=9999 ! audio/x-raw,format=S8,channels=2,rate=48000 ! audioconvert ! alsasink
```

то это алиас для:

```cpp
gst-launch-1.0 tcpserversrc port=9999 ! capsfilter caps=audio/x-raw,format=S8,channels=2,rate=48000 ! audioconvert ! alsasink
```

Я так до конца и не понял, что делает `capsfilter`, но вроде как он устанавливает ограничения для связи между двумя элементами. 

##  Итерирование по элементам бина

```cpp
g_print("Pipeline contains the following elements:\n");
GstIterator *it;
GValue elem = G_VALUE_INIT;
it = gst_bin_iterate_elements(GST_BIN(pipeline));
while (gst_iterator_next(it, &elem) == GST_ITERATOR_OK)
{
    g_print("%s\n",
        gst_element_get_name(g_value_get_object(&elem)));
    g_value_reset(&elem);
}

g_value_unset(&elem);
gst_iterator_free(it);
```

## queue2

* `buffering_level` - текущий уровень заполненности очереди. Нормализованный, принимает значения от 0 до 1.000.000

* `buffering_percent` - уровень заполненности промежутка между high и low вотермарками. 0% означает, что `buffering_level == low_watermark`, 100% означает, что `buffering_level == high_watermark`. Принимает значения от 0 до 100.

* `BUF_LEVEL_PERCENT_FACTOR` - чему в абсолютных значениях равен 1% buffering level, то есть `BUF_LEVEL_PERCENT_FACTOR ((MAX_BUFFERING_LEVEL) / 100) = 10.000`

`gst_queue2_chain` - сюда поступают, здесь процессятся и отсюда выходят данные пайплайна. Это основная функция.

Она форвардит вызов к `gst_queue2_chain_buffer_or_buffer_list`. Там поступивший буфер кладется во внутреннюю очередь строчкой `gst_queue2_locked_enqueue`


Следующие строки в методе `get_buffering_level`, кажется, наконец выставляют `buffering_level`:

```cpp
#define GET_BUFFER_LEVEL_FOR_QUANTITY(format,alt_max) \
    normalize_to_buffering_level (queue->cur_level.format,queue->max_level.format,(alt_max))

/* figure out the buffering level we are filled, we take the max of all formats. */
if (!QUEUE_IS_USING_RING_BUFFER (queue)) {
  buflevel = GET_BUFFER_LEVEL_FOR_QUANTITY (bytes, 0);
} else {
  guint64 rb_size = queue->ring_buffer_max_size;
  buflevel = GET_BUFFER_LEVEL_FOR_QUANTITY (bytes, rb_size);
}

buflevel2 = GET_BUFFER_LEVEL_FOR_QUANTITY (time, 0);
buflevel = MAX (buflevel, buflevel2);

buflevel2 = GET_BUFFER_LEVEL_FOR_QUANTITY (buffers, 0);
buflevel = MAX (buflevel, buflevel2);

/* also apply the rate estimate when we need to */
if (queue->use_rate_estimate) {
  buflevel2 = GET_BUFFER_LEVEL_FOR_QUANTITY (rate_time, 0);
  buflevel = MAX (buflevel, buflevel2);
}
```

И она вычисляют уровень для байт, времени, буферов и rate_time, а потом берут из них максимальный.

## Написание плагина

Лучшая статья по этой теме, что я видел: https://habr.com/ru/post/221483/

## Preroll

Когда из состояния READY выставляем состояние PAUSED, то данные уже начинают идти по пайплайну, но когда они доходят до последнего sink-элемента (напр. alsasink), то они блочатся у его входа и в результате не "рендерятся". В этом состоянии каждый из элементов держит один или несколько буферов, но когда все элементы заполнят свои внутренние очереди, проход данных по пайплайну остановится до перехода в состояние PLAYING. Этот процесс называется pre-roll и он нужен для того, чтобы когда мы переведем в состояние PLAYING, переход прошел максимально быстро.

Все изменения состояния, идущие "наверх" (то есть NULL-READY-PAUSED-PLAYING) - выполняются асинхронно. То есть мы шлем команду на изменение состояния, она возвращается сразу же и потом от шины приходит сообщение, что состояние изменено.

Изменения состояния, идущие "вниз" - наоборот, все синхронны.

Главная разница между сигналами и сообщениями от шины - сигналы синхронны и могут вызваться из любого потока в любое время (поэтому в них нужно заботиться о мультипоточности). Сообщения - асинхронны и выполняются в потоке приложения, поэтому могут быть выполнены тогда, когда приложению будет удобно.

Свойство `sync` у `sink`-элементов означает, будет ли поток из этих элементов синхронизирован с часами. Если стоит `false`, то поток будет выдан на рендер настолько быстро, насколько это возможно.

`gst-inspect-1.0 --gst-debug -help` - выводит всю инфу о том, что может быть залогировано

В GST dev tools есть GST debug viewer, который облегчит чтение логов.

Пример использования сетевых часов для мульти-рума: https://github.com/thaytan/gst-tutorial-lca2018/tree/master/network-clocks

Working with dynamic pipelines: https://coaxion.net/blog/2014/01/gstreamer-dynamic-pipelines/ код из тэой статьи здесь: https://github.com/sdroege/gst-snippets/blob/217ae015aaddfe3f7aa66ffc936ce93401fca04e/dynamic-tee-vsink.c

Когда регистрируем проб с типом `GST_PAD_PROBE_TYPE_IDLE`, то указанный коллбэк будет вызван как только этот пад начнет простаивать, то есть по нему перестанут идти данные.

## Удаление ветви пайплайна

Например, у нас есть такой пайплайн:
	
	src -> bin -> conv -> tee -> queue -> fakesink			(1)
							  -> queue -> conv -> sink 		(2)

и мы хотим удалить ветвь (2)

Для этого мы берем наш src-pad элемента tee и ставим на него проб с типом `GST_PAD_PROBE_TYPE_IDLE`. В коллбэке проба делаем следующее (https://github.com/sdroege/gst-snippets/blob/217ae015aaddfe3f7aa66ffc936ce93401fca04e/dynamic-tee-vsink.c#L93):

```c
teepad = gst_element_get_static_pad(tee, "src_<номер>");
sinkpad = gst_element_get_static_pad (queue, "sink");
gst_pad_unlink (teepad, sinkpad);
gst_object_unref (sinkpad);

gst_element_set_state (sink, GST_STATE_NULL);
gst_element_set_state (conv, GST_STATE_NULL);
gst_element_set_state (queue, GST_STATE_NULL);

gst_bin_remove (GST_BIN (pipeline), queue);
gst_bin_remove (GST_BIN (pipeline), conv);
gst_bin_remove (GST_BIN (pipeline), sink);

gst_object_unref (sink);
gst_object_unref (conv);
gst_object_unref (queue);

gst_element_release_request_pad (tee, teepad);
gst_object_unref (teepad);

return GST_PAD_PROBE_REMOVE;
```

При окончании потока делаем gst_app_src_end_of_stream () чтобы послать EOS в пайплайн

В месте связи ветки ставим проб и ждем, пока придет EOS. только это надо сделать до того, как послали EOS.

Когда пришел EOS, запускаем наш unlink_cb

GST_PAD_PROBE_TYPE_EVENT_DOWNSTREAM чтобы ловить евенты через проб

нН чтобы были нотификации по ивентам, нужно сделать GST_PAD_PROBE_TYPE_EVENT_FLUSH

При получении EOS в пробе его можно дропнуть


## gst-shark

Установка пути, куда сохраняются результаты:

`export GST_SHARK_LOCATION=~/profile`

Запуск с трейсером:

`GST_TRACERS="tracer1;tracer2" gst-launch-1.0 ...`

Если нужно трейсерам указать параметры, то можно так:

`GST_TRACERS="tracer1(parameter1=value1);tracer2(parameter2=value2)" gst-launch-1.0 ...`



Параметром `filter` можно устанавливать ограничение на профилируемый элемент. Значением фильтра пишем регэкспы по правилам Glib: https://developer.gnome.org/glib/stable/glib-regex-syntax.html

Пример:

`gst-launch-1.0 videotestsrc ! identity name=i0 ! queue ! identity name=i1 ! x264enc ! identity name=i2 ! queue ! fakesink`

Вывести фреймрейт в каждом из `identity`:

`GST_TRACERS="framerate(filter=^i[0-9])" GST_DEBUG=GST_TRACER:7`

Вывести фреймрейт для всех `identity` кроме `i2`

`GST_TRACERS="framerate(filter=^i[^2])" GST_DEBUG=GST_TRACER:7`

Вывести `scheduletime` в `videotestsrc`:

`GST_TRACERS="scheduletime(filter=videotestsrc0)" GST_DEBUG=GST_TRACER:7`

## Трейсеры

- `interlatency` - Замеряет время, требуемое буферу, чтобы пройти от одной точки до другой внутри пайплайна. Предоставляет замеры времени, за которое буфер прошел от src первого элемента до src каждого последующего. Точность - нс.
- `proctime` - замеры времени, за которое каждый из элементов обрабатывает очередной буфер
- `framerate` - каждую секунду для каждого элемента выводит количество кадров, которое через него прошло
- `scheduletime` - замеряет время, проходящее между появлениеями буферов на sink pad каждого элемента
- `cpuusage` - каждую секунду выводит загрузку ЦП. **ВАЖНО**: это относится к общей загрузке ЦП, а не только той, которая обеспечивается пайплайном
- `bitrate` - каждую секунду выводит битрейт
- `queuelevel` - выводит, сколько байт и сколько буферов лежит в каждой очереди, обновляется каждый раз, когда в очередь входит новый буфер. НЕ РАБОТАЕТ с queue2, только с queue.
- `buffer` - выводит инфу о каждом буфере, который выходит из первого (source) элемента. PTS = presentation time stamp (указывает, когда нужно отрендерить этот буфер), DTS = decoding time stamp (указывает, когда нужно декодировать этот кадр). Порядок рендера и декодирования может быть разный, потому что некоторые кадры может быть нужно декодировать раньше, чем они будут показаны.