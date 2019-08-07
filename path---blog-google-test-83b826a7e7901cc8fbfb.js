webpackJsonp([0xacf82727a700],{444:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="https://www.eriksmistad.no/getting-started-with-google-test-on-ubuntu/">https://www.eriksmistad.no/getting-started-with-google-test-on-ubuntu/</a></p>\n<h1>Setup</h1>\n<h2>Debian</h2>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> -y libgtest-dev\n<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> -y cmake\n<span class="token builtin class-name">cd</span> /usr/src/gtest\n<span class="token function">sudo</span> cmake <span class="token builtin class-name">.</span>\n<span class="token function">sudo</span> <span class="token function">make</span>\n<span class="token function">sudo</span> <span class="token function">mv</span> libg* /usr/lib/</code></pre></div>\n<h1>Integrate</h1>\n<h2>CMake</h2>\n<p>В <strong>CMakeLists.txt</strong> добавляем:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text"># Locate GTest\nfind_package(GTest REQUIRED)\ninclude_directories(${GTEST_INCLUDE_DIRS})\n \n# Link runTests with what we want to test and the GTest and pthread library\nadd_executable(runTests tests.cpp)\ntarget_link_libraries(runTests ${GTEST_LIBRARIES} pthread)</code></pre></div>\n<p>После этого для билда и запуска тестов делаем:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash">cmake <span class="token builtin class-name">.</span>\n<span class="token function">make</span>\n./runTests</code></pre></div>\n<h1>Usage</h1>\n<div class="gatsby-highlight" data-language="clike"><pre class="language-clike"><code class="language-clike"><span class="token comment">// tests.cpp</span>\n#include <span class="token string">"whattotest.cpp"</span>\n#include <span class="token operator">&lt;</span>gtest<span class="token operator">/</span>gtest<span class="token punctuation">.</span>h<span class="token operator">></span>\n \n<span class="token function">TEST</span><span class="token punctuation">(</span>SquareRootTest<span class="token punctuation">,</span> PositiveNos<span class="token punctuation">)</span> <span class="token punctuation">{</span> \n    <span class="token function">ASSERT_EQ</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token function">squareRoot</span><span class="token punctuation">(</span><span class="token number">36.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">ASSERT_EQ</span><span class="token punctuation">(</span><span class="token number">18.0</span><span class="token punctuation">,</span> <span class="token function">squareRoot</span><span class="token punctuation">(</span><span class="token number">324.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">ASSERT_EQ</span><span class="token punctuation">(</span><span class="token number">25.4</span><span class="token punctuation">,</span> <span class="token function">squareRoot</span><span class="token punctuation">(</span><span class="token number">645.16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">ASSERT_EQ</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">squareRoot</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n \n<span class="token function">TEST</span><span class="token punctuation">(</span>SquareRootTest<span class="token punctuation">,</span> NegativeNos<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">ASSERT_EQ</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token function">squareRoot</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">15.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">ASSERT_EQ</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token function">squareRoot</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n \nint <span class="token function">main</span><span class="token punctuation">(</span>int argc<span class="token punctuation">,</span> char <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    testing<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">InitGoogleTest</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token function">RUN_ALL_TESTS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>Если в скрипт CMake добавить включение либы <code class="language-text">gtest_main</code>, то метод <code class="language-text">main(...)</code> из файла тестов можно удалить:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">target_link_libraries(runTests ${GTEST_LIBRARIES} gtest_main pthread)</code></pre></div>',frontmatter:{path:"/blog/google-test",title:"Google Test"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-google-test-83b826a7e7901cc8fbfb.js.map