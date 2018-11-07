webpackJsonp([0xe40a91f7e938],{433:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>Maven</h1>\n<h2>Генерация нового проекта</h2>\n<pre><code>mvn archetype:generate\n</code></pre>\n<p>При наборе выбирается огромный список (больше 1500) имеющихся шаблонов проектов. Предлагается набрать порядковый номер нужного, или ввести поисковый запрос для фильтрации</p>\n<h2>Компиляция</h2>\n<pre><code>mvn compile (в папке с pom-файлом)\n</code></pre>\n<h2>Упаковка</h2>\n<pre><code>mvn package\n</code></pre>\n<p><strong>groupId</strong> - название организации/подразделения</p>\n<p><strong>artifactId</strong> - название проекта</p>\n<p>Зависимости объявляются в pom.xml в тэге dependencies. </p>\n<pre><code class="language-xml">&#x3C;dependencies>\n    &#x3C;dependency>\n        &#x3C;groupId>junit&#x3C;/groupId>\n        &#x3C;artifactId>junit&#x3C;/artifactId>\n        &#x3C;version>4.4&#x3C;/version>\n        &#x3C;scope>test&#x3C;/scope>\n    &#x3C;/dependency>\n    &#x3C;dependency>\n        &#x3C;groupId>org.powermock&#x3C;/groupId>\n        &#x3C;artifactId>powermock-reflect&#x3C;/artifactId>\n        &#x3C;version>${version}&#x3C;/version>\n    &#x3C;/dependency>\n    &#x3C;dependency>\n        &#x3C;groupId>org.javassist&#x3C;/groupId>\n        &#x3C;artifactId>javassist&#x3C;/artifactId>\n        &#x3C;version>3.13.0-GA&#x3C;/version>\n        &#x3C;scope>compile&#x3C;/scope>\n    &#x3C;/dependency>\n&#x3C;/dependencies>\n</code></pre>\n<p><strong>scope</strong> - имя цели, для которой используется зависимость</p>\n<p>Персональный репозиторий хранится по адресу: <code>&#x3C;home dir>\\\\.m2\\repository</code></p>\n<p>Сборка и установка пакета в локальный репозиторий:\n\nmvn install</p>',frontmatter:{path:"/blog/maven",title:"Maven"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-maven-da6909564d3fe9fc05b3.js.map