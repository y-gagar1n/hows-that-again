---
title: "qemu"
path: "/blog/qemu"
---

https://losst.ru/kak-polzovatsya-qemu

# QEMU

## Запуск обычной убунты

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

## Запуск и дебаг своего ядра

http://nickdesaulniers.github.io/blog/2018/10/24/booting-a-custom-linux-kernel-in-qemu-and-debugging-it-with-gdb/

В статье по ссылке в самом начале рабочий скрипт:

```sh
# one time setup
$ mkinitramfs -o ramdisk.img
$ echo "add-auto-load-safe-path path/to/linux/scripts/gdb/vmlinux-gdb.py" >> ~/.gdbinit

# one time kernel setup
$ cd linux
$ ./scripts/config -e DEBUG_INFO -e GDB_SCRIPTS
$ <make kernel image>

# each debug session run
$ qemu-system-x86_64 \
  -kernel arch/x86_64/boot/bzImage \
  -nographic \
  -append "console=ttyS0 nokaslr" \
  -initrd ramdisk.img \
  -m 512 \
  --enable-kvm \
  -cpu host \
  -s -S &
$ gdb vmlinux
(gdb) target remote :1234
(gdb) hbreak start_kernel
(gdb) c
(gdb) lx-dmesg
```

Тут важное дополнение - пока командная строка не завелась, если при инициализации выдается какая-то ошибка, то чтобы выйти, нужно нажать `Ctrl+a, c`, появится командная строка qemu, затем выходим по `q`.