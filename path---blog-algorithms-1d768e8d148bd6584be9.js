webpackJsonp([0x6afb0d4cad43],{393:function(n,i){n.exports={data:{markdownRemark:{html:'<h1>Algorithms</h1>\n<h1>Сумма двух</h1>\n<p>Имея массив целых чисел, нужно вернуть индексы двух элементов, сумма которых будет равна заданному числу</p>\n<h2>Пример</h2>\n<pre><code>Given nums = [2, 7, 11, 15], target = 9,\n\nBecause nums[**0**] + nums[**1**] = 2 + 7 = 9,\nreturn [**0**, **1**].\n</code></pre>\n<h2>Решение</h2>\n<ol>\n<li>Отсортировать массив по возрастанию.</li>\n<li>Идти с двух концов навстречу друг другу счетчиками i (слева) и j (справа)</li>\n<li>Если nums[i] + nums[j] &#x3C; target, то увеличиваем i</li>\n<li>Иначе, если nums[i] + nums[j] > target, то уменьшаем j</li>\n<li>А если равны, то очевидно возвращаем</li>\n</ol>\n<h1>Самая длинная подстрока без повторяющихся символов</h1>\n<p>Имея строку, найти в ней самую длинную подстроку без повторяющихся символов.</p>\n<h2>Examples</h2>\n<p>"abcabcbb" => "abc" (3)</p>\n<p>"bbbbb" => "b" (1)</p>\n<p>pwwkew => "wke" (3)</p>\n<h2>Решение 1. Скользящее окно.</h2>\n<p>Нам понадобится set символов. Если известно, что все символы входят в некое подмножество (например a-z), то можно вместо set использовать массив на n элементов, где n = длина подмножества.</p>\n<ol>\n<li>Инициализируем start = 0, это будет левая граница нашего скользящего окна.</li>\n<li>Идем счетчиком i с левого края. </li>\n<li>Если set содержит <code>input[i]</code>, то мы встретили первый повторяющийся символ в текущем окне. </li>\n</ol>\n<p>3.1. <code>i - start + 1</code> будет длина соответствующей подстроки, нужно ее сравнить с максимумом. </p>\n<p>3.2. Теперь нам нужно сдвинуть левый край окна и мы можем его сдвинуть сразу к символу справа от первого повторяющегося символа из нашей пары, т.к. для любого края левее этого, подстрока уже заведомо будет содержать повторяющийся символ. Таким образом, <code>start = set[input[i]] + 1</code>.</p>\n<ol start="4">\n<li>Запоминаем в set индекс текущего символа: <code>set[input[i] = i</code>.</li>\n</ol>\n<h1>Медиана 2 отсортированных массивов</h1>\n<p>Имея 2 отсортированных массива, найти их медиану. Сложность должна быть <code>O(log(n+m))</code> </p>\n<h2>Пример 1</h2>\n<pre><code>nums1 = [1, 3]\nnums2 = [2]\n\nThe median is 2.0\n</code></pre>\n<h2>Пример 2</h2>\n<pre><code>nums1 = [1, 2]\nnums2 = [3, 4]\n\nThe median is (2 + 3)/2 = 2.5\n</code></pre>\n<h2>Решение</h2>\n<p>Массивы a и b, длины - m и n соответственно. </p>\n<p>Медиана - это число, разделяющее множество на 2 подмножества одинаковой длины, одно из которых всегда меньше другого. </p>\n<p>Значит, нам нужно удовлетворить 2 условия: </p>\n<ol>\n<li>Условие равенства длин </li>\n<li>Условие соотношения граничных элементов отсортированных подмножеств </li>\n</ol>\n<p>Допустим, мы разбиваем массив A в точке i, а массив B в точке j. </p>\n<pre><code>left | right \n\nA[0], A[1], ..., A[i-1] | A[i], A[i+1], ..., A[m-1] \n\nB[0], B[1], ..., B[j-1] | B[j], B[j+1], ..., B[n-1] \n</code></pre>\n<p>Тогда условия будут выглядеть так: </p>\n<ol>\n<li><code>len(left) = len(right) => i + j = (m - i) + (n - j) => j = (m + n) / 2 - i => (учтем нечетные длины, прибавив к числителю 1) j = (m + n + 1) / 2 - i</code> </li>\n<li><code>max(left) &#x3C;= min(right) => A[i-1] &#x3C;= B[j] &#x26;&#x26; B[j-1] &#x3C;= A[i]</code> </li>\n</ol>\n<p>Если эти условия соблюдены, то: </p>\n<p><code>median = (max(left) + min(right)) / 2</code> </p>\n<p>Значит, задача свелась к следующей: </p>\n<pre><code>Найти i в [0, m] такую, что: \nA[i-1] &#x3C;= B[j] &#x26;&#x26; B[j-1] &#x3C;= A[i] где j = (m + n + 1) / 2 - i \n</code></pre>\n<p>Это мы можем сделать половинным делением.</p>\n<p>Когда нашли i, медиана будет: </p>\n<pre><code>max(A[i-1], B[j-1]), когда m+n нечетное \n( max(A[i-1], B[j-1]) + min(A[i], B[j]) ) / 2, когда m+n четное\n</code></pre>\n<h1>Найти подмассив с максимальной суммой</h1>\n<h2>Вариант 1. Разделяй и властвуй</h2>\n<p>Делим массив на 2 половины и возвращаем максимум из:</p>\n<ol>\n<li>максимальная сумма в левой половине</li>\n<li>максимальная сумма в правой половине</li>\n<li>максимальная сумма в подмассиве, пересекающем середину</li>\n</ol>\n<p>1 и 2 пункт - это просто рекурсивные вызовы.</p>\n<p>3 пункт посложнее - там нужно от середины идти влево и вправо, и считать масимальную сумму элементов левой и правой полвоины, а потом суммировать их. </p>\n<p>То есть, если у нас такой массив:</p>\n<pre><code>-2 1 -3 4 -1 3 -5 4\n</code></pre>\n<p>Масимальная сумма левой половины = 4</p>\n<p>Максимальная сумма правой = 2</p>\n<p>Общая сумма = 4+2 = 6</p>\n<p>Сложность - <code>O(nlogn)</code></p>\n<p>И есть специализированный алгоритм - <strong>Kadane\'s Algorithm.</strong></p>\n<p>На псевдокоде описывается очень просто:\n<br>\nInitialize:\nmax<em>so</em>far = 0\nmax<em>ending</em>here = 0\n<br>\nLoop for each element of the array\n(a) max<em>ending</em>here = max<em>ending</em>here + a<a href="b">i</a> if(max<em>ending</em>here &#x3C; 0)\nmax<em>ending</em>here = 0\n(c) if(max<em>so</em>far &#x3C; max<em>ending</em>here)\nmax<em>so</em>far = max<em>ending</em>here\nreturn max<em>so</em>far</p>\n<p>Идея так же проста - ищем последовательные подмассивы, сумма которых больше нуля и берем максимальную сумму из них.</p>\n<p>Пример:</p>\n<pre><code>2 -3 8 -1\n</code></pre>\n<p>Алгоритм выдаст 8 и это правильно.</p>\n<p>Если бы кусок перед 8 выдавал результат больше нуля, то он бы увеличивал масимальную сумму и мы бы его правильно взяли.</p>\n<p>Если он меньше нуля, то он точно уменьшает сумму и мы его правильно не берем.</p>\n<h1>Найти отсутствующий элемент</h1>\n<p>Есть массив из N-1 различных чисел от 1 до N. Нужно найти отсутствующий элемент.</p>\n<h2>1 вариант</h2>\n<p>Суммируем все числа и вычитаем результат из суммы всех элементов от 1 до N = n * (n+1) / 2. Результат вычитания будет ответов.</p>\n<h2>2 вариант</h2>\n<p>XOR-им все числа от 1 до N, затем поверх этого XOR-им все элементы нашего массива. Результат будет ответом.</p>\n<p>Объяснение:</p>\n<pre><code>(A1 ^ A2 ^ A3) ^ (A1 ^ A3) = (A1 ^ A1) ^ A2 ^ (A3 ^ A3) = 0 ^ A2 ^ 0 = A2\n</code></pre>\n<h1>Найти точку эквилибриума в массиве</h1>\n<p>Точка эквилибриума - это такой элемент массива, у которого сумма всех элементов слева равна сумме всех элементов справа.</p>\n<h2>Решение 1</h2>\n<p>Можно создать массив сумм, пройти слева направо по массиву и в массив сумм писать "подвижную сумму", Потом идти справа налево, так же считать подвижную сумму и сравнивать ее с элементов в массиве сумм на 2 левее текущего.</p>\n<p>Пример:</p>\n<pre><code>1 2 3 4 5 6 7 2 9 10\n\n1 3 6 10 15 21 28 30 39 49 - массив подвижных сумм слева\n\n21 19 10 - начали считать массив справа, остановились на третьем элементе, т.к. в массиве левых сумм 5-й элемент тоже равен 21.\n</code></pre>\n<p>Но для этого решения нужен дополнительный массив. Можно и без него.</p>\n<h2>Решение 2</h2>\n<ol>\n<li>Считаем сумму всех элементов массива sum</li>\n<li>leftsum = 0</li>\n<li>rightsum = sum</li>\n<li>\n<p>Идем по массиву слева направо, на каждом шаге:</p>\n<ol>\n<li>rightsum -= a[i]</li>\n<li>Если leftsum == rightsum, то точка эквилибриума найдена</li>\n<li>leftsum += a[i]</li>\n</ol>\n</li>\n</ol>\n<h1>External sorting (внешняя сортировка)</h1>\n<p>Применяется для сортировки огромных массивов данных, которые не уменьшаются в память. Массив делится на чанки, помещающиеся в память, каждый из чанков сортируется и пишется на диск. Затем из каждого файла берется начальный мини-чанк и между мини-чанками производится merging на диск. Когда какой-то из мини-чанков пустеет, он заполняется следующими данными из своего файла.</p>\n<h2>Пример</h2>\n<p>Есть 900 МБ файл и 100 МБ памяти.</p>\n<ol>\n<li>Делим файл на 9 чанков по 100 МБ, сортируем каждый quicksort-ом и пишем в отдельный файл на диске.</li>\n<li>Из каждого файла берем первые 10 МБ (мини-чанки) и еще 10 МБ выделяем на выходной буфер.</li>\n<li>Проходим по 9 мини-чанкам, берем первый элемент, ищем минимальный. Когда нашли - аппендим его в выходной буфер, а из мини-чанка удаляем.</li>\n<li>Если после очередного удаления мини-чанк опустел, то заполняем его следующими 10 МБ из его файла.</li>\n<li>Если после очередной записи в выходной буфер он заполнился, то флашим его на диск и очищаем.</li>\n</ol>\n<p>Этап мержа (шаг 3) здесь неэффективен, так как требует приблизительно <code>N * (k - 1)</code> сравнений.</p>\n<p>Можно на этом этапе использовать <a href="https://en.wikipedia.org/wiki/Heap_(data_structure)">min-heap</a> с ключом равным первому элементу чанка. Тогда уложимся в (???) </p>\n<h1>QuickSort</h1>\n<pre><code class="language-csharp">public static class QuickSort\n{\n    public static void Sort&#x3C;T>(T[] input) where T:IComparable\n    {\n        SortImpl(input, 0, input.Length);\n    }\n    private static void SortImpl&#x3C;T>(T[] a, int lo, int hi) where T : IComparable\n    {\n        if (hi - lo &#x3C;= 1) return;\n        T pivot = a[lo];\n        int l = lo, r = hi - 1;\n        while (l &#x3C;= r)\n        {\n            while (a[l].CompareTo(pivot) &#x3C; 0 &#x26;&#x26; l &#x3C; hi) l++;\n            while (a[r].CompareTo(pivot) > 0 &#x26;&#x26; r >= lo) r--;\n            if (l &#x3C;= r)\n            {\n                Swap(a, l, r);\n                l++;\n                r--;\n            }\n        }\n\n        Swap(a, lo, l - 1);\n        SortImpl&#x3C;T>(a, lo, l);\n        SortImpl&#x3C;T>(a, l, hi);\n    }\n\n    private static void Swap&#x3C;T>(T[] input, int a, int b)\n    {\n        T tmp = input[a];\n        input[a] = input[b];\n        input[b] = tmp;\n    }\n}\n</code></pre>\n<h1>Красно-черные деревья</h1>\n<p>Это бинарные поисковые деревья, удовлетворяющие следующим условиям:</p>\n<ol>\n<li>Каждый узел может быть либо красным, либо черным</li>\n<li>Корень всегда черный</li>\n<li>Родителем красного узла не может быть красный узел</li>\n<li>Для каждого листового узла количество черных узлов на пути до корня одинаково</li>\n</ol>\n<p>Для обеспечения этих свойств при вставке узла проводится ребалансировка дерева. Сначала пробуем <strong>перекрашивание</strong>, если оно не работает, то <strong>вращение</strong>. Если дядя красный, то перекрашиваем, если черный - то вращаем и/или перекрашиваем.</p>\n<p>Алгоритм вставки (x - вставляемый узел):</p>\n<ol>\n<li>Делаем x красным и производим стандартную вставку в поисковое бинарное дерево</li>\n<li>Если x - корень, то делаем его черным и завершаем вставку, иначе - красным</li>\n<li>Если родитель x - красный и он корень, то просто делаем его черным и завершаем вставку</li>\n<li>\n<p>Если x не корень или родитель x не черный (в этом случае дедушка точно будет черный), то мы получили <strong>красный-красный-черный</strong>, что нарушает свойство 3. Попробуем это исправить:</p>\n<ol>\n<li>если дядя x - красный, то мы можем просто перекрасить папу и дядю, так как они оба красные и перекрашивание их в черный увеличит количество черных узлов для обоих ветвей деда и не нарушит свойство 4. Однако чтобы не менять количество черных в ветвях нашего поддерева и чтобы не пришлось ребалансировать поддерево брата деда, мы еще и перекрашиваем деда в красный:</li>\n<li>перекрашиваем родителя и дядю в черный</li>\n<li>перекрашиваем деда в красный</li>\n</ol>\n</li>\n</ol>\n<p><img src="./redBlackCase2.png" alt="red-black tree" title="red black case"></p>\n<ol start="2">\n<li>\n<p>eсли дяди нет, или дядя х - черный, то мы не можем перекрасить папу в черный, т.к. это увеличит количество черных узлов на одной ветви, оставим неизменным на остальных и автоматически нарушится свойство 4. Поэтому приходится вертеть:</p>\n<ol>\n<li>p - parent узла х, g - grandfather узла х</li>\n<li>\n<p>возможны 4 случая:</p>\n<ol>\n<li>p слева от g, x слева от p</li>\n<li>p слева от g, x справа от p</li>\n<li>p справа от g, x справа от p</li>\n<li>p справа от g, x слева от p</li>\n</ol>\n</li>\n<li>Для каждого из этих 4 случаев нам нужно нарушающий свойство 3 путь от x вида <strong>красный-красный-черный</strong> в <strong>красный с двумя черными детьми</strong>. Как это сделать - смотрим на картинке (картинка из другой книги, поэтому там добавляемый узел - не x, а просто тот, который самый нижний и в кружочке. На этих случаях всегда x &#x3C; y &#x3C; z, поэтому y в результате становится корнем поддерева: </li>\n</ol>\n</li>\n</ol>\n<p><img src="./redBlackCase3.png" alt="red-black tree" title="red black case"></p>\n<pre><code>  4. После этого нужно перекрасить наше поддерево, сделав корень черным, а его детей красным.\n</code></pre>\n<p>Вращение дерева:</p>\n<p><img src="./Tree_Rotations.gif" alt="tree rotation" title="tree rotation"></p>\n<h1>Нахождение простых чисел</h1>\n<p>Самый быстрый алгоритм на сегодня - решето Аткина. Но его сложно запомнить, поэтому можно на собеседовании использовать решето Эратосфена.</p>',frontmatter:{path:"/blog/algorithms",title:"Algorithms"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-algorithms-1d768e8d148bd6584be9.js.map