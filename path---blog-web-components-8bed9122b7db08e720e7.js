webpackJsonp([36163852562177],{507:function(e,t){e.exports={data:{markdownRemark:{html:'<h1>Web components</h1>\n<h2>React</h2>\n<p>Для использования с реактом есть пакет <code class="language-text">https://github.com/WeltN24/react-web-component</code>, но он устарел (использует <code class="language-text">createShadowRoot</code> вместо <code class="language-text">attachShadow</code>), поэтому нужно испольовать его форк <code class="language-text">https://github.com/Artmann/react-web-component/tree/use-web-component-polyfills</code>.</p>\n<h3>react-web-component-style-loader</h3>\n<p>Чтобы не потерять стили, нужно использовать <code class="language-text">react-web-component-style-loader</code>, но с ним есть одна проблема. Если в проекте вебпака создается больше одного веб-компонента, то у каждого из них в его <code class="language-text">shadow DOM</code> будут стили и свои и всех остальных. Так получается, потому что этот загрузчик пихает в <code class="language-text">shadow DOM</code> все стили, которые находит в проекте.</p>',frontmatter:{path:"/blog/web-components",title:"Web components"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-web-components-8bed9122b7db08e720e7.js.map