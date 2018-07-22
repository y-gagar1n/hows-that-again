# CMake

### Глобальные переменные

Все переменные перечислены [здесь](https://cmake.org/cmake/help/v3.0/manual/cmake-variables.7.html)

Основные:

**PROJECT_SOURCE_DIR** - полный путь к текущему проекту. Будет итерироваться по папкам вверх, пока не найдет CMakeLists.txt, в котором есть инструкция **project**

**CMAKE_CURRENT_SOURCE_DIR** - полный путь к папке, которая обрабатывается cmake-ом (то есть если вызвали **cmake /proj/a**, то там будет **/proj/a**)

**PROJECT_BINARY_DIR** - полный путь к папке билда проекта. Обычно это папка, откуда запускаем cmake.

**CMAKE_INSTALL_PREFIX** - путь, куда будет установлена программа при **make install**

**CMAKE_COMMAND** - полный путь к cmake

### Основные команды

`project(learncmake C)` - устанавливает переменную $PROJECT_NAME. Вторым аргументов передается язык.

`include_directories( include )` - подключает инклюды, то есть папки, в которых искать заголовочные файлы. Равнозначно -I в GCC.

`include(ext.cmake)` - загружает и запускает скрипт cmake из указанного файла

`set(KEY VALUE)` - установка переменных

`set(SOURCES main.c a.c b.c)` - установка списка [main.c a.c b.c] в качестве значения переменной SOURCES

`${SOURCES}` - обращение к значению переменной SOURCES

`configure_file ( "a.h.in" "a.h" )` - берет файл a.h.in, подставляет туда значения переменных и сохраняет как a.h. В файлах на них нужно ссылаться как: `${PROJECT_SOURCE_DIR}` или `@PROJECT_SOURCE_DIR@`. Строчки вида `#cmakedefine VAR ...` будут заменены либо на `#define VAR ...` либо на `/* #undef VAR */` в зависимости от того, установлено ли значение `VAR` в ложь (в том смысле, в котором if считает выражения ложью)

`add_subdirectory(source_dir)` - включение папки со своим CMakeLists.txt в билд. Путь может быть относительным или абсолютным. Если CMakeLists.txt найден в папке, то CMake его обработает сразу же, прежде чем перейдет к следующей команде.

`find_program(YASM_EXE NAMES yasm)` - ищет программу yasm и сохраняет путь к ней в переменной YASM_EXE

`find_package(SWIG REQUIRED)` - находит внешний проект и загружает оттуда его переменные. Например, после загрузки SWIG будет проинициализирована **SWIG_EXECUTABLE**. Список экспортируемых переменных можно найти на странице **Find[package_name]** в [документации CMake](https://cmake.org/cmake/help/v3.2/module/FindSWIG.html), или в [исходниках](https://github.com/Kitware/CMake/blob/master/Modules/FindSWIG.cmake)

`message(STATUS "hello")` - вывод сообщения, первый аргумент задает уровень из списка STATUS/WARNING/AUTHOR_WARNING/SEND_ERROR/FATAL_ERROR

`option(VSDK_CPU_ONLY "set to true in only cpu should be used" OFF)` - опция, которую пользователь может задать при вызове cmake: `cmake . -DVSDK_CPU_ONLY=On`. Второй аргумент - словесное описание, третий - дефолтное значение.

`install( TARGETS ${PROJECT_NAME}_firbuilder DESTINATION bin)` - задает правила установки. Первый аргумент задает таргет, второй - задает путь установки. Если относительный, то будет аппенднут к `$CMAKE_INSTALL_PREFIX`

`find_package(package [REQUIRED])` - ищет и загружает свойства внешнего проекта. В папке `${CMAKE_MODULE_PATH}` будет искаться файл `Find<package>.cmake`. Если найден, то будет тут же обработан cmake-ом. Если такой файл не найден, то ищется конфиг под именем `<name>Config.cmake` или `<lower-case-name>-config.cmake`

`list(APPEND LIBS ${vsd_LIBRARY})` - функция list описывает операции с осписками. Первый аргумент обозначает операцию, в данном случае - append.

`add_custom_target(makedir1 ALL COMMAND ${CMAKE_COMMAND} -E make_directory "${PROJECT_BINARY_DIR}/src/ssd")` - добавляет таргет без аутпута, то есть он будет выполняться всегда. Первый аргумент - имя таргета. ALL означает, что таргет будет добавлен в таргет all. COMMAND - задает команду, все что после нее - тело команды. -E означает запуск cmake в командном режиме, make_directory - команда создания папки.

`add_custom_command( OUTPUT ${SRC_ASM}.o COMMAND ${YASM_EXE} ARGS -p ${SRC_ASM_INPUT}.asm)` - добавляет кастомную команду для генерации аутпута. OUTPUT задает аутпут, для гненерации которого указывается команда, COMMAND - команду, а ARGS - аргументы.

### Вызовы компилятора

`add_executable( ${PROJECT_NAME} ${SOURCES} )` - создает вызываемый файл на основании файлов, перечисленных в SOURCES

`add_library( ${LIB_NAME} ${LIBS_SOURCES})` - создает библиотеку на основании файлов, перечисленных в SOURCES. По умолчанию создает статическую. Если нужно разделяемую, то нужно указать тип: `add_library( ${LIB_NAME} SHARED ${LIBS_SOURCES})`

`target_link_libraries( ${PROJECT_NAME} ${LIB_NAME} )` - линкует библиотеки и исполняемые файлы. Первый аргумент - это таргет, он должен предварительно быть создан командой `add_executable()` или `add_library()`. Остальные аргументы - имена библиотек.

`add_definitions( --std=c99)` - добавление флагов для компилятора

### Условия

`if( CAFFE_ROOT)` - проверка, установлена ли переменная CAFFE_ROOT

`if( NOT CAFFE_ROOT)` - проверка, что не установлена переменная CAFFE_ROOT

`if( CAFFE_ROOT STREQUAL "")` - проверка, что переменная CAFFE_ROOT равна ""