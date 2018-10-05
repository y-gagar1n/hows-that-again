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

## Перегрузка конструкторов

Можно иметь несколько перегрузок конструкторов, но при этом только одна реализация. Все перегрузки должны быть автоматически приводимы к сигнатуре этой реализации.

Пример:

```typescript
class Box {
    public x: number;
    public y: number;
    public height: number;
    public width: number;

    constructor();
    constructor(obj: IBox); 
    constructor(obj?: any) {    
        this.x = obj && obj.x || 0
        this.y = obj && obj.y || 0
        this.height = obj && obj.height || 0
        this.width = obj && obj.width || 0;
    }   
}
```

## Констрэйнты

```typescript
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

## Классы и интерфейсы

Объявление класса автоматически создает интерфейс с таким именем, поэтому все классы можно использовать и как интерфейсы:

```typescript
class Bar {
    y: number;
}

interface IBaz extends Bar { } // includes y: number

class CBaz implements Bar {
    y: number = 5;
}
```

Если есть несколько объявлений интерфейсов с одинакомым именем, то они будут смержены:

```typescript
interface Foo {
    x: number;
}

interface Foo {
    y: string;
}

let g = {} as Foo;
g.x; // OK
g.y; // OK
```