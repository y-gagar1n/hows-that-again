webpackJsonp([0x76c5bdac7050],{451:function(t,n){t.exports={data:{markdownRemark:{html:'<h2>Общее описание</h2>\n<p>Кабель USB 1.0 и 2.0 состоит из 4 медных проводников - 2 проводника питания и 2 проводника данных - и заземленной оплетки.</p>\n<p>USB-контроллер, как правило, интегрирован в микросхему южного моста.</p>\n<p>Устройствам гарантируется ток до 100 мА, а после согласования с хост-контроллером - до 500 мА.</p>\n<p>Заземляющий контакт разъема длиннее сигнального, чтобы при "горячем" подключении первыми замыкались заземляющие контакты, потенциалы корпусов двух устройств стали равны и дальнейшее соединение сигнальных проводников не приводило к перенапряжениям.</p>\n<p>На логическом уровне устройство USB поддерживает ранзакции приема и передачи данных. Каждый пакет каждой транзакции содержит номер эндпойнта на устройстве. При подключении устройства драйверы в ядре ОС читают с него список эндпойнтов и создают управляющие структуры данных для общения с каждым эндпойнтом. Совокупность эндпойнта и структур данных в ядре называется каналом (pipe).</p>\n<p>Эндпойнты и каналы относятся к одному из 4 классов:</p>\n<ol>\n<li>прерывание (interrupt) - позволяет доставлять короткие пакеты и в том, и в другом направлении, без получения ответа/подтверждения, но с гарантией времени доставки - пакет будет доставлен не позже, чем через N миллисекунд. Например, используется в устройствах ввода</li>\n<li>изохронный (isoch) - позволяет доставлять пакеты без гарантии доставки, без ответов/подтверждений, но с гарантированной скоростью доставки в N пакетов на один период шины (1 кГц у low и full speed, 8 кГц у high speed). Используется для аудио- и видеоинформации.</li>\n<li>управляющий (control) - для обмена с устройством короткими пакетами "вопрос-ответ". Любое устройство имеет управляющий канал 0, который позволяет ОС прочитать краткую информацию об устройстве, список эндпойнтов, коды производителя и модели, которые будут использованы для выбора драйвера</li>\n<li>поточный (bulk) - дает гарантию доставки каждого пакета, поддерживает автоматическую приостановку передачи данных по нежеланию устройства (переполнение/опустошение буфера), но не дает гарантий скорости и задержки доставки. Используется, например, в принтерах и сканерах.</li>\n</ol>\n<p>Низкоскоростные устройства могут не иметь изохронных и поточных каналов.</p>\n<p>Время шины делится на периоды, в начале периода контроллер передает всей шине пакет "начало периода", далее в течение периода передаются пакеты прерываний, потом изохронные, потом управляющие, потом поточные.</p>\n<p>Активной стороной шины всегда является контроллер, передача данных от устройства к контроллеру реализована как короткий вопрос контролера и длинный, с данными, ответ устройства.</p>\n<p>Размер пакета для эндпойнта есть вшитая в таблицу эндпойнтов устройства константа, изменению не подлежит. Выбирается разработчиком из набора, указанного в спецификации.</p>\n<h2>Список спецификаций</h2>\n<table>\n<thead>\n<tr>\n<th>Спецификация</th>\n<th>Скорость</th>\n<th>Стандарт USB</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Low-Speed</td>\n<td>до 1,5 Мбит/с</td>\n<td>USB 1.0</td>\n</tr>\n<tr>\n<td>Full-Speed</td>\n<td>до 12 Мбит/с</td>\n<td>USB 1.1</td>\n</tr>\n<tr>\n<td>High-speed</td>\n<td>до 480 Мбит/с</td>\n<td>USB 2.0</td>\n</tr>\n<tr>\n<td>SuperSpeed</td>\n<td>до 5 Гбит/с</td>\n<td>USB 3.0 / USB 3.1 Gen 1</td>\n</tr>\n<tr>\n<td>SuperSpeed+</td>\n<td>10Gbps до 10 Гбит/с</td>\n<td>USB 3.1 Gen 2</td>\n</tr>\n<tr>\n<td>SuperSpeed+</td>\n<td>20Gbps до 20 Гбит/с</td>\n<td>USB 3.2 Gen 2x2</td>\n</tr>\n</tbody>\n</table>\n<h2>Недостатки</h2>\n<p>Протокол требует от оконечного устройства поддержания достаточно сложного алгоритмического стека как для непосредственно обмена по шине, так и для поддержания сопутствующих функций типа инициализации или ответов на служебные сообщения. Ввиду своей сложности и разнообразности устройства зачастую аппаратно выполняют лишь базовые уровни протокола, оставляя верхние на откуп программному коду. Это приводит к заметным непроизводительным затратам программной памяти и времени, а также содержит угрозу ошибок и попыток избыточно упростить программный код в ущерб соответствию стандарту.</p>\n<p>Код производителя (VID) выдаётся разработчику устройства лишь после бюрократической процедуры и денежных затрат порядка 5000 USD. Дополнительно организация разработчиков стандарта USB-IF негативно относится к перепродаже владельцами кодов производителя кодов устройств (PID). Всё это ограничивает доступность шины для мелких производителей и независимых разработчиков. Свободно доступные коды для устройств, реализующих стандартные функциональности (напр., порт обмена, устройство памяти или аудиоустройство) создатели стандарта не предоставляют.</p>\n<p>Список классов и подклассов устройств частями непоследователен, чрезмерно раздут, подклассы одного уровня зачастую неравноценны и содержат устаревшую функциональность. Как результат поддержка определённого стандартного класса зачастую требует избыточного кода, не нужного для непосредственного функционирования, как со стороны устройства, так и хоста (компьютера). То же относится и к типам передаваемых пакетов, часть из которых имеет скорее историческое значение.</p>\n<p>Более подробное описание стека можно найти <a href="https://habr.com/post/236401/">здесь</a></p>',frontmatter:{path:"/blog/hardware/usb",title:"usb"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-hardware-usb-2902438d72114310e6d2.js.map