---
title: "Knockout"
path: "/blog/knockout"
---
# Knockout

В общем-то похож на Angular. В разметке можно указывать атрибут data-bind и ему в значение указывать

key-value пары, где key = text, или attr, а value = поле модели, если text, или Json с атрибутами, если attr

Например

	<a data-bind="attr: { href: twitterUrl}, text: twitterAlias" ></a>

В качестве полей модели можно указывать и функции, например:

```js
var viewModel = {
	authorName: ko.observable('Steve Smith'),
	twitterAlias: ko.observable('@ardalis'),
	twitterUrl: ko.computed(function() {
		return "https://twitter.com/";
	}, this)
};
```
  
Модели привязываются командой `ko.applyBindings(model)`

Чтобы связь с полем модели была 2-сторонней, используется `ko.observable`, как выше.
