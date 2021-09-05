---
title: "qemu"
path: "/blog/qemu"
---

https://losst.ru/kak-polzovatsya-qemu

# QEMU

Разберем, как запустить убунту в qemu.

1. Качаем образ убунты. Например, [отсюда](https://releases.ubuntu.com/18.04.5/) - нам нужен .iso файл.
2. Создаем диск для нашей виртуалки:

```sh
qemu-img create -f qcow2 ubuntu.qcow 10G
```

3. Запускаемся с образа убунты:

```sh
qemu-system-x86_64 -hda ubuntu.qcow -boot d -cdrom ./ubuntu-18.04.5-live-server-amd64.iso -m 640
```

4. Запускается стандартная установка, дожидаемся окончания, после чего запускать можно так:

```sh
qemu-system-x86_64 -hda ubuntu.qcow -m 640
```

Чтобы работало быстрее, рекомендуется включать полную виртуализацию флагом `-enable-kvm`.