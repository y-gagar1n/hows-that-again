webpackJsonp([0xebf6eccc7a09],{435:function(e,n){e.exports={data:{markdownRemark:{html:'<h1>Express</h1>\n<h2>Пример простого приложения:</h2>\n<pre><code class="language-js">const express = require("express"); \nconst bodyParser = require("body-parser"); \nconst app = express();\n\nconst port = 9090; \napp.use(bodyParser.urlencoded({extended: false})); //указываем, что брать парамерты из строки url. Если нужно парсить json, тонужно написать bodyParser.json([options])\n\nrequire("./routes")(app); \napp.listen(port, () => { console.log(`we are live on ${port}!`); });\n</code></pre>\n<p>Содержимое папки routes:</p>\n<pre><code class="language-js">//routes/index.js\n\nconst auth = require("./auth");\nmodule.exports = function(app, db) {\n  auth(app, db);\n};\n\n//routes/auth.js\nmodule.exports = function(app, db) {\n  app.get("/login", (req, res) => {\n        res.send("OK");         // send автоматически закрывает соединение\n  });\n\n  app.get("/logout", (req,res) => {\n        res.status(500);\n        res.end();   // если не вызвать ни send ни end, то запрос зависнет\n    })\n};\n</code></pre>',frontmatter:{path:"/blog/express",title:"Express"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-express-00cc4f3d5211bb03edae.js.map