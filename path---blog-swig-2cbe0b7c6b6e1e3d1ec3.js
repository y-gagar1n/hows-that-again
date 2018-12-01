webpackJsonp([34503133861313],{473:function(r,n){r.exports={data:{markdownRemark:{html:'<h1>SWIG</h1>\n<h2>Python - C++</h2>\n<p>Чтобы передать внутрь функции массив:</p>\n<pre><code>///example.i\n%include "carrays.i"\n...\n%array_class(int, intArray)\n</code></pre>\n<p>В .py сгенерятся функции для работы с массивами, пример использования:</p>\n<pre><code>import example\n\narr = example.intArray(3)\nfor i in range(3):\n    arr[i] = i\n\narr2 = example.intArray_frompointer(example.transform(arr, 3))\nfor i in range(3):\n    print(arr2[i])\n</code></pre>\n<p>Здесь используются функции intArray и intArray_frompointer, так как функция transform возвращает int*</p>\n<h2>cdata.i</h2>\n<p>cdata преобразует intArray в питоновский str</p>\n<p>memmove преобразует питоновский str в intArray</p>',frontmatter:{path:"/blog/swig",title:"SWIG"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-swig-2cbe0b7c6b6e1e3d1ec3.js.map