---
title: "Google Test"
path: "/blog/google-test"
---

https://www.eriksmistad.no/getting-started-with-google-test-on-ubuntu/

# Setup

## Debian

```sh
sudo apt-get install -y libgtest-dev
sudo apt-get install -y cmake
cd /usr/src/gtest
sudo cmake .
sudo make
sudo mv libg* /usr/lib/
```

# Integrate

## CMake

В **CMakeLists.txt** добавляем:

```
# Locate GTest
find_package(GTest REQUIRED)
include_directories(${GTEST_INCLUDE_DIRS})
 
# Link runTests with what we want to test and the GTest and pthread library
add_executable(runTests tests.cpp)
target_link_libraries(runTests ${GTEST_LIBRARIES} pthread)
```

После этого для билда и запуска тестов делаем:

```sh
cmake .
make
./runTests
```

# Usage

```cpp
// tests.cpp
#include "whattotest.cpp"
#include <gtest/gtest.h>
 
TEST(SquareRootTest, PositiveNos) { 
    ASSERT_EQ(6, squareRoot(36.0));
    ASSERT_EQ(18.0, squareRoot(324.0));
    ASSERT_EQ(25.4, squareRoot(645.16));
    ASSERT_EQ(0, squareRoot(0.0));
}
 
TEST(SquareRootTest, NegativeNos) {
    ASSERT_EQ(-1.0, squareRoot(-15.0));
    ASSERT_EQ(-1.0, squareRoot(-0.2));
}
 
int main(int argc, char **argv) {
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

Если в скрипт CMake добавить включение либы `gtest_main`, то метод `main(...)` из файла тестов можно удалить:

```
target_link_libraries(runTests ${GTEST_LIBRARIES} gtest_main pthread)
```