---
title: "Webpack"
path: "/blog/webpack 2"
---
# Webpack

## Пример настройки webpack для реакта:

```shell
npm init
npm install -save react react-dom
npm install --global webpack
npm install -save-dev webpack-dev-server webpack
npm install -save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react
``` 

```js
#webpack.config.js

const path = require('path'); 

module.exports = { 
	entry: './index', 
	output: { 
		path: path.resolve('dist'), 
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.map',
		publicPath: '/dist/'
	},

	devtool: '#source-map',
	module: { 
		loaders: [ 
			{ test: /\.js$/, loader:'babel-loader', exclude: /node_modules/} 
		] 
	} 
}
```
  
```json
#.babelrc

{ 
	"presets":[ 
		"es2015", "react"
	] 
}
```
  

```html
#index.html

<!doctype html>
<html>
<head>
<title>Sample App</title>
</head>
<body>
<div id='root'>
</div>
<script src="./dist/bundle.js"></script>
</body>
</html>
```
  

```js
#index.js

import React from 'react' 
import ReactDOM from 'react-dom' 

ReactDOM.render( 
	<h1>Hello!</h1>, 
	document.getElementById("root") 
)
```
  


### Построение

```shell
webpack
```

### Запуск на дев-сервере

```shell
webpack-dev-server
```

  


### Запуск с hot module replacement

```
webpack-dev-server --inline
```

  


## Туториал:

Установка: `npm install webpack -g`

Создаем файл **src\index.js**:

```
console.log('hello!');
```

Запускаем для него webpack:

```
webpack src\index.js assets\bundle.js
```

После этого webpack генерит **bundle.js** с кучей сгенерированного кода. Здесь описан наш index.js и все его зависимости:

```js
/******/ (function(modules) { // webpackBootstrap
/******/ // The module cache
/******/ var installedModules = {};
/******/
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/
/******/ // Check if module is in cache
/******/ if(installedModules[moduleId]) {
/******/ return installedModules[moduleId].exports;
/******/ }
/******/ // Create a new module (and put it into the cache)
/******/ var module = installedModules[moduleId] = {
/******/ i: moduleId,
/******/ l: false,
/******/ exports: {}
/******/ };
/******/
/******/ // Execute the module function
/******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ // Flag the module as loaded
/******/ module.l = true;
/******/
/******/ // Return the exports of the module
/******/ return module.exports;
/******/ }
/******/
/******/
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = modules;
/******/
/******/ // expose the module cache
/******/ __webpack_require__.c = installedModules;
/******/
/******/ // define getter function for harmony exports
/******/ __webpack_require__.d = function(exports, name, getter) {
/******/ if(!__webpack_require__.o(exports, name)) {
/******/ Object.defineProperty(exports, name, {
/******/ configurable: false,
/******/ enumerable: true,
/******/ get: getter
/******/ });
/******/ }
/******/ };
/******/
/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/ __webpack_require__.n = function(module) {
/******/ var getter = module && module.__esModule ?
/******/ function getDefault() { return module['default']; } :
/******/ function getModuleExports() { return module; };
/******/ __webpack_require__.d(getter, 'a', getter);
/******/ return getter;
/******/ };
/******/
/******/ // Object.prototype.hasOwnProperty.call
/******/ __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ // __webpack_public_path__
/******/ __webpack_require__.p = "";
/******/
/******/ // Load entry module and return exports
/******/ return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

console.log('hello!');

/***/ })
/******/ ]);
```

В html после этого достаточно подключить один файл:

```html
<!doctype html> <html> <body> <script src="assets/bundle.js"></script> </body> </html>
```


Теперь создадим более сложную конфигурацию билда:

```js
#build.js
    
module.exports = {
	entry: './index.js',
	output: {
		filename: 'assets/bundle.js'
	}
}
```

### Запуск сборки:

```shell
webpack --config build.js
```

### Плагины

Плагины описываются в конфиге в секции plugins:

```js
const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'assets/bundle.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
}
```

ПРИМЕЧАНИЕ: если при билде будет ругаться на отсутствующий модуль webpack, то надо сделать `npm install webpack --save-dev`

UglifyJsPlugin - Это плагин минификации, после него bundle.js выглядит так:

```js
!function(e){function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n){console.log("hello!")}]);
```

### Загрузчики

Описываются в секции loaders

Позволяют автоматически загружать нужные файлы (когда мы в коде загрузим их через `require(...)` или `import`.

Если где-то в коде есть require/import, а соответствующий лоадер не прописан, то будет ошибка компиляции.


Например, файлы json, js могут подключаться как модуль.

А CSS могут автоматически встраиваться в DOM

    
```js    
module: {
	loaders: [
		{test: /\.css$/, loader: 'style-loader!css-loader'},
		{test: /\.json$/, loader: 'json-loader'},
		{test: /\.hbs$/, loader: 'handlebars-loader'},
		{
			test: /\.(eot|woff|ttf|svg|png|jpg)$/,
			loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
		},

```

Здесь `test` означает паттерн, по которому искать, а `loader` - какой загрузчик использовать.

```
#src/customer.json:
    
    {"name": "Habrahabr"}
```

```src/header.hbs:
    
    <h1>Hello, dear {{name}}</h1>
    
```
    
```js    
var $ = require('jquery');
// загружаем данные из JSON-файла в объект:
var customer = require('./customer.json');
// загружаем и компилируем шаблон:
var Header = require('./header.hbs');
require('./header.css');
// отдаём данные в шаблон и выводим полученный HTML
$('body').prepend(Header(customer));


test: /\.(css|scss)$/,
loaders: ExtractTextPlugin.extract({
  fallbackLoader: 'style',
  loader: 'css?minimize!sass!postcss' // "?" означает, что все что после, будет передано в css-loader как параметры. 
                                      // а "!" означает, что здесь применяется пайплайн справа налево и результат postcss будет передан в sass, потом в minimize
})
```
    
Для загрузки css обычно используется 2 загрузчика:

     - **css-loader** - просто загружает css, чтобы они могли использоваться как модули через import/require
     - **style-loader** - встраивает стиль css в страницу

Типичное применение:

```js
{
	test: /\\.(css|scss)$/,
	loaders: [ 'style-loader', 'css-loader'] // альтернативная запись: loader:'style!css'``
},
```

**ExtractTextWebpack** \- плагин, позволяющий объединить все css файлы в один большой css-файл и подключать в html только его.

```
#loaders:


{
test: /\\.(css|scss)$/,
loaders: ExtractTextPlugin.extract({
fallbackLoader: 'style',
loader: 'css?minimize!sass!postcss'
})
},

#plugins:
 new ExtractTextPlugin('index-[contenthash].css')
```

Такая запись означает, что при загрузке css/scss через require, нужно попытаться прогнать его через пайплайн postcss->sass->minimize и результат записать в один общий файл index-[contenthash].css

А если при обработке пайплайном произошла какая-либо ошибка, то используем обычный style-loader, который заинлайнит наш стиль прямо в html

### Скрипты NPM

```
  {
      ...
      "scripts": {
        "build": "webpack"
      },
      ...
    }
```

После этого можно вместо **webpack** писать **npm run build**

Через Webpack можно загружать:


  1. CSS (https://webpack.js.org/guides/asset-management/#loading-css), `
  2. картинки https://webpack.js.org/guides/asset-management/#loading-images, `
  3. шрифты https://webpack.js.org/guides/asset-management/#loading-fonts


