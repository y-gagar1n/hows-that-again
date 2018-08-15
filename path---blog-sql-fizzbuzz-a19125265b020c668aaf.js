webpackJsonp([0xc64c580125f9],{441:function(n,e){n.exports={data:{markdownRemark:{html:"<h1>SQL - FizzBuzz</h1>\n<pre><code class=\"language-sql\">declare @start int=0\ndeclare @finish int = 100\n;\nwith gen as\n(\n    select @start as num\n    union all\n    select num + 1 from gen where num + 1 &#x3C;= @finish\n)\nselect num, (\n    case \n        when (num % 15) = 0 then 'FizzBuzz'\n        when (num % 3) = 0 then 'Fizz' \n        when (num % 5) = 0 then 'Buzz' \n        else convert(varchar(2), num)\n    end\n) fb\nfrom gen \n</code></pre>",frontmatter:{path:"/blog/sql-fizzbuzz",title:"SQL - FizzBuzz"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-sql-fizzbuzz-a19125265b020c668aaf.js.map