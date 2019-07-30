webpackJsonp([0xaca256864549],{460:function(e,n){e.exports={data:{markdownRemark:{html:'<p>Источник: <a href="http://linux-ip.net/html/index.html">http://linux-ip.net/html/index.html</a></p>\n<h1>route</h1>\n<pre><code class="language-shell">[root@morgan]# route -n\nKernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n192.168.98.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0\n127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo\n0.0.0.0         192.168.98.254  0.0.0.0         UG    0      0        0 eth0\n</code></pre>\n<p>Первая строчка вывода <code>route -n</code> означает, что все адреса из диапазона <code>192.168.98.0/24</code> достижимы напрямую.\nВторая строчка это стандартный маршрут для loopback-интерфейса, означает что все адреса, начинающиеся со 127, будут попадать на локалхост.\nТретья строчка означает, что все остальные адреса должны проходить через шлюз <code>192.168.98.254</code>.</p>\n<p><code>0.0.0.0</code> в колонке <code>Gateway</code> означает, что мы будем обращаться к устройству напрямую, любое дргуое значение - что через роутер (такие маршруты обязательно должны содержать <strong>G</strong> в колонке <code>Flags</code>).</p>\n<h2>Добавление маршрута до сети</h2>\n<pre><code class="language-shell">[root@masq-gw]# route add -net 10.38.0.0 netmask 255.255.0.0 gw 192.168.100.1\n</code></pre>\n<h2>Добавление машрута до конкретного узла</h2>\n<pre><code class="language-shell">[root@tristan]# route add -host 192.168.98.101 gw 192.168.99.1\n[root@tristan]# route -n\nKernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n192.168.98.101  192.168.99.1    255.255.255.255 UG    0      0        0 eth0\n192.168.99.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0\n127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo\n0.0.0.0         192.168.99.254  0.0.0.0         UG    0      0        0 eth0\n</code></pre>\n<h2>Добавление дефолтного шлюза</h2>\n<pre><code class="language-shell">[root@tristan]# route add default gw 192.168.99.254\n</code></pre>\n<h2>Удаление маршрутов</h2>\n<p>Удаление осуществляется командой <code>route del</code> с теми же аргументами, что и при добавлении.</p>\n<h1>arp</h1>\n<p>Утилита для манипуляций с ARP-таблицей. В этой таблице хранятся соответствия mac-адресов ip-адресам.</p>\n<p>Вывод всех записей для конкретного интерфейса:</p>\n<pre><code class="language-shell">[root@masq-gw]# arp -ni eth3\nAddress                  HWtype  HWaddress           Flags Mask Iface\n192.168.100.1           ether   00:C0:7B:7D:00:C8   C    \n</code></pre>\n<p>При помощи техники <code>Proxy ARP</code> можно разделить сеть на 2 части, которые смогут общаться между собой только через роутер.</p>\n<p>Атака <code>ARP Spoofing</code> позволяет человеку-по-середине отправлять в сеть ARP-ответы, где он произвольным ip-адресам сопоставляет свой MAC-адрес, в результате чего запросы на этот ip будут отправляться ему.</p>\n<h2>Прослушивание ARP-запросов в сети</h2>\n<pre><code>[root@masq-gw]# tcpdump -ennqti eth0 \\( arp or icmp \\)\ntcpdump: listening on eth0\n0:80:c8:f8:4a:51 ff:ff:ff:ff:ff:ff 42: arp who-has 192.168.99.254 tell 192.168.99.35             \n0:80:c8:f8:5c:73 0:80:c8:f8:4a:51 60: arp reply 192.168.99.254 is-at 0:80:c8:f8:5c:73            \n0:80:c8:f8:4a:51 0:80:c8:f8:5c:73 98: 192.168.99.35 > 192.168.99.254: icmp: echo request (DF)    \n0:80:c8:f8:5c:73 0:80:c8:f8:4a:51 98: 192.168.99.254 > 192.168.99.35: icmp: echo reply           \n</code></pre>\n<p>В первой строчке мы видим, что хост с mac-адресом <code>0:80:c8:f8:4a:51</code> отправил щироковещательный (<code>ff:ff:ff:ff:ff:ff</code>) запрос, в котором спрашивает, знает ли кто-нибудь MAC-адрес, соответствующий ip-адресу <code>192.168.99.254</code> и просит отправить ответ на адрес <code>192.168.99.35</code>. </p>\n<p>Во второй строчке хост с адресом <code>0:80:c8:f8:5c:73</code> отвечает ему, что искомый ip находится на машине с адресом <code>0:80:c8:f8:5c:73</code>.</p>\n<p>В 3 и 4 строчках эти машины обмениваются ICMP-запросом.</p>\n<h2>arping</h2>\n<p>Позволяет отправить arp-запрос в сеть:</p>\n<pre><code class="language-shell">[root@masq-gw]# arping -I eth0 -c 2 192.168.100.17\nARPING 192.168.100.17 from 192.168.100.254 eth0\nUnicast reply from 192.168.100.17 [00:80:C8:E8:4B:8E]  8.419ms\nUnicast reply from 192.168.100.17 [00:80:C8:E8:4B:8E]  2.095ms\nSent 2 probes (1 broadcast(s))\nReceived 2 response(s)\n</code></pre>\n<h1>Перенос машины в другую сеть</h1>\n<p>Допустим, у нас есть машина <code>morgan</code> в сети <code>192.168.98.0/24</code> и мы хотим перенести ее в сеть <code>192.168.99.0/24</code>.</p>\n<p>Вот некоторые исходные данные:</p>\n<pre><code class="language-shell">[root@morgan]# ifconfig eth0\neth0      Link encap:Ethernet  HWaddr 00:80:C8:F8:4A:53  \n          inet addr:192.168.98.82  Bcast:192.168.98.255  Mask:255.255.255.0\n          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1\n          RX packets:0 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:100 \n          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)\n          Interrupt:9 Base address:0x5000 \n\n[root@morgan]# route -n\nKernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n192.168.98.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0\n127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo\n0.0.0.0         192.168.98.254  0.0.0.0         UG    0      0        0 eth0\n</code></pre>\n<p>Чтобы подключить машину в другую сеть,нужно:</p>\n<ol>\n<li>Отключить сетевой интерфейс</li>\n</ol>\n<pre><code class="language-shell">[root@morgan]# ifconfig eth0 down\n</code></pre>\n<p>После отключения сетевого интерфейса из таблицы маршрутов <strong>удаляются</strong> все маршруты, проходящие через этот интерфейс.</p>\n<ol start="2">\n<li>Включить его заново с новым ip</li>\n</ol>\n<pre><code>[root@morgan]# ifconfig eth0 192.168.99.14 netmask 255.255.255.0 up\n[root@morgan]# ifconfig eth0\neth0      Link encap:Ethernet  HWaddr 00:80:C8:F8:4A:53  \n          inet addr:192.168.99.14  Bcast:192.168.99.255  Mask:255.255.255.0\n          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1\n          RX packets:0 errors:0 dropped:0 overruns:0 frame:0\n          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0\n          collisions:0 txqueuelen:100 \n          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)\n          Interrupt:9 Base address:0x5000 \n[root@morgan]# route -n\nKernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n192.168.99.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0\n127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo\n</code></pre>\n<p>После поднятия сетевого интерфейса в таблицу маршрутов добавляются маршруты, соответствующие настроенному ip (первая строка в выводе <code>route -n</code>). Пока мы не знаем, кто шлюз, считаем шлюзом себя, то есть <code>0.0.0.0</code></p>\n<ol start="3">\n<li>Добавить дефолтный путь, проходящий через шлюз</li>\n</ol>\n<pre><code class="language-shell">[root@morgan]# route add default gw 192.168.99.254\n[root@morgan]# route -n\nKernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\n192.168.99.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0\n127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo\n0.0.0.0         192.168.99.254  0.0.0.0         UG    0      0        0 eth0\n</code></pre>',frontmatter:{path:"/blog/linux-networking",title:"Linux networking"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-linux-networking-fa7457ac2d7b179d8bdf.js.map