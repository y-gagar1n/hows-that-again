webpackJsonp([0x812fed880a56],{449:function(n,o){n.exports={data:{markdownRemark:{html:'<h1>Google</h1>\n<h2>Кроулинг</h2>\n<p>Сначала делаем индексатор. Это сервис, который проходит по корпусу данных и представляет их в виде структуры данных, оптимизированной для чтения.</p>\n<p>Индексатор состоит из 2 частей:</p>\n<ul>\n<li>spider crawler: Проходит по данным методом паука и выдирает из них все ссылки, которые найдет.</li>\n<li>indexer: Берет каждую ссылку, получает содержимое по ней и преобразует его в файл <a href="https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9_%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81">обратного индекса</a>. Затем все маленькие файлы индексов объединяются в один большой индекс. Это можно сделать через джоб Map/Reduce. Этот этап может быть очень хорошо распараллелен в огромном дата-центре.</li>\n</ul>\n<p>Что представляет из себя инвертированный индекс? Для каждого слова, найденного в процессе кроулинга, сохранен список пар DocumentId-PageRank. Этот список называется <em>posting list</em>.</p>\n<h2>Индексация</h2>\n<p>Теперь посмотрим, как документы преобразуются в индексные файлы.</p>\n<p>Чтобы посчитать PageRank, нам понадобится еще один джоб Map/Reduce:</p>\n<ul>\n<li>для каждого сайта считаем количество входящих ссылок</li>\n<li>для каждой входящей ссылки смотрим, как она была оформлена (напр. ссылки в тэге <h1> получают бОльший вес, чем в тэге <h3>)</li>\n<li>для каждой входящей ссылки смотрим количество исходящих ссылок с этого сайта</li>\n<li>для каждой входящей ссылки смотрим, какие рядом используются слова и пытаемся определить предметную область, даем бОльший вес там сайтам, где предметная область совпадает с той, на которую ссылается.</li>\n</ul>\n<p>Еще возможно много вариантов придумать, главное - помнить, что нам нужны <strong>масштабируемые</strong> способы анализа данных.</p>\n<h2>Поиск</h2>\n<p>Для каждого слова из запроса получаем список документов, в которых оно встречается, а затем находим пересечение этих списков. Результат сортируем по PageRank. Затем берем верхние 10 результатов, получаем соответствующие документы из хранилища документов и генерируем для них элементы выдачи, содержащие заголовок, фрагмент текста и его Url. Эти элементы и возвращаем юзеру.</p>\n<h2>Проблемы</h2>\n<h3>Длинные постинг листы</h3>\n<p>Если запрос состоит только из популярных слов,то посчитать результат будет очень сложно из-за огромного количества документов, в которых они встречаются. Например, ищем "The Who":</p>\n<ul>\n<li>The содержится в 50 млрд документов (это все индексированные документы гугла)</li>\n<li>Who тоже содержится в 50 млрд документов</li>\n</ul>\n<p>Если для каждого документа нам нужно хранить 8 байт, то получается что нужно прочитать с диска <code>2*50*8=800 ГБ</code> данных и вычислить пересечение 1000 млрд строк за 0.2 секунды.</p>\n<h3>Параллельные запросы</h3>\n<p>Гугл обслуживает 300.000 запросов в секунду. То есть все, что описано в предыдущем пункте, нужно сделать еще и 300.000 раз за 1 секунду.</p>\n<h2>Варианты решения</h2>\n<ul>\n<li>Распределять каждый запрос между множеством серверов. Например, 1000 серверов, каждый хранит только свою часть индекса шардированого по документам. Все 1000 серверов выполняют запрос параллельно, потом результаты аггрегируются и возвращаются пользователю. Но эти 1000 серверов все 0.2 секунды будут заняты обслуживанием одного запроса. Чтобы они могли обслужить 300.000 запросов в секунду, понадобится около миллиона серверов.</li>\n<li>Хранить индекс в памяти, а не на диске</li>\n<li>Сжимать постинг листы <a href="https://www.quora.com/Information-Retrieval-What-are-the-most-efficient-ways-to-compress-an-inverted-index/answer/Wolf-Garbe">Алгоритмы сжатия обратных индексов</a></li>\n<li>Держать дополнительный биграммный индекс. Это индекс, который ищет не по отдельным словам, а по парам слов. В результате получаем намного более короткие постинг листы. Например, чтобы найти результаты запроса "to be or not to be", мы ищем по биграммному индексу результаты для: "to+be", "or+not", "to+be".</li>\n</ul>\n<h1>Google Docs</h1>\n<p>Речь здесь будет о предоставлении возможности совместного редактирования.</p>\n<p>Google Docs для этого использует так называемое Операциональное Преобразование (Operational Transformation). </p>\n<p>Суть OT в том, что все действия представляются как последовательность операций, отсылаемая на сервер. Когда клиент шлет набор операций, он добавляет их в коллекцию отправленных, но не получивших подтверждения. От сервера ему могут приходить операции, совершенные другими клиентами и он должен применять операцию <code>transform</code> на пришедшие и свои неотправленные изменения, чтобы преобразовать свои неотправленные операции в соответствии с текущим вариантом текста на сервере, после чего клиент применяет полученные от сервера операции на своем тексте.</p>\n<p><a href="https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447">Наилучшая статья</a> про это, которую мне удалось найти, даже с примером работы <a href="https://habr.com/ru/post/416961/">Перевод</a> (в переводе ошибка на рисунке, где Васе второй раз применяется трансформированная операция - должно быть "получить Insert \'!\', @10" и  "Применить Insert \'Habr\', @5")</p>\n<p>Еще хорошая серия статей:</p>\n<ul>\n<li><a href="https://medium.com/@srijancse/how-real-time-collaborative-editing-work-operational-transformation-ac4902d75682">https://medium.com/@srijancse/how-real-time-collaborative-editing-work-operational-transformation-ac4902d75682</a></li>\n<li><a href="https://hackernoon.com/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66">https://hackernoon.com/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66</a></li>\n</ul>\n<p>Здесь хорошая визуализация: <a href="https://operational-transformation.github.io/visualization.html">https://operational-transformation.github.io/visualization.html</a></p>\n<p>А здесь описан другой алгоритм, Differential Synchronization: <a href="https://neil.fraser.name/writing/sync/">https://neil.fraser.name/writing/sync/</a></p>\n<h2>Реализация</h2>\n<p>При любом изменении документа в GoogleDocs на сервер шлется POST-запрос по ссылке типа: <a href="https://docs.google.com/document/u/0/d/___id_%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0___/save?id=___id_%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0___">https://docs.google.com/document/u/0/d/<strong><em>id</em>документа_</strong>/save?id=<strong><em>id</em>документа_</strong></a> </p>\n<p>В теле запроса (FormData) - 2 поля:</p>\n<ul>\n<li><strong>rev</strong> - новая версия документа, видимо вычисляется как текущая известная версия + 1</li>\n<li><strong>bundles</strong> - описание операции</li>\n</ul>\n<p>Описание операции - json вида <code>[{"commands":[{"ty":"is","ibi":13,"s":"k"}],"sid":"5671b339a5d349b6","reqId":5}]</code></p>\n<p>Такая команда была послана при вставке символа <code>k</code> в позицию 13.</p>\n<ul>\n<li><strong>ty</strong> - тип команды. is - вставка, ds - удаление, mlti - мультикоманда.</li>\n<li><strong>ibi</strong> - индекс символа, на котором применена операция</li>\n<li><strong>s</strong> - вставляемый символ</li>\n<li><strong>reqId</strong> - версия, поверх которой проводились изменения</li>\n</ul>\n<p>При удалении:</p>\n<p><code>[{"commands":[{"ty":"ds","si":1,"ei":54}],"sid":"5671b339a5d349b6","reqId":11}]</code></p>\n<ul>\n<li><strong>si</strong> - индекс первого удаляемого символа</li>\n<li><strong>ei</strong> - индекс последнего удаляемого символа</li>\n</ul>\n<p>При выделении и редактировании:</p>\n<p><code>[{"commands":[{"ty":"mlti","mts":[{"ty":"ds","si":11,"ei":15},{"ty":"is","ibi":11,"s":"q"}]}],"sid":"5671b339a5d349b6","reqId":22}]</code></p>\n<ul>\n<li><strong>mts</strong> - перечисление команд мультикоманды</li>\n</ul>\n<p>В ответ приходят json вида:</p>\n<pre><code class="language-json">)]}\'\n{"additionalData":{},"revisionRanges":[[27,27]]}\n</code></pre>\n<p>При совместном редактировании наверно в <code>additionalData</code> должна быть инфа о том, как смержить документ.</p>',frontmatter:{path:"/blog/how-would-you-implement",title:"How would you implement"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-how-would-you-implement-2673484302e1346fc8da.js.map