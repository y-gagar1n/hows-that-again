---
title: "Spring Boot"
path: "/blog/spring-boot"
---

# Spring Boot

[Туториал по созданию простейшего веб-приложения](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-first-application.html)

Чтобы запустить веб-приложение, нужно в pom.xml добавить:

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>
```

Потом в консоли делаем:

```shell
mvn spring-boot:run
```

после чего приложение доступно по адресу `localhost:8080`.