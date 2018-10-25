---
title: "Linux networking"
path: "/blog/linux-networking"
---

Источник: http://linux-ip.net/html/index.html

# route

```shell
[root@morgan]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.98.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0
127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo
0.0.0.0         192.168.98.254  0.0.0.0         UG    0      0        0 eth0
```

Первая строчка вывода `route -n` означает, что все адреса из диапазона `192.168.98.0/24` достижимы напрямую.
Вторая строчка это стандартный маршрут для loopback-интерфейса, означает что все адреса, начинающиеся со 127, будут попадать на локалхост.
Третья строчка означает, что все остальные адреса должны проходить через шлюз `192.168.98.254`.

`0.0.0.0` в колонке `Gateway` означает, что мы будем обращаться к устройству напрямую, любое дргуое значение - что через роутер (такие маршруты обязательно должны содержать **G** в колонке `Flags`).

## Добавление маршрута до сети

```shell
[root@masq-gw]# route add -net 10.38.0.0 netmask 255.255.0.0 gw 192.168.100.1
```

## Добавление машрута до конкретного узла

```shell
[root@tristan]# route add -host 192.168.98.101 gw 192.168.99.1
[root@tristan]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.98.101  192.168.99.1    255.255.255.255 UG    0      0        0 eth0
192.168.99.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0
127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo
0.0.0.0         192.168.99.254  0.0.0.0         UG    0      0        0 eth0
```

## Добавление дефолтного шлюза

```shell
[root@tristan]# route add default gw 192.168.99.254
```

## Удаление маршрутов

Удаление осуществляется командой `route del` с теми же аргументами, что и при добавлении.

# arp

Утилита для манипуляций с ARP-таблицей. В этой таблице хранятся соответствия mac-адресов ip-адресам.

Вывод всех записей для конкретного интерфейса:

```shell
[root@masq-gw]# arp -ni eth3
Address                  HWtype  HWaddress           Flags Mask Iface
192.168.100.1           ether   00:C0:7B:7D:00:C8   C    
```

При помощи техники `Proxy ARP` можно разделить сеть на 2 части, которые смогут общаться между собой только через роутер.

Атака `ARP Spoofing` позволяет человеку-по-середине отправлять в сеть ARP-ответы, где он произвольным ip-адресам сопоставляет свой MAC-адрес, в результате чего запросы на этот ip будут отправляться ему.

## Прослушивание ARP-запросов в сети

```
[root@masq-gw]# tcpdump -ennqti eth0 \( arp or icmp \)
tcpdump: listening on eth0
0:80:c8:f8:4a:51 ff:ff:ff:ff:ff:ff 42: arp who-has 192.168.99.254 tell 192.168.99.35             
0:80:c8:f8:5c:73 0:80:c8:f8:4a:51 60: arp reply 192.168.99.254 is-at 0:80:c8:f8:5c:73            
0:80:c8:f8:4a:51 0:80:c8:f8:5c:73 98: 192.168.99.35 > 192.168.99.254: icmp: echo request (DF)    
0:80:c8:f8:5c:73 0:80:c8:f8:4a:51 98: 192.168.99.254 > 192.168.99.35: icmp: echo reply           
```

В первой строчке мы видим, что хост с mac-адресом `0:80:c8:f8:4a:51` отправил щироковещательный (`ff:ff:ff:ff:ff:ff`) запрос, в котором спрашивает, знает ли кто-нибудь MAC-адрес, соответствующий ip-адресу `192.168.99.254` и просит отправить ответ на адрес `192.168.99.35`. 

Во второй строчке хост с адресом `0:80:c8:f8:5c:73` отвечает ему, что искомый ip находится на машине с адресом `0:80:c8:f8:5c:73`.

В 3 и 4 строчках эти машины обмениваются ICMP-запросом.

## arping

Позволяет отправить arp-запрос в сеть:

```shell
[root@masq-gw]# arping -I eth0 -c 2 192.168.100.17
ARPING 192.168.100.17 from 192.168.100.254 eth0
Unicast reply from 192.168.100.17 [00:80:C8:E8:4B:8E]  8.419ms
Unicast reply from 192.168.100.17 [00:80:C8:E8:4B:8E]  2.095ms
Sent 2 probes (1 broadcast(s))
Received 2 response(s)
```

# Перенос машины в другую сеть

Допустим, у нас есть машина `morgan` в сети `192.168.98.0/24` и мы хотим перенести ее в сеть `192.168.99.0/24`.

Вот некоторые исходные данные:

```shell
[root@morgan]# ifconfig eth0
eth0      Link encap:Ethernet  HWaddr 00:80:C8:F8:4A:53  
          inet addr:192.168.98.82  Bcast:192.168.98.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:100 
          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)
          Interrupt:9 Base address:0x5000 

[root@morgan]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.98.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0
127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo
0.0.0.0         192.168.98.254  0.0.0.0         UG    0      0        0 eth0
```

Чтобы подключить машину в другую сеть,нужно:
1. Отключить сетевой интерфейс

```shell
[root@morgan]# ifconfig eth0 down
```

После отключения сетевого интерфейса из таблицы маршрутов **удаляются** все маршруты, проходящие через этот интерфейс.

2. Включить его заново с новым ip

```
[root@morgan]# ifconfig eth0 192.168.99.14 netmask 255.255.255.0 up
[root@morgan]# ifconfig eth0
eth0      Link encap:Ethernet  HWaddr 00:80:C8:F8:4A:53  
          inet addr:192.168.99.14  Bcast:192.168.99.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:100 
          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)
          Interrupt:9 Base address:0x5000 
[root@morgan]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.99.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0
127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo
```

После поднятия сетевого интерфейса в таблицу маршрутов добавляются маршруты, соответствующие настроенному ip (первая строка в выводе `route -n`). Пока мы не знаем, кто шлюз, считаем шлюзом себя, то есть `0.0.0.0`

3. Добавить дефолтный путь, проходящий через шлюз

```shell
[root@morgan]# route add default gw 192.168.99.254
[root@morgan]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.99.0    0.0.0.0         255.255.255.0   U     0      0        0 eth0
127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo
0.0.0.0         192.168.99.254  0.0.0.0         UG    0      0        0 eth0
```