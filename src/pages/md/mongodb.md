---
title: "MongoDB"
path: "/blog/mongodb"
---
# MongoDB

## Пример использования клиента MongoDb в Node.js:

```js 
const MongoClient = require("mongodb").MongoClient; 
MongoClient.connect("mongodb://localhost:27017/", (err, client) => { 
	if (err) return console.log(err); 
	const db = client.db("license_server");
        
    db.collection("users")
      .findOne({ login: "login", password: "pwd" },
      (err, item) => {
          console.log(item);
      });  
}); 
```

## CLI

```shell
$  mongo
MongoDB shell version: 3.2.11
connecting to: test
> show dbs
> use facematica
switched to db facematica
> show dbs  // список будет пустым, пока не созданим коллекцию и запись в ней
> db.users.insert({login: "l", password: "p"})
WriteResult({ "nInserted" : 1 })
> db.users.insert({login: "l2", password: "p2"})
WriteResult({ "nInserted" : 1 })
> show dbs
facematica  0.000GB
> db.users.find({}) // ищем без критериев
{ "_id" : ObjectId("5b1510eeb699aed8c98f72ee"), "login" : "l", "password" : "p" }
{ "_id" : ObjectId("5b1510f2b699aed8c98f72ef"), "login" : "l2", "password" : "p2" }
> db.users.find({login: "l"}) // ищем с заданным критерием
{ "_id" : ObjectId("5b1510eeb699aed8c98f72ee"), "login" : "l", "password" : "p" }
> db.users.update({login: "l"}, {login: "l", password: "p", api_key: "key"}) //обновляем запись
```

## Работа через shell

```shell
mongo <db_name> --eval "db.users.find({})"
```