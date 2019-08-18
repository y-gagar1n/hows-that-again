webpackJsonp([38855089869933],{450:function(a,n){a.exports={data:{markdownRemark:{html:'<h1>Иерархия памяти</h1>\n<p>Сегодня существуют 4 основных технологии памяти. Основная память использует DRAM (dynamic random access memory), кэши процессора используют SRAM (static random access memory). DRAM намного дешевле, но и намного медленнее, чем SRAM. Разница в цене возникает из-за того, что SRAM использует намного большую площадь для каждого слова памяти, то есть намного меньшую плотность хранения данных.</p>\n<p>Третья технология - флэш-память. Обычно используется как вторичная память в мобильных устройствах. И, наконец, четвертая - магнитные диски. В этой статье диск не рассматривается</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">Latency Comparison Numbers (~2012)\n----------------------------------\nL1 cache reference                           0.5 ns\nBranch mispredict                            5   ns\nL2 cache reference                           7   ns                      14x L1 cache\nMutex lock/unlock                           25   ns\nMain memory reference                      100   ns                      20x L2 cache, 200x L1 cache\nCompress 1K bytes with Zippy             3,000   ns        3 us\nSend 1K bytes over 1 Gbps network       10,000   ns       10 us\nRead 4K randomly from SSD*             150,000   ns      150 us          ~1GB/sec SSD\nRead 1 MB sequentially from memory     250,000   ns      250 us\nRound trip within same datacenter      500,000   ns      500 us\nRead 1 MB sequentially from SSD*     1,000,000   ns    1,000 us    1 ms  ~1GB/sec SSD, 4X memory\nDisk seek                           10,000,000   ns   10,000 us   10 ms  20x datacenter roundtrip\nRead 1 MB sequentially from disk    20,000,000   ns   20,000 us   20 ms  80x memory, 20X SSD\nSend packet CA-&gt;Netherlands-&gt;CA    150,000,000   ns  150,000 us  150 ms\n\nNotes\n-----\n1 ns = 10^-9 seconds\n1 us = 10^-6 seconds = 1,000 ns\n1 ms = 10^-3 seconds = 1,000 us = 1,000,000 ns</code></pre></div>\n<h2>SRAM</h2>\n<p>На один бит используется 6-8 транзисторов. </p>\n<p>Данные хранятся по принципу "остаточной информации", то есть им не требуется обновление, как в DRAM. Именно поэтому эта память называется статической. Тем не менее, SRAM все еще энергозависимая память и данные будут потеряны при отключении энергии. Но энергии при этом требуется минимальное количество.</p>\n<p>Является истинной памятью с произвольным доступом, так как доступ к любому биту осуществляется за одинаковое время.</p>\n<p>Особенностью является непредсказуемое (произвольное) содержимое памяти после включения питания.</p>\n<p>Широко используется в качестве регистров и кеш-памяти в процессорах.</p>\n<h2>DRAM</h2>\n<p>В DRAM значение хранится как заряд конденсатора. Для чтения или записи заряда используется 1 транзистор на бит. Так как конденсатор разряжается с каждым чтением, то его нужно периодически обновлять - читать данные и перезаписывать без изменений. Именно поэтому такой вид памяти называется динамическим.</p>\n<p>Обновление должно происходить каждые 64 мс. Чтобы избежать одной крупной остановки, процесс разделен на 8192 меньшие операции, по количеству строк. Интервал между ними равен 64 мс / 8192 = 7,81 мкс. После каждой такой мелкой операции обновляется 1 строка памяти.</p>\n<p>Длительность регенерации в конденсаторе - несколько миллисекунд. Данные обновляются не по одному биту, а целыми линиями за 2 такта - такт чтения и такт записи.</p>\n<p>Регенерация существенно тормозит работу системы, поскольку во время ее осуществления обмен данными с памятью невозможен.</p>\n<p>На схеме изображена внутрення организация DRAM:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/2503fc38f45a71c91b881709f4141772/23a6c/dram-internal-organization.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 543px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 35.72744014732965%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAAA+UlEQVQoz2WRyY7DMAxD/f//17kF6OSQyb7H2aPqqWMgRQUQEpSYpGknWt578dMk+75L2zTSti1rua7LwPe6rqWqKqkVURRJkiTS6L/s8jyXYRjsjDvPU+I4lp/HQ/quk3meJf1Lpe97CcWuUxF2HLT+P4/jaB1y/nMo4goHZVGYA+YsTc0pM4eZAY4g7FQcrOtq2LbNbmIOQ23rZooIFEqeZZmUZWlAILjCiUEJ7gWXC1mFjjoEk2YKacju9/l8u1VCP/l37oqQM3Uch7iwuJNCwHWIgMC5DiJkjOCyLCYIPgj1Ub8chk4u90KdOAoV4IVxSgTBKSCGF4K2HNKeIZEvAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="DRAM internal organization"\n        title=""\n        src="/hows-that-again/static/2503fc38f45a71c91b881709f4141772/23a6c/dram-internal-organization.png"\n        srcset="/hows-that-again/static/2503fc38f45a71c91b881709f4141772/39162/dram-internal-organization.png 163w,\n/hows-that-again/static/2503fc38f45a71c91b881709f4141772/808fe/dram-internal-organization.png 325w,\n/hows-that-again/static/2503fc38f45a71c91b881709f4141772/23a6c/dram-internal-organization.png 543w"\n        sizes="(max-width: 543px) 100vw, 543px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Память DRAM разделена на несколько банков (4 для DDR3), каждый банк состоит из набора линий.</p>\n<h3>Адресация</h3>\n<p>На этой схеме изображен принцип адресации в DRAM:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/5309aa96e8293b7d1582fcadbfb373be/5180e/dram-addressing.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 392px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 104.08163265306123%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAIAAADJt1n/AAAACXBIWXMAAAsSAAALEgHS3X78AAAC/0lEQVQ4y12UW2/bRhCF9eP7WMSpHxLAlpPnGAhSI4FfUqBtLnISxAiQwrEEXSmJ4mV3eRFFijdx+5HrOkYHEjFanjNnzuyuelrrQAdf9BeRiWyXqUDtdrvtdpumaRAED/OkC1Z41nUNsWfIg3IQ17ESajwel2V5OBxADIdDngDyPGfd9/2maaCtu7gjhzo8HZyuw3We5fv9frPZUD4Mw6IoHMeJ4ziKItZlF5RLuwDWktVBPfnziR3auovpdAoINDmI5XJpcmjoU9fA6KsjN6o/6E/dabEvKGlklVJwyJEVQmRZxiv8e55HTv9VVbVkWcmnfz+1pBWqcDwZ4wocoMlkApnmIc9mM568oinawX/r+eb7zQ/nx/nwfO7PkyhBB004IOgTAoVc10WTnBXIBkP0vn39dj277l/118HamEHkoefVamVy+IzDzJ/Af6/ICmfvHF0eMW2zynhRRpCcxPwkp39mcU9ulVvPtTy7Opt781CG+ATEkbj3jCAO5/M57TAqtwsq/tzni8WFJawoiOyNTW2z24CoQi1DoAQ5JUjYfwrdKR+/PV74i7qs2YPRaMRsmAqvLMvCM922MCnxSTk2ibHf3t62ZL/0X01euYmrG21ARtwMCTQi5pCiaWZB0Et3SLT6rD/P/Nluu/P89gxAEF2YQwKHimZycFhB/M5zrnNPe37gSyHZDIwhiyv2DGVwZmA8uTAM2bZtLgYGe3zvRi8lR7MsCnxiUogWCoqET1WVUoqNbSsluD1YoFxP/xdxkphCK3sTcI3ynFyowPE8wORpllmrdZJmBr9YLHr0QBnhe1vbOkSiiUQVuKV0Mm/dxLJULp9ksySvQ79QbuouddnW4tr3Pl1dqSCcjW6r6z9uzk/fnT766+TXf16cfH9xcnn8y+D54+HLZx/OjgbPf/v47PG7/qP0/YUOvbZDPDMARrKN2z+SOpK59FLh7qV72AbefOxMR00SFQpNP1deJtxDLHVVdtzmp+f/RV4Ury8vf3/9JuvM38/1YfwL6ruN8GY50BMAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="DRAM addressing"\n        title=""\n        src="/hows-that-again/static/5309aa96e8293b7d1582fcadbfb373be/5180e/dram-addressing.png"\n        srcset="/hows-that-again/static/5309aa96e8293b7d1582fcadbfb373be/3dbf4/dram-addressing.png 163w,\n/hows-that-again/static/5309aa96e8293b7d1582fcadbfb373be/6d902/dram-addressing.png 325w,\n/hows-that-again/static/5309aa96e8293b7d1582fcadbfb373be/5180e/dram-addressing.png 392w"\n        sizes="(max-width: 392px) 100vw, 392px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>В каждой ячейке памяти хранится 1 слово данных (4 байта).</p>\n<p>В DRAM поступает адрес слова, верхняя половина битов адреса идет на вход демультиплексора RAS, а нижняя - на сигналы управления мультиплексором CAS. На выходе Data получается 1 слово.</p>\n<h3>Технические детали адресации</h3>\n<p>У памяти DRAM есть 4 основных временных характеристики:</p>\n<table>\n<thead>\n<tr>\n<th>Имя параметра</th>\n<th>Обозначение</th>\n<th></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CAS-латентность</td>\n<td><strong>CL</strong></td>\n<td>Задержка между отправкой в память адреса столбца и началом передачи данных. Время, требуемое на чтение первого бита из памяти, когда нужная строка уже открыта.</td>\n</tr>\n<tr>\n<td>Row Address to Column Address Delay</td>\n<td><strong>RCD</strong></td>\n<td>Число тактов между открытием строки и доступом к столбцам в ней. Время, требуемое на чтение первого бита из памяти без активной строки — RCD + CL.</td>\n</tr>\n<tr>\n<td>Row Precharge Time</td>\n<td><strong>RP</strong></td>\n<td>Число тактов между командой на предварительный заряд банка (закрытие строки) и открытием следующей строки. Время, требуемое на чтение первого бита из памяти, когда активна другая строка — RP + RCD + CL.</td>\n</tr>\n<tr>\n<td>Row Active Time</td>\n<td><strong>RAS</strong></td>\n<td>Число тактов между командой на открытие банка и командой на предварительный заряд. Время на обновление строки. Накладывается на RCD. Обычно примерно равно сумме трёх предыдущих чисел.</td>\n</tr>\n</tbody>\n</table>\n<p>RCD обычно в несколько раз больше CL, поэтому обращение к строке - это самая длительная операция.</p>\n<p>Модули DDR обычно описываются в следующей нотации: w-x-y-z-T. Например, 2-3-2-8-T1. Это означает:</p>\n<ul>\n<li>w 2 CL</li>\n<li>x 3 RCD</li>\n<li>y 2 RP</li>\n<li>z 8 RAS</li>\n<li>T T1 частота команд</li>\n</ul>\n<p>Используя эти 5 констант, можно посчитать производительность модуля памяти.</p>\n<p>На следующей схеме изображен процесс чтения из памяти:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/b4154a61ce4dbec8ae13deffda558603/9d07a/sdram-read-timing.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 412px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 60.922330097087375%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAACXBIWXMAAAsSAAALEgHS3X78AAACGElEQVQoz02Q7W+aUBjF/f//in1asiydW+qqgPIiL5d7UbBiZ1vbFahVeRNFEBXh7iKm2ZOTX86Xk3PyNMqy9AM/3aWLeMH4DB/x9Lo39IWg+yOSWiF38y5yPzn/VtzUbHJeS9o0WZcZHBskvFqtQj8MsgAVCKQKxIPRWiqGvRRSpcF4UGGNnIJ71jh3LqRgyo2Kjrpv5Hk+fZzab3ZwCPgtL277QirpnpDKdzFop0prCfptJW4ru1p3xIOaSQNfLj/m882c3/HaGUGsmbFSDnpng8MGszUQZxRsLZ2wvLAy1WzHcbyV56WelEpi3BcyaZqgQutulbs9+F01g91VpBwkV5LmoijCMIzCiMyWDzLIFD4RwbwbCbeJ2jmitodkGu2pWpAwuxJl19m4xH7mq2fVKHUN63oonCBdmn08ZmNz2DdLfowFE/Pj8pNEDe9yrusuFouJOxEzUY1Va2kHTxPSnA8oH5LmrK6iIOHhSnRo1ElyHx9z/X0k7iWYqk/24/JBT7o3R/GXR8LVzn01HqafpP+fvYhXrbn2RZ59/fMI3thTt4np75j5toMyOzj3RrhnYNaoWHvCKhzv4s06cpOQ2wDWU5i1OlgpB0CnGnNAHQ+whumohjUc22hkD8a2du9o99bQdKrwOlq7S498G5xkeASgAPcb8QipDNEnRAWQff3rmA8vzy/WZPo6e7Eepq9PM+t5Zv0D/qpk8wxkHuUAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="SDRAM Read Timing"\n        title=""\n        src="/hows-that-again/static/b4154a61ce4dbec8ae13deffda558603/9d07a/sdram-read-timing.png"\n        srcset="/hows-that-again/static/b4154a61ce4dbec8ae13deffda558603/68efb/sdram-read-timing.png 163w,\n/hows-that-again/static/b4154a61ce4dbec8ae13deffda558603/2f5dd/sdram-read-timing.png 325w,\n/hows-that-again/static/b4154a61ce4dbec8ae13deffda558603/9d07a/sdram-read-timing.png 412w"\n        sizes="(max-width: 412px) 100vw, 412px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>В SDRAM такты синхронизированы с тактами процессора. Обычно один такт памяти соответствует нескольким тактам процессора. Такты памяти - это верхняя строчка CLK. Сигналы читаются на восходящем краю такта. </p>\n<ol>\n<li>Сначала на адресную шину подается старшая половина адреса и на RAS подается 0. После этого чип RAM начинает активировать указанную строку.</li>\n<li>Ждем задержку RCD прежде чем к столбцам строки можно будет получить доступ</li>\n<li>Теперь на ту же шину данных подаем младшую половину адреса, а на CAS подаем 0. </li>\n<li>Ждем задержку CL прежде чем из памяти будет прочитан первый бит.</li>\n<li>Биты пошли на выход DQ со скоростью 1 слово за такт. Если бы это была DDR, то было бы 2 слова за такт.</li>\n</ol>\n<p>Было бы расточительно проводить столько предварительной работы для чтения каждого бита, поэтому контроллеру памяти можно указать, сколько слов надо прочитать. Обычно это 2, 4 или 8 слов. Это позволяет заполнять целые линии кэша без новой адресации. </p>\n<p>Также мы видим, что читать последовательные данные быстрее, потому что нужно изменять только CAS, а RAS можно оставлять нетронутым.</p>\n<p>После того, как мы прочитали нужные слова, нам нужно обратиться к другой области памяти. Прежде чем будет отправлен новый RAS, нужно пройти этапы Precharge и Activation.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/08bc43baae2f133995cdf89a9b3f186d/9d07a/sdram-precharge-activation.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 412px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 68.44660194174756%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAIAAACgpqunAAAACXBIWXMAAAsSAAALEgHS3X78AAAC7ElEQVQozx2R6W/aaBCH+b+rqkFdNUq3W6lVW2m3K7Vq0mQdSnAIV/36xPeBuXI4BEFCgovBscFgCNj4Xbuj0Xx7NDPPLxVF0diyHHfq/HoYUzmbPrWpE5utnJIjlLZReoKS1rdXJ1+ffSudl4kpgVsAc4ib2tmMyqcghJPx2HacYO5u6+Raw2GDXNdZthXi+pZoREB5yr0njv/I8g+CAmV1owhb2e4yUMUT+H4w6PZ6M8t02YLDFlz2bMZj6Gf24B2e+8rHvZ9G9l8cYVeguqjSjzTpMf1mZc4UEjgMgy2Eke/BBhXVqXizzRQzu5ns7mnlEwB/E+ibYv5tWTClGqxpW1WGmtNnYY1MhWHY6XQeTNMb/5qL5ZlQWkilpUyge+j+8+8Hzw+TTiOZXVR4ENkly06rtM/en4MlV0rFwpa+vw6CwHNDnYzfDnXcooqZf5jcv3L+i5r/omT2zg52/gMGEAIh3ixGyuSGgRqRwJZl2Y4LV4uoQcXCwhpYqBShr/F6RDS2eC3IvgPIyx90n1GhIq3E+Gz3lk+ExfBoNLq7v3eGgzGNulxhIRQdAVSEaZGflwSvyE2P/iwcphGyS7ErlnGZOKquXpxSp4mwuCIIfdvaqD9hqwpb9KYtcu0t04LVNmSaYf4jjaSzzKBah3ozanCBNLz4mQiz7Thjx3Vd0xwOm8pKwwMd9xWK0FaYtgHaGigr5K8SfUJf3V1Kc4nfcE272e9ceTqTMk1zMBj8nne37ZqHZ32QcRUSE2dl0a9Ii4ow//76jC9yxq3BjHhyRtfNete4eFSp32dHUZK2bUV8AWI/IIZsZJKWV1gtwnWIKZv8BxrZyeJd7vjaOFA65ce6dU1CnUxg13FG48l65mwU7EkDgQaWCq43e63LodK4PTeGx2/yyMsTYPD0XCEnMu6qwwsmkrEEnnueNZksbMuXKguxvBRLMwmcX1xfGv1G+8a47h29zh2mj6keKQac4FfZNTu8BE9c6X/U/rDKuo0gQAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="SDRAM precharge and activation"\n        title=""\n        src="/hows-that-again/static/08bc43baae2f133995cdf89a9b3f186d/9d07a/sdram-precharge-activation.png"\n        srcset="/hows-that-again/static/08bc43baae2f133995cdf89a9b3f186d/68efb/sdram-precharge-activation.png 163w,\n/hows-that-again/static/08bc43baae2f133995cdf89a9b3f186d/2f5dd/sdram-precharge-activation.png 325w,\n/hows-that-again/static/08bc43baae2f133995cdf89a9b3f186d/9d07a/sdram-precharge-activation.png 412w"\n        sizes="(max-width: 412px) 100vw, 412px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>На схеме выше изображен наш предыдущий процесс чтения данных, начиная с сигнала CAS. </p>\n<p>Команда Precharge здесь посылается как только началось чтение, но это только потому что она время RP (3 такта) больше времени, необходимого для чтения (2 такта). Чтение данных и prefetch могут пересекаться, но в нашем случае после завершения чтения пришлось подождать еще 1 такт. После завершения задержки RP можно начинать процесс адресации сначала, с установки битов строки.</p>\n<p>Есть еще один важный тайминг: <strong>RAS</strong>. Он определяет минимальное время между открытием строки и командой Prefetch. Этот тайминг обычно довольно большой (в 2-3 раза больше RP) и может затормозить нам чтение, если мы завершаем чтение в строке через несколько тактов и хотим отправиться к другой строке. Тогда придется сначала закрыть текущую строку, то есть послать команду precharge, а для этого может понадобиться подождать пару тактов (пока не пройдет RAS).</p>\n<h3>Типы памяти</h3>\n<h4>SDR</h4>\n<p>Данные отправляются 1 раз за такт. Если частота работы шины равна 100МГц, то шина может передавать 100 МБит в секунду.</p>\n<h4>DDR1</h4>\n<p>Данные посылаются на росте и на спаде сигнала в такте, то есть 2 раза за такт. Чтобы это было возможным, нужно встроить буфер. Этот буфер работает как SRAM и содержит 2 бита для каждой линии, а шина данных состоит из 2 линий. При чтении любой ячейки памяти осуществляется "предзагрузка" (prefetch) следующей ячейки и в буфер кладутся сразу две.</p>\n<p>Так как частота не изменилась, то новой качественной характеристикой стало количество данных в секунду. Например, если DDR1 модуль имеет частоту 100 МГц и 64-битную шину (на самом деле шина всегда 64-битная), то такой модуль может передавать: </p>\n<p><code class="language-text">100 МГц * 64 бит * 2 = 1600 МБайт/сек</code></p>\n<p>Поэтому модуль DDR с частотой 100 МГц называется PC1600.</p>\n<h4>DDR2</h4>\n<p>На этот раз удвоили частоту шины. Для этого пришлось буферу сохранять не 2, а 4 бита в каждом такте. Префетч составил 4 слова. Итоговые задержки выше, чем у DDR, поэтому поначалу общая производительность была не выше, чем у DDR. Конкурентноспособной память стала только через 4 года, когда появились модули с малыми задержками.</p>\n<h4>DDR3</h4>\n<p>Опять удвоили частоту шины и размер буфера. Теперь минимальный размер чтения/записи составляет 8 последовательных слов. Задержки опять увеличились по сравнению с DDR2.</p>\n<h3>DDR4</h3>\n<p>На этот раз не стали трогать размер предзагрузки слов, а вместо этого удвоили количество внутренних банков, что позволило увеличить частоту шины. В перспективе пропускная способность может достигать 25,6 ГБ/с (если частота будет повышена до 3200 МГц). Кроме того, повышена надёжность работы за счёт введения механизма контроля чётности на шинах адреса и команд.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/42abe2d46635f7f5e2eef6266142e32d/22dae/ram-types-comparison.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 29.18238993710692%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAGABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB2KFB/8QAFBABAAAAAAAAAAAAAAAAAAAAEP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAFBABAAAAAAAAAAAAAAAAAAAAEP/aAAgBAQAGPwJ//8QAGRAAAQUAAAAAAAAAAAAAAAAAAAEQMUGB/9oACAEBAAE/IawWW//aAAwDAQACAAMAAAAQ88//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/ED//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/ED//xAAZEAEAAgMAAAAAAAAAAAAAAAABADERofD/2gAIAQEAAT8QXA5cWjG6J//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="DDR Comparison"\n        title=""\n        src="/hows-that-again/static/42abe2d46635f7f5e2eef6266142e32d/b80fa/ram-types-comparison.jpg"\n        srcset="/hows-that-again/static/42abe2d46635f7f5e2eef6266142e32d/cf410/ram-types-comparison.jpg 163w,\n/hows-that-again/static/42abe2d46635f7f5e2eef6266142e32d/62f2a/ram-types-comparison.jpg 325w,\n/hows-that-again/static/42abe2d46635f7f5e2eef6266142e32d/b80fa/ram-types-comparison.jpg 650w,\n/hows-that-again/static/42abe2d46635f7f5e2eef6266142e32d/22dae/ram-types-comparison.jpg 795w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h3>DIMM</h3>\n<p>Память для серверов обычно продается в форм-факторе <strong>DIMM (dual inline memory module)</strong>. DIMM обычно состоит из 4-16 модулей DRAM, которые обычно имеют линии шириной 8 байт. </p>',frontmatter:{path:"/blog/hardware/ram",title:"RAM"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-hardware-ram-5a3202a5e17f7bf17eb9.js.map