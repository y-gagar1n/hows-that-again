webpackJsonp([62231134199178],{476:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>React</h1>\n<p>Разница между React.createClass и extends Component: <a href="https://toddmotto.com/react-create-class-versus-component/">https://toddmotto.com/react-create-class-versus-component/</a></p>\n<h2>Installation</h2>\n<p><a href="http://github.com/facebookincubator/create-react-app">Create React App</a> is the best way to start building a new React single page application.</p>\n<pre><code class="language-shell">npm install -g create-react-app\ncreate-react-app my-app\ncd my-app\nnpm start\n</code></pre>\n<p>После генерации получаем следующее:</p>\n<pre><code class="language-jsx">//index.js\n\nimport React from \'react\';\nimport ReactDOM from \'react-dom\';\nimport App from \'./App\';\nimport \'./index.css\';\n\nReactDOM.render(\n  &#x3C;App />,\n  document.getElementById(\'root\')\n);\n</code></pre>\n<pre><code class="language-jsx">//App.js\n\nimport React, { Component } from \'react\';\nimport logo from \'./logo.svg\';\nimport \'./App.css\';\n\nclass App extends Component {\n  render() {\n    return (\n      &#x3C;div className="App">\n        &#x3C;div className="App-header">\n          &#x3C;img src={logo} className="App-logo" alt="logo" />\n          &#x3C;h2>Welcome to React&#x3C;/h2>\n        &#x3C;/div>\n        &#x3C;p className="App-intro">\n          To get started, edit &#x3C;code>src/App.js&#x3C;/code> and save to reload.\n        &#x3C;/p>\n      &#x3C;/div>\n    );\n  }\n}\n\nexport default App;\n</code></pre>\n<p>Если нужно из приложения, сгенерированного <code>create-react-app</code> извлечь конфиг вебпака, то:</p>\n<p>  npm run eject</p>\n<p>Метод <code>extends Component</code> подойдет только если используется ES6, а значит какой-нибудь транспайлер (Babel).</p>\n<p>Иначе нужно использовать React.createClass:</p>\n<pre><code class="language-jsx">//App.js\n\nimport React from \'react\';\nimport logo from \'./logo.svg\';\nimport \'./App.css\';\n\nvar App = React.createClass({\n  render: function() {\n    return (\n      &#x3C;div className="App">\n        &#x3C;div className="App-header">\n          &#x3C;img src={logo} className="App-logo" alt="logo" />\n          &#x3C;h2>Welcome to React&#x3C;/h2>\n        &#x3C;/div>\n        &#x3C;p className="App-intro">\n          To get started, edit &#x3C;code>src/App.js&#x3C;/code> and save to reload.\n        &#x3C;/p>\n      &#x3C;/div>\n    );\n  }\n});\n\nexport default App;\n</code></pre>\n<p>В каждый модуль можно сохранять не более одного компонента.</p>\n<p>В Component есть следующие переопределяемые методы, которые будет вызывать сам React:</p>\n<p>  <code>render()</code> - должен возвращать шаблон компонента в формате jsx</p>\n<p>  <code>getInitialState()</code> - получение изначального состояния, должен вернуть сам объект состояния</p>\n<p>И методы, которые можно вызывать самому</p>\n<p><code>setState(object)</code> - установка состояния</p>\n<p><code>state</code> - поле, содержащее объект состояния</p>\n<p>Документация методов компонента здесь: <a href="https://reactjs.org/docs/react-component.html">https://reactjs.org/docs/react-component.html</a></p>\n<h3>Передача аргументов в компоненты</h3>\n<pre><code class="language-jsx">var data = [\n {id: 1, name: \'todo1\', done: \'true\'},\n {id: 2, name: \'todo2\', done: \'false\'}\n];\n\n&#x3C;App data={data}>\n</code></pre>\n<p>Тогда внутри компонента <code>App</code> можем получить доступ к данным через <code>this.props.data</code></p>\n<h3>State/props</h3>\n<p><code>props</code> - это входные аргументы компонента. Они неизменны.</p>\n<p><code>state</code> - изменяем, и при изменении через <code>setState</code> <strong>вызывается</strong> render().</p>\n<h3>Two-way binding</h3>\n<p>Поддержки для двустороннего связывания "из коробки" - нет.</p>\n<p>Приходится родителям передавать в потомков коллбэки, а в этих коллбэках обновлять стэйт родителей.</p>\n<p>Пример:</p>\n<pre><code class="language-jsx">var DisplayContainer1 = React.createClass({\n  updateValue:function(modifiedValue){\n    this.setState({\n      value:modifiedValue\n    })\n  },\n\n  getInitialState:function(){\n    return{\n      value:\'My Value\'\n    }\n  },\n\n  render:function(){\n    return (\n      &#x3C;div className="DisplayContainer">\n        &#x3C;h3>{this.state.value}&#x3C;/h3>\n        &#x3C;InputBox1 value={this.state.value} updateValue={this.updateValue}/>\n      &#x3C;/div>\n    );\n  }\n});\n\nvar InputBox1 = React.createClass({\n  update:function(e){\n    var modifiedValue=e.target.value;\n    this.props.updateValue(modifiedValue);\n  },\n\n  render:function(){\n    return (&#x3C;input type="text" ref="inputValue" value={this.props.value} onChange={this.update} />)\n  }\n});\n\nReact.renderComponent(&#x3C;DisplayContainer1 />,document.getElementById("container1"));\n</code></pre>\n<p>Здесь <code>DisplayContainer.updateValue</code> - это и есть коллбэк. А чтобы реагировать на изменения значений, приходится подписываться в разметке на html-события (<code>onChange={this.update}</code> в тэге <strong>input</strong>).</p>\n<h3>Compound components</h3>\n<p>(<a href="https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823">https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823</a>)</p>\n<p>Допустим, у нас есть такое приложение:</p>\n<pre><code class="language-jsx">// App.js\n\nclass App extends Component {\n  render() {\n    return (\n        &#x3C;Stepper stage={1}/>\n    );\n  }\n}\n</code></pre>\n<pre><code class="language-jsx">// Stepper.js\n\nclass Stepper extends Component {\n  state = {\n    stage: this.props.stage\n  }\n  static defaultProps = {\n    stage: 1\n  }\n  handleClick = () => {\n    this.setState({ stage: this.state.stage + 1 })\n  }\n  render() {\n    const { stage } = this.state;\n    return (\n      &#x3C;div style={styles.container}>\n  &#x3C;Progress stage={stage}/>\n  &#x3C;Steps handleClick={this.handleClick} stage={stage}/>\n      &#x3C;/div>\n    );\n  }\n}\n</code></pre>\n<p>Здесь плохо то, что содержание <code>Stepper</code> жестко зашито внутрь компонента и для модификации придется делать новый компонент. Мы можем этого избежать, использовав <code>props.children</code>:</p>\n<pre><code class="language-jsx">// App.js\n\n...\n&#x3C;Stepper stage={1} >\n  &#x3C;Progress />\n  &#x3C;Steps />\n&#x3C;Stepper />\n...\n</code></pre>\n<pre><code class="language-jsx">// Stepper.js\n\n...\nrender() {\n    const { stage } = this.state;\n    return (\n      &#x3C;div style={styles.container}>\n        {this.props.children}\n      &#x3C;/div>\n    );\n  }\n...\n</code></pre>\n<p>Но в процессе мы потеряли выставление свойств <code>stage</code> и <code>handleClick</code>. Чтобы их выставить обратно, используем <code>React.Children.map</code> и <code>React.cloneElement</code>:</p>\n<pre><code class="language-jsx">// Stepper.js\n\n...\nrender() {\n  const { stage } = this.state;\n  const children = React.Children.map(this.props.children, child => {\n    return React.cloneElement(child, {stage, handleClick: this.handleClick})\n  })\n  return (\n    &#x3C;div style={styles.container}>\n      {children}\n    &#x3C;/div>\n    );\n}\n..\n</code></pre>\n<h2>Валидация форм</h2>\n<p>Валидировать содержимое компонента снаружи компонента - очень плохая идея. Замучаешься потом сихнронизировать меж собой props и state. Так что лучше валидацию <strong>всегда</strong> держать внутри компонента, валидировать внутренний state, а взаимодействие внутреннего и внешнего компонента подстраивать под это, а не наоборот.</p>',frontmatter:{path:"/blog/react",title:"React"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-react-1772bc9452377966cb75.js.map