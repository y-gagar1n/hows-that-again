webpackJsonp([0xce42944ea964],{425:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>CMake</h1>\n<h3>Глобальные переменные</h3>\n<p>Все переменные перечислены <a href="https://cmake.org/cmake/help/v3.0/manual/cmake-variables.7.html">здесь</a></p>\n<p>Основные:</p>\n<p><strong>PROJECT<em>SOURCE</em>DIR</strong> - полный путь к текущему проекту. Будет итерироваться по папкам вверх, пока не найдет CMakeLists.txt, в котором есть инструкция <strong>project</strong></p>\n<p><strong>CMAKE<em>CURRENT</em>SOURCE_DIR</strong> - полный путь к папке, которая обрабатывается cmake-ом (то есть если вызвали <strong>cmake /proj/a</strong>, то там будет <strong>/proj/a</strong>)</p>\n<p><strong>PROJECT<em>BINARY</em>DIR</strong> - полный путь к папке билда проекта. Обычно это папка, откуда запускаем cmake.</p>\n<p><strong>CMAKE<em>INSTALL</em>PREFIX</strong> - путь, куда будет установлена программа при <strong>make install</strong></p>\n<p><strong>CMAKE_COMMAND</strong> - полный путь к cmake</p>\n<h3>Основные команды</h3>\n<p><code>project(learncmake C)</code> - устанавливает переменную $PROJECT_NAME. Вторым аргументов передается язык.</p>\n<p><code>include_directories( include )</code> - подключает инклюды, то есть папки, в которых искать заголовочные файлы. Равнозначно -I в GCC.</p>\n<p><code>include(ext.cmake)</code> - загружает и запускает скрипт cmake из указанного файла</p>\n<p><code>set(KEY VALUE)</code> - установка переменных</p>\n<p><code>set(SOURCES main.c a.c b.c)</code> - установка списка [main.c a.c b.c] в качестве значения переменной SOURCES</p>\n<p><code>${SOURCES}</code> - обращение к значению переменной SOURCES</p>\n<p><code>configure_file ( "a.h.in" "a.h" )</code> - берет файл a.h.in, подставляет туда значения переменных и сохраняет как a.h. В файлах на них нужно ссылаться как: <code>${PROJECT_SOURCE_DIR}</code> или <code>@PROJECT_SOURCE_DIR@</code>. Строчки вида <code>#cmakedefine VAR ...</code> будут заменены либо на <code>#define VAR ...</code> либо на <code>/* #undef VAR */</code> в зависимости от того, установлено ли значение <code>VAR</code> в ложь (в том смысле, в котором if считает выражения ложью)</p>\n<p><code>add_subdirectory(source_dir)</code> - включение папки со своим CMakeLists.txt в билд. Путь может быть относительным или абсолютным. Если CMakeLists.txt найден в папке, то CMake его обработает сразу же, прежде чем перейдет к следующей команде.</p>\n<p><code>find_program(YASM_EXE NAMES yasm)</code> - ищет программу yasm и сохраняет путь к ней в переменной YASM_EXE</p>\n<p><code>find_package(SWIG REQUIRED)</code> - находит внешний проект и загружает оттуда его переменные. Например, после загрузки SWIG будет проинициализирована <strong>SWIG_EXECUTABLE</strong>. Список экспортируемых переменных можно найти на странице <strong>Find[package_name]</strong> в <a href="https://cmake.org/cmake/help/v3.2/module/FindSWIG.html">документации CMake</a>, или в <a href="https://github.com/Kitware/CMake/blob/master/Modules/FindSWIG.cmake">исходниках</a></p>\n<p><code>message(STATUS "hello")</code> - вывод сообщения, первый аргумент задает уровень из списка STATUS/WARNING/AUTHOR<em>WARNING/SEND</em>ERROR/FATAL_ERROR</p>\n<p><code>option(VSDK_CPU_ONLY "set to true in only cpu should be used" OFF)</code> - опция, которую пользователь может задать при вызове cmake: <code>cmake . -DVSDK_CPU_ONLY=On</code>. Второй аргумент - словесное описание, третий - дефолтное значение.</p>\n<p><code>install( TARGETS ${PROJECT_NAME}_firbuilder DESTINATION bin)</code> - задает правила установки. Первый аргумент задает таргет, второй - задает путь установки. Если относительный, то будет аппенднут к <code>$CMAKE_INSTALL_PREFIX</code></p>\n<p><code>find_package(package [REQUIRED])</code> - ищет и загружает свойства внешнего проекта. В папке <code>${CMAKE_MODULE_PATH}</code> будет искаться файл <code>Find&#x3C;package>.cmake</code>. Если найден, то будет тут же обработан cmake-ом. Если такой файл не найден, то ищется конфиг под именем <code>&#x3C;name>Config.cmake</code> или <code>&#x3C;lower-case-name>-config.cmake</code></p>\n<p><code>list(APPEND LIBS ${vsd_LIBRARY})</code> - функция list описывает операции с осписками. Первый аргумент обозначает операцию, в данном случае - append.</p>\n<p><code>add_custom_target(makedir1 ALL COMMAND ${CMAKE_COMMAND} -E make_directory "${PROJECT_BINARY_DIR}/src/ssd")</code> - добавляет таргет без аутпута, то есть он будет выполняться всегда. Первый аргумент - имя таргета. ALL означает, что таргет будет добавлен в таргет all. COMMAND - задает команду, все что после нее - тело команды. -E означает запуск cmake в командном режиме, make_directory - команда создания папки.</p>\n<p><code>add_custom_command( OUTPUT ${SRC_ASM}.o COMMAND ${YASM_EXE} ARGS -p ${SRC_ASM_INPUT}.asm)</code> - добавляет кастомную команду для генерации аутпута. OUTPUT задает аутпут, для гненерации которого указывается команда, COMMAND - команду, а ARGS - аргументы.</p>\n<h3>Вызовы компилятора</h3>\n<p><code>add_executable( ${PROJECT_NAME} ${SOURCES} )</code> - создает вызываемый файл на основании файлов, перечисленных в SOURCES</p>\n<p><code>add_library( ${LIB_NAME} ${LIBS_SOURCES})</code> - создает библиотеку на основании файлов, перечисленных в SOURCES. По умолчанию создает статическую. Если нужно разделяемую, то нужно указать тип: <code>add_library( ${LIB_NAME} SHARED ${LIBS_SOURCES})</code></p>\n<p><code>target_link_libraries( ${PROJECT_NAME} ${LIB_NAME} )</code> - линкует библиотеки и исполняемые файлы. Первый аргумент - это таргет, он должен предварительно быть создан командой <code>add_executable()</code> или <code>add_library()</code>. Остальные аргументы - имена библиотек.</p>\n<p><code>add_definitions( --std=c99)</code> - добавление флагов для компилятора</p>\n<h3>Условия</h3>\n<p><code>if( CAFFE_ROOT)</code> - проверка, установлена ли переменная CAFFE_ROOT</p>\n<p><code>if( NOT CAFFE_ROOT)</code> - проверка, что не установлена переменная CAFFE_ROOT</p>\n<p><code>if( CAFFE_ROOT STREQUAL "")</code> - проверка, что переменная CAFFE_ROOT равна ""</p>',frontmatter:{path:"/blog/cmake",title:"CMake"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-cmake-7871ae59454b19dc9f56.js.map