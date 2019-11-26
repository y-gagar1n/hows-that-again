---
title: "sed"
path: "/blog/sed"
---
# sed

## Регэкспы

Чтобы искалось по регэкспу, нужно указать флаг `-r`

## Замена строки в файле

```shell
sed -i -- "s/hello/goodbye/g" ./example.txt
```

## Удаление строк, содержащих одну из подстрок

```shell
sed -ir -- '/string1\|string2\|string3/d' ./file.txt
```

## Экранирование

Символы `$.*/[\]^` экранируются бэкслэшэм (\\)

## Сложные примеры

### Массовый реплэйс в файлах

```shell
find . -name "*.js" -exec sed -r -i -- "s/\.\.\/(Ok|Cancel|Dropdown)Button/..\/..\/common\/components\/\1Button/g" {} \;
```

Ищет во всех .js файлах и заменяет:
`../OkButton` на `../../common/components/OkButton`
`../CancelButton` на `../../common/components/CancelButton`
`../DropdownButton` на `../../common/components/DropdownButton`

### Массовое перемещение файлов

```shell
find -name "*PrimaryButton*" -exec sh -c 'mv {} $(echo {} | sed "s/Primary/Ok/g")' \;
```

Изначально пробовал вариант c `-exec mv`, однако он не подошел, так как видимо shell выполняет выражение в `$()` до того, как `find` подставит в `{}` пути к файлам. В результате пути к файлам оставались неизменными.

	find . -name "*.js" -exec sed -r -i -- "s/\.\.\/Picture/..\/..\/common\/components\/Picture/g" {} \; && mv Picture ../common/components
