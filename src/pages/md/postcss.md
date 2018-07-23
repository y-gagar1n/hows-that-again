---
title: "PostCSS"
path: "/blog/postcss"
---
# PostCSS

## Конфигурация

В конфиге postcss есть переменная `path`  и в документации указано, что она указывает путь к конфигу, так вот она **НИФИГА** не указывает путь к конфигу, а указывает папку, в которой будет искаться конфиг. Это значит, что нельзя использовать нестандартные имена конфига помимо `postcss.config.js`, `.postcssrc` и прочих, которые используются в `cosmoconfig`. 

Ишью на эту тему: https://github.com/michael-ciniawsky/postcss-load-config/issues/127
https://github.com/postcss/postcss-loader/issues/358

## Пример простого пгагин

```js
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-simple-test', function (opts) {
    opts = opts || {};

    return function (root, result) {
        root.walkRules(function (rule) {   // проходим по всем правилам в css
            rule.walkDecls(/^overflow-?/, function (decl) {  // проходим по всем объявленим свойств в правиле, у которых название свойства удовлетворяет указанному регексу
                if (decl.value === 'scroll') {
                    var hasTouch = rule.some(function (i) {   // возращает true, если какие-то из деклараций в оригинальном правиле удовлетворяют предикату
                        return i.prop === '-webkit-overflow-scrolling';
                    });
                    if (!hasTouch) {
                        rule.append({    // дописываем в правило новую декларацию
                            prop: '-webkit-overflow-scrolling',
                            value: 'touch'
                        });
                    }
                }
            });
        });
    };
});
```