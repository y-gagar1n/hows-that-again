---
title: "CMake"
path: "/blog/cmake"
---
# CMake

Туториал: https://cliutils.gitlab.io/modern-cmake/

Набор популярных хелперов: https://github.com/CLIUtils/cmake (добавляется в проект командой `set(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake" ${CMAKE_MODULE_PATH})`)

## Опции

Опция может быть установлена через `-D`, например, `cmake -DCMAKE_BUILD_TYPE=Build`.

Полный список опций можно получить через `cmake -L` или `cmake -LH`. Второй вариант выдаст комментарии к каждой опции, если они указаны в скриптах. При первом запуске эти команды совершат запуск CMake, сгенерят все артефакты и только после этого выдадут список опций, не пугайтесь.

Все опции перечислены [здесь](https://cmake.org/cmake/help/v3.0/manual/cmake-variables.7.html)

### Основные опции

- `CMAKE_BUILD_TYPE` - тип билда: Release, RelWithDebInfo, Debug и т.д.
- `PROJECT_SOURCE_DIR` - полный путь к текущему проекту. Будет итерироваться по папкам вверх, пока не найдет CMakeLists.txt, в котором есть инструкция **project**
- `CMAKE_CURRENT_SOURCE_DIR` - полный путь к папке, которая обрабатывается cmake-ом (то есть если вызвали **cmake /proj/a**, то там будет **/proj/a**). Когда делаем библиотеку, лучше использовать эту опцию вместо `PROJECT_SOURCE_DIR`, чтобы облегчить клиентам включение нашего CMake проекта как субмодуля.
- `PROJECT_BINARY_DIR` - полный путь к папке билда проекта. Обычно это папка, откуда запускаем cmake.
- `CMAKE_INSTALL_PREFIX` - путь, куда будет установлена программа при **make install**
- `CMAKE_COMMAND` - полный путь к cmake
- `PROJECT_NAME` - имя проекта, указанное в команде `project`

## Команды

### Основные команды

- `project(learncmake C)` - устанавливает переменную `$PROJECT_NAME`. Вторым аргументов передается язык.
- `include_directories( include )` - подключает инклюды, то есть папки, в которых искать заголовочные файлы. Равнозначно `-I` в **GCC**. Это глобальная команда, поэтому не рекомендуется к использованию.
- `target_include_directories(one PUBLIC include)` - подключает инклюды для указанного первым аргументом таргета. `PUBLIC` означает, что все таргеты, которые ссылаются на этот, должны так же включать эту директорию. Другие варианты - `PRIVATE` (только текущий таргет) и `INTERFACE` (только зависимости).
- `include(ext.cmake)` - загружает и запускает скрипт cmake из указанного файла
- `set(KEY VALUE)` - установка переменных
- `set(SOURCES main.c a.c b.c)` - установка списка `[main.c a.c b.c]` в качестве значения переменной SOURCES
- `${SOURCES}` - обращение к значению переменной SOURCES
- `configure_file ( "a.h.in" "a.h" )` - берет файл **a.h.in**, подставляет туда значения переменных CMake и сохраняет как **a.h**. В файлах на них нужно ссылаться как: `${PROJECT_SOURCE_DIR}` или `@PROJECT_SOURCE_DIR@`. Строчки вида `#cmakedefine VAR ...` будут заменены либо на `#define VAR ...` либо на `/* #undef VAR */` в зависимости от того, установлено ли значение `VAR` в ложь (в том смысле, в котором if считает выражения ложью)
- `add_subdirectory(source_dir)` - включение папки со своим CMakeLists.txt в билд. Путь может быть относительным или абсолютным. Если CMakeLists.txt найден в папке, то CMake его обработает сразу же, прежде чем перейдет к следующей команде.
- `find_program(YASM_EXE NAMES yasm)` - ищет программу yasm и сохраняет путь к ней в переменной **YASM\_EXE**
- `find_package(SWIG REQUIRED)` - находит внешний проект и загружает оттуда его переменные. Например, после загрузки SWIG будет проинициализирована **SWIG\_EXECUTABLE**. Список экспортируемых переменных можно найти на странице **Find[package\_name]** в [документации CMake](https://cmake.org/cmake/help/v3.2/module/FindSWIG.html), или в [исходниках](https://github.com/Kitware/CMake/blob/master/Modules/FindSWIG.cmake)
- `message(STATUS "hello")` - вывод сообщения, первый аргумент задает уровень из списка STATUS/WARNING/AUTHOR\_WARNING/SEND\_ERROR/FATAL\_ERROR
- `option(VSDK_CPU_ONLY "set to true in only cpu should be used" OFF)` - опция, которую пользователь может задать при вызове cmake: `cmake . -DVSDK_CPU_ONLY=On`. Второй аргумент - словесное описание, третий - дефолтное значение. Обращаться к опции потом можно по имени: `if(VSDK_CPU_ONLY) ... `
- `install( TARGETS ${PROJECT_NAME}_firbuilder DESTINATION bin)` - задает правила установки. Первый аргумент задает таргет, второй - задает путь установки. Если относительный, то будет аппенднут к `$CMAKE_INSTALL_PREFIX`
- `find_package(package [REQUIRED])` - ищет и загружает свойства внешнего проекта. В папке `${CMAKE_MODULE_PATH}` будет искаться файл `Find<package>.cmake`. Если найден, то будет тут же обработан cmake-ом. Если такой файл не найден, то ищется конфиг под именем `<name>Config.cmake` или `<lower-case-name>-config.cmake`
- `list(APPEND LIBS ${vsd_LIBRARY})` - функция list описывает операции со списками. Первый аргумент обозначает операцию, в данном случае - append.
- `add_custom_target(makedir1 ALL COMMAND ${CMAKE_COMMAND} DEPENDS target1 -E make_directory "${PROJECT_BINARY_DIR}/src/ssd")` - добавляет таргет без аутпута, то есть он будет выполняться всегда. Первый аргумент - имя таргета. `ALL` означает, что таргет будет добавлен в таргет all. `COMMAND` - задает команду, все что после нее - тело команды. `DEPENDS` - задает другие таргеты, от которых зависит этот. Когда строится этот таргет, будут построены и все, перечисленные в `DEPENDS`. `-E` означает запуск cmake в командном режиме, `make_directory` - команда создания папки.
- `add_custom_command( OUTPUT ${SRC_ASM}.o COMMAND ${YASM_EXE} ARGS -p ${SRC_ASM_INPUT}.asm DEPENDS source.cpp)` - работает на этапе генерации, добавляет кастомную команду для генерации аутпута. `OUTPUT` задает аутпут, для генерации которого указывается команда (команда не обязательно должна создавать этот аутпут, здесь мы всего лишь указываем, какого аутпута мы от нее ожидаем), `COMMAND` - команду, а `ARGS` - аргументы. `DEPENDS` - задает список файлов или таргетов, от которых зависит эта команда.
- `string(TOUPPER ${STR_INPUT} STR_OUTPUT)` - провести операцию, указанную первым аргументом, на значении, указанном во втором аргументе, и сохранить результат в переменную, указанную в третьем.
- `execute_process(COMMAND ${GIT_EXECUTABLE} submodule update --init --recursive WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR} RESULT_VARIABLE GIT_SUBMOD_RESULT)` - работает на этапе конфигурации, запускает внешний процесс, в данном случае обновляет сабмодули гита. Путь к файлу процесса лучше не хардкодить, а найти заранее командой типа `find_package(Git)`. Если же нужно запустить команду на этапе генерации, например, скопировать папку или запустить скрипт для генерации каких-то файлов, то нужно использовать команду `add_custom_command`.

### Вызовы компилятора

- `add_executable( ${EXE_NAME} ${SOURCES} )` - создает вызываемый файл на основании файлов, перечисленных в `SOURCES`. Первый аргумент будет использован как имя таргета и имя полученного исполняемого файла.
- `add_library( ${LIB_NAME} ${LIBS_SOURCES})` - создает библиотеку на основании файлов, перечисленных в `SOURCES`. По умолчанию создает статическую (если не указана опция `BUILD_SHARED_LIBS`). Если нужно разделяемую, то нужно указать тип: `add_library( ${LIB_NAME} SHARED ${LIBS_SOURCES})`
- `target_link_libraries( ${TARGET_NAME} ${LIB_NAME} )` - линкует библиотеки и исполняемые файлы. Первый аргумент - это таргет, он должен предварительно быть создан командой `add_executable()` или `add_library()`. Остальные аргументы - имена таргетов или библиотек. В результате `TARGET_NAME` будет зависеть от `LIB_NAME`.
- `add_definitions( --std=c99)` - добавление флагов для компилятора

### Условия

- `if( CAFFE_ROOT)` - проверка, установлена ли переменная CAFFE\_ROOT
- `if( NOT CAFFE_ROOT)` - проверка, что не установлена переменная CAFFE\_ROOT
- `if( CAFFE_ROOT STREQUAL "")` - проверка, что переменная CAFFE\_ROOT равна ""

## Generator expressions

Билд состоит из 2 шагов:

1. Этап конфигурации
2. Этап генерации

Когда мы билдим для нескольких платформ или для нескольких конфигураций, некоторые значения (имена, пути аутпутов) нам могут быть известны только на этапе генерации. Для работы с ними существуют т.н. generator expressions, имеющие форму `$<KEYWORD>` или `$<KEYWORD:value>`. Keywords берутся из константного множества и у всех этих выражений разная семантика, смотреть [здесь](https://cmake.org/cmake/help/v3.4/manual/cmake-generator-expressions.7.html#id4)

Некоторые из выражений возвращают 0 или 1 и тогда они могут быть сами использованы в качестве keyword:

```
target_compile_options(MyTarget PRIVATE "$<$<CONFIG:Debug>:--my-flag>")
```

Здесь флаг `--my-flag` будет применен, если использована конфигурация билда Debug.

Когда используются:

- когда нужно что-то сделать только для конкретного языка
- когда нужно что-то сделать в зависимости от конфигурации билда
- когда нужно указать различные локации для построения и установки

## Функции

```
function(SIMPLE REQUIRED_ARG)
    message(STATUS "Simple arguments: ${REQUIRED_ARG}, followed by ${ARGV}")
    set(${REQUIRED_ARG} "From SIMPLE" PARENT_SCOPE)
endfunction()

simple(This)
message("Output: ${This}")
```

Аргументы внутри функции можно специфицировать командой `cmake_parse_arguments`:

```
function(COMPLEX)
cmake_parse_arguments(
    COMPLEX_PREFIX
    "SINGLE;ANOTHER"
    "ONE_VALUE;ALSO_ONE_VALUE"
    "MULTI_VALUES"
    ${ARGN}
)

endfunction()

complex(SINGLE ONE_VALUE value MULTI_VALUES some other values)
```

После вызова внутри функции `simple` будут следующие аргументы:

```
COMPLEX_PREFIX_SINGLE = TRUE
COMPLEX_PREFIX_ANOTHER = FALSE
COMPLEX_PREFIX_ONE_VALUE = "value"
COMPLEX_PREFIX_ALSO_ONE_VALUE = <UNDEFINED>
COMPLEX_PREFIX_MULTI_VALUES = "some;other;values"
```

Все оставшиеся аргументы будут в переменной `COMPLEX_PREFIX_UNPARSED_ARGUMENTS`.

## Чтение опций из файлов

Допустим, версия проекта хранится в файле `Version.hpp` и мы хотим ее оттуда прочитать в наш скрипт CMake.

```
set(VERSION_REGEX "#define MY_VERSION[ \t]+\"(.+)\"")	// создаем регэксп для чтения и сохраняем в переменной VERSION_REGEX

file(STRINGS "${CMAKE_CURRENT_SOURCE_DIR}/include/My/Version.hpp"
    VERSION_STRING REGEX ${VERSION_REGEX})	// читаем файл, обрабатываем нашим регэкспом, результат сохраняем в переменную VERSION_STRING

string(REGEX REPLACE ${VERSION_REGEX} "\\1" VERSION_STRING "${VERSION_STRING}")	// если найдено несколько версий, берем первую

project(My LANGUAGES CXX VERSION ${VERSION_STRING})	// задаем версию проекта
```

## C++11

вот так можно установить версию языка (выбор между `cxx_std_11`, `cxx_std_14`, `cxx_std_17`):

```
target_compile_features(myTarget PUBLIC cxx_std_11)
set_target_properties(myTarget PROPERTIES CXX_EXTENSIONS OFF)
```

Вторая строчка необязательна, но облегчит жизнь, без нее будет использован флаг `-std=g++11` вместо `-std=c++11`.

Есть и другой способ:

```
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
```

первая строчка устанавливает стандарт, а вторая указывает, что нужно его использовать. Однако этот метод не стоит использовать для сборки библиотек.

## Субмодули гита

Вот так выкачиваем субмодули при построении:

```
find_package(Git QUIET)
if(GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR}/.git")
# Update submodules as needed
    option(GIT_SUBMODULE "Check submodules during build" ON)
    if(GIT_SUBMODULE)
        message(STATUS "Submodule update")
        execute_process(COMMAND ${GIT_EXECUTABLE} submodule update --init --recursive
                        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
                        RESULT_VARIABLE GIT_SUBMOD_RESULT)
        if(NOT GIT_SUBMOD_RESULT EQUAL "0")
            message(FATAL_ERROR "git submodule update --init failed with ${GIT_SUBMOD_RESULT}, please checkout submodules")
        endif()
    endif()
endif()

if(NOT EXISTS "${PROJECT_SOURCE_DIR}/extern/repo/CMakeLists.txt")
    message(FATAL_ERROR "The submodules were not downloaded! GIT_SUBMODULE was turned off or failed. Please update submodules and try again.")
endif()
```

А так включаем проект в процесс билда:

```
add_subdirectory(extern/repo)
```

### Бонус: сохранение версии субмодуля в переменную

```
execute_process(COMMAND ${GIT_EXECUTABLE} rev-parse --short HEAD
                WORKING_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}"
                OUTPUT_VARIABLE PACKAGE_GIT_VERSION
                ERROR_QUIET
                OUTPUT_STRIP_TRAILING_WHITESPACE)
```

## Часто используемые утилиты

Набор часто используемых утилит можно использовать через команду `cmake -E <mode>` в `add_custom_command`. 

Список утилит можно найти [здесь](https://cmake.org/cmake/help/latest/manual/cmake.1.html#run-a-command-line-tool).

## Рекомендуемая структура проекта

Если наш проект называется `projects`, библиотека в нем называется `lib`, а исполняемый файл - `app`, то рекомендуется следующая структура:

```
- project
  - .gitignore
  - README.md
  - LICENCE.md
  - CMakeLists.txt
  - cmake
    - FindSomeLib.cmake
  - include
    - project
      - lib.hpp
  - src
    - CMakeLists.txt
    - lib.cpp
  - apps
    - CMakeLists.txt
    - app.cpp
  - tests
    - testlib.cpp
  - docs
    - Doxyfile.in
  - extern
    - googletest
  - scripts
    - helper.py
```    

`CMakeLists.txt` есть почти во всех папках с **.cpp** и нет в папке `include`. Это потому что содержимое папки `include` должно копироваться в `/usr/include` как есть и не содержать никаких лишних файлов. По этой же причине, в папке `include` выделена папка для нашего проекта - чтобы наверняка не было конфликтов.

В папке `extern` должны лежать внешние зависимости в виде субмодулей гита.

В `.gitignore` должна быть строчка `/build*`.

## Пример

```
cmake_minimum_required(VERSION 3.8)

project(Calculator LANGUAGES CXX)

add_library(calclib STATIC src/calclib.cpp include/calc/lib.hpp)   // создаем таргет calclib, который будет статической библиотекой, собираемой из файлов src/calclib.cpp и include/calc/lib.hpp

target_include_directories(calclib PUBLIC include)	// подключаем папку include с заголовками, которые могут понадобиться при билде таргета/библиотеки calclib

target_compile_features(calclib PUBLIC cxx_std_11)	// указываем флаги компиляции для таргета calclib

add_executable(calc apps/calc.cpp)	// создаем таргет calc, который будет исполняемым файлом, собираемым из файла apps/calc.cpp

target_link_libraries(calc PUBLIC calclib)	// указываем, что таргет/исполняемый файл calc зависит от таргета/либы calclib
```

Другой пример:

```
find_package(PythonInterp REQUIRED)
add_custom_command(OUTPUT "${CMAKE_CURRENT_BINARY_DIR}/include/Generated.hpp"
    COMMAND "${PYTHON_EXECUTABLE}" "${CMAKE_CURRENT_SOURCE_DIR}/scripts/GenerateHeader.py" --argument
    DEPENDS some_target)

add_custom_target(generate_header ALL
    DEPENDS "${CMAKE_CURRENT_BINARY_DIR}/include/Generated.hpp")

install(FILES ${CMAKE_CURRENT_BINARY_DIR}/include/Generated.hpp DESTINATION include)
```

Здесь, при запуске `cmake` без указания таргета будет запущен таргет `generate_header` (так как ему указано `ALL`). Он зависит от `Generated.hpp`, который указан как `OUTPUT` команды во второй строчке. Но эта команда сама зависит от таргета `some_target` (здесь не указан). Когда будет построен `some_target`, команда запуститься, запустит процесс питона, подаст в него скрипт `GenerateHeader.py`, питон сгенерит файл `include/Generated.hpp`, после чего таргет `generate_header` будет завершен.