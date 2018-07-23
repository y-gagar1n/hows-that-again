---
title: "kazoo"
path: "/blog/kazoo"
---
# kazoo

### Подписка на изменение узлов

```
zk = KazooClient(hosts=host)
zk.start()
@zk.ChildrenWatch("/fc3/config/watchers/1/1/1")
def data_changed(data, nodeStat, event):
    ...
```

### Подписка на изменения данных

```
zk = KazooClient(hosts=host)
zk.start()
@zk.DataWatch("/fc3/config/watchers/1/1/1")
def data_changed(data, nodeStat, event):
    ...
```

Либо:

```
def data_changed(data, nodeStat, event):
    ...

zk = KazooClient(hosts=host)
zk.start()
zk.DataWatch("/fc3/config/watchers/1/1/1", watch=data_changed)

```


`data == b'value'` - содержимое узла

`nodeStat == ZnodeStat(czxid=475, mzxid=491, ctime=1518441287425, mtime=1518441357929, version=6, cversion=0, aversion=0, ephemeralOwner=0, dataLength=0, numChildren=0, pzxid=475)` - всякая статистика по узлу

`event == WatchedEvent(type='CREATED', state='CONNECTED', path='/fc3/config/watchers/1')` - описание события, которое произошло с узлом. Нас тут больше всего интересует поле type - оно может быть CREATED, CHANGED, DELETED, CHILD, NONE: https://kazoo.readthedocs.io/en/latest/api/protocol/states.html?highlight=watchedevent#kazoo.protocol.states.EventType

Исходя из списка событий, нет возможности получить событие добавления неизвестного узла. Максимум что мы можем - подписаться на изменения его родителя, дождаться события CHILD, получить из него список текущих детей узла и сравнить с предыдущим состоянием.

При подписке на событие через `watch=data_changed` в коллбэк ВСЕГДА приходит `WatchedEvent` независимо от того, в каком методе мы подписались. Коллбэк вызывается при создании/удалении узла, либо изменении его данных или списка детей.