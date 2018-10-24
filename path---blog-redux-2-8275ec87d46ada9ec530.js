webpackJsonp([92818489627367],{449:function(e,t){e.exports={data:{markdownRemark:{html:'<h1>Redux</h1>\n<h2>Использование с React:</h2>\n<p><a href="http://redux.js.org/docs/basics/UsageWithReact.html">http://redux.js.org/docs/basics/UsageWithReact.html</a></p>\n<h2>Полный текст примера с ToDo:</h2>\n<p><a href="http://redux.js.org/docs/basics/ExampleTodoList.html">http://redux.js.org/docs/basics/ExampleTodoList.html</a></p>\n<h2>Загрузка и установка React и Redux</h2>\n<pre><code>npm i redux react-redux --save\n</code></pre>\n<h2>Основные принципы Redux:</h2>\n<p><strong>СТЭЙТ</strong>(<a href="http://redux.js.org/docs/Glossary.html#state">http://redux.js.org/docs/Glossary.html#state</a>) приложения хранится в глобальном дереве объекта в <strong>СТОРЕ</strong>(<a href="http://redux.js.org/docs/Glossary.html#store">http://redux.js.org/docs/Glossary.html#store</a>).</p>\n<p>Стэйт можно изменить только выбросив <strong>ЭКШН</strong> (<a href="http://redux.js.org/docs/Glossary.html#action">http://redux.js.org/docs/Glossary.html#action</a>), который описывает, что произошло.</p>\n<p><strong>РЕДЮСЕРЫ</strong> описывают, как Экшны меняют Стэйт (<a href="http://redux.js.org/docs/Glossary.html#reducer">http://redux.js.org/docs/Glossary.html#reducer</a>). Редюсеры должны быть <em>чистыми</em> (pure/stateless) функциями, принимающими Стэйт и Экшн и возвращающими новый Стэйт.</p>\n<h2>Особенности использования с React</h2>\n<p>На старте приложения мы собираем все Редюсеры и создаем из них глобальный Стор.</p>\n<p>В <code>createStore</code> нужно передавать функцию, поэтому используется <code>combineReducers</code>, который из нескольких функций-редюсеров создаст одну.</p>\n<p>Вот типичная конструкция создания нового стора:\n</p>\n<pre><code class="language-javascript">import { combineReducers, createStore } from \'redux\'\nconst reducer = combineReducers({ visibilityFilter, todos })\nconst store = createStore(reducer)\n</code></pre>\n<p>Пример:\n</p>\n<pre><code class="language-javascript">function visibilityFilter(state = \'SHOW_ALL\', action) {   // редюсер\n  switch (action.type) {\n    case \'SET_VISIBILITY_FILTER\':\n      return action.filter\n    default:\n      return state\n  }\n}\n\nfunction todos(state = [], action) {    // тоже редюсер\n  switch (action.type) {\n    case \'ADD_TODO\':\n      return [\n        ...state,\n        {\n          text: action.text,\n          completed: false\n        }\n      ]\n    case \'COMPLETE_TODO\':\n      return state.map((todo, index) => {\n        if (index === action.index) {\n          return Object.assign({}, todo, {\n            completed: true\n          })\n        }\n        return todo\n      })\n    default:\n      return state\n  }\n}\n\nimport { combineReducers, createStore } from \'redux\'\nconst reducer = combineReducers({ visibilityFilter, todos })\nconst store = createStore(reducer)\n</code></pre>\n<p>Unlike Flux, <strong>Redux does not have the concept of a Dispatcher</strong>. This is because it relies on pure functions instead of event emitters, and pure functions are easy to compose and don\'t need an additional entity managing them. Depending on how you view Flux, you may see this as either a deviation or an implementation detail. Flux has often been <a href="https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot-1">described as <code>(state, action) => state</code></a>. In this sense, Redux is true to the Flux architecture, but makes it simpler thanks to pure functions.</p>\n<p>Another important difference from Flux is that <strong>Redux assumes you never mutate your data</strong>. You can use plain objects and arrays for your state just fine, but mutating them inside the reducers is strongly discouraged. You should always return a new object, which is easy with the <a href="http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html">object spread operator proposal</a>, or with a library like <a href="https://facebook.github.io/immutable-js">Immutable</a>.</p>\n<p><strong>Actions</strong> are payloads of information that send data from your application to your store. They are the <em>only</em> source of information for the store. You send them to the store using <code>[store.dispatch()</code>](<a href="http://redux.js.org/docs/api/Store.html#dispatch">http://redux.js.org/docs/api/Store.html#dispatch</a>).  Обязательное поле - <strong>type</strong>. Так же, если следовать <a href="https://github.com/acdlite/flux-standard-action">соглашению</a>, все данные, которые передаются вместе с действием, кладут внутрь свойства payload. </p>\n<p><em>"Actions описывает факт, что что-то произошло, но не указывает, как состояние приложения должно измениться в ответ, это работа для Reducer\'а"</em> - (<a href="http://redux.js.org/docs/basics/Reducers.html">офф. документация</a>)</p>\n<p><strong>Store</strong> "объединяет" редьюсер (<em>reducer</em>) и действия (<em>actions</em>), а так же имеет несколько чрезвычайно полезных методов, например:</p>\n<ul>\n<li><code>getState()</code> - позволяет получить состояние приложения;</li>\n<li><code>dispatch(actions)</code> - позволяет обновлять состояния, путем вызова действия;</li>\n<li><code>subcribe(listener)</code> - регистрирует слушателей</li>\n</ul>\n<p>Пример использования React с Redux: <a href="https://github.com/reactjs/redux/tree/master/examples/counter/src">https://github.com/reactjs/redux/tree/master/examples/counter/src</a></p>\n<h2>React-Redux</h2>\n<p>Все компоненты делятся на <strong>presentational components</strong> и <strong>container components</strong>. </p>\n<p><strong>presentational</strong> - обычные компоненты Реакта</p>\n<p><strong>container</strong> - компоненты, которые взаимодействуют с редаксом</p>\n<p>Контейнеры предпочтительно генерировать с использованием функции <code>connect()</code> пакета react-redux.</p>\n<p>Чтобы ее использовать, нужно реализовать специальную функцию <code>mapStateToProps()</code>, задача которой - *преобразовать <strong>state</strong> редакса в <strong>props</strong> реакта*, которые будут переданы в компонент представления, после чего компонент будет перерисован (если нужно). Функция <code>mapStateToProps()</code> будет вызываться каждый раз, когда будет меняться store.</p>\n<p>Так же контейнеры могут генерировать экшны, для чего нужно реализовать функцию <code>mapDispatchToProps()</code>. Эта функция принимает метод <code>dispatch</code> и возвращает объект с коллбэками, которые будут дергать <code>dispatch</code> и которые будут внедрены в компонент представления.</p>\n<p>Допустим, у нас есть такой компонент:</p>\n<pre><code class="language-jsx">const TodoList = ({ todos, onTodoClick }) => (\n  &#x3C;ul>\n    {todos.map(todo => (\n      &#x3C;Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />\n    ))}\n  &#x3C;/ul>\n)\n</code></pre>\n<p>Описанные методы будут выглядеть, например, так:\n</p>\n<pre><code class="language-jsx">const getVisibleTodos = (todos, filter) => {\n  switch (filter) {\n    case \'SHOW_ALL\':\n      return todos\n    case \'SHOW_COMPLETED\':\n      return todos.filter(t => t.completed)\n    case \'SHOW_ACTIVE\':\n      return todos.filter(t => !t.completed)\n  }\n}\n\nconst mapStateToProps = state => {\n  return {\n    todos: getVisibleTodos(state.todos, state.visibilityFilter)\n  }\n}\n\nconst mapDispatchToProps = dispatch => ({\n  toggleTodo: id => dispatch(toggleTodo(id))\n})\n\nconst TodoList = ({ todos, toggleTodo }) => (\n  &#x3C;ul>\n    {todos.map(todo => (\n      &#x3C;Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />\n    ))}\n  &#x3C;/ul>\n)\n</code></pre>\n<p>В метод <code>connect()</code> передаются эти 2 функции:\n</p>\n<pre><code class="language-jsx">import { connect } from \'react-redux\'\n\nconst VisibleTodoList = connect(\n  mapStateToProps,\n  mapDispatchToProps\n)(TodoList)\n\nexport default VisibleTodoList\n</code></pre>\n<p>Таким образом, имеем компонент представления <code>TodoList</code> и компонент-контейнер <code>VisibleToDoList</code></p>\n<p>Полный код: <a href="http://redux.js.org/docs/basics/ExampleTodoList.html">http://redux.js.org/docs/basics/ExampleTodoList.html</a></p>\n<h2>Provider</h2>\n<p>Чтобы store был доступен внутри <code>connect()</code>, нужно использовать <strong>Provider</strong> (часть <strong>react-redux</strong>):\n</p>\n<pre><code class="language-jsx">import React from \'react\'\nimport { render } from \'react-dom\'\nimport { Provider } from \'react-redux\'\nimport { createStore } from \'redux\'\nimport todoApp from \'./reducers\'\nimport App from \'./components/App\'\n\nlet store = createStore(todoApp)\n\nrender(\n  &#x3C;Provider store={store}>\n    &#x3C;App />\n  &#x3C;/Provider>,\n  document.getElementById(\'root\')\n)\n</code></pre>\n<p>Туториал на русском: <a href="https://maxfarseer.gitbooks.io/redux-course-ru/content/osnovi_redux.html">https://maxfarseer.gitbooks.io/redux-course-ru/content/osnovi_redux.html</a></p>',frontmatter:{path:"/blog/redux 2",title:"Redux"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-redux-2-8275ec87d46ada9ec530.js.map