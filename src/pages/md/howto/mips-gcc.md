---
title: "Как сбилдить GCC для компилции под MIPS на OS X"
path: "/howto/mips-gcc"
---

# Как сбилдить GCC для компиляции под MIPS на OS X

Для начала устанавливаем gcc нужной версии:

```shell
sudo chown -R $(whoami) /usr/local/share/man/man8. # почему-то без этой строчки brew ругался
brew install gcc@4.9
```

Brew устанавливает все в свою папку `/usr/local/Cellar/`, после чего делает симлинки в папке `/usr/loca/bin`.

Таким образом, после установки gcc@4.9 в папке `/usr/local/bin` появятся бинарники **gcc-4.9**, **g++-4.9**, **cpp-4.9** и прочие, которые будут симлинками в папку `/usr/local/Cellar/gcc@4.9/4.9.4_1/bin`.

Теперь мы используем их, чтобы сбилдить `binutils` под MIPS, но сначала выставим соответствующие переменные окружения:

```shell
export CC=$(which gcc-4.9)
export CXX=$(which g++-4.9)
export CPP=$(which cpp-4.9)
export LD=$(which gcc-4.9)
export PREFIX=/opt/cross/gcc-mips
export CFLAGS=-Wno-error=deprecated-declarations
export CPPFLAGS=-Wno-error=unused-value
export CPATH=/Library/Developer/CommandLineTools/SDKs/MacOSX10.14.sdk/usr/include/ 
```

Здесь важно обратить внимание на:

- `PREFIX`: путь установки
- `CPATH`: папка инклюдов для компиляторов С и С++. В указанной папке хранятся все системные заголовки после установки XCode. Без указания этой переменной компиляция ругалась на ненайденный `stdio.h`
- `CFLAGS`, `CPPFLAGS`: замалчивают некоторые варнинги, чтобы они не приводили к ошибкам. Иначе не билдится.

Теперь непосредственно качаем и билдим binutils:

```shell
wget ftp://sourceware.org/pub/binutils/releases/binutils-2.24.tar.gz

tar xzf binutils-2.24.tar.gz
mkdir binutils-build
cd binutils-build

../binutils-2.24/configure --target=mips-netbsd-elf --prefix=$PREFIX
make all 2>&1 | tee make.log
sudo make install
```

После установки в папке `/opt/cross/gcc-mips/bin` будут лежать утилиты binutils, скомпилированные под MIPS. Этот адрес добавляем в PATH:

```shell
export PATH=${PREFIX}/bin:${PATH}
```

Дальше компилируем gcc:

```shell
wget http://www.netgull.com/gcc/releases/gcc-4.8.2/gcc-4.8.2.tar.gz  
tar xzf gcc-4.8.2.tar.gz
cd gcc-4.8.2
./contrib/download_prerequisites
cd ..
mkdir gcc-build
cd gcc-build
../gcc-4.8.2/configure --target=mips-netbsd-elf --prefix=$PREFIX --with-newlib --without-headers --with-gnu-as --with-gnu-ld --disable-shared --enable-languages=c
make all-gcc 2>&1 | tee make.log
make install-gcc
```

После установки в папке `/opt/cross/gcc-mips/bin`, помимо утилит binutils, будут еще и утилиты gcc, скомпилированные под MIPS.

Теперь нам нужно установить **newlib** - реализация стандартной библиотеки языка C для встраиваемых системах:

```shell
wget ftp://sourceware.org/pub/newlib/newlib-2.1.0.tar.gz
tar xzf newlib-2.1.0.tar.gz
mkdir newlib-build
cd newlib-build

export CPATH=

../newlib-2.1.0/configure --target=mips-netbsd-elf --prefix=$PREFIX
make all 2>&1 | tee make.log
make install
```