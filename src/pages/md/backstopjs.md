---
title: "BackstopJS"
path: "/blog/backstopjs"
---

# BackstopJS

Утилита для сравнения скриншотов приложения.

## Как использовать

```shell
backstop init
backstop test
```

Сравнивает актуальные скрины с теми, которые сохранены на диске, открывает веб-страницу с результатами сравнения.

Если нужно пересохранить скрины, или если запускаем первый раз, то:

```shell
backstop test    // выдаст ошибки теста, это нормально, так как скрины на диске не актуальны
backstop approve
```

## Настройка сценариев

После команды `backstop init` на диске появится файл `backstop.json`. В нем в узле `scenarios` можно добавлять новые сценарии:

```
 "scenarios": [{
      "label": "BackstopJS Album",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": "http://192.168.1.3/#/content/albums/4234",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true,
      "onBeforeScript": "puppet/onBefore.js",
      "onReadyScript": "puppet/onReady.js"
    },
```

## Преднастройка

В конфиге есть строки `onBeforeScript`, `onAfterScript`, они указывают на скрипты, которые будут выполнены перед сценарием. Эти скрипты можно указать глобальные (перед каждым сценарием) и локальные (перед определенным). Скрипты выполняются при помощи `puppeteer`. По умолчанию лежат по адресу: `backstop_data/engine_scripts/puppet/`. 

```js
module.exports = async (page, scenario, vp) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));    // это нужно, чтобы в своей консоли видеть то, что выводим в консоль внутри puppeteer

  page.evaluate((x) => {
  	// здесь имеем доступ ко всему браузерному api: document, localStorage и прочее
  	// эта функция выполняется через eval, поэтому брейкпойнты в ней ставить бесполезно
	localStorage.setItem("login", "l");
	console.log("LOGIN: --> ", localStorage.getItem("login") + " <---");
  });
};
```

## Проблемы

У меня так и не получилось использовать `localStorage` в **BackstopJS**. Значения нормально выставляются через скрипты **onBefore/onReady**, но потом приложение читает undefined.