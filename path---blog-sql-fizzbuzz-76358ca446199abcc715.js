webpackJsonp([0xc64c580125f9],{493:function(n,s){n.exports={data:{markdownRemark:{html:'<h1>SQL - FizzBuzz</h1>\n<div class="gatsby-highlight" data-language="sql"><pre class="language-sql"><code class="language-sql"><span class="token keyword">declare</span> <span class="token variable">@start</span> <span class="token keyword">int</span><span class="token operator">=</span><span class="token number">0</span>\n<span class="token keyword">declare</span> <span class="token variable">@finish</span> <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">100</span>\n<span class="token punctuation">;</span>\n<span class="token keyword">with</span> gen <span class="token keyword">as</span>\n<span class="token punctuation">(</span>\n\t<span class="token keyword">select</span> <span class="token variable">@start</span> <span class="token keyword">as</span> num\n\t<span class="token keyword">union</span> <span class="token keyword">all</span>\n\t<span class="token keyword">select</span> num <span class="token operator">+</span> <span class="token number">1</span> <span class="token keyword">from</span> gen <span class="token keyword">where</span> num <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;=</span> <span class="token variable">@finish</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">select</span> num<span class="token punctuation">,</span> <span class="token punctuation">(</span>\n\t<span class="token keyword">case</span> \n\t\t<span class="token keyword">when</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">15</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">then</span> <span class="token string">\'FizzBuzz\'</span>\n\t\t<span class="token keyword">when</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">then</span> <span class="token string">\'Fizz\'</span> \n\t\t<span class="token keyword">when</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">then</span> <span class="token string">\'Buzz\'</span> \n\t\t<span class="token keyword">else</span> <span class="token keyword">convert</span><span class="token punctuation">(</span><span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>\n\t<span class="token keyword">end</span>\n<span class="token punctuation">)</span> fb\n<span class="token keyword">from</span> gen </code></pre></div>',frontmatter:{path:"/blog/sql-fizzbuzz",title:"SQL - FizzBuzz"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sql-fizzbuzz-76358ca446199abcc715.js.map