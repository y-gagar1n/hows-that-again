webpackJsonp([36163852562177],{506:function(e,o){e.exports={data:{markdownRemark:{html:"<h1>Web components</h1>\n<h2>React</h2>\n<p>Для использования с реактом есть пакет <code>https://github.com/WeltN24/react-web-component</code>, но он устарел (использует <code>createShadowRoot</code> вместо <code>attachShadow</code>), поэтому нужно испольовать его форк <code>https://github.com/Artmann/react-web-component/tree/use-web-component-polyfills</code>.</p>\n<h3>react-web-component-style-loader</h3>\n<p>Чтобы не потерять стили, нужно использовать <code>react-web-component-style-loader</code>, но с ним есть одна проблема. Если в проекте вебпака создается больше одного веб-компонента, то у каждого из них в его <code>shadow DOM</code> будут стили и свои и всех остальных. Так получается, потому что этот загрузчик пихает в <code>shadow DOM</code> все стили, которые находит в проекте.</p>",frontmatter:{path:"/blog/web-components",title:"Web components"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-web-components-143a7e086a55de724af5.js.map