webpackJsonp([18938219703366],{451:function(n,o){n.exports={data:{markdownRemark:{html:"<h1>JS Event Loop</h1>\n<h2>Microtasks</h2>\n<p>К микротаскам относятся:</p>\n<ol>\n<li>Mutation observers</li>\n<li>Promise.then callbacks</li>\n</ol>\n<p>На каждой итерации ивент луп:</p>\n<ol>\n<li>Делает текущий таск</li>\n<li>Делает <strong>ВСЕ</strong> микротаски</li>\n<li>Делает рендер</li>\n</ol>\n<p>Но помимо этого, микротаск может быть выполнен <strong>прямо посреди таска</strong> если стэк в этот момент пуст.</p>",frontmatter:{path:"/blog/js-event-loop",title:"JS Event Loop"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-js-event-loop-f72490c1078996bba861.js.map