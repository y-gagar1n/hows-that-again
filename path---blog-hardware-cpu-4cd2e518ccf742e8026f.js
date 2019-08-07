webpackJsonp([0x782e01d4a0fe],{446:function(n,t){n.exports={data:{markdownRemark:{html:'<p>Источники:</p>\n<ul>\n<li><a href="https://3dnews.ru/969891">https://3dnews.ru/969891</a></li>\n</ul>\n<h1>Зачем уменьшать техпроцесс?</h1>\n<ol>\n<li>Чтобы больше чипов умещалось на кристалле</li>\n<li>Чтобы уменьшить энергопотребление и теплоотдачу чипов</li>\n</ol>\n<p>В 2018 текущий техпроцесс современных процессоров - 14 нм</p>\n<h1>Intel</h1>\n<h2>Стратегия Тик-так</h2>\n<p>В сентябре 2006 года Intel объявил о своей новой стратегии разработки микропроцессоров, называемой Тик-так.</p>\n<p>Цикл разработки делится на две стадии — «тик» и «так»:</p>\n<p><strong>«Тик»</strong> означает уменьшение технологического процесса на основе существующей микроархитектуры.</p>\n<p><strong>«Так»</strong> означает выпуск микропроцессоров с новой микроархитектурой на основе существующего технологического процесса.</p>\n<p>По планам Intel, каждая часть цикла должна занимать примерно год.</p>\n<p>В 2016 году стратегия была изменена. Теперь Тик – это Процесс, а Так – Архитектура и Оптимизация.</p>\n<h2>Современные микроархитектуры</h2>\n<p>Последней широко используемой (на 4 кв. 2018) микроархитектурой является Coffee Lake.</p>\n<table>\n<thead>\n<tr>\n<th>Поколение Core</th>\n<th>Кодовое имя</th>\n<th>Техпроцесс</th>\n<th>Этап разработки</th>\n<th>Время выхода</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>Nehalem</td>\n<td>45 нм</td>\n<td>Так (Архитектура)</td>\n<td>4 кв. 2008</td>\n</tr>\n<tr>\n<td>1</td>\n<td>Westmere</td>\n<td>32 нм</td>\n<td>Тик (Процесс)</td>\n<td>4 кв. 2010</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Sandy Bridge</td>\n<td>32 нм</td>\n<td>Так (Архитектура)</td>\n<td>I кв. 2011</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Ivy Bridge</td>\n<td>22 нм</td>\n<td>Тик (Процесс)</td>\n<td>II кв. 2012</td>\n</tr>\n<tr>\n<td>4</td>\n<td>Haswell</td>\n<td>22 нм</td>\n<td>Так (Архитектура)</td>\n<td>II кв. 2013</td>\n</tr>\n<tr>\n<td>5</td>\n<td>Broadwell</td>\n<td>14 нм</td>\n<td>Тик (Процесс)</td>\n<td>II кв. 2015</td>\n</tr>\n<tr>\n<td>6</td>\n<td>Skylake</td>\n<td>14 нм</td>\n<td>Так (Архитектура)</td>\n<td>III кв. 2015</td>\n</tr>\n<tr>\n<td>7</td>\n<td>Kaby Lake</td>\n<td>14+ нм</td>\n<td>Оптимизация</td>\n<td>I кв. 2017</td>\n</tr>\n<tr>\n<td>8</td>\n<td>Coffee Lake</td>\n<td>14++ нм</td>\n<td>Оптимизация</td>\n<td>IV кв. 2017</td>\n</tr>\n<tr>\n<td>8</td>\n<td>Cannon Lake</td>\n<td>10 нм</td>\n<td>Тик (Процесс)</td>\n<td>2019</td>\n</tr>\n<tr>\n<td>9</td>\n<td>Coffee Lake Refresh</td>\n<td>14++ нм</td>\n<td>Так (Архитектура)</td>\n<td>2019</td>\n</tr>\n</tbody>\n</table>\n<h3>Nehalem</h3>\n<p>Вместе с релизом микроархитектуры <strong>Nehalem</strong> в ноябре 2008 года, Intel объявила о своей новой схеме именования процессоров Core. Теперь есть 3 варианта - Core i3, Core i5 и Core i7, но имена больше не отражают какие-либо технические характеристики, как, например, количество ядер. Вместо этого они означают низко-производительные (i3), средне-производительные (i5) и высоко-производительные (i7) процессоры.</p>\n<p>В этой микроархитектуре:</p>\n<ul>\n<li>в процессор встроен контроллер памяти DDR3</li>\n<li>встроен контроллер шины PCI Express</li>\n<li>появился разделяемый L3-кэш</li>\n</ul>\n<h3>Sandy Bridge</h3>\n<p>Почти все основные черты, присущие современным массовым CPU от Intel вошли в обиход именно со 2 поколением и архитектурой <strong>Sandy Bridge</strong>.</p>\n<p>В этой микроархитектуре:</p>\n<ul>\n<li>появился отдельный кеш нулевого уровня для декодированных микроопераций</li>\n<li>появился физический регистровый файл, снижающий энергозатраты при работе инструкций ветвления</li>\n<li>впервые встроено полноценное графическое ядро</li>\n<li>для соединения ядер и "внеядерных" частей внедрена масштабируемая кольцевая шина, применяемая по сей день</li>\n<li><strong>самое главное</strong>: впервые реализован подход унифицированная система-на-чипе, которая может быть использована и на десктопе и не сервере и на мобильных устройствах</li>\n</ul>\n<p>На уровне архитектуры:</p>\n<ul>\n<li>появилась поддержка инструкций AVX (Advanced Vector Extensions), предназначенных для работы с 256-битными векторами</li>\n<li>кардинальные изменения в branch prediction. Оптимизированы алгоритмы и увеличены буферы, благодаря чему процент миссов сокращен почти вдвое.</li>\n</ul>\n<p>Последняя модель - Core i7 2700K с частотой 3,5 ГГц.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/2eaa166bb670096a485fe7f9e5abb09e/f6f42/sandy-bridge-scheme.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 78.625%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAIAAACZeshMAAAACXBIWXMAAAsSAAALEgHS3X78AAACwElEQVQoz11TaY/bNhD1//8lQYCmX7YoghZoF0V2m63X69qSZcuy7pOnSJESqbOUs0iLDh6I4ZCP8zgcbpgQwzRNQz8O/TQO0zCM44rpjnF4dwy+W9/36m6bHiEJcYxYhXmOWImbErMK4gzWCagBIjmkCWA5IAghTCjEuO265W4bvd+LJMtJE5fUDoETQycCeQUzQMMClwBVhKWIpxUhCHhh9tUOvDhXECxKb9TppAlRnTRJ3Kj0ksqNy4bzoVffjjfXWUbddV1Q0luGDRAXzeGw+P6ms6xFigTxpCIFwEZqXkIrQlmeb19ff3p4oFzeUnBNgBOWVlAYn7VSe9d/yVR2BWKI8gKbkWWQN5xd3Yt9PMhW+wUJq7UEYVlD2mDRXneOwmSjbbupQAExJbimFEBECWU1NeLN/XPMTYTXtKYEYdysDvXiwsmw6KdN7zisKL9YfgEJofXz0SOUQlI/7i5BBrykfLFuUoi4ANuTL4Tw03LnBK0Ua7X70yn1470bLctcN/Ivy5ungTDxtD8v8zSN4/Z0C3IcpcXT4SbbTkq5tW9K93eybYfX8Ienc5QD8zAffjtsz5GfFA/PzjUuTfAclUcvrSB5OcWUsV5rRGrTVvM8bwbbOp/8n9+iNzfxUrjzymcnDTPwy1v447P3eRf0Wl0uZ5PHdd227Tjnge+bqeFvlHXc7y9/2PGvr9coA4LXjBLOG6MzK0AJ1zpBUF2Cwig6+rmfVqCqtNar7O547Fk9ToPWSnVt18pOCtX3wzxLpVqtRrOr4fr3x1yOpnn7waysmt/JPE4D3OVExFBEUASAjZxPhPxthbGfLaweMOZhTITCTDBhMnTme9zJUraNwLxloiVcklqgrh8fH+dPn5o/X7rt6/Lxo3764tcqzImXETc1/cCNzJVsftbawfO0rEq+4f+2hub5P+677H8ALUJzivh6UrMAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Sandy Bridge"\n        title=""\n        src="/hows-that-again/static/2eaa166bb670096a485fe7f9e5abb09e/10273/sandy-bridge-scheme.png"\n        srcset="/hows-that-again/static/2eaa166bb670096a485fe7f9e5abb09e/9b14a/sandy-bridge-scheme.png 163w,\n/hows-that-again/static/2eaa166bb670096a485fe7f9e5abb09e/94962/sandy-bridge-scheme.png 325w,\n/hows-that-again/static/2eaa166bb670096a485fe7f9e5abb09e/10273/sandy-bridge-scheme.png 650w,\n/hows-that-again/static/2eaa166bb670096a485fe7f9e5abb09e/f6f42/sandy-bridge-scheme.png 800w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h3>Ivy Bridge</h3>\n<p>Относился к фазе "тик", поэтому изменений в микроархитектуре почти нет - только перевод старой микроархитектуры на новый 22-нм чип.</p>\n<p>Были выполнениы косметические переделки микроархитектуры, ускоряющие операции деления и немного повышена эффективноть Hyper-Threading.</p>\n<p>Улучшены "внеядерные" компоненты: контроллер PCI Express получил совместимость с 3 версией протокола, контроллер памяти увеличил возможности и стал поддерживать DDR3.</p>\n<p>Рост производительности по отношению к Sandy Bridge составил 3-5%.</p>\n<p>Последняя модель - Core i7 3770K, с частотой 3,5 ГГц, то есть такая же как и у предыдущего поколения. Но зато уменьшилось энергопотребление.</p>\n<p>Также уменьшились возможности для разгона, так как начиная с этой модели перестала использоваться бесфлюсовая пайка и произошел переход на термопасту.</p>\n<h3>Haswell</h3>\n<p>Основное:</p>\n<ul>\n<li>IPC (instructions per cycle) вырос на треть</li>\n<li>появилось 2 дополнительных исполнительных порта для целочисленных операций, ветвлений и генерации адресов</li>\n<li>получена совместимость с AVX2, которые благодаря 3-операндным FMA-командам увеличили пиковую пропускную способность вдвое</li>\n<li>увеличена емкость некоторых внутренних буферов</li>\n<li>увеличено окно планировщика</li>\n<li>увеличены регистровые файлы, что улучшило возможности по переупорядочиванию инструкций</li>\n<li>L1- и L2-кеши получили вдвое более широкую шину</li>\n</ul>\n<p>Проблемы:</p>\n<ul>\n<li>оставлена без изменений входная часть исполнительного конвейера</li>\n<li>декодер x86-команд сохранил ту же производительность</li>\n</ul>\n<p>Без использования AVX2-инструкций прирост производительности составил 5-10%.</p>\n<p>Последняя модель Core i7-4770K опять получила 3.5 ГГц</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/a9614823027112a522f41c6d39fc5f14/f6f42/haswell-scheme.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.875%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsSAAALEgHS3X78AAABaUlEQVQoz2XS6Y7CMAwE4L7/swFlxT+0CCTEfZSbAkvZr3FBK62lRo49M56kycqyvFwuq9VqsVjMZrP9fl8URSRiPp+rH4/H2+0m32w2p9Ppfr9XVWXNMKsUNoR+UjxSaAUUE5/Ker2WWK/XK0BDfr3D2OVyqX0+nzFtzcc/HA4mc6SuSK4hf5hUMIEmkwmEFi+Y3A4Gg+8UdBWBa9vhhzA0EGFttLCgpahr5scUSiAzn8wZEHa7HT/b7ZaluCeBZjudTmEwwxF3tjVZZnU2NGTyjI3HY7+AN2hXiGaFcRG6Esjadr/fN9M5h8Ohba/Xow3NrZl047ZVQl3F2JpMCQeZvdFopCqxurzn8xkgoyRFitCKqMlmsmEOn7zF/TMc//z1J0Iu8uaRQMQ7o1qm0OAwfhvRaBmg4ua0VJrJwt2qsqANhK8YT9WJQB0+rIZ6vL+s1Wrled5ut/MUnU7H2k3x9Y7uv1BE/AVHO9spdP/BrgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Haswell"\n        title=""\n        src="/hows-that-again/static/a9614823027112a522f41c6d39fc5f14/10273/haswell-scheme.png"\n        srcset="/hows-that-again/static/a9614823027112a522f41c6d39fc5f14/9b14a/haswell-scheme.png 163w,\n/hows-that-again/static/a9614823027112a522f41c6d39fc5f14/94962/haswell-scheme.png 325w,\n/hows-that-again/static/a9614823027112a522f41c6d39fc5f14/10273/haswell-scheme.png 650w,\n/hows-that-again/static/a9614823027112a522f41c6d39fc5f14/f6f42/haswell-scheme.png 800w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>У Intel появились проблемы с новым техпроцессом, поэтому через год была представлена вторая очередь Haswell, называемая Haswell Refresh или Devil\'s Canyon.</p>\n<p>В этой микроархитектуре благодаря косметическим изменениям в схеме питания и улучшению теплопроводящих свойств термопасты были заметно увеличены тактовые частоты на 22-нм чипе. Старшая модель Core i7-4790K получила 4,0 ГГц.</p>\n<h3>Broadwell</h3>\n<p>В CPU было интегрировано самое мощное на тот момент видеоядро Iris Pro GT3e. Для его работы потребовалось внедрить дополнительный 22-нм кристалл Crystall Well, представляющий собой основанную на eDRAM кеш-память L4. Он был необходим для графядра, но им могли пользоваться и ядра CPU.</p>\n<p>В результате десктопные Broadwell стали единственными массовыми процессорами с 128 МБайт L4-кеш. Правда при этом объем L3-кеша пришлось уменьшить с 8 до 6 МБайт.</p>\n<p>Немного изменена входная часть исполнительного конвейера:</p>\n<ul>\n<li>увеличено окно планировщика</li>\n<li>в 1,5 раза вырос объем таблицы ассоциативной трансляции адресов второго уровня</li>\n<li>добавлен второй обработчик промахов, что позволило обрабатывать по 2 операции преобразования адресов параллельно</li>\n</ul>\n<p>В сушше эти изменения повысили эффективность внеочередного исполнения команд и предсказания сложных ветвлений кода. Попутно улучшены механизмы умножения.</p>\n<p>По итогам производительность увеличена на 5% несмотря на то, что это был этап "Тик".</p>\n<p>Но несмотря на все это, из-за проблем с техпроцессом у этого поколения были очень низкие частоты. Старшая модель Core i7-5775C имела 3,3 ГГц, что было ниже предыдущего поколения на 700 МГц.</p>\n<h3>Skylake</h3>\n<p>Была проведена работа по усовершенствованию слабых мест исходной архитектуры Core:</p>\n<ul>\n<li>увеличены внутренние буфера для более глубокого внеочередного исполнений инструкций</li>\n<li>увеличена пропускная способность кеш-памяти</li>\n<li>усовершенствован блок предсказания переходов</li>\n<li>усовершенствована входная часть исполнительного конвейера</li>\n<li>увеличен темп выполнения инструкций деления</li>\n<li>перебалансированы механизмы исполения операций сложения, умножения, FMA.</li>\n<li>повышена эффективность Hyper-Threading</li>\n</ul>\n<p>В целом производительность повышена на 10%.</p>\n<p>Здесь Intel смогла добиться нормальных тактовых частот - Core i7-6700K получила 4,0 ГГц.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/0fa95ddc8b3e2aba94fa800feda44058/f6f42/skylake-scheme.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 70.875%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAIAAACgpqunAAAACXBIWXMAAAsSAAALEgHS3X78AAABd0lEQVQoz2XSiW7CQAwEUP7/45BASAgk7vu+EmiB0r6sIW3FSFnZXo/HdraS5/n1ev18QwQ/XuBeLpdTQrhZllVut9v3Gx6Ph3hkbLdbAlx2v9/vdrv7/V6O24qPpRgdnGByj8ejCJ1jAllkNIUYT7KS9/t9PB4PBgMZUajdbrdaLZyvhNlsVqvVlsulq6ARKMjK45/P59VqFYWn0+lkMlmv1xTyBGRMOWT+kWMNRGI8Uw2Hw5htNBp1Op3FYoEm53A4hHIMWJD5+K6dlMnSMULQuIKREGtDjlOJJ9npjs/Wm571WXIgbFcEtRZTFAvTz+kF/Ud7bBwtSOWi2VwIakqwICvJUcmcdiaq7fl8bmB504TyL4IStuMsZlagXq/LaDQaaM1ms9frKUGTmrEFZcd0WYLWrgkFuVqt+jdRwkX5JJx62Ww2cqxNId3JUVrOk+yFyKDponyhGtOtuIni5dwTHi/8Pk8OnbBLSN3tdjYvHs/jLwR/AI87HY+4xQ61AAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Skylake"\n        title=""\n        src="/hows-that-again/static/0fa95ddc8b3e2aba94fa800feda44058/10273/skylake-scheme.png"\n        srcset="/hows-that-again/static/0fa95ddc8b3e2aba94fa800feda44058/9b14a/skylake-scheme.png 163w,\n/hows-that-again/static/0fa95ddc8b3e2aba94fa800feda44058/94962/skylake-scheme.png 325w,\n/hows-that-again/static/0fa95ddc8b3e2aba94fa800feda44058/10273/skylake-scheme.png 650w,\n/hows-that-again/static/0fa95ddc8b3e2aba94fa800feda44058/f6f42/skylake-scheme.png 800w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>В целом Skylake можно охарактеризовать как достаточно глубокую оптимизацию исходной архитектуры Core, с таким расчётом, чтобы в дизайне процессора не оставалось никаких узких мест. </p>\n<p>Например, Haswell и Broadwell имели по два порта для исполнения умножений и FMA-операций над вещественными числами, но только один порт предназначался для сложений, что плохо соответствовало реальному программному коду. В Skylake этот дисбаланс был устранён и сложения стали выполняться уже на двух портах. Кроме того, количество портов, способных работать с целочисленными векторными инструкциями, выросло с двух до трёх. В конечном итоге всё это привело к тому, что практически для любого типа операций в Skylake всегда есть несколько альтернативных портов. А это значит, что в микроархитектуре наконец были успешно устранены практически все возможные причины простоя конвейера.</p>\n<p>Заметные изменения затронули и подсистему кеширования: пропускная способность кеш-памяти второго и третьего уровня была увеличена. Кроме того, сократилась ассоциативность кеша второго уровня, что в конечном счёте позволило улучшить его КПД и уменьшить штраф при обработке промахов.</p>\n<p>Существенные перемены произошли и на более высоком уровне. Так, в Skylake вдвое выросла пропускная способность кольцевой шины, которая соединяет все процессорные блоки. Кроме того, в CPU этого поколения обосновался новый контроллер памяти, который получил совместимость с DDR4 SDRAM. А в дополнение к этому для соединения процессора с чипсетом стала применяться новая шина DMI 3.0 с увеличенной вдвое пропускной способностью, что дало возможность реализовать скоростные линии PCI Express 3.0 в том числе и через чипсет.</p>\n<p>Впрочем, как и все предшествующие версии архитектуры Core, Skylake представлял собой ещё одну вариацию на тему изначального дизайна. А это значит, что и в шестом поколении микроархитектуры Core разработчики Intel продолжили придерживаться тактики поэтапного внедрения улучшений на каждом цикле разработки. В целом это – не слишком впечатляющий подход, который не позволяет увидеть какие-то значимые изменения в производительности сразу – при сравнении CPU из соседних поколений. Но зато при модернизации старых систем ощутимый прирост производительности заметить совсем несложно. Например, сама Intel охотно сравнивала Skylake с Ivy Bridge, демонстрируя при этом, что за три года быстродействие процессоров выросло более чем на 30 процентов.</p>\n<p>И в действительности это был достаточно серьёзный прогресс, потому что потом всё стало значительно хуже. После Skylake какое бы то ни было улучшение удельной производительности процессорных ядер прекратилось совсем. Те процессоры, которые представлены на рынке в настоящее время, всё ещё продолжают использовать микроархитектурный дизайн Skylake, несмотря на то, что с момента его появления в десктопных процессорах прошло уже почти три года. Неожиданный простой случился из-за того, что Intel не смогла справиться со внедрением следующей версии полупроводникового процесса с 10-нм нормами. В результате весь принцип «тик-так» рассыпался, вынудив микропроцессорного гиганта как-то выкручиваться и заниматься многократным перевыпуском старых продуктов под новыми именами.</p>\n<h3>Kaby Lake</h3>\n<p>Intel честно говорила, что это уже не "тик" и не "так", а оптимизация предыдущего дизайна. Под оптимизацией понимались улучшения в структуре 14-нм транзисторов, которые открывали возможность увеличения тактовых частот без изменения рамок теплового пакета. Для измененного техпроцесса придуман термин "14+ нм".</p>\n<p>Старшая модель Core i7-7700K получила частоту 4,2 ГГц (4,5 ГГц - в турборежиме).</p>\n<h3>Coffee Lake</h3>\n<p>К 2018 году техпроцесс 10-нм все еще не был внедрени на базе Skylake была выпущена новая разновидность процессоров - Coffee Lake.</p>\n<p>Но говорить о Coffee Lake как о третьем обличье Skylake не совсем правильно. Прошлый год стал периодом кардинальной смены парадигмы на процессорном рынке. В «большую игру» вернулась AMD, которая смогла переломить устоявшиеся традиции и создать спрос на массовые процессоры с числом ядер более четырёх. Внезапно Intel оказалась в роли догоняющей, и выход Coffee Lake стал не столько попыткой заполнить паузу до долгожданного появления 10-нм процессоров Core, сколько реакцией на выход шести- и восьмиядерных процессоров AMD Ryzen.</p>\n<p>В результате впервые число ядер увеличено до 6, но никаких изменений на уровне микроархитектуры введено не было, так что Coffe Lake - это только лишь 6-ядерный Skylake с увеличенным до 12 МБайт L3-кешем (чтобы было по 2 МБ на ядро).</p>\n<p>Старшая модель Core i7-8700K получила частоту 3,7 ГГц, но в турборежиме разгонялся до 4,7 ГГц, то есть почти не замедлился, несмотря на увеличение количества ядер.</p>\n<p>Все это стало возможным благодаря очередному улучшению техпроцесса, который на этот раз назвали "14++ нм". Перекомпоновка полупроводникового кристалла позволили существенно улучшить производительность в пересчёте на каждый затраченный ватт и поднять суммарную вычислительную мощность. Внедрением шестиядерности Intel, пожалуй, смогла совершить даже более значительный шаг вперёд, чем любым из предшествующих тому улучшений микроархитектуры. И сегодня Coffee Lake смотрится весьма соблазнительным вариантом для модернизации старых систем, основанных на предыдущих носителях микроархитектуры Core.</p>\n<h3>Cannon Lake</h3>\n<p>В начале 2018 года Intel наконец анонсировала процессор на 10-нм техпроцессе.</p>\n<p>Из известных улучшений: </p>\n<ul>\n<li>внедрена моддержка инструкций AVX-512</li>\n<li>поддержка памяти LPDDR4</li>\n</ul>\n<p>Пока существует только одна модель мобильного процессора Core i3-8121U с 2 ядрами, 4 потоками и частотой 2,2 ГГц, но без графического ядра. Остальные модели ожидаются в 2019 году.</p>\n<h3>9 поколение</h3>\n<p>В конце 2018 года Intel представила новые процессоры 9-го поколения. Представлена новая линейка - Core i9. Первый представитель - Core i9-9900K имеет 8 ядер, 16 потоков, базовую частоту 3,6 ГГц, турбо частоту 5,0 ГГц. Контроллер памяти по прежнему рассчитан на DDR4-2666. Кэш L3 по прежнему имеет 2 МБ на ядро, то есть в общем 16 МБ кэша. </p>\n<p>Core i7-9700K тоже имеет 8 ядер, но больше не поддерживает Hyper-threading, то есть у него 8 потоков. Базовая частота 3,6 ГГц, турбо - 4,9 ГГц. Кэш L3 впервые сокращен до 1,5 МБ на ядро, то есть при 8 ядрах - 12 МБ кэша L3. </p>\n<p>Так же в процессорах 9-го поколения термопаста будет заменена на пайку, что увеличит возможности для разгона.</p>',frontmatter:{path:"/blog/hardware/cpu",title:"cpu"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-hardware-cpu-4cd2e518ccf742e8026f.js.map