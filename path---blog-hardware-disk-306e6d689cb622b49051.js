webpackJsonp([0x641b329fb6e3],{427:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Источники:</p>\n<ul>\n<li><a href="https://medium.com/databasss/on-disk-io-part-1-flavours-of-io-8e1ace1de017">https://medium.com/databasss/on-disk-io-part-1-flavours-of-io-8e1ace1de017</a></li>\n</ul>\n<h1>Disk IO</h1>\n<p><strong>Блочное устройство</strong>- вид файла устройств, обеспечивающий интерфейс к HDD или SSD в виде файла в файловой системе. Блочные устройства работают с <strong>секторами</strong> на диске, то есть группами соседних байт. </p>\n<p><strong>Сектор</strong> - это минимальная единица передачи данных для блочного устройства, меньше чем один сектор передать через него нельзя. Большинство дисков имеют сектора размером 512 байт. </p>\n<p><strong>Блок</strong> - минимальная адресуемая единица файловой системы. Блок это группа нескольких соседних секторов, запрашиваемая драйвером устройства. Обычно блоки имеют размер 512, 1024, 2048 и 4096 байт. </p>\n<p>Обмен данными с диском обычно происходит через виртуальную память, которая кэширует блоки файловой системы в памяти и служит буфером для промежуточных операций. Типичный размер страницы - 4096 байта.</p>\n<p>В результате, <em>при работе с диском страницы виртуальной памяти мапятся на блоки файловой системы, которые мапятся на сектора блочного устройства</em>.</p>\n<h2>Standard IO</h2>\n<p>Стандартный IO использует сисколлы <em>read()</em> и <em>write()</em>. </p>\n<p>При чтении данных сначала идет обращение к Page Cache линукса. Если данных там нет, то триггерится <em>Page Fault</em>, обработчик исключения загружает данные с диска в память и данные возвращаются пользователю. Если кэш страниц заполнен, то самые старые страницы флашатся на диск и исключаются из кэша.</p>\n<p>При записи, содержимое буфера сначала пишется в <em>Page Cache</em> в памяти, а страница помечается как грязная. Ядро запишет эти изменения на диск в процессе флаша. <em>read()</em> при этом будет возвращать всегда актуальные данные, даже если они еще не записаны на диск, потому что он читает их из кэша.</p>\n<p>Существование кэша страниц объясняется принципом темпоральной локальности, который гласит, что данные, к которым недавно обращались, скорее всего, скоро понадобятся еще раз.</p>\n<p>Если нужно писать/читать с диска в обход кэша, то можно использовать флаг <strong>O_DIRECT</strong> при открытии файла. Обычно это ухудшит производительность, но иногда это оправдано. Например, PostgreSQL использует O_DIRECT для WAL, так как нужно записать в него данные как можно быстрее, иметь гарантии записи и плюс к этому мы знаем, что эти данные не будут вскоре использованы еще раз.</p>\n<h1>RAID</h1>\n<p>Существуют следующие уровни спецификации RAID:</p>\n<h2>RAID 0</h2>\n<p>Дисковый массив повышенной производительности с чередованием, без отказоустойчивости. Строго говоря, RAID-массивом не является, поскольку избыточность (redundancy) в нём отсутствует. Информация разбивается на блки данных фиксированной длины и записывается на диски поочередно, то есть один блок на первый диск, второй на второй и т.д.</p>\n<ul>\n<li>увеличивается скорость считывания файлов</li>\n<li>увеличивается вероятность потери данных</li>\n</ul>\n<h2>RAID 1</h2>\n<p>Зеркальный дисковый массив - массив из 2 или более дисков, являющихся полными копиями друг друга.</p>\n<ul>\n<li>обеспечивает приемлемую скорость записи и выигрыш при чтении при распараллеливании запросов</li>\n<li>имеет высокую надежность - работает, пока функционирует хотя бы один диск</li>\n<li>по цене двух дисков пользователь фактически получает объем одного</li>\n</ul>\n<h2>RAID 2</h2>\n<p>На практике используется очень редко.</p>\n<p>Диски делятся на 2 группы: для данных и для кодов коррекции ошибок, причем если данные хранятся на <code>2^n - n - 1</code> дисках, то для хранения кодов коррекции необходимо <code>n</code> дисков. Суммарное количество дисков будет равняться <code>2^n - 1</code>. Данные распределяются по дискам так же, как и в RAID 0, но разделение идет не по блокам, а по битам. Каждый бит пишется на разный диск. Оставшиеся диски хранят коды коррекции ошибок, по которым в случае выхода какого-либо диска из строя возможно восстановление информации. </p>\n<ul>\n<li>повышение скорости дисковых операций по сравнению с производительностью 1 диска</li>\n<li>минимальное количество дисков, при котором имеет смысл его использовать - 7, где 4 диска будут с данными, а 3 - с кодами коррекции.</li>\n<li>вращение дисков должно быть синхронизировано, чтобы нужной позиции они достигали одновременно. Поэтому невозможно обслуживать несколько запросов одновременно.</li>\n</ul>\n<h2>RAID 3</h2>\n<p>Дисковый массив с чередованием и выделенным диском четности.</p>\n<p>В массиве из <code>n</code> дисков данные разбиваются на куски размером меньше сектора (разбиваются на байты) и распределяются по <code>n-1</code> дискам. Еще один диск используется для хранения блоков четности. </p>\n<p>В RAID 2 использование большего количества дисков с метаданными давало возможность корреции ошибок на лету, однако оказалось что большинству пользователей это не нужно и достаточно простого восстановления информации в случае ее повреждения.</p>\n<ul>\n<li>высокая скорость чтения и записи данных</li>\n<li>минимальное количество дисков равно 3</li>\n<li>хорош только для однозадачной работы с большими файлами, так как время доступа к отдельному сектору, разбитому по дискам, равно максимальному из интервалов доступа к секторам каждого из дисков. Для блоков малого размера время доступа намного больше времени чтения.</li>\n<li>большая нагрузка на контрольный диск, из-за чего его надежность сильно падает</li>\n</ul>\n<h2>RAID 4</h2>\n<p>Пожох на RAID 3, но отличается тем, что данные разбиваются на блоки, а не на байты. Таким образом удалось победить проблему низкой скорости передачи данных небольшого объема.</p>\n<p>Запись же производится медленно из-за того, что чётность для блока генерируется при записи и записывается на единственный диск.</p>\n<h2>RAID 5</h2>\n<p>Основным недостатком уровней RAID от 2-го до 4-го является невозможность производить параллельные операции записи, так как для хранения информации о чётности используется отдельный контрольный диск. RAID 5 не имеет этого недостатка. Блоки данных и контрольные суммы циклически записываются на все диски массива, нет асимметричности конфигурации дисков. Под контрольными суммами подразумевается результат операции XOR (исключающее или). Xor обладает особенностью, которая даёт возможность заменить любой операнд результатом, и, применив алгоритм xor, получить в результате недостающий операнд. Например: a xor b = c (где a, b, c — три диска рейд-массива), в случае если a откажет, мы можем получить его, поставив на его место c и проведя xor между c и b: c xor b = a. Это применимо вне зависимости от количества операндов: a xor b xor c xor d = e. Если отказывает c, тогда e встаёт на его место и, проведя xor, в результате получаем c: a xor b xor e xor d = c. Этот метод по сути обеспечивает отказоустойчивость 5 версии. Для хранения результата xor требуется всего 1 диск, размер которого равен размеру любого другого диска в RAID.</p>\n<p>Минимальное количество используемых дисков равно трём.</p>\n<ul>\n<li>\n<p>получил широкое распространение, в первую очередь благодаря своей экономичности. Объём дискового массива RAID 5 рассчитывается по формуле <code>(n-1)*hddsize</code>, где n — число дисков в массиве, а hddsize — размер диска (наименьшего, если диски имеют разный размер). Например, для массива из четырёх дисков по 80 гигабайт общий объём будет <code>(4 − 1) * 80 = 240 гигабайт</code>, то есть «потеряется» всего 25 % против 50 % RAID 10. И с увеличением количества дисков в массиве экономия (по сравнению с другими уровнями RAID, обладающими отказоустойчивостью) продолжает увеличиваться.</p>\n</li>\n<li>\n<p>RAID 5 обеспечивает высокую скорость чтения — выигрыш достигается за счёт независимых потоков данных с нескольких дисков массива, которые могут обрабатываться параллельно.</p>\n</li>\n<li>\n<p>Производительность RAID 5 заметно ниже на операциях типа Random Write (записи в произвольном порядке), при которых производительность падает на 10-25 % от производительности RAID 0 (или RAID 10), так как требует большего количества операций с дисками (каждая операция записи, за исключением так называемых full-stripe write-ов, заменяется на контроллере RAID на четыре — две операции чтения и две операции записи).</p>\n</li>\n<li>\n<p>При выходе из строя одного диска надёжность тома сразу снижается до уровня RAID 0 с соответствующим количеством дисков n-1 — то есть в n-1 раз ниже надёжности одного диска — данное состояние называется критическим (degrade или critical). Для возвращения массива к нормальной работе требуется длительный процесс восстановления, связанный с ощутимой потерей производительности и повышенным риском.</p>\n</li>\n</ul>\n<h2>RAID 6</h2>\n<p>RAID 6 — похож на RAID 5, но имеет более высокую степень надёжности — три диска данных и два диска контроля чётности. Основан на кодах Рида — Соломона и обеспечивает работоспособность после одновременного выхода из строя любых двух дисков. Обычно использование RAID-6 вызывает примерно 10-15 % падение производительности дисковой группы, относительно RAID 5, что вызвано бо́льшим объёмом работы для контроллера (более сложный алгоритм расчёта контрольных сумм), а также необходимостью читать и перезаписывать больше дисковых блоков при записи каждого блока.</p>\n<h2>RAID 10</h2>\n<p>массив RAID 0, построенный из массивов RAID 1</p>\n<h2>RAID 01</h2>\n<p>массив RAID 1, построенный из массивов RAID 0 (имеет низкую отказоустойчивость)</p>\n<h2>Сравнение уровней RAID</h2>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/221b5/raid-comparison.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 33.903301886792455%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAABJklEQVQoz41Q2ZKEIBDz/z9xZ3ZmHUAUD1TA8yGbRmufl6oUpEmHNIWuGhjC1i10VcNYh64f8f36gTIW3TChVAYV741t0HYeSlv4MWTUrsPj+ea9y7xQhqLeY5oD5hC5R6R1Q92IYEJMKxrXoh9G4tLV5As1MS0M0uDDB01lMy9KZVmUVMMf4rKi/Ci4tke4m9quJ+8wTnPmoplDuns8J/GZ54RSkHQiFsjrAxOJILFR0kn9Srxg8GPWCLSp8PV4MqXO2kJVDr2/hBNNxTgbsibnkA0mGobbdEbDpKIPMeVxX+8yTyTfUchYTv6I0fs7fkySUPaE4zwRaCwGkQbLumJk0uM4se17No03tm1HYa2FVgrGGGiteSa0QYoRBxt24jwO/Hf9AjwcFCbjlF94AAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="RAID levels comparison"\n        title=""\n        src="/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/10273/raid-comparison.png"\n        srcset="/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/9b14a/raid-comparison.png 163w,\n/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/94962/raid-comparison.png 325w,\n/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/10273/raid-comparison.png 650w,\n/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/2fc6f/raid-comparison.png 975w,\n/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/a8a2c/raid-comparison.png 1300w,\n/hows-that-again/static/aca3cef5f8b740921cd09bfdcc0cdf1f/221b5/raid-comparison.png 1696w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>',frontmatter:{path:"/blog/hardware/disk",title:"disk"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-hardware-disk-306e6d689cb622b49051.js.map