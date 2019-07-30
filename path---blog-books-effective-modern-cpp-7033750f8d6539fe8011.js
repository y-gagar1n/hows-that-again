webpackJsonp([0x5f414e30ac44],{423:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>Effective Modern C++</h1>\n<h2>Вывод типов через auto</h2>\n<p>Тип для <code>auto</code> выводится так же, как и для шаблонов. В том выводе типов у нас есть определение шаблона и его вызов:</p>\n<pre><code class="language-cpp">template&#x3C;typename T>\nvoid f(ParamType param);\n\nf(expr);\n</code></pre>\n<p>Когда переменная объявляется через <code>auto</code>, то <code>auto</code> выступает в роли <strong>T</strong>, а спецификатор типа - как <code>ParamType</code>. Например:</p>\n<pre><code class="language-cpp">auto x = 27;            // auto -> T, auto -> ParamType\nconst auto cx = x;      // auto -> T, const auto -> ParamType\nconst auto&#x26; rx = x;     // auto -> T, const auto&#x26; -> ParamType\n</code></pre>\n<p>Для вывода представим соответствующие им шаблоны и их вызовы:</p>\n<pre><code class="language-cpp">template&#x3C;typename T>\nvoid func_x(T param);\n\nfunc_x(27);     // ParamTYpe -> int, T -> int\n\ntemplate&#x3C;typename T>\nvoid func_cx(const T param);\n\nfunc_cx(x);     // ParamType -> const int, T -> int\n\ntemplate&#x3C;typename T>\nvoid func_rx(const T&#x26; param);\n\nfunc_rx(x);     // ParamType -> const int&#x26;, T -> int\n</code></pre>\n<p>Во всех остальных случаях логика точно такая же как и для вывода типа шаблона. Но есть одно исключение, о нем дальше.</p>\n<h3>Особый случай для initializer_list</h3>\n<pre><code class="language-cpp">auto x1 = 27;       // int\nauto x2(27);        // int\nauto x3 = {27};     // std::initializer_list&#x3C;int> = {27}\nauto x4{27};        // std::initializer_list&#x3C;int> = {27}\n</code></pre>\n<p>Так происходит потому что в выводе типов через <code>auto</code> прописано особое правило: <strong>если значение для авто-объявленной переменной заключено в фигурные скобки, то тип ВСЕГДА выводится как std::initializer_list</strong>.</p>\n<p>При этом в выводе типов для шаблонов такого правила нет и это единственное место где алгоритмы различаются:</p>\n<pre><code class="language-cpp">template&#x3C;typename T>\nvoid f(T param);\n\nf({ 11, 23, 9 }); // ОШИБКА КОМПИЛЯЦИИ!\n\ntemplate&#x3C;typename T>\nvoid f2(std::initializer_list&#x3C;T> list);\n\nfw({11,23,9});      // все ок, тип T выводится как int\n</code></pre>\n<h2>decltype</h2>\n<p><strong>decltype</strong> - это функция, которая принимает переменную, а возвращает ее тип. Может быть использована там, где ожидается указание типа.</p>\n<pre><code class="language-cpp">const int i = 0;            // decltype(i) -> const int\nbool f(const Widget&#x26;);      // decltype(w) -> const Widget&#x26;, decltype(f) -> bool(const Widget&#x26;)\n</code></pre>\n<p>Обычно используется там, где тип возвращаемого значения зависит от типа аргумента:</p>\n<pre><code class="language-cpp">template&#x3C;typename Container, typename Index>\nauto authAndAccess(Container&#x26; c, Index i) -> decltype(c[i]) {\n    authenticateser();\n    return c[i];\n}\n</code></pre>\n<p>здесь <code>auto</code> не имеет отношения к выводу типов, а лишь указывает, что возвращаемый тип будет указан после списка параметров (trailing return type syntax). Такой синтаксис необходимо использовать, когда тип возвращаемого значения зависит от типов параметров.</p>\n<p>В C++14 можно возвращать из функций <code>auto</code>, не указывая тип после стрелочки, но с этим бывают проблемы, поэтому рекомендуется возвращать <code>decltype(auto)</code>.</p>\n<p>С <code>authAndAccess</code> осталась одна проблема - она не сможет принимать rvalue для контейнера. Модифицируем так, чтобы мог:</p>\n<pre><code class="language-cpp">template&#x3C;typename Container, typename Index>\nauto get(Container&#x26;&#x26; c, Index i) -> decltype(std::forward&#x3C;Container>(c)[i]) {\n  authenticateUser();\n  return std::forward&#x3C;Container>(c)[i];\n}\n</code></pre>\n<p>Теперь для <strong>c</strong> типа lvalue функция будет возвращать lvalue, а для rvalue - rvalue.</p>\n<h3>Особенность поведения decltype</h3>\n<p>Применение <strong>decltype</strong> к имени переменной возвращает тип этого имени. Однако применение к lvalue, котороя является чем-то более сложным, чем имя, возвращает ссылку на lvalue. То есть <strong>decltype</strong> над выражением не-именем, имеющим тип <strong>T</strong> вернет тип <strong>T&#x26;</strong>. Такое поведение редко на что-либо влияет, однако есть интересное следствие:</p>\n<pre><code class="language-cpp">int x = 0;\ndecltype(x);    // int\ndecltype((x));  // int&#x26;\n</code></pre>\n<p>Как видно, оборачивание значения в скобки может поменять значение, возвращаемое <strong>decltype</strong>. Это особенно важно в C++14, где можно возвращать из функции <code>decltype(auto)</code> и случайно можно вернуть ссылку на элемент вместо элемента.</p>',frontmatter:{path:"/blog/books/effective-modern-cpp",title:"Effective Modern C++"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-books-effective-modern-cpp-7033750f8d6539fe8011.js.map