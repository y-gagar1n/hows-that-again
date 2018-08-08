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

