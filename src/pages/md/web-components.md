---
title: "Web components"
path: "/blog/web-components"
---
# Web components

## React

Для использования с реактом есть пакет `https://github.com/WeltN24/react-web-component`, но он устарел (использует `createShadowRoot` вместо `attachShadow`), поэтому нужно испольовать его форк `https://github.com/Artmann/react-web-component/tree/use-web-component-polyfills`.

### react-web-component-style-loader

Чтобы не потерять стили, нужно использовать `react-web-component-style-loader`, но с ним есть одна проблема. Если в проекте вебпака создается больше одного веб-компонента, то у каждого из них в его `shadow DOM` будут стили и свои и всех остальных. Так получается, потому что этот загрузчик пихает в `shadow DOM` все стили, которые находит в проекте.