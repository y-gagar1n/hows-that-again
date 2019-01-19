---
title: "find"
path: "/blog/find"
---

# find

## Поиск строк во всех найденных файлах

```shell
find . -name ".js" -exec grep -i "hello" {} \;
```
