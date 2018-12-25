webpackJsonp([30778352477470],{484:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>SQL recursive CTE</h1>\n<p>The general syntax for a recursive CTE is:</p>\n<pre><code class="language-sql">WITH cte_name (column1, column2, …)&#x3C;/div>\nAS\n(\n    cte_query_definition -- Anchor member&#x3C;/div>\n    UNION ALL\n    cte_query_definition -- Recursive member; references cte_name.&#x3C;/div>\n)\n-- Statement using the CTE&#x3C;/div>\nSELECT *\nFROM cte_name\nwith cte as\n(\n    select id, lastname, 0 as lev from dbo.Employee where ReportsTo is null\n    union all\n    select e.id, e.lastname, lev + 1 from dbo.Employee e join cte\n    on e.ReportsTo = cte.ID\n)\nselect lastname, lev from cte\n</code></pre>',frontmatter:{path:"/blog/sql-recursive-cte",title:"SQL recursive CTE"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sql-recursive-cte-e643e27fb3c8145e3a0a.js.map