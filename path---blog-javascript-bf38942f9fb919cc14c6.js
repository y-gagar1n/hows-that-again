webpackJsonp([0x701f197ef210],{442:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>Javascript</h1>\n<h2><code>__proto__</code></h2>\n<p>Если свойство не находится в объекте (например <code>obj.property</code>), то оно ищется в <code>obj.__proto__.property</code>. Затем в <code>obj.__proto__.__proto__.property</code> и так до тех пор, пока следующий <code>__proto__</code> не окажется равным <code>null</code>.</p>\n<h2>prototype.constructor</h2>\n<p>Все функции имеют свойство <code>prototype</code>, у которого по умолчанию имеется единственное свойство <code>constructor</code>, в котором хранится сама функция.</p>\n<h2>new()</h2>\n<p>Когда исполняется <code>new Foo(...)</code> , происходит следующее:</p>\n<ol>\n<li>Создается новый объект, наследующий Foo.prototype. То есть, примерно так: <code>var newFoo = { __proto__: Foo.prototype}</code></li>\n<li>Вызывается конструктор — функция Foo с указанными аргументами и this, привязанным к только что созданному объекту. new Foo эквивалентно new Foo(), то есть если аргументы не указаны, Foo вызывается без аргументов.</li>\n<li>Результатом выражения new становится объект, возвращенный конструктором. Если конструктор не возвращает объект явно, или возвращает примитивный тип, то используется объект из п. 1.</li>\n</ol>\n<h3>Альтернативное объяснение:</h3>\n<p>new Test():</p>\n<ol>\n<li>create <code>new Object()</code> obj</li>\n<li>set <code>obj.__proto__</code> to <code>Test.prototype</code></li>\n<li><code>return Test.call(obj) || obj;</code> // normally obj is returned but constructors in JS can return a value</li>\n</ol>\n<h3>Примеры</h3>\n<pre><code class="language-js">var Math = function() { };\nMath.prototype.add = function(a,b) { return a + b; };\nvar m = new Math(); // Math.prototype\nm.add(5,6); // 11\n</code></pre>\n<pre><code class="language-js">var Math = function() { return { msg: "hello" } };\nMath.prototype.add = function(a,b) { return a + b; };\nvar m = new Math(); // { msg: "hello" }\nm.add; // undefined\n</code></pre>\n<h2>Object.create()</h2>\n<pre><code class="language-js">Object.create(prototype, descriptors)\n</code></pre>\n<p>Создает объект "из воздуха", используя переданный первым аргументом объект в качестве <code>__proto__</code>. Если в качестве прототипа передать <code>null</code>, то полученный объект не будет иметь прототипа. Дескриптор содержит атрибуты <code>value</code>, <code>writable</code>, <code>enumerable</code>, <code>configurable</code>.</p>\n<pre><code class="language-js">var newObj = Object.create(null, {\n    size: {\n        value: "large",\n        enumerable: true\n    },\n    shape: {\n        value: "round",\n        enumerable: true\n    }\n});\n</code></pre>\n<h3>Отличие от new</h3>\n<p>Можно сказать, что <code>new X</code> это тоже самое, что <code>Object.create(X.prototype)</code>, только еще будет запущен конструктор X.</p>\n<h2>for...in</h2>\n<p>Цикл for-in для массива/объекта итерирует не по элементам, а по их индексам/ключам:</p>\n<pre><code class="language-js">var arr = [9, 2, 5];\nfor(var item in arr) {\n    console.log(item); // 1, 2, 3\n}\n</code></pre>\n<p>В ES6 есть цикл <code>for...of</code>, итерирующий по значениям:</p>\n<pre><code class="language-js">var arr = [9, 2, 5];\nfor(var item of arr) {\n    console.log(item); // 9, 2, 5\n}\n</code></pre>\n<h2>Вопрос про замыкания</h2>\n<pre><code class="language-js">var funcs = [];\n// create a bunch of functions\nfor (var i = 0; i &#x3C; 3; i++) {\n    funcs.push(function() {\n        console.log(i);\n    })\n}\n// call them\nfor (var j = 0; j &#x3C; 3; j++) {\n    funcs[j]();\n}\n</code></pre>\n<p>Этот код выдаст <code>3, 3, 3</code>. Объявить локальную переменную в теле цикла не поможет, так как в JS функции имеют function-scope область видимости.</p>\n<p>Приходится использовать IIFE:</p>\n<pre><code class="language-js">var funcs = [];\n// create a bunch of functions\nfor (var i = 0; i &#x3C; 3; i++) {\n    (function() {\n        var local = i;\n        funcs.push(function() {\n        console.log(local);\n    })\n    })();\n}\n// call them\nfor (var j = 0; j &#x3C; 3; j++) {\n    funcs[j]();\n}\n</code></pre>\n<p>В ES6 проблема решается простой заменой <code>var</code> на <code>let</code> в первом цикле:</p>\n<pre><code class="language-js">var funcs = [];\n// create a bunch of functions\nfor (let i = 0; i &#x3C; 3; i++) { // Note the use of let\n    funcs.push(function() {\n        console.log(i);\n    })\n}\n// call them\nfor (var j = 0; j &#x3C; 3; j++) {\n    funcs[j]();\n}\n</code></pre>',frontmatter:{path:"/blog/javascript",title:"Javascript"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-javascript-bf38942f9fb919cc14c6.js.map