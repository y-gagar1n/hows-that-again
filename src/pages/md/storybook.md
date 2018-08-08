---
title: "Storybook"
path: "/blog/storybook"
---
# Storybook

## PostCSS

 Если нужно задать свои правила для postcss, то создаем `.storybook/webpack.config.js` со следующим содержанием:

```js
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
    // это нужно, чтобы настройка webpack для storybook подхватывала переменные scss
    // storybook api не позволяет расширить существующий конфиг, поэтому приходится в рантайме менять дефолтный
    // все, что мы здесь делаем - это грохаем дефолтный конфиг postcss и указываем ему на свой, лежащий в корне
    try{
        var cssRule = defaultConfig.module.rules.filter(r => r.test.toString() == "/\\.css$/")[0];
        var postcssLoader = cssRule.use.filter(l => l.loader && l.loader.includes("postcss-loader"))[0];
        postcssLoader.options = { config: { path: path.join(__dirname, "..") }};
        return defaultConfig;
    }
    catch(err)
    {
        console.log("\nSomething wrong happened while trying to configure storybook's webpack.config");
        throw err;
    }
  };
```