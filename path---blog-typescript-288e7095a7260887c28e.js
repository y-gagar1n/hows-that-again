webpackJsonp([0xbd0f86a13ffa],{449:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>Typescript</h1>\n<h2>React</h2>\n<p><a href="https://github.com/sw-yx/react-typescript-cheatsheet">React typescript cheatsheet</a></p>\n<p>Была такая проблема - я установил пакет <strong>npm</strong>, написанный на <strong>typescript</strong>, и при компиляции мой проект все время ругался на то, что не может найти <code>@types/react,</code> хотя он был установлен и в корневом проекте и в зависимости.</p>\n<p>Помогло прописать следующее в <code>tsconfig.json</code>:</p>\n<pre><code>"compilerOptions" : {\n    "baseUrl": "./",\n    "paths": {\n      "*": ["node_modules/@types/*", "*"]\n  }\n</code></pre>\n<h2>Перегрузка конструкторов</h2>\n<p>Можно иметь несколько перегрузок конструкторов, но при этом только одна реализация. Все перегрузки должны быть автоматически приводимы к сигнатуре этой реализации.</p>\n<p>Пример:</p>\n<pre><code class="language-typescript">class Box {\n    public x: number;\n    public y: number;\n    public height: number;\n    public width: number;\n\n    constructor();\n    constructor(obj: IBox); \n    constructor(obj?: any) {    \n        this.x = obj &#x26;&#x26; obj.x || 0\n        this.y = obj &#x26;&#x26; obj.y || 0\n        this.height = obj &#x26;&#x26; obj.height || 0\n        this.width = obj &#x26;&#x26; obj.width || 0;\n    }   \n}\n</code></pre>\n<h2>Констрэйнты</h2>\n<pre><code class="language-typescript">function loggingIdentity&#x3C;T extends Lengthwise>(arg: T): T {\n    console.log(arg.length);  // Now we know it has a .length property, so no more error\n    return arg;\n}\n</code></pre>\n<h2>Классы и интерфейсы</h2>\n<p>Объявление класса автоматически создает интерфейс с таким именем, поэтому все классы можно использовать и как интерфейсы:</p>\n<pre><code class="language-typescript">class Bar {\n    y: number;\n}\n\ninterface IBaz extends Bar { } // includes y: number\n\nclass CBaz implements Bar {\n    y: number = 5;\n}\n</code></pre>\n<p>Если есть несколько объявлений интерфейсов с одинакомым именем, то они будут смержены:</p>\n<pre><code class="language-typescript">interface Foo {\n    x: number;\n}\n\ninterface Foo {\n    y: string;\n}\n\nlet g = {} as Foo;\ng.x; // OK\ng.y; // OK\n</code></pre>',frontmatter:{path:"/blog/typescript",title:"Typescript"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-typescript-288e7095a7260887c28e.js.map