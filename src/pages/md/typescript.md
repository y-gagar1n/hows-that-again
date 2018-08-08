---
title: "Typescript"
path: "/blog/typescript"
---
# Typescript

## React

[React typescript cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)

Была такая проблема - я установил пакет **npm**, написанный на **typescript**, и при компиляции мой проект все время ругался на то, что не может найти `@types/react,` хотя он был установлен и в корневом проекте и в зависимости.

Помогло прописать следующее в `tsconfig.json`:


```
"compilerOptions" : {
    "baseUrl": "./",
    "paths": {
      "*": ["node_modules/@types/*", "*"]
  }
```
