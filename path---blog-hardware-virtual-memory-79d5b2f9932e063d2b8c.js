webpackJsonp([24818581494570],{446:function(a,n){a.exports={data:{markdownRemark:{html:'<p>Источники:</p>\n<ul>\n<li><a href="https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%80%D1%82%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C">https://ru.wikipedia.org/wiki/Виртуальная_память</a></li>\n<li><a href="https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B4%D0%BA%D0%B0%D1%87%D0%BA%D0%B0_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86">https://ru.wikipedia.org/wiki/Подкачка_страниц</a></li>\n<li><a href="https://habr.com/company/intel/blog/238091/">https://habr.com/company/intel/blog/238091/</a></li>\n<li><a href="https://habr.com/post/128991/">https://habr.com/post/128991/</a></li>\n<li><a href="https://habr.com/post/211150/">https://habr.com/post/211150/</a></li>\n</ul>\n<h1>Виртуальная память</h1>\n<p>В системе с виртуальной памятью используемые программами адреса, называемые виртуальными адресами, транслируются в физические адреса памяти компьютера. Эту трансляцию выполняет специальный блок процессора или чипсета, называемый <strong>MMU (memory management unit)</strong>. Для программы основная память выглядит как непрерывное адресное пространство вне зависимости от наличия у компьютера соответствующего объема оперативной памяти. Соотнесением физический и виртуальной памяти, перемещением фрагментов между основным и вторичным хранилищами занимается операционная система.</p>\n<h2>Основные термины</h2>\n<ul>\n<li><strong>Реальный режим работы процессора</strong> - Режим работы процессоров, когда нет виртуальной памяти, а любому процессу доступна вся память компьютера. До появления процессоров 80286 это был единственный режим работы.</li>\n<li><strong>Защищенный режим работы процессора</strong> - Режим работы, использующий механизм виртуальной адресации памяти. </li>\n<li><strong>Своп/подкачка страниц</strong> - механизм виртуальной памяти, когда отдельные неактивные фрагменты памяти перемещаются из ОЗУ на диск, освобождая ОЗУ для загрузки других активных фрагментов памяти. Такими фрагментами являются страницы памяти.</li>\n<li><strong>Страничная память</strong> - Способ организации виртуальной памяти, при котором единицей отображения виртуальных адресов на физические является регион постоянного размера - страница. Типичный размер страницы - 4 КБ.</li>\n</ul>\n<p>Страницы памяти являются минимальной единицей выделяемой памяти, то есть даже запрос на 1 байт от приложения приведет к выделению ему страницы памяти. Пользовательский поток обращается к памяти с помощью адреса виртуальной памяти, который делится на номер страницы и смещение внутри страницы.</p>\n<h2>Принцип работы</h2>\n<p>Процессор преобразует номер виртуальной страницы в адрес соответствующей ей физической страницы при помощи буфера <strong>TLB (translation look-aside buffer)</strong>. </p>\n<p>Если это сделать не удалось, то нужно дозаполнить буфер, обратившись к таблице страниц (т.н. Page Walk), что делает либо сам процессор, либо ОС. </p>\n<p>Если страницы нет в оперативной памяти, то выстреливает событие Page Fault и в процессе его обработки ОС подкачивает страницу с жесткого диска. </p>\n<p>При запросе на выделение памяти ОС может "сбросить" на диск страницы, к которым давно не было обращений.</p>\n<p>Критические данные, такие как код и память ядра или код запущенных программ, обычно не свопятся и всегда находятся в оперативной памяти.</p>\n<h2>MMU</h2>\n<p>Вот так выглядит схема работы процессора с поддержкой виртуальной памяти и блоком MMU, который транслирует виртуальные адреса в физические:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/fee650a66f29b7f52c458db5b601040b/c1a5b/cpu-with-mmu.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 91.50066401062416%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsSAAALEgHS3X78AAAEnklEQVQ4y4VUa2yTVRj+BmFItsx/RvyjCV7A4A+VaPSP/JFgCASj/GBKB+sUJIpAlEuioiIhsAnKLlzWso2NdWxzo1vXretYu3asu7Qr63Vd23UfLe3atVtv2aX9eh5PWwyJJniSJ+85z3mf856c874v09dR9eqIou7QqKKueFLXyndbu/isWcJnLRTmzuyc4qEly8085tLWbZXyvfaeNF88Y+o8qJYJNjAGTdOh5aAGc64+pMJjQMoMrBiAhBFImrJIzzOc4ck6jaUHQFSb3cMUbON/8RiPTVoM2LEyd3+FNYu5ebaPw6Ke89qknNvSwbEmMRfzqrhEaJjz2WWc2yrh4j41Rw/jbLoWTq++xfmmuhOAFVP6tr3MhEbEH1HUIuIfTSZiZoIlK9Gp6kmAHSArMQshSzZiHGkhLmMH4UJDhMQNJDAtJyqZgKxEjCS1OEmW5se5UXqGx9ZdyAz3CUoaa0vhkRRzc/VvkUV5IRrrymCWnMZK+/uA7COIb56Esr8FQVkJEoOH4TD3orbiFKLSPQjUv0388q+5+ppSBBzSQkarEJa0isrBVm3grEcYEizPg/D6eYxd3w6UMUAlA9Hv+6AZliEi+Rjh2legHRajoeI4/JfXwnaUIc6qTVxj/RUEnV2FzP3e6pK7TZex5GjkZuSnScR0A+KWSjjH6rBouARivw55+x/QqJoRs94E/FK4rL24K7qElOsWnLKTZM5YyzXVXcSso6eQsY238SOeASQXRpI0ZVIBZw9xG5rJgqubLAWGyHJwiPgsbSQ41U4Sc2qy7FeSkF1M2Ik7JEnfdFLbSsIeJRd2KzFtEO9lfDbJFwCLWNtWcFcZpAR5QE0+teuQvJGLVHUu5q7kIUSfglSvpdwzSAmzPsnqdVgpZxDr2EHTxgeHrukzhn49b+GROuUfPDMfEO2O+Lv2h2e7iqh9DGlRZOYuL/JQzIsEpE/4jI/0QMTftDs8e//sfMyvSRqHbu9h+Af2rDnG2/7slzHkDW/79aXB/ZUv0ivn/2xHwSkHCoRAgZ1CQ1GZQMFpJwp+nEHBGbp/MIV8y5b9m3u++fP5nYd35fN2fLiGsYy17Ih4lJa4b2A0zsonYml4FdrYI4Uu7lPqaXLrJ3XN49MmsdZn69LHvUp9eo9Cm/aL26XWuLtfF/WpzKaRO7uYB0Oid2miCufZ/srQQ0UW7L2rIba/POxWlDrNkgtGmaDCJhNcc5k6Ly64FRepb3nW515VyKOsoJqKoKtPqB+8/R7ztFFT/sOmbkXdy9YL370zdaxoq0Jy7bUG4bmNTxXRYs8BFlYDMYroatoActM8vc0HUa8KtIuAlh2tjk5COUS9A+ma3ZbRLk/kZjQZhFfTJpHDfMX/lPn+233MiaNFFDzm0vnjmUBVl0/lNlT99MIZwW/PjX6+63XTzq1bSs8eWV9z45f1V8tOZIKWnTua0fyjPcT/5L83pu0sJ211qoaNs3aZODqrbmbHWiTsaHNXzKdq9U/L22n/fCPtM66+ncP835gYEq1KW+1A/WbvVM8A/Ri5yyzpdVkkvbQi+mYdsv7h/to3Hwdd9W/939JkrhzBvnKrAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="CPU with MMU"\n        title=""\n        src="/hows-that-again/static/fee650a66f29b7f52c458db5b601040b/10273/cpu-with-mmu.png"\n        srcset="/hows-that-again/static/fee650a66f29b7f52c458db5b601040b/9b14a/cpu-with-mmu.png 163w,\n/hows-that-again/static/fee650a66f29b7f52c458db5b601040b/94962/cpu-with-mmu.png 325w,\n/hows-that-again/static/fee650a66f29b7f52c458db5b601040b/10273/cpu-with-mmu.png 650w,\n/hows-that-again/static/fee650a66f29b7f52c458db5b601040b/c1a5b/cpu-with-mmu.png 753w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Благодаря такому расположению MMU используется только при промахах кэша, а все остальное время не используется и не тратит электроэнергию.</p>\n<p>Вот что происходит внутри MMU:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/7732db118168dfa876303784faf14670/65d77/inside-mmu.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 78.44228094575799%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAAsSAAALEgHS3X78AAADUUlEQVQ4y5WTz2/UVhDH34bwq2ooaS7tX1CpRw45oESVIkWJcquaEzeEBIci1GOlglTQ0ohWSJwKUivBhSSiFeG0UrpBLT8SbcIuWdvZH7b32d5fXnvXa2d/BTbxvuk8w+YUQIw0mufxex/Pd+aZEEJCxw+TkaFjZDgUIp99eoScHP58ZPiXGzcPAUAI35OlpaWv12NrMxvra1ObLzemuQvJxHQivj4dW3s2tRWPzzyJRk/xvWTzchCG0D9B/4KQEycwHiNvLZFInHfdOrTaO1B1GiArOqi0AFlZA6vqgVXzQNJ10E0T0qnUteBQfo5cLcwRGrkUEo0wySR//+bhsrT7Fb46UiqVRKwUCpqwp6dXmCJGWSa5zBThH0Yz/zI5FmGpP/707Y0NcDyvFABzYTJVvkF+fPT94GX9Crkk/fXD9YpdZ8ViQfPcerPV2QMzdY+1k+dY4fl5pqycZfTxWSY/O8fUO9+yFhnouRcvQu31a72vjMs9io5yx7h8oiryr7yydrvtdzodZlkViL+IgSQlQaMqGDoFXctBTpFBTCR6nuNA3XWNgPbTDBn87Tty9O8LZPDn2ZHjczPkEKYHCoXCS9/3AWX7nueBmsuBZdvQaDRBUVWoIaTRbIJpWb093Oc4Tp4cZFjYAI/RaHTUsqzdarXKoYwiMJ/PA+bAMHTAD0K97vDY63a7BwNnZ2f70ODK2La9yaVj9AVBgEqlAjs7O4Bt4DkE1qFYLL4buLi4SCYnJ/uPIdM0RX4YK/N5dTpeEcxBDqullILruu8HchsfH99f42aRV6Fpmp/NZkGWZQ6ATCYDiqLA9vb2h4FjY2P7a5Ql9iVLkhRIxslDq9UKeomQjwPiQATeK2lrK+hhvzIc0pseOnUo5/O97qtXHGh8UDICk1yWWS77VFWYoVGomGWo2hZUyiXwGtss12z2uqjCqdX0A4Gjo6N8yn3JaQAGNF/uPo1v+WubaT+WzPircclfWU/6L6L/+ZkzZ3at+Xlw2+3SgcCJiYn9uyjLyj3eQ61cA9nqgEAtWBVUiIkUVuUSiMtPYe/0aYDbt0F3nCh5l0UikSCGw+EhHEZYVZUH2XRqHn/JBbzg6OoCVdUFhebmU7b9QDKMW/fv3v3yfzhA48a9uriLAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Inside MMU"\n        title=""\n        src="/hows-that-again/static/7732db118168dfa876303784faf14670/10273/inside-mmu.png"\n        srcset="/hows-that-again/static/7732db118168dfa876303784faf14670/9b14a/inside-mmu.png 163w,\n/hows-that-again/static/7732db118168dfa876303784faf14670/94962/inside-mmu.png 325w,\n/hows-that-again/static/7732db118168dfa876303784faf14670/10273/inside-mmu.png 650w,\n/hows-that-again/static/7732db118168dfa876303784faf14670/65d77/inside-mmu.png 719w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Выглядит этот процесс так:</p>\n<ol>\n<li>\n<p>Процессор подает на вход MMU виртуальный адрес</p>\n</li>\n<li>\n<p>Если MMU выключено или если виртуальный адрес попал в нетранслируемую область, то физический адрес просто приравнивается к виртуальному</p>\n</li>\n<li>\n<p>Если MMU включено и виртуальный адрес попал в транслируемую область, производится трансляция адреса, то есть замена номера виртуальной страницы на номер соответствующей ей физической страницы (смещение внутри страницы одинаковое):</p>\n</li>\n<li>\n<p>Если запись с нужным номером виртуальной страницы есть в TLB, то номер физической страницы берется из нее же</p>\n</li>\n<li>\n<p>Если нужной записи в TLB нет, то приходится искать ее в таблицах страниц, которые операционная система размещает в нетранслируемой области ОЗУ (чтобы не было промаха TLB при обработке предыдущего промаха). Поиск может быть реализован как аппаратно, так и программно — через обработчик исключения, называемого страничной ошибкой (page fault). Найденная запись добавляется в TLB, после чего команда, вызвавшая промах TLB, выполняется снова.</p>\n</li>\n</ol>\n<h2>TLB</h2>\n<p><strong>TLB (translation look-aside buffer)</strong> - это специализированный кэш внутри процессора, содержащий фиксированный набор записей (от 8 до 4096), каждая из которых содержит соответствие адреса виртуальной памяти адресу физической памяти. Если адрес отсутствует в TLB, то происходит процесс <strong>преобразования адреса</strong> и запись полученного адреса в TLB, что занимает в 10-60 раз больше времени.</p>\n<p>Рассмотрим работу TLB на простом примере. Допустим, у нас есть два процесса А и Б. Каждый из них существует в своем собственном адресном пространстве и ему доступны все адреса от нуля до 0xFFFFFFFF. Адресное пространство каждого процесса разбито на страницы по 256 байт (это число я взял с потолка — обычно размер страницы не меньше одного килобайта), т.е. адрес первой страницы каждого процесса равен нулю, второй — 0x100, третьей — 0x200 и так далее вплоть до последней страницы по адресу 0xFFFFFF00. Разумеется, процесс не обязательно должен занимать все доступное ему пространство. В нашем случае Процесс А занимает всего две страницы, а Процесс Б — три. Причем одна из страниц общая для обоих процессов.</p>\n<p>Также у нас есть 1536 байт физической памяти, разбитой на шесть страниц по 256 байт (размер страниц виртуальной и физической памяти всегда одинаков), причем память эта отображается в физическое адресное пространство процессора с адреса 0x40000000 (ну вот так ее припаяли к процессору).</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/a7a95/tlb-example.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 72.21206581352834%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsSAAALEgHS3X78AAADQUlEQVQ4y41TbUwcRRh+dnfudvc4YO9ATqhQosGS9iJWQ5E/WIHCD6tBA2LLAYdybRorGEoAgZpAT7giSho+ojUBrbHhQkDBS/nsiRcsUK6hREKOPzUkpoJBf2jSD2iYzi6nCdJEn83k3Wdm3pln3nkGRCeBgahNIGK8QCQLNEiIMUvYBbqD8axxO8e/BESCMDYWttaCvvWP0KX1j4O7UYtHwxmMxxGCTtjRACtjMqIhYu2CCXERvKqQ+73DtLDerkxqC35v497Iy+f2H3WC0m1ZB151ISGnCqF9ibzWsYJEppjiNt7X+Gl2rI1bq5AliSmE8efphaWVaf/UvwXlAIIRsOxSOsXv4X/lW/lxLpsxA55lC6q7G2RZLZZ8c+zaJwtjvmbqZAOgPCx9ZpjXjdCnJ0KfvQ+h/SZImYlASRxuvqfXFAVrGX4wTArWVMPjPMfvZVFVKgd6m5TG6rfP1lcUjzdWlw6Wn8gbqXrX5jlX4/CUOfKGa04Xek99YEtt+sllDkxd9424+wtYnnjo4PMyBPb9jWhEhccg1pjXTUMuO1454jmRUeAuSS/+ujAtv9f+0rFvSjOL3PYXc91Fh4t6Kl9OGrw+lrIyu7jlH/6hQs0vyj0mglBWHQEK42beR8rEGcWheqP92zZ353fttMvTcdf5ReNmy2XX5qfDXZvOnsZ7H/e10u4rbYUpbVblos0SdijeaGb5CuGhB26xX1vQSxtYxF1cu7+fGgQvMsUJclL0klKxn5Toh4S3RB9xiAPETjy6k09M4ckKe7vlhVNDWUk55xJYts742FMEqTMT4HS6cNYRau3pnHuu56KXplEe/wPFtZesh5s3aEploFLlUUlvyni9/jfoRO2G9K/Vrc3lnl0d12YHjvIJi1YS+ZdZMM0rgimgCJF3IgTFrwiZo8/o1Clf1WXs+9xVvnW+puSMqvDA03tD4J+cZ7YxhKg+mr3qX5rz3vBpxmZ2ujowtktVJCv57Q+37bFUjzj6GegfLdAuZfQd9oTpnw8QoZjUHcny5Ezv8uR0V3BBbuSS+5FHna2XtThaIUnLTYashQY5VsuZD/9nThTPcXFqHVUfpiUn/2cNf6zayX9xbceH9dEC8tD5bu4AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="TLB example"\n        title=""\n        src="/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/10273/tlb-example.png"\n        srcset="/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/9b14a/tlb-example.png 163w,\n/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/94962/tlb-example.png 325w,\n/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/10273/tlb-example.png 650w,\n/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/2fc6f/tlb-example.png 975w,\n/hows-that-again/static/aa2578c5faa006c15ef5d8b982d3f289/a7a95/tlb-example.png 1094w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>В TLB первая колонка - <code>ASID (address space identifier)</code>: это 8 бит, в которые записан PID процесса. Это нужно для того, чтобы процесс Б не читал данные процесса А, когда пытается обратиться к тому же виртуальному адресу <code>0x00000000</code>, к которому ранее обращался А.</p>\n<p>В современных процессорах ASID чаще всего 16-битный. </p>\n<p>Если процессор поддерживает виртуализацию, то помимо ASID у него может быть еще и VSID (virtual address Space IDentifier), который содержит номер запущенной на процессоре виртуальной машины.</p>\n<p>Даже после добавления ASID могут возникнуть ситуации, когда нужно будет инвалидировать одну или несколько записей или даже весь TLB:</p>\n<ol>\n<li>Если физическая страница выгружена из оперативной памяти на диск — потому что обратно в память эта страница может быть загружена по совсем другому адресу, то есть виртуальный адрес не изменится, а физический изменится</li>\n<li>Если операционная система изменила PID процесса — потому что и ASID станет другим</li>\n<li>Если операционная система завершила процесс</li>\n</ol>\n<p>А еще есть множество веселых проблем (омонимы, синонимы, когерентность) с инвалидацией кеша процессора при переключении процессов, которые описаны <a href="https://habr.com/post/211150/">здесь</a>.</p>\n<p>В результате эти проблемы привели к тому, что в некоторых процессорах часть уровней экша выносят за MMU. В результате, например, в L1 и L2 хранятся виртуальные адреса, а в L3 и L4 - физические.</p>\n<h2>Преобразование адреса</h2>\n<p>На схеме изображены все преобразования адреса по пути из инструкции в реальную память:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/d15fa/address-transformation.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 77.08333333333333%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQ4y5WTBw4CIRBFaQuyltW1RE9hSbz/1RzMx/yM7EYneaF/poAxxiyEIGShFzohYj5irce4p/0Rey3Gpe8MJhxag75DP4N6iaX9dc9fVkRWwiBs6dJZS/BAU8Q2CNEDvR4oZI/2HZKjQwHjpXAWjnQ40OFIuR4pik9yW2S6wBOOhP+yhFsLa7Q7eLOeOuQaWBLkCBIRpwQzvaPKCgXZkzeZcuypME1Br5KuwxuQfM5lnBK0DfgdJhKo4bpf32TL+wM8HKlAs9apcAM92KS+m2393V9y2KEgJ6ALxyn4sqdwE+5oK0/iodaumL9osReEvggi14Ad/AAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Address transformation"\n        title=""\n        src="/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/10273/address-transformation.png"\n        srcset="/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/9b14a/address-transformation.png 163w,\n/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/94962/address-transformation.png 325w,\n/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/10273/address-transformation.png 650w,\n/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/2fc6f/address-transformation.png 975w,\n/hows-that-again/static/b6c4847eb376273acda1b127deedfeb2/d15fa/address-transformation.png 1200w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Каждое из этих преобразований может вернуть ошибку для адресов, не имеющих представления в следующем по цепочке виде. Устранение подобных проблем — это задача операционных систем и мониторов виртуальных машин, реализующих абстракцию виртуальной памяти.</p>\n<p>А вот иллюстрация из мануала к процессору 80386 1986 года. Сейчас адрес подвергается более сложным преобразованияем, но общие принципы те же: </p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/0563384d26bf223103157901e094d05f/cd259/80386-addressing.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 643px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 101.0886469673406%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsSAAALEgHS3X78AAABs0lEQVQ4y4XUB27DUAwDUN//ktl7Nns0cZ/DxnWKDgEt5G9SovjlFIvFYrVabTab4/EoWS6Xk8lkNps5l+x2u7Is7/d7+YxmXviD2G63+P4rsV6v5afTSX44HN4esXtEYB6dV+Tr9aqPhsPhcDQazedzibbLZ3gcDAarZwCo/kk+n8+g4/FYvcgm7L0RqpNwu93y+CLbC8UiBlPV8jUQNCh/imK/39cE5U31zZW/yNRPp1OcGKN5yDj/kwnmk5m73S6y+S+Xi8NWq2WcDOzkZ7LXmOtHQCNHPwm/cV7u2dg48UweVyXI12fUpoBp414cVmQj9ft9+5T1IsTdOuFFp9Nxyb1eLxbU68gjyCL2KKmPzlkAy6QQhDxoZBi5JOMAVGSbCJTVoxYociS05RUCGAL/KJJrU5G9UDIfg2AbLWheR2fshCStnh+sIgdXn0Lkbk0V5dkFgCyCihnw0zDv8jFBB4fPrXa7zS0J/3LhwGplBYvsEEvjMyar8xk3RUbO93tODYMRk9kMz7YcekSjyIQx8oVMJ5BWCgPlGjJn/WOgf/NT+SJTm9+A+gJz8834bT0/AJGggp7j8mxqAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="80386 addressing"\n        title=""\n        src="/hows-that-again/static/0563384d26bf223103157901e094d05f/cd259/80386-addressing.png"\n        srcset="/hows-that-again/static/0563384d26bf223103157901e094d05f/dfbcd/80386-addressing.png 163w,\n/hows-that-again/static/0563384d26bf223103157901e094d05f/f4e08/80386-addressing.png 325w,\n/hows-that-again/static/0563384d26bf223103157901e094d05f/cd259/80386-addressing.png 643w"\n        sizes="(max-width: 643px) 100vw, 643px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Рассмотрим каждый из шагов подробнее.</p>\n<h3>Эффективный -> линейный</h3>\n<p><strong>Этот раздел написан применительно к x86</strong></p>\n<p>Все линейное адресное пространство разбито на сегменты. Адресное пространство каждого процесса имеет по крайней мере 3 сегмента:</p>\n<ul>\n<li>сегмент кода</li>\n<li>сегмент данных</li>\n<li>сегмент стека</li>\n</ul>\n<p>В инструкциях ассемблера фигурирует <strong>эффективный адрес</strong>. Он означает сдвиг относительно начала сегмента. </p>\n<p>Начало сегмента записано в т.н. селекторах, хранимых в специальных регистрах. Для x86:</p>\n<ul>\n<li>селектор сегмента кода хранится в регистре CS</li>\n<li>сегмента данных - в DS</li>\n<li>сегмента стека - в CS</li>\n</ul>\n<p><strong>Логический адрес</strong> - это пара чисел, записываемая как <code>selector:offset</code>. Причем вместо селектора обычно пишется регистр, где он хранится, например, <code>ds:0x11223344</code>.</p>\n<p>С селектором тоже все не так просто. Он имеет следующую структуру:</p>\n<pre><code>| index(13 бит) | TI (1 бит) | RPL (2 бита) |\n</code></pre>\n<p>где <code>index</code> - индекс дескриптора в таблице дескрипторов.</p>\n<p>Таблиц дескрипторов бывает 2: </p>\n<ol>\n<li>GDT (global descriptor table) - всегда одна, с момента старта системы не меняется и в свопе не участвует. Адрес нулевого дескриптора хранится в 48-битном системном регистре GDTR.</li>\n<li>LDT (local descriptor table) - этих таблиц много, но использоваться в данный момент будет та, селектор которой загружен в системный регистр LDTR, который в отличие от GDTR может меняться.</li>\n</ol>\n<p>Если в селекторе сегмента, указанном выше, бит TI == 0, то дескриптор сегмента ищется в GDT, а если 1, то в текущей LDT.</p>\n<p>Итак, процессор добрался до 64-битного дескриптора сегмента. Вот его структура:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/0d26a91a1f515ac014c0d6d1fa0ef683/c88de/descriptor-structure.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 23.375%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIF/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/2gAMAwEAAhADEAAAAdWSLsUX/8QAFxAAAwEAAAAAAAAAAAAAAAAAAAESIf/aAAgBAQABBQIeOj//xAAXEQEBAQEAAAAAAAAAAAAAAAABABES/9oACAEDAQE/AeRsL//EABcRAAMBAAAAAAAAAAAAAAAAAAECAxD/2gAIAQIBAT8Bmxz/xAAWEAEBAQAAAAAAAAAAAAAAAABBABD/2gAIAQEABj8CZz//xAAZEAEAAwEBAAAAAAAAAAAAAAABABGRMWH/2gAIAQEAAT8hVWr1Oi9QXuz/2gAMAwEAAgADAAAAEPfv/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERIf/aAAgBAwEBPxCjUMv/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQIBAT8QQothf//EABsQAQACAgMAAAAAAAAAAAAAAAEAESExQWGR/9oACAEBAAE/ECCI6eYkRx4HUob9Z//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Descriptor structure"\n        title=""\n        src="/hows-that-again/static/0d26a91a1f515ac014c0d6d1fa0ef683/b80fa/descriptor-structure.jpg"\n        srcset="/hows-that-again/static/0d26a91a1f515ac014c0d6d1fa0ef683/cf410/descriptor-structure.jpg 163w,\n/hows-that-again/static/0d26a91a1f515ac014c0d6d1fa0ef683/62f2a/descriptor-structure.jpg 325w,\n/hows-that-again/static/0d26a91a1f515ac014c0d6d1fa0ef683/b80fa/descriptor-structure.jpg 650w,\n/hows-that-again/static/0d26a91a1f515ac014c0d6d1fa0ef683/c88de/descriptor-structure.jpg 800w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>То есть, <strong>базовый адрес</strong> нашего сегмента хранится в адресе, записанном в битах 16-39 и 56-63.</p>\n<p>Получив его, можем наконец получить наш линейный адрес по формуле:</p>\n<p><strong>линейный адрес = базовый адрес + эффективный адрес</strong></p>\n<h3>Линейный -> гостевой физический</h3>\n<p>У этого алгоритма есть множество вариаций в зависимости от режима работы процессора (32-битный, 64-битный или PAE).</p>\n<p>Однако общая идея одна и та же: линейный адрес разбивается на несколько частей, каждая из которых служит индексом в одной из системных таблиц, хранящися в памяти. Записи в таблицах - это адреса начала таблицы следующего уровня, или, для последнего уровня - искомая информация о физическом адресе страницы в памяти. Самые младшие биты используются для адресации внутри найденной страницы. </p>\n<p>Пример для режима PAE с размером страниц 4 кбайт:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/9c00e/linear-to-physical.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 63.800000000000004%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAADHklEQVQ4y3VTX0hTYRT/7nTOee/uNJ2WWYREBEYIZYER+OJDDxGV9NJLEFKkUVEP9dBDQZAG5XxIMAl8FMREjCwd7urcdnW79+5uu942559At6lhSKKocTrfdoMS+uDH/e6P3/l95xzOIYSQIsRhxCFCclhEHiHMPkLyGeQQ1+nHTojJmpVR7gDCxKHGRMh+vJ8n2TiSS7JCggHEjChAoBkpRrAGzxqPUt5maHjj/8+dAh+wsIRln5qt1ueFNttjluOaOYapy8/JabLYbC84ln3A8/x91mx+lk/IaQshd9D8FeIm4hGa1Vt4vqGgpuaZvbLyDRpeohkCZga0POOANcv9fYCCZRgw0T+HAzIsz/+rBcjy+SxbcLywsLAqL4+UYpDFYhnKs1qJnWFIMcfxfFa+WXDx4rdcGmQAzcHU2ho5Eo2q9yRJOpeRjY+7r/T1fZjt7+/XJicnxc5O4eDIiKsyGAzGRVEMKYqUkOWpWvKfEwgotRsbG6Bp2tsMgQHNaAQTE16YnY1DZ+fno+h7QtenQRT9kE7/hLEx6SrVqqpa7/P5xgRhzKUocm9Hx4LN642cSqfTEA6H2wzDYKPH4wHEtqLE1l+/Hqlsb5+ujUY1kGVpK5FIwtCQ3EC1mha9u7OzA8vLy5BKpWBgQKsYHw9Uf/++Cl6v911mbD59kp+oagiCwQBIUhxaWlzHBGGqanFxEebnF7ZWV9MQCKiXqWE4HGpMJpMwMzOzHY/rmz09X8vb2sJ1S0tL4Ha732Uy/PgxemN4+Et0dNQdTCR0n9M5VK6q/qqVlWUaCOvr61h6OJMhZnwLmw8+n383EIjvDg769/v9cvXa2hrNsMtoq160t9Hd3crZWCyeRsM5xA+/X7lAeZdLezg3N4v9ivxS1dhuV5dSIYqR6lQqCYqiODPBVut7nBi5tLSU2MvKDuOGXGPOnAHO7RZLBEEo8XiGHU6nwlGtIESaaMmxWIyWvNXbq2KG6mnaV13XO4x8zCW4ng46r3SdcPYcxsrxe4bb9PKlXh4KSdWyHDoZCgVPIpfjdOo109OaFyfgNlX9BtnbmY/hnbsUAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Linear to physical address transformation"\n        title=""\n        src="/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/10273/linear-to-physical.png"\n        srcset="/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/9b14a/linear-to-physical.png 163w,\n/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/94962/linear-to-physical.png 325w,\n/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/10273/linear-to-physical.png 650w,\n/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/2fc6f/linear-to-physical.png 975w,\n/hows-that-again/static/e7a245dc9cef79a4b5fc4bd8df1a4891/9c00e/linear-to-physical.png 1000w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>В разных режимах процессора различается число и емкость этих таблиц. </p>\n<h3>Гостевой физический -> физический</h3>\n<p>Раньше линейный преобразовывался в реальный физический адрес и на этом процесс кончался. Но с появлением аппаратной виртуализации этот адрес приходится транслировать еще раз.</p>\n<p>Это преобразование можно делать программно, или же аппаратно, если процессор поддерживает EPT (Extended Page Table). Алгоритм последнего схож с ранее описанным страничным преобразованием: набор связанных таблиц с общим корнем, последний уровень которых определяет, существует ли физическая страница для указанной гостевой физической.</p>',frontmatter:{path:"/blog/hardware/virtual-memory",title:"virtual-memory"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-hardware-virtual-memory-79d5b2f9932e063d2b8c.js.map