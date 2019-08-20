webpackJsonp([77570552653218],{423:function(a,t){a.exports={data:{markdownRemark:{html:'<h2>Make:</h2>\n<p>Создается Makefile:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">util.o: util.h util.c\n\tgcc -c util.c\nmain.o: util.h main.c\n\tgcc -c main.c\nmain.exe: util.o main.o\n\tgcc util.o main.o -o main.exe</code></pre></div>\n<p>Если граф ацикличный, то каждый таск должен быть выполнен 0-1 раз.\nЦикличные графы обычно не поддерживаются билд-системами.</p>\n<p>Make: </p>\n<ul>\n<li>использует время модификации файла</li>\n<li>создает граф зависимостей тасков и запускает их в топологическом порядке</li>\n</ul>\n<p>Такой подход удовлетворяет свойству минимальности:\nбилд-система является <em>минимальной</em>, если она выполняет такси не больше одного раза в процессе билда и только если они транзитивно зависят от инпутов, которые изменены со времени прошлого билда.</p>\n<h2>Excel</h2>\n<p>Может быть рассмотрен как билд-система с динамическими меняющимися зависимостями.</p>\n<p>Пример:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">\tA1: 10 B1: INDIRECT(&quot;A&quot; &amp; C1) C1: 1\n\tA2: 20</code></pre></div>\n<p>Так как значение B1 определяется значением C1, то невозможно построить граф зависимостей до начала билда.</p>\n<p>Чтобы поддерживать динамические зависимости, используется <strong>calc chain</strong>:</p>\n<p>ячейки обрабатываются в последовательности <strong>calc-chain</strong>, но если вычисление ячейки C требует значения ячейки D, которая еще не вычислена, то Excel <em>прекращает</em> вычисление C, перемещает D вперед C в <strong>calc-chain</strong> и возобновляет билд, начиная с D.</p>\n<p>Когда значения или формулы меняются, то Excel использует финальную <strong>calc-chain</strong> из предыдущего билда и начинает с нее.</p>\n<p>Такой подход не удовлетворяет свойству <em>минимальности</em>. B1 должен быть перевычислен только если изменяются A1 или C1, но это не очевидно. Excel использует "приблизительную" минимальность:\nформула пересчитывается, если:\n- упоминает изменившуюся ячейку\n- использует INDIRECT, чьи зависимости не видны статически\n- ячейка изменилась сама</p>\n<p>То есть в нашем случае B1 будет пересчитываться всегда, а это явное нарушение минимальности.</p>\n<h2>Shake</h2>\n<p>Попытка удовлетворить свойству минимальности при решении проблемы динамических зависимостей.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/b88e5b526482f00e2c46c6e409ab7802/9c42b/build-systems-1.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 550px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 42%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAABBElEQVQoz3VS2YqEQAz0/z/NF19UPPBEBe9bvDNU2Ayz7mwgdLpDKlVFK/QT933TM87zpHVdqes6KsuSkiShNE2pqioax5GO4/gzowBIwIZhoDzPqSgKatuWlmWhbdvePYBlWcZLruviftM0/BbHMd9/AWKzrutkGAYz+IwgCLhnWRazlajrmlzXJdM0eakicvd9ZxAwmqaJ5nnmN8hCDcbSgwVgA5ZfJSM8zyNN01gOpKmqytIBats2J+yIoohZ+r7PHiMALEoZECCQi8193/MJb/AGhhhEYhAptZARsDeg4zjsETzA9jAM2Sd4BrbffsB/v0MR/5DYLL6hxon8ZPDMJ+gLtElp3WgQ42oAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Shake example"\n        title=""\n        src="/hows-that-again/static/b88e5b526482f00e2c46c6e409ab7802/9c42b/build-systems-1.png"\n        srcset="/hows-that-again/static/b88e5b526482f00e2c46c6e409ab7802/b0720/build-systems-1.png 163w,\n/hows-that-again/static/b88e5b526482f00e2c46c6e409ab7802/ec0bd/build-systems-1.png 325w,\n/hows-that-again/static/b88e5b526482f00e2c46c6e409ab7802/9c42b/build-systems-1.png 550w"\n        sizes="(max-width: 550px) 100vw, 550px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Содержимое <code class="language-text">release.tar</code> определяется содержимым <code class="language-text">release.txt</code>. Makefile так не может и приходится использовать костыли типа <em>build phases</em>.</p>\n<p>В Shake можно указать правило для <code class="language-text">release.tar</code> так:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">&quot;release.tar&quot; %&gt; \\_ -&gt; do\n\tneed [&quot;release.txt&quot;]\n\tfiles &lt;- lines &lt;$&gt; readFile &quot;release.txt&quot;\n\tneed files\n\tsystem &quot;tar&quot; $ [&quot;-cf&quot;, &quot;release.tar&quot;] ++ files</code></pre></div>\n<p>Отличия от Make и Excel:\n- Shake использует граф зависимости из предыдущего билда, чтобы определить, какие файлы должны быть перебилжены.\n- вместо <em>прекращения</em> выполнения тасков, чьи зависимости пока не построены (как делает Excel), они приостанавливаются (suspend).\n- поддерживается <em>early cutoff optimization</em>. Когда выполняется таск и результат не изменился относительно предыдущего билда, зависимые таски можно не выполнять. Make и Excel так не умеют.</p>\n<h2>Bazel</h2>\n<p>Облачная файловая система. Результаты билдов шарятся между членами команды. Локально появляются только конечные результаты, а все промежуточные остаются в облаке.</p>\n<p>Пример (в кружках - хэши от содержания):</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/206e505a4defec8245793dd12b00cfdb/405a2/build-systems-2.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 25.912408759124084%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAAA6UlEQVQY011QyY7DIBTL/39Zbz3k0GmaCWFt9p1sSuIB2lTVPMkCzLPxwzuOA/9ha993zPOMcRwRhiG01o631/u2YVlX+AFFJLI3/9J634dzb2szomEYEMexA+f83ffqYVzieiPw7xGmafpovdPg2+xM2HUdGGMuJSEEeZ5jXRboccLFjyDTEkowUErRNI3r86qqQpZlaNsWQgj0fe9M7IjWpK5rBEGAsizxeAQmtQb/uSKnd/xGBEpJp1NKuSCe/ScppSNOpGlqEh6wjyXJE4Irk641KLCbKZqE4klu5hssX5uVoSgKZ/gHg0p9Kq+CnfMAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Bazel example"\n        title=""\n        src="/hows-that-again/static/206e505a4defec8245793dd12b00cfdb/10273/build-systems-2.png"\n        srcset="/hows-that-again/static/206e505a4defec8245793dd12b00cfdb/9b14a/build-systems-2.png 163w,\n/hows-that-again/static/206e505a4defec8245793dd12b00cfdb/94962/build-systems-2.png 325w,\n/hows-that-again/static/206e505a4defec8245793dd12b00cfdb/10273/build-systems-2.png 650w,\n/hows-that-again/static/206e505a4defec8245793dd12b00cfdb/405a2/build-systems-2.png 822w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h2>Сравнение систем</h2>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/hows-that-again/static/6d5478f239d31fd1b5c1d8b8f171fc9c/676f6/build-systems-3.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block;  max-width: 650px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 18.102372034956304%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAzUlEQVQY0yWQ2w6EIAxE/f/P80G5CV4eRFdjdMXsanS27ZI0hVLmTMmstQh1DaVKaGNQliUMZaUUaqoPwwittdT4rLVCVXm0bUu5kjdN08A5C9bKYozgZYxGURQSLOqcw3leOI5DYHmew4cARXd93+O+byzLghgHbNuGcRwRqZ71JPg8jzgI3ouLirInOjuZ51mcML3rOtlznNeF/f3GNM3Y1lUmYVCWUsL3+8GLCNzo/X8cFrAEkS8JNUWguyBQL+Dm30uQnTR4kpR2/AAREiSrXNpiQwAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Build systems comparison"\n        title=""\n        src="/hows-that-again/static/6d5478f239d31fd1b5c1d8b8f171fc9c/10273/build-systems-3.png"\n        srcset="/hows-that-again/static/6d5478f239d31fd1b5c1d8b8f171fc9c/9b14a/build-systems-3.png 163w,\n/hows-that-again/static/6d5478f239d31fd1b5c1d8b8f171fc9c/94962/build-systems-3.png 325w,\n/hows-that-again/static/6d5478f239d31fd1b5c1d8b8f171fc9c/10273/build-systems-3.png 650w,\n/hows-that-again/static/6d5478f239d31fd1b5c1d8b8f171fc9c/676f6/build-systems-3.png 801w"\n        sizes="(max-width: 650px) 100vw, 650px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>',frontmatter:{path:"/blog/books/build-systems",title:"build-systems"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-books-build-systems-61c7d7daaeea78630813.js.map