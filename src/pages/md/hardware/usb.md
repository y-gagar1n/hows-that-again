---
title: "usb"
path: "/blog/hardware/usb"
---

## Общее описание

Кабель USB 1.0 и 2.0 состоит из 4 медных проводников - 2 проводника питания и 2 проводника данных - и заземленной оплетки.

USB-контроллер, как правило, интегрирован в микросхему южного моста.

Устройствам гарантируется ток до 100 мА, а после согласования с хост-контроллером - до 500 мА.

Заземляющий контакт разъема длиннее сигнального, чтобы при "горячем" подключении первыми замыкались заземляющие контакты, потенциалы корпусов двух устройств стали равны и дальнейшее соединение сигнальных проводников не приводило к перенапряжениям.

На логическом уровне устройство USB поддерживает ранзакции приема и передачи данных. Каждый пакет каждой транзакции содержит номер эндпойнта на устройстве. При подключении устройства драйверы в ядре ОС читают с него список эндпойнтов и создают управляющие структуры данных для общения с каждым эндпойнтом. Совокупность эндпойнта и структур данных в ядре называется каналом (pipe).

Эндпойнты и каналы относятся к одному из 4 классов:

1.  прерывание (interrupt) - позволяет доставлять короткие пакеты и в том, и в другом направлении, без получения ответа/подтверждения, но с гарантией времени доставки - пакет будет доставлен не позже, чем через N миллисекунд. Например, используется в устройствах ввода
2.  изохронный (isoch) - позволяет доставлять пакеты без гарантии доставки, без ответов/подтверждений, но с гарантированной скоростью доставки в N пакетов на один период шины (1 кГц у low и full speed, 8 кГц у high speed). Используется для аудио- и видеоинформации.
3.  управляющий (control) - для обмена с устройством короткими пакетами "вопрос-ответ". Любое устройство имеет управляющий канал 0, который позволяет ОС прочитать краткую информацию об устройстве, список эндпойнтов, коды производителя и модели, которые будут использованы для выбора драйвера
4.  поточный (bulk) - дает гарантию доставки каждого пакета, поддерживает автоматическую приостановку передачи данных по нежеланию устройства (переполнение/опустошение буфера), но не дает гарантий скорости и задержки доставки. Используется, например, в принтерах и сканерах.

Низкоскоростные устройства могут не иметь изохронных и поточных каналов.

Время шины делится на периоды, в начале периода контроллер передает всей шине пакет "начало периода", далее в течение периода передаются пакеты прерываний, потом изохронные, потом управляющие, потом поточные.

Активной стороной шины всегда является контроллер, передача данных от устройства к контроллеру реализована как короткий вопрос контролера и длинный, с данными, ответ устройства.

Размер пакета для эндпойнта есть вшитая в таблицу эндпойнтов устройства константа, изменению не подлежит. Выбирается разработчиком из набора, указанного в спецификации.

## Список спецификаций

| Спецификация | Скорость            | Стандарт USB            |
| ------------ | ------------------- | ----------------------- |
| Low-Speed    | до 1,5 Мбит/с       | USB 1.0                 |
| Full-Speed   | до 12 Мбит/с        | USB 1.1                 |
| High-speed   | до 480 Мбит/с       | USB 2.0                 |
| SuperSpeed   | до 5 Гбит/с         | USB 3.0 / USB 3.1 Gen 1 |
| SuperSpeed+  | 10Gbps до 10 Гбит/с | USB 3.1 Gen 2           |
| SuperSpeed+  | 20Gbps до 20 Гбит/с | USB 3.2 Gen 2x2         |

## Недостатки

Протокол требует от оконечного устройства поддержания достаточно сложного алгоритмического стека как для непосредственно обмена по шине, так и для поддержания сопутствующих функций типа инициализации или ответов на служебные сообщения. Ввиду своей сложности и разнообразности устройства зачастую аппаратно выполняют лишь базовые уровни протокола, оставляя верхние на откуп программному коду. Это приводит к заметным непроизводительным затратам программной памяти и времени, а также содержит угрозу ошибок и попыток избыточно упростить программный код в ущерб соответствию стандарту.

Код производителя (VID) выдаётся разработчику устройства лишь после бюрократической процедуры и денежных затрат порядка 5000 USD. Дополнительно организация разработчиков стандарта USB-IF негативно относится к перепродаже владельцами кодов производителя кодов устройств (PID). Всё это ограничивает доступность шины для мелких производителей и независимых разработчиков. Свободно доступные коды для устройств, реализующих стандартные функциональности (напр., порт обмена, устройство памяти или аудиоустройство) создатели стандарта не предоставляют.

Список классов и подклассов устройств частями непоследователен, чрезмерно раздут, подклассы одного уровня зачастую неравноценны и содержат устаревшую функциональность. Как результат поддержка определённого стандартного класса зачастую требует избыточного кода, не нужного для непосредственного функционирования, как со стороны устройства, так и хоста (компьютера). То же относится и к типам передаваемых пакетов, часть из которых имеет скорее историческое значение.



Более подробное описание стека можно найти [здесь](https://habr.com/post/236401/)