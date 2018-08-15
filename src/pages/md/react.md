---
title: "React"
path: "/blog/react"
---
# React

Разница между React.createClass и extends Component: <https://toddmotto.com/react-create-class-versus-component/>

## Installation

[Create React App](http://github.com/facebookincubator/create-react-app) is the best way to start building a new React single page application.

```shell
npm install -g create-react-app
create-react-app my-app
cd my-app
npm start
```

После генерации получаем следующее:

```jsx
//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

```jsx
//App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

Если нужно из приложения, сгенерированного `create-react-app` извлечь конфиг вебпака, то:

  npm run eject

Метод `extends Component` подойдет только если используется ES6, а значит какой-нибудь транспайлер (Babel).

Иначе нужно использовать React.createClass:

```jsx
//App.js

import React from 'react';
import logo from './logo.svg';
import './App.css';

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
});

export default App;
```

В каждый модуль можно сохранять не более одного компонента.

В Component есть следующие переопределяемые методы, которые будет вызывать сам React:

  `render()` - должен возвращать шаблон компонента в формате jsx

  `getInitialState()` - получение изначального состояния, должен вернуть сам объект состояния

И методы, которые можно вызывать самому

`setState(object)` - установка состояния

`state` - поле, содержащее объект состояния

Документация методов компонента здесь: <https://reactjs.org/docs/react-component.html>

### Передача аргументов в компоненты

```jsx
var data = [
 {id: 1, name: 'todo1', done: 'true'},
 {id: 2, name: 'todo2', done: 'false'}
];

<App data={data}>
```

Тогда внутри компонента `App` можем получить доступ к данным через `this.props.data`

### State/props

`props` - это входные аргументы компонента. Они неизменны.

`state` - изменяем, и при изменении через `setState` **вызывается** render().

### Two-way binding

Поддержки для двустороннего связывания "из коробки" - нет.

Приходится родителям передавать в потомков коллбэки, а в этих коллбэках обновлять стэйт родителей.

Пример:

```jsx
var DisplayContainer1 = React.createClass({
  updateValue:function(modifiedValue){
    this.setState({
      value:modifiedValue
    })
  },

  getInitialState:function(){
    return{
      value:'My Value'
    }
  },

  render:function(){
    return (
      <div className="DisplayContainer">
        <h3>{this.state.value}</h3>
        <InputBox1 value={this.state.value} updateValue={this.updateValue}/>
      </div>
    );
  }
});

var InputBox1 = React.createClass({
  update:function(e){
    var modifiedValue=e.target.value;
    this.props.updateValue(modifiedValue);
  },

  render:function(){
    return (<input type="text" ref="inputValue" value={this.props.value} onChange={this.update} />)
  }
});

React.renderComponent(<DisplayContainer1 />,document.getElementById("container1"));
```

Здесь `DisplayContainer.updateValue` - это и есть коллбэк. А чтобы реагировать на изменения значений, приходится подписываться в разметке на html-события (`onChange={this.update}` в тэге **input**).

### Compound components

(https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-1-dd495fa1823)

Допустим, у нас есть такое приложение:

```jsx
// App.js

class App extends Component {
  render() {
    return (
        <Stepper stage={1}/>
    );
  }
}
```

```jsx
// Stepper.js

class Stepper extends Component {
  state = {
    stage: this.props.stage
  }
  static defaultProps = {
    stage: 1
  }
  handleClick = () => {
    this.setState({ stage: this.state.stage + 1 })
  }
  render() {
    const { stage } = this.state;
    return (
      <div style={styles.container}>
  <Progress stage={stage}/>
  <Steps handleClick={this.handleClick} stage={stage}/>
      </div>
    );
  }
}
```

Здесь плохо то, что содержание `Stepper` жестко зашито внутрь компонента и для модификации придется делать новый компонент. Мы можем этого избежать, использовав `props.children`:

```jsx

// App.js

...
<Stepper stage={1} >
  <Progress />
  <Steps />
<Stepper />
...
```

```jsx

// Stepper.js

...
render() {
    const { stage } = this.state;
    return (
      <div style={styles.container}>
        {this.props.children}
      </div>
    );
  }
...
```

Но в процессе мы потеряли выставление свойств `stage` и `handleClick`. Чтобы их выставить обратно, используем `React.Children.map` и `React.cloneElement`:

```jsx

// Stepper.js

...
render() {
  const { stage } = this.state;
  const children = React.Children.map(this.props.children, child => {
    return React.cloneElement(child, {stage, handleClick: this.handleClick})
  })
  return (
    <div style={styles.container}>
      {children}
    </div>
    );
}
..
```

## Валидация форм

Валидировать содержимое компонента снаружи компонента - очень плохая идея. Замучаешься потом сихнронизировать меж собой props и state. Так что лучше валидацию **всегда** держать внутри компонента, валидировать внутренний state, а взаимодействие внутреннего и внешнего компонента подстраивать под это, а не наоборот.