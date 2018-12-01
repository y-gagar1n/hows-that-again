webpackJsonp([0xde2fa1ce4a32],{444:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>MongoDB</h1>\n<h2>Пример использования клиента MongoDb в Node.js:</h2>\n<pre><code class="language-js">const MongoClient = require("mongodb").MongoClient; \nMongoClient.connect("mongodb://localhost:27017/", (err, client) => { \n    if (err) return console.log(err); \n    const db = client.db("license_server");\n        \n    db.collection("users")\n      .findOne({ login: "login", password: "pwd" },\n      (err, item) => {\n          console.log(item);\n      });  \n}); \n</code></pre>\n<h2>CLI</h2>\n<pre><code class="language-shell">$  mongo\nMongoDB shell version: 3.2.11\nconnecting to: test\n> show dbs\n> use facematica\nswitched to db facematica\n> show dbs  // список будет пустым, пока не созданим коллекцию и запись в ней\n> db.users.insert({login: "l", password: "p"})\nWriteResult({ "nInserted" : 1 })\n> db.users.insert({login: "l2", password: "p2"})\nWriteResult({ "nInserted" : 1 })\n> show dbs\nfacematica  0.000GB\n> db.users.find({}) // ищем без критериев\n{ "_id" : ObjectId("5b1510eeb699aed8c98f72ee"), "login" : "l", "password" : "p" }\n{ "_id" : ObjectId("5b1510f2b699aed8c98f72ef"), "login" : "l2", "password" : "p2" }\n> db.users.find({login: "l"}) // ищем с заданным критерием\n{ "_id" : ObjectId("5b1510eeb699aed8c98f72ee"), "login" : "l", "password" : "p" }\n> db.users.update({login: "l"}, {login: "l", password: "p", api_key: "key"}) //обновляем запись\n</code></pre>\n<h2>Работа через shell</h2>\n<pre><code class="language-shell">mongo &#x3C;db_name> --eval "db.users.find({})"\n</code></pre>',frontmatter:{path:"/blog/mongodb",title:"MongoDB"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-mongodb-a0072eebb3f25201f6b5.js.map