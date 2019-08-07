webpackJsonp([92818489627367],{482:function(n,s){n.exports={data:{markdownRemark:{html:'<h1>Redux</h1>\n<h2>Использование с React:</h2>\n<p><a href="http://redux.js.org/docs/basics/UsageWithReact.html">http://redux.js.org/docs/basics/UsageWithReact.html</a></p>\n<h2>Полный текст примера с ToDo:</h2>\n<p><a href="http://redux.js.org/docs/basics/ExampleTodoList.html">http://redux.js.org/docs/basics/ExampleTodoList.html</a></p>\n<h2>Загрузка и установка React и Redux</h2>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">npm i redux react-redux --save</code></pre></div>\n<h2>Основные принципы Redux:</h2>\n<p><strong>СТЭЙТ</strong>(<a href="http://redux.js.org/docs/Glossary.html#state">http://redux.js.org/docs/Glossary.html#state</a>) приложения хранится в глобальном дереве объекта в <strong>СТОРЕ</strong>(<a href="http://redux.js.org/docs/Glossary.html#store">http://redux.js.org/docs/Glossary.html#store</a>).</p>\n<p>Стэйт можно изменить только выбросив <strong>ЭКШН</strong> (<a href="http://redux.js.org/docs/Glossary.html#action">http://redux.js.org/docs/Glossary.html#action</a>), который описывает, что произошло.</p>\n<p><strong>РЕДЮСЕРЫ</strong> описывают, как Экшны меняют Стэйт (<a href="http://redux.js.org/docs/Glossary.html#reducer">http://redux.js.org/docs/Glossary.html#reducer</a>). Редюсеры должны быть <em>чистыми</em> (pure/stateless) функциями, принимающими Стэйт и Экшн и возвращающими новый Стэйт.</p>\n<h2>Особенности использования с React</h2>\n<p>На старте приложения мы собираем все Редюсеры и создаем из них глобальный Стор.</p>\n<p>В <code class="language-text">createStore</code> нужно передавать функцию, поэтому используется <code class="language-text">combineReducers</code>, который из нескольких функций-редюсеров создаст одну.</p>\n<p>Вот типичная конструкция создания нового стора:\n</p>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers<span class="token punctuation">,</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'redux\'</span>\n<span class="token keyword">const</span> reducer <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span> visibilityFilter<span class="token punctuation">,</span> todos <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">)</span></code></pre></div>\n<p>Пример:\n</p>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">visibilityFilter</span><span class="token punctuation">(</span>state <span class="token operator">=</span> <span class="token string">\'SHOW_ALL\'</span><span class="token punctuation">,</span> action<span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">// редюсер</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token string">\'SET_VISIBILITY_FILTER\'</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> action<span class="token punctuation">.</span>filter\n    <span class="token keyword">default</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> state\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">todos</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// тоже редюсер</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token string">\'ADD_TODO\'</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> <span class="token punctuation">[</span>\n        <span class="token operator">...</span>state<span class="token punctuation">,</span>\n        <span class="token punctuation">{</span>\n          text<span class="token punctuation">:</span> action<span class="token punctuation">.</span>text<span class="token punctuation">,</span>\n          completed<span class="token punctuation">:</span> <span class="token boolean">false</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">]</span>\n    <span class="token keyword">case</span> <span class="token string">\'COMPLETE_TODO\'</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">todo<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> action<span class="token punctuation">.</span>index<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> todo<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            completed<span class="token punctuation">:</span> <span class="token boolean">true</span>\n          <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> todo\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">default</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> state\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers<span class="token punctuation">,</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'redux\'</span>\n<span class="token keyword">const</span> reducer <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span> visibilityFilter<span class="token punctuation">,</span> todos <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">)</span></code></pre></div>\n<p>Unlike Flux, <strong>Redux does not have the concept of a Dispatcher</strong>. This is because it relies on pure functions instead of event emitters, and pure functions are easy to compose and don\'t need an additional entity managing them. Depending on how you view Flux, you may see this as either a deviation or an implementation detail. Flux has often been <a href="https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot-1">described as <code class="language-text">(state, action) =&gt; state</code></a>. In this sense, Redux is true to the Flux architecture, but makes it simpler thanks to pure functions.</p>\n<p>Another important difference from Flux is that <strong>Redux assumes you never mutate your data</strong>. You can use plain objects and arrays for your state just fine, but mutating them inside the reducers is strongly discouraged. You should always return a new object, which is easy with the <a href="http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html">object spread operator proposal</a>, or with a library like <a href="https://facebook.github.io/immutable-js">Immutable</a>.</p>\n<p><strong>Actions</strong> are payloads of information that send data from your application to your store. They are the <em>only</em> source of information for the store. You send them to the store using <code class="language-text">[store.dispatch()</code>](<a href="http://redux.js.org/docs/api/Store.html#dispatch">http://redux.js.org/docs/api/Store.html#dispatch</a>).  Обязательное поле - <strong>type</strong>. Так же, если следовать <a href="https://github.com/acdlite/flux-standard-action">соглашению</a>, все данные, которые передаются вместе с действием, кладут внутрь свойства payload. </p>\n<p><em>"Actions описывает факт, что что-то произошло, но не указывает, как состояние приложения должно измениться в ответ, это работа для Reducer\'а"</em> - (<a href="http://redux.js.org/docs/basics/Reducers.html">офф. документация</a>)</p>\n<p><strong>Store</strong> "объединяет" редьюсер (<em>reducer</em>) и действия (<em>actions</em>), а так же имеет несколько чрезвычайно полезных методов, например:</p>\n<ul>\n<li><code class="language-text">getState()</code> - позволяет получить состояние приложения;</li>\n<li><code class="language-text">dispatch(actions)</code> - позволяет обновлять состояния, путем вызова действия;</li>\n<li><code class="language-text">subcribe(listener)</code> - регистрирует слушателей</li>\n</ul>\n<p>Пример использования React с Redux: <a href="https://github.com/reactjs/redux/tree/master/examples/counter/src">https://github.com/reactjs/redux/tree/master/examples/counter/src</a></p>\n<h2>React-Redux</h2>\n<p>Все компоненты делятся на <strong>presentational components</strong> и <strong>container components</strong>. </p>\n<p><strong>presentational</strong> - обычные компоненты Реакта</p>\n<p><strong>container</strong> - компоненты, которые взаимодействуют с редаксом</p>\n<p>Контейнеры предпочтительно генерировать с использованием функции <code class="language-text">connect()</code> пакета react-redux.</p>\n<p>Чтобы ее использовать, нужно реализовать специальную функцию <code class="language-text">mapStateToProps()</code>, задача которой - *преобразовать <strong>state</strong> редакса в <strong>props</strong> реакта*, которые будут переданы в компонент представления, после чего компонент будет перерисован (если нужно). Функция <code class="language-text">mapStateToProps()</code> будет вызываться каждый раз, когда будет меняться store.</p>\n<p>Так же контейнеры могут генерировать экшны, для чего нужно реализовать функцию <code class="language-text">mapDispatchToProps()</code>. Эта функция принимает метод <code class="language-text">dispatch</code> и возвращает объект с коллбэками, которые будут дергать <code class="language-text">dispatch</code> и которые будут внедрены в компонент представления.</p>\n<p>Допустим, у нас есть такой компонент:</p>\n<div class="gatsby-highlight" data-language="jsx"><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function">TodoList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> todos<span class="token punctuation">,</span> onTodoClick <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token punctuation">{</span>todos<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">todo</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Todo</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>todo<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">todo</span><span class="token punctuation">}</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">onTodoClick</span><span class="token punctuation">(</span>todo<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span></code></pre></div>\n<p>Описанные методы будут выглядеть, например, так:\n</p>\n<div class="gatsby-highlight" data-language="jsx"><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function">getVisibleTodos</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">todos<span class="token punctuation">,</span> filter</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>filter<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token string">\'SHOW_ALL\'</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> todos\n    <span class="token keyword">case</span> <span class="token string">\'SHOW_COMPLETED\'</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> todos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">t</span> <span class="token operator">=></span> t<span class="token punctuation">.</span>completed<span class="token punctuation">)</span>\n    <span class="token keyword">case</span> <span class="token string">\'SHOW_ACTIVE\'</span><span class="token punctuation">:</span>\n      <span class="token keyword">return</span> todos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">t</span> <span class="token operator">=></span> <span class="token operator">!</span>t<span class="token punctuation">.</span>completed<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">mapStateToProps</span> <span class="token operator">=</span> <span class="token parameter">state</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    todos<span class="token punctuation">:</span> <span class="token function">getVisibleTodos</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>todos<span class="token punctuation">,</span> state<span class="token punctuation">.</span>visibilityFilter<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">mapDispatchToProps</span> <span class="token operator">=</span> <span class="token parameter">dispatch</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function-variable function">toggleTodo</span><span class="token punctuation">:</span> <span class="token parameter">id</span> <span class="token operator">=></span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">toggleTodo</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">TodoList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> todos<span class="token punctuation">,</span> toggleTodo <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token punctuation">{</span>todos<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">todo</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Todo</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>todo<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">todo</span><span class="token punctuation">}</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">toggleTodo</span><span class="token punctuation">(</span>todo<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span></code></pre></div>\n<p>В метод <code class="language-text">connect()</code> передаются эти 2 функции:\n</p>\n<div class="gatsby-highlight" data-language="jsx"><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> connect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span>\n\n<span class="token keyword">const</span> VisibleTodoList <span class="token operator">=</span> <span class="token function">connect</span><span class="token punctuation">(</span>\n  mapStateToProps<span class="token punctuation">,</span>\n  mapDispatchToProps\n<span class="token punctuation">)</span><span class="token punctuation">(</span>TodoList<span class="token punctuation">)</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> VisibleTodoList</code></pre></div>\n<p>Таким образом, имеем компонент представления <code class="language-text">TodoList</code> и компонент-контейнер <code class="language-text">VisibleToDoList</code></p>\n<p>Полный код: <a href="http://redux.js.org/docs/basics/ExampleTodoList.html">http://redux.js.org/docs/basics/ExampleTodoList.html</a></p>\n<h2>Provider</h2>\n<p>Чтобы store был доступен внутри <code class="language-text">connect()</code>, нужно использовать <strong>Provider</strong> (часть <strong>react-redux</strong>):\n</p>\n<div class="gatsby-highlight" data-language="jsx"><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> render <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'redux\'</span>\n<span class="token keyword">import</span> todoApp <span class="token keyword">from</span> <span class="token string">\'./reducers\'</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">\'./components/App\'</span>\n\n<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>todoApp<span class="token punctuation">)</span>\n\n<span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Provider</span></span> <span class="token attr-name">store</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Provider</span></span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span></code></pre></div>\n<p>Туториал на русском: <a href="https://maxfarseer.gitbooks.io/redux-course-ru/content/osnovi_redux.html">https://maxfarseer.gitbooks.io/redux-course-ru/content/osnovi_redux.html</a></p>',frontmatter:{path:"/blog/redux 2",title:"Redux"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-redux-2-6f2fe56d9b8eadc3bdcb.js.map