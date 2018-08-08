webpackJsonp([0x90b8b72857cb],{411:function(t,e){t.exports={data:{markdownRemark:{html:"<h1>kazoo</h1>\n<h3>Подписка на изменение узлов</h3>\n<pre><code>zk = KazooClient(hosts=host)\nzk.start()\n@zk.ChildrenWatch(\"/fc3/config/watchers/1/1/1\")\ndef data_changed(data, nodeStat, event):\n    ...\n</code></pre>\n<h3>Подписка на изменения данных</h3>\n<pre><code>zk = KazooClient(hosts=host)\nzk.start()\n@zk.DataWatch(\"/fc3/config/watchers/1/1/1\")\ndef data_changed(data, nodeStat, event):\n    ...\n</code></pre>\n<p>Либо:</p>\n<pre><code>def data_changed(data, nodeStat, event):\n    ...\n\nzk = KazooClient(hosts=host)\nzk.start()\nzk.DataWatch(\"/fc3/config/watchers/1/1/1\", watch=data_changed)\n</code></pre>\n<p><code>data == b'value'</code> - содержимое узла</p>\n<p><code>nodeStat == ZnodeStat(czxid=475, mzxid=491, ctime=1518441287425, mtime=1518441357929, version=6, cversion=0, aversion=0, ephemeralOwner=0, dataLength=0, numChildren=0, pzxid=475)</code> - всякая статистика по узлу</p>\n<p><code>event == WatchedEvent(type='CREATED', state='CONNECTED', path='/fc3/config/watchers/1')</code> - описание события, которое произошло с узлом. Нас тут больше всего интересует поле type - оно может быть CREATED, CHANGED, DELETED, CHILD, NONE: <a href=\"https://kazoo.readthedocs.io/en/latest/api/protocol/states.html?highlight=watchedevent#kazoo.protocol.states.EventType\">https://kazoo.readthedocs.io/en/latest/api/protocol/states.html?highlight=watchedevent#kazoo.protocol.states.EventType</a></p>\n<p>Исходя из списка событий, нет возможности получить событие добавления неизвестного узла. Максимум что мы можем - подписаться на изменения его родителя, дождаться события CHILD, получить из него список текущих детей узла и сравнить с предыдущим состоянием.</p>\n<p>При подписке на событие через <code>watch=data_changed</code> в коллбэк ВСЕГДА приходит <code>WatchedEvent</code> независимо от того, в каком методе мы подписались. Коллбэк вызывается при создании/удалении узла, либо изменении его данных или списка детей.</p>",frontmatter:{path:"/blog/kazoo",title:"kazoo"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-kazoo-2497377bd7253a7b95a2.js.map