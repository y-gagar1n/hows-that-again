webpackJsonp([0xacf82727a700],{434:function(e,t){e.exports={data:{markdownRemark:{html:'<p><a href="https://www.eriksmistad.no/getting-started-with-google-test-on-ubuntu/">https://www.eriksmistad.no/getting-started-with-google-test-on-ubuntu/</a></p>\n<h1>Setup</h1>\n<h2>Debian</h2>\n<pre><code class="language-sh">sudo apt-get install -y libgtest-dev\nsudo apt-get install -y cmake\ncd /usr/src/gtest\nsudo cmake .\nsudo make\nsudo mv libg* /usr/lib/\n</code></pre>\n<h1>Integrate</h1>\n<h2>CMake</h2>\n<p>В <strong>CMakeLists.txt</strong> добавляем:</p>\n<pre><code># Locate GTest\nfind_package(GTest REQUIRED)\ninclude_directories(${GTEST_INCLUDE_DIRS})\n \n# Link runTests with what we want to test and the GTest and pthread library\nadd_executable(runTests tests.cpp)\ntarget_link_libraries(runTests ${GTEST_LIBRARIES} pthread)\n</code></pre>\n<p>После этого для билда и запуска тестов делаем:</p>\n<pre><code class="language-sh">cmake .\nmake\n./runTests\n</code></pre>\n<h1>Usage</h1>\n<pre><code class="language-cpp">// tests.cpp\n#include "whattotest.cpp"\n#include &#x3C;gtest/gtest.h>\n \nTEST(SquareRootTest, PositiveNos) { \n    ASSERT_EQ(6, squareRoot(36.0));\n    ASSERT_EQ(18.0, squareRoot(324.0));\n    ASSERT_EQ(25.4, squareRoot(645.16));\n    ASSERT_EQ(0, squareRoot(0.0));\n}\n \nTEST(SquareRootTest, NegativeNos) {\n    ASSERT_EQ(-1.0, squareRoot(-15.0));\n    ASSERT_EQ(-1.0, squareRoot(-0.2));\n}\n \nint main(int argc, char **argv) {\n    testing::InitGoogleTest(&#x26;argc, argv);\n    return RUN_ALL_TESTS();\n}\n</code></pre>\n<p>Если в скрипт CMake добавить включение либы <code>gtest_main</code>, то метод <code>main(...)</code> из файла тестов можно удалить:</p>\n<pre><code>target_link_libraries(runTests ${GTEST_LIBRARIES} gtest_main pthread)\n</code></pre>',frontmatter:{path:"/blog/google-test",title:"Google Test"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-google-test-516e9734941f59461e2c.js.map