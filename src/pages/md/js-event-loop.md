---
title: "JS Event Loop"
path: "/blog/js-event-loop"
---
# JS Event Loop

## Microtasks

К микротаскам относятся:

1. Mutation observers
2. Promise.then callbacks

На каждой итерации ивент луп:

1. Делает текущий таск
2. Делает **ВСЕ** микротаски
3. Делает рендер

Но помимо этого, микротаск может быть выполнен **прямо посреди таска** если стэк в этот момент пуст.