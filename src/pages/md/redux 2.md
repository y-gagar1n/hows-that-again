---
title: "Redux"
path: "/blog/redux 2"
---
# Redux

## Использование с React: 

<http://redux.js.org/docs/basics/UsageWithReact.html>

## Полный текст примера с ToDo: 

<http://redux.js.org/docs/basics/ExampleTodoList.html>

## Загрузка и установка React и Redux

```
npm i redux react-redux --save
```

## Основные принципы Redux:

**СТЭЙТ**(http://redux.js.org/docs/Glossary.html#state) приложения хранится в глобальном дереве объекта в **СТОРЕ**(http://redux.js.org/docs/Glossary.html#store).

Стэйт можно изменить только выбросив **ЭКШН** (http://redux.js.org/docs/Glossary.html#action), который описывает, что произошло.

**РЕДЮСЕРЫ** описывают, как Экшны меняют Стэйт (http://redux.js.org/docs/Glossary.html#reducer). Редюсеры должны быть *чистыми* (pure/stateless) функциями, принимающими Стэйт и Экшн и возвращающими новый Стэйт.

## Особенности использования с React

На старте приложения мы собираем все Редюсеры и создаем из них глобальный Стор.

В `createStore` нужно передавать функцию, поэтому используется `combineReducers`, который из нескольких функций-редюсеров создаст одну.

Вот типичная конструкция создания нового стора:
    
```javascript 
import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

Пример:
    
```javascript    
function visibilityFilter(state = 'SHOW_ALL', action) {   // редюсер
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {    // тоже редюсер
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

Unlike Flux, **Redux does not have the concept of a Dispatcher**. This is because it relies on pure functions instead of event emitters, and pure functions are easy to compose and don't need an additional entity managing them. Depending on how you view Flux, you may see this as either a deviation or an implementation detail. Flux has often been [described as `(state, action) => state`](https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot-1). In this sense, Redux is true to the Flux architecture, but makes it simpler thanks to pure functions.

Another important difference from Flux is that **Redux assumes you never mutate your data**. You can use plain objects and arrays for your state just fine, but mutating them inside the reducers is strongly discouraged. You should always return a new object, which is easy with the [object spread operator proposal](http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html), or with a library like [Immutable](https://facebook.github.io/immutable-js).


**Actions** are payloads of information that send data from your application to your store. They are the *only* source of information for the store. You send them to the store using `[store.dispatch()`](http://redux.js.org/docs/api/Store.html#dispatch).  Обязательное поле - **type**. Так же, если следовать [соглашению](https://github.com/acdlite/flux-standard-action), все данные, которые передаются вместе с действием, кладут внутрь свойства payload. 

*"Actions описывает факт, что что-то произошло, но не указывает, как состояние приложения должно измениться в ответ, это работа для Reducer'а"* \- ([офф. документация](http://redux.js.org/docs/basics/Reducers.html))

**Store** "объединяет" редьюсер (*reducer*) и действия (*actions*), а так же имеет несколько чрезвычайно полезных методов, например:

  * `getState()` \- позволяет получить состояние приложения;
  * `dispatch(actions)` \- позволяет обновлять состояния, путем вызова действия;
  * `subcribe(listener)` \- регистрирует слушателей

Пример использования React с Redux: <https://github.com/reactjs/redux/tree/master/examples/counter/src>

## React-Redux

Все компоненты делятся на **presentational components** и **container components**. 

**presentational** - обычные компоненты Реакта

**container** - компоненты, которые взаимодействуют с редаксом

Контейнеры предпочтительно генерировать с использованием функции `connect()` пакета react-redux.

Чтобы ее использовать, нужно реализовать специальную функцию `mapStateToProps()`, задача которой - *преобразовать **state** редакса в **props** реакта*, которые будут переданы в компонент представления, после чего компонент будет перерисован (если нужно). Функция `mapStateToProps()` будет вызываться каждый раз, когда будет меняться store.

Так же контейнеры могут генерировать экшны, для чего нужно реализовать функцию `mapDispatchToProps()`. Эта функция принимает метод `dispatch` и возвращает объект с коллбэками, которые будут дергать `dispatch` и которые будут внедрены в компонент представления.

Допустим, у нас есть такой компонент:

```jsx
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
)
```

Описанные методы будут выглядеть, например, так:
    
```jsx    
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)
```
    
В метод `connect()` передаются эти 2 функции:
    
```jsx    
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

Таким образом, имеем компонент представления `TodoList` и компонент-контейнер `VisibleToDoList`

Полный код: http://redux.js.org/docs/basics/ExampleTodoList.html

## Provider

Чтобы store был доступен внутри `connect()`, нужно использовать **Provider** (часть **react-redux**):
    
```jsx
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Туториал на русском: <https://maxfarseer.gitbooks.io/redux-course-ru/content/osnovi_redux.html>
