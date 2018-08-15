---
title: "Webpack"
path: "/blog/webpack"
---
# Webpack

## Dynamic requires

Если в тексте есть динамические `require`, например:

```js
let list = ['a', 'b', 'c'];
let arr = list.map(name => require('my-package/' + name + ".json"));
```

то `webpack` всегда включает в бандл весь пакет `my-package` так как не знает наверняка, что нужно включать. Более того, он это сделать даже если массив `list` будет пустым.

[Ишью](https://github.com/webpack/webpack/issues/5639)

## resolve.modules

### Проблема

Используем подприложение, которая ссылается на файл **postcss_vars.json**,
который всегда лежит в корне приложения. Ссылается так:

```js
import "../../../../postcss_vars.json"
```

Для подприложения, когда оно работает автономно - это нормально, но когда мы
его включаем как модуль в другое приложение, этот путь больше не работает, так
как теперь postcss_vars.json лежит в корне НАД-приложения.

### Решение

В обоих конфигах вебпака прописываем:

```json
resolve: {
    modules: [
      path.resolve(__dirname),
      path.resolve(__dirname + "/node_modules")
    ]
  }
```

А импорт меняем на следующее:

```js
import "postcss_vars.json";
```

Конструкция `resolve.modules` указывает, где искать импортируемые модули.
В нашем случае мы указали, что надо искать в папке **node_modules** и в корне приложения.

## rules

### Проблема

Нужно для некоторой папки применить особое правило postcss.

### Решение

Вебпак применяет правила и лоадеры от последнего к первому. Поэтому нужно это особое правило написать **под** основным.

```json
  {
        test: /\.s?css$/,
        loader: "style-loader!css-loader!postcss-loader",
        exclude: /node_modules\/(?!(vocord-ui)|(react-datetime)|(react-dropdown)\/).*/
      },
      {
        test: /apps\/license\/.*\.s?css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("postcss-prefix-selector")({
                  prefix: ".license-server "
                })
              ]
            }
          }
        ],
        exclude: /node_modules\/(?!(vocord-ui)|(react-datetime)|(react-dropdown)\/).*/
      },
```

в этом случае у лоадеры применятся в следующем порядке:

1. На стили из папки `apps/license` -  postcss с плагином `postcss-prefix-selector`
2. На все стили - postcss с правилами из конфига
3. css-loader
4. style-loader

### Проблема

Есть проект верстки, js в нем нет, нужно организовать лайв-релоуд

### Решение

```shell
npm i -g live-server
cd %project dir%
live-server
```