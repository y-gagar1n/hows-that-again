---
title: "systemd"
path: "/blog/systemd"
---
# systemd

Разберем работу с systemd на примере службы запуска vpn

## Создание нового сервиса

Создаем файл по адресу `/etc/systemd/system/vpn.service` следующего содержания:

```
[Unit]
After=network.target

[Service]
ExecStart=/usr/local/bin/start-vpn.sh

[Install]
WantedBy=default.target
```

`After=network.target` - означает, что нашу службу надо запускать после того, как будет поднята сеть. В зависимости от целей службы могут быть и другие таргеты, нужно гуглить.

`ExecStart=/usr/local/bin/start-vpn.sh` - адрес скрипта, который нужно запустить. Содержание скрипта любое.

`WantedBy=default.target` - к какому таргету относится сама наша служба. Дефолтного в большинстве случаев должно хватить.

### Регистрация сервиса

После создания сервис нужно зарегистрировать.

Для начала перезапускаем systemd, чтобы он увидел наш vpn.service:

```shell
sudo systemctl daemon-reload
```

Потом регистрируем:

```shell
sudo systemctl enable vpn
```

Протестировать запуск службы можно так:

```shell
sudo systemctl start vpn
```

### Логи

Просмотр логов службы:

```shell
sudo journalctl -u vpn.service
```