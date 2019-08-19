webpackJsonp([0xde2fa1ce4a32],{465:function(n,s){n.exports={data:{markdownRemark:{html:'<h1>MongoDB</h1>\n<h2>Пример использования клиента MongoDb в Node.js:</h2>\n<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> MongoClient <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mongodb"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MongoClient<span class="token punctuation">;</span> \nMongoClient<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> client</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> \n\t<span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span> \n\t<span class="token keyword">const</span> db <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">db</span><span class="token punctuation">(</span><span class="token string">"license_server"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        \n    db<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"users"</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> login<span class="token punctuation">:</span> <span class="token string">"login"</span><span class="token punctuation">,</span> password<span class="token punctuation">:</span> <span class="token string">"pwd"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </code></pre></div>\n<h2>CLI</h2>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell">$  mongo\nMongoDB shell version: <span class="token number">3.2</span>.11\nconnecting to: <span class="token builtin class-name">test</span>\n<span class="token operator">></span> show dbs\n<span class="token operator">></span> use facematica\nswitched to db facematica\n<span class="token operator">></span> show dbs  // список будет пустым, пока не созданим коллекцию и запись в ней\n<span class="token operator">></span> db.users.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>login: <span class="token string">"l"</span>, password: <span class="token string">"p"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\nWriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nInserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token operator">></span> db.users.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>login: <span class="token string">"l2"</span>, password: <span class="token string">"p2"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\nWriteResult<span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">"nInserted"</span> <span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token operator">></span> show dbs\nfacematica  <span class="token number">0</span>.000GB\n<span class="token operator">></span> db.users.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> // ищем без критериев\n<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5b1510eeb699aed8c98f72ee"</span><span class="token punctuation">)</span>, <span class="token string">"login"</span> <span class="token builtin class-name">:</span> <span class="token string">"l"</span>, <span class="token string">"password"</span> <span class="token builtin class-name">:</span> <span class="token string">"p"</span> <span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5b1510f2b699aed8c98f72ef"</span><span class="token punctuation">)</span>, <span class="token string">"login"</span> <span class="token builtin class-name">:</span> <span class="token string">"l2"</span>, <span class="token string">"password"</span> <span class="token builtin class-name">:</span> <span class="token string">"p2"</span> <span class="token punctuation">}</span>\n<span class="token operator">></span> db.users.find<span class="token punctuation">(</span><span class="token punctuation">{</span>login: <span class="token string">"l"</span><span class="token punctuation">}</span><span class="token punctuation">)</span> // ищем с заданным критерием\n<span class="token punctuation">{</span> <span class="token string">"_id"</span> <span class="token builtin class-name">:</span> ObjectId<span class="token punctuation">(</span><span class="token string">"5b1510eeb699aed8c98f72ee"</span><span class="token punctuation">)</span>, <span class="token string">"login"</span> <span class="token builtin class-name">:</span> <span class="token string">"l"</span>, <span class="token string">"password"</span> <span class="token builtin class-name">:</span> <span class="token string">"p"</span> <span class="token punctuation">}</span>\n<span class="token operator">></span> db.users.update<span class="token punctuation">(</span><span class="token punctuation">{</span>login: <span class="token string">"l"</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span>login: <span class="token string">"l"</span>, password: <span class="token string">"p"</span>, api_key: <span class="token string">"key"</span><span class="token punctuation">}</span><span class="token punctuation">)</span> //обновляем запись</code></pre></div>\n<h2>Работа через shell</h2>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell">mongo <span class="token operator">&lt;</span>db_name<span class="token operator">></span> --eval <span class="token string">"db.users.find({})"</span></code></pre></div>',frontmatter:{path:"/blog/mongodb",title:"MongoDB"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mongodb-67d8fb27ae9d35cedec3.js.map