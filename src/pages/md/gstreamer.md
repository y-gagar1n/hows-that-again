---
title: "Gstreamer"
path: "/blog/gstreamer"
---

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

# API

`gst_buffer_map` позволяет доставать `GstMapInfo` из `GstBuffer`

У GstMapInfo есть поля:

```cpp
guint8 *data;
gsize size;
```

Pad probes are best suited for looking at data as it passes through the pipeline. If you need to modify data, you should rather write your own GStreamer element. Base classes like GstAudioFilter, GstVideoFilter or GstBaseTransform make this fairly easy.

If you just want to inspect buffers as they pass through the pipeline, you don't even need to set up pad probes. You could also just insert an identity element into the pipeline and connect to its "handoff" signal. The identity element also provides a few useful debugging tools like the dump and last-message properties; the latter is enabled by passing the '-v' switch to gst-launch and setting the silent property on the identity to FALSE.

# tcp

## multifdsink

https://gstreamer.freedesktop.org/documentation/tcp/multifdsink.html?gi-language=c#multifdsink

Может писать поток в указанные файловые дескрипторы. Дескрипторы добавляются и удаляются через сигналы (`add`, `remove`)

## tcpclientsink/tcpserversrc

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

# Сигналы

Используется концепция сигналов из GObjects (не имеют ничего общего с UNIX-сигналами): https://developer.gnome.org/gobject/stable/signal.html

Вот так мы посылаем сигнал в элемент:

```cpp
GstElement *sink = gst_bin_get_by_name(GST_BIN(pipeline), "dest");
g_signal_emit_by_name(sink, "add", "192.168.1.25", 5004, NULL);
g_object_unref(sink);
```

# decodebin, oggdemux

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

# capsfilter

Когда вместо элемента в пайплайне начинает идти формат: 

```cpp
gst-launch-1.0 tcpserversrc port=9999 ! audio/x-raw,format=S8,channels=2,rate=48000 ! audioconvert ! alsasink
```

то это алиас для:

```cpp
gst-launch-1.0 tcpserversrc port=9999 ! capsfilter caps=audio/x-raw,format=S8,channels=2,rate=48000 ! audioconvert ! alsasink
```

Я так до конца и не понял, что делает `capsfilter`, но вроде как он устанавливает ограничения для связи между двумя элементами. 

#  Итерирование по элементам бина

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

# queue2

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

# Написание плагина

Лучшая статья по этой теме, что я видел: https://habr.com/ru/post/221483/






