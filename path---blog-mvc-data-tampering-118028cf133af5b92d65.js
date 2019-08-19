webpackJsonp([77216212851623],{467:function(e,a){e.exports={data:{markdownRemark:{html:'<h1>ASP.NET MVC - Data Tampering</h1>\n<p>Вид атаки, когда в POST запрос встраивают параметры, которых изначально на форме не было. Если пользоваться DefaultModelBinder, то он подаст на вход контроллера объект, в котором будут инициализированы лишние поля. </p>\n<h2>Способы защиты</h2>\n<ol>\n<li>Принимать на вход экшн-метода объект <code class="language-text">FormCollection</code> и проходить по его полям самостоятельно</li>\n<li>Использовать в контроллере метод <code class="language-text">UpdateModel</code>, в который нужно передать список тех пропертей, которые мы хотим обновить</li>\n<li>Использовать свой <code class="language-text">ModelBinder</code>. Если использовать глобально (прописывая в <code class="language-text">Global.asax.cs</code>), то он будет применяться везде и всюду.</li>\n<li>Использовать свой <code class="language-text">ModelBinder</code>, но прописать его как атрибут для параметра экшн-метода.</li>\n</ol>',frontmatter:{path:"/blog/mvc-data-tampering",title:"ASP.NET MVC - Data Tampering"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mvc-data-tampering-118028cf133af5b92d65.js.map