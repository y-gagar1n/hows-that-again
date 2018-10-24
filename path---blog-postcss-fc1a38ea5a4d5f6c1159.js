webpackJsonp([0xf4bbcd79fc29],{444:function(s,o){s.exports={data:{markdownRemark:{html:"<h1>PostCSS</h1>\n<h2>Конфигурация</h2>\n<p>В конфиге postcss есть переменная <code>path</code>  и в документации указано, что она указывает путь к конфигу, так вот она <strong>НИФИГА</strong> не указывает путь к конфигу, а указывает папку, в которой будет искаться конфиг. Это значит, что нельзя использовать нестандартные имена конфига помимо <code>postcss.config.js</code>, <code>.postcssrc</code> и прочих, которые используются в <code>cosmoconfig</code>. </p>\n<p>Ишью на эту тему: <a href=\"https://github.com/michael-ciniawsky/postcss-load-config/issues/127\">https://github.com/michael-ciniawsky/postcss-load-config/issues/127</a>\n<a href=\"https://github.com/postcss/postcss-loader/issues/358\">https://github.com/postcss/postcss-loader/issues/358</a></p>\n<h2>Пример простого пгагин</h2>\n<pre><code class=\"language-js\">var postcss = require('postcss');\n\nmodule.exports = postcss.plugin('postcss-simple-test', function (opts) {\n    opts = opts || {};\n\n    return function (root, result) {\n        root.walkRules(function (rule) {   // проходим по всем правилам в css\n            rule.walkDecls(/^overflow-?/, function (decl) {  // проходим по всем объявленим свойств в правиле, у которых название свойства удовлетворяет указанному регексу\n                if (decl.value === 'scroll') {\n                    var hasTouch = rule.some(function (i) {   // возращает true, если какие-то из деклараций в оригинальном правиле удовлетворяют предикату\n                        return i.prop === '-webkit-overflow-scrolling';\n                    });\n                    if (!hasTouch) {\n                        rule.append({    // дописываем в правило новую декларацию\n                            prop: '-webkit-overflow-scrolling',\n                            value: 'touch'\n                        });\n                    }\n                }\n            });\n        });\n    };\n});\n</code></pre>",frontmatter:{path:"/blog/postcss",title:"PostCSS"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-postcss-fc1a38ea5a4d5f6c1159.js.map