---
title: "find"
path: "/blog/find"
---
# find

## Массовые операции над файлами

Пример - поиск функции во всех .so файлах, генерируемых при билде:

```shell
find ./build -name "*.so" -exec sh -c 'nm {} | grep gst_app_src_push_buffer && echo {}' \;
```

## Массовый реплэйс в файлах

```shell
find . -name "*.js" -exec sed -r -i -- "s/\.\.\/(Ok|Cancel|Dropdown)Button/..\/..\/common\/components\/\1Button/g" {} \;
```

Ищет во всех .js файлах и заменяет:
`../OkButton` на `../../common/components/OkButton`
`../CancelButton` на `../../common/components/CancelButton`
`../DropdownButton` на `../../common/components/DropdownButton`
