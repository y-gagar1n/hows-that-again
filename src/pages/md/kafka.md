---
title: "Kafka"
path: "/blog/kafka"
---
# Kafka

## Установка

Проще всего установить через Docker

Образ: wurstmeister/kafka

Запускается через docker-compose,брать с гитхаба этого докерфайла

После установки все .sh скрипты лежат по адресу ```/opt/kafka/bin```, либо ```$KAFKA_HOME/bin```

Дальнейшие инструкции описаны в соответствии с этим способом установки

## Вывод всех топиков:

```shell
$KAFKA_HOME/bin/kafka-topics.sh --list --zookeeper zookeeper:2181
```

## Создание топика:

```
$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 3 --partitions 1 --topic my-replicated-topic
```

## Вывод информации о состоянии кластера:

```bash-4.3# $KAFKA_HOME/bin/kafka-topics.sh --describe --zookeeper zookeeper:2181** **Topic:my-replicated-topic PartitionCount:1 ReplicationFactor:3 Configs:** ** Topic: my-replicated-topic Partition: 0 Leader: 1004 Replicas: 1004,1003,1005 Isr: 1004,1003,1005```

1003,1004,1005 - это id брокеров

```leader``` - ответственный за все записи и чтения в партишне

```replicas``` - реплики, перечисляются независимо от того, живы они сейчас или нет

```isr``` - in-sync-replicas, т.е. реплики, которые сейчас живы и имеют последнюю версию

## Паблиш сообщений через консоль:

```
$KAFKA_HOME/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic my-replicated-topic
test message 1
test message 2
```

## Консюм сообщений и вывод их в консоль:

```$KAFKA_HOME/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic my-replicated-topic ```

## Вывод id всех брокеров:

```bash-4.3# $KAFKA_HOME/bin/zookeeper-shell.sh zookeeper:2181 ls /brokers/ids```

## Вывод инфы по id конкретного брокера:

```bash-4.3# $KAFKA_HOME/bin/zookeeper-shell.sh zookeeper:2181 get /brokers/id/1004```

## Возможные проблемы

### После перезапуска брокеров клиенты валятся с по таймауту

Так может происходить из-за того, что после перезапуска брокерам назначились новые ID, а партишны в зукипере остались назначенными на старых. Самое простое решение - брокерам задавать id на старте, чтобы каждый раз был один и тот же. Либо можно вручную ребалансить партишны после перезапуска брокеров

### После падения одного брокера продюсер начал выдавать ошибки

Наверно replication.factor стоял 1, это значение по умолчанию. Он задается либо при создании топика, либо как default.replication.factor при запуске брокера.

А еще должен быть `auto.leader.rebalance.enable` установлен в `true`? но это и так значение по умолчанию.

А еще `leader.imbalance.check.interval.seconds` указывает интервал проверки на необходимость ребаланса, по дефолту 300.

А еще `leader.imbalance.per.broker.percentage` указываем максимум нагрузки на одного брокера, после которого начинается ребалансировка. Дефолт - 10%.

### После подключения новых брокеров им не назначаются автоматически партишны

Ага, так и задумано by-design, и ничего с этим не поделать. Только вручную назначать. Автоматически новым брокерам могут быть назначены только партишны новых топиков.