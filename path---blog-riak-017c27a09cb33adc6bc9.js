webpackJsonp([0xe70b2b78a0d0],{439:function(t,n){t.exports={data:{markdownRemark:{html:"<h1>Riak</h1>\n<p>Сложные динамические запросы к Riak, использующие индексы, map reduce и прочее - очень медленные. Riak быстрый только когда получаем записи по ключу. </p>\n<p>Ключи могут использоваться как неймспейсы. Ключ должен вычислят со как функция от содержимого.</p>\n<p><strong>Bucket</strong> это всего лишь namespace, он никак не отделен физически от других бакетов. Riak просто использует его название при составлении полного ключа. Поэтому чтобы получить все сущности из одного бакета, ему приходится просмотреть вообще все сущности</p>\n<p>Есть 2 стратегии разрешения конфликтов: <code>last_write_wins</code> и <code>allow_mult</code>. Первая просто берет ту запись, которая пришла позже, вторая - позволяет хранить несколько конфликтных копий с тем, чтобы приложение само из них выбрало. </p>\n<p>Когда в кластере появляется или исчезает новая нода, партишены равномерно распределяются между всеми нодами и новой ноде присылают все значения, за которые она теперь отвечает. Аналогично, когда нода не способна отвечать, за нее отмечают соседние ноды, а когда она появится в сети, они ей расскажут все, что произошло за ее отсутствие (<strong>hinted handoff</strong>). </p>\n<p>Конфигурация кольца распространяется посредством протокола слухов (<strong>gossip protocol</strong>) и известна всем нодам.</p>\n<p>Когда узел получает значение, он его реплицирует на следующие N-1 партишенов.</p>",frontmatter:{path:"/blog/riak",title:"Riak"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-riak-017c27a09cb33adc6bc9.js.map