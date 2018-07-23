---
title: "npm"
path: "/blog/npm"
---
# npm

Вся документация по npm здесь: <https://docs.npmjs.com/all>

## Синтаксис версий

[Источник](https://docs.npmjs.com/files/package.json#dependencies)

  * `version` Must match `version` exactly
  * `>version` Must be greater than `version`
  * `>=version` etc
  * `<version`
  * `<=version`
  * `~version` "Approximately equivalent to version" See [semver](https://docs.npmjs.com/misc/semver)
  * `^version` "Compatible with version" See [semver](https://docs.npmjs.com/misc/semver)
  * `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
  * `http://...` See 'URLs as Dependencies' below
  * `*` Matches any version
  * `""` (just an empty string) Same as `*`
  * `version1 - version2` Same as `>=version1 <=version2`.
  * `range1 || range2` Passes if either range1 or range2 are satisfied.
  * `git...` See 'Git URLs as Dependencies' below
  * `user/repo` See 'GitHub URLs' below
  * `tag` A specific version tagged and published as `tag` See `[npm-dist-tag](https://docs.npmjs.com/cli/dist-tag)`
  * `path/path/path` See [Local Paths](https://docs.npmjs.com/files/package.json#local-paths) below

Создание нового package.json: `npm init`

Если все настройки нужны дефолтные, то можно `npm init --yes`

При дефолтных настройках будет создан package.json следующего содержания:

```json
{
	"name": "npm",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\""
	},
	"author": "",
	"license": "ISC"
}
```

`main` - указывает, какой скрипт будет запущен (через `require`), когда кто-то сделает `require('./module')`, где **module** - это папка, в которой лежит наш `package.json`

**Корневой папкой** для npm считается первая папка по иерархии вверх, начиная с текущей, в которой есть package.json.

`npm install <module>` - установит модуль в корневую папку, но не сохранит его в `package.json`. По умолчанию качается последняя версия.

`npm install --save <module>` - установит модуль в корневую папку и сохранит его в `package.json`. Туда добавляется версия с префиксом ^, то есть версия, совместимая с последней на данный момент.

Если в `require` указан путь, начинающийся с /, ./ или ../, то ищется файл по указанному относительному пути, начиная с расположения текущего исполняемого файла.

Когда делается `require('<module>')` то сначала в *текущей* папке ищется папка **node_modules**, затем в ней ищется папка `<module>`, а в ней `package.json`, из которого берется `main` и запускается этот файл. Если что-то в этом пути не найдено, то ищется `node_modules` в папке на 1 уровень выше, затем еще выше и т.д. Если так ничего и не нашлось, то ищет среди глобальных модулей.

## Глобальные модули

Если есть переменная окружения **NODE_PATH**, где через точку с запятой перечислены пути, то сначала модуль ищется там.

Затем модули ищутся по следующим адресам:

  * 1: `$HOME/.node_modules`
  * 2: `$HOME/.node_libraries`
  * 3: `$PREFIX/lib/node`

где $HOME - домашняя папка юзера, а $PREFIX - переменная node_prefix (???)

У меня на домашней машине все глобальные модули ставятся в **"C:\Users\Y\Application Data\npm\"**

Если нужно удалить все глобальные модули, то, *кажется*, можно удалить эту папку. А для локальных - удалить соответствующую **node_modules**. У меня так сработало, но возможно это не во всех случаях поможет. Вообще на этот случай есть модуль **rimraf.**

Документация по модулям в NodeJS: <https://nodejs.org/api/modules.html>

`npm list` - выводит список всех установленных в текущем проекте модулей и их версий. Если какой-то модуль перечислен в **packages.json**, но не установлен в текущем проекте, то про него будет ошибка.

`npm list -g` \- выводит список глобальных модулей

В packages.json могут быть описаны несколько скриптов, например:

```js
"scripts": {
	"start": "react-scripts start",
	"build": "react-scripts build",
	"test": "react-scripts test --env=jsdom",
	"eject": "react-scripts eject"
}
```

Вызываются эти скрипты так:

`npm run start`
`npm run build`

## Локальный тест упаковки пакета**

```shell
npm pack //пакуем
tar -tf packagename-version.tgz //смотрим, что внутри
npm install ../path/to/your/npm/packagename-vesion.tgz //устанавливаем
```

## Локальный дебаг пакета

Допустим, разрабатываем плагин для PostCSS в виде пакета `postcss-simple-plugin` и хотим затестить его в проекте `postcss-test`. Делаем так:

```shell
cd ~/postcss-simple-plugin
npm link
cd ~/postcss-test
npm link postcss-simple-plugin
```

## Размер

### Размер бандла

Для подсчета размера бандла можно воспользоваться утилитой `size-limit`.

Пишем в `package.json`:

```json
"size-limit": [
  {
    "path": "index.js"
  }
],
```

И запускаем в консоли `size-limit` без параметров - он выдаст размер бандла со всеми зависимостями и в сжатом виде.

Если нужно разобраться, то `size-limit --why`.

### Размер пакета

Здесь поможет утилита `package-size`. Она качает и устанавливает пакет во временную директорию, но работает только для уже опубликованных пакетов. 

`package-size react` 