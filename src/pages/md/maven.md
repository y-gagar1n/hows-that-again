---
title: "Maven"
path: "/blog/maven"
---
# Maven

## Генерация нового проекта

	mvn archetype:generate

При наборе выбирается огромный список (больше 1500) имеющихся шаблонов проектов. Предлагается набрать порядковый номер нужного, или ввести поисковый запрос для фильтрации

## Компиляция

	mvn compile (в папке с pom-файлом)

## Упаковка

	mvn package

**groupId** - название организации/подразделения

**artifactId** - название проекта

Зависимости объявляются в pom.xml в тэге dependencies. 

```xml
<dependencies>
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.4</version>
		<scope>test</scope>
	</dependency>
	<dependency>
		<groupId>org.powermock</groupId>
		<artifactId>powermock-reflect</artifactId>
		<version>${version}</version>
	</dependency>
	<dependency>
		<groupId>org.javassist</groupId>
		<artifactId>javassist</artifactId>
		<version>3.13.0-GA</version>
		<scope>compile</scope>
	</dependency>
</dependencies>
```

**scope** - имя цели, для которой используется зависимость

Персональный репозиторий хранится по адресу: `<home dir>\\.m2\repository`

Сборка и установка пакета в локальный репозиторий: 
	
	mvn install
