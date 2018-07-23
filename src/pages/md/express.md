---
title: "Express"
path: "/blog/express"
---
# Express

## Пример простого приложения:

```js 
const express = require("express"); 
const bodyParser = require("body-parser"); 
const app = express();

const port = 9090; 
app.use(bodyParser.urlencoded({extended: false})); //указываем, что брать парамерты из строки url. Если нужно парсить json, тонужно написать bodyParser.json([options])

require("./routes")(app); 
app.listen(port, () => { console.log(`we are live on ${port}!`); });
```

Содержимое папки routes:

```js
//routes/index.js

const auth = require("./auth");
module.exports = function(app, db) {
  auth(app, db);
};

//routes/auth.js
module.exports = function(app, db) {
  app.get("/login", (req, res) => {
  		res.send("OK");  		// send автоматически закрывает соединение
  });

  app.get("/logout", (req,res) => {
  		res.status(500);
  		res.end();   // если не вызвать ни send ни end, то запрос зависнет
  	})
};

```
