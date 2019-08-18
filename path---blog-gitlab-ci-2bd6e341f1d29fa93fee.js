webpackJsonp([0x76cacfca92bf],{445:function(n,a){n.exports={data:{markdownRemark:{html:'<h1>Gitlab CI</h1>\n<p>Здесь будет перечисление камней, на которые я наткнулся при работе с гитлабом.</p>\n<h2>Docker-in-Docker</h2>\n<p>Нужно, чтобы построение происходило в докере, а в результате публиковался другой докер-образ.</p>\n<p>Для начала нужно настроить работу докера в докере. </p>\n<p>Если у нас раннер зарегистрирован в гитлабе (<em>shared runner</em>), то нужно редактировать конфиг <code class="language-text">/etc/gitlab-runner/config.toml</code></p>\n<p>Туда нужно вписать строки:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">executor = &quot;docker&quot;\n[runners.docker]\n\timage = &quot;docker&quot;\n\tvolumes = [&quot;/var/run/docker.sock:/var/run/docker.sock&quot;, &quot;/cache&quot;]</code></pre></div>\n<p>Если же мы используем локальный билд в раннере командой <code class="language-text">build-runner exec docker &lt;job-name&gt;</code>, то конфиг тут не используется и нам придется передавать параметры аргументов командной строки:</p>\n<div class="gatsby-highlight" data-language="shell"><pre class="language-shell"><code class="language-shell">gitlab-runner <span class="token builtin class-name">exec</span> docker --docker-volumes <span class="token string">"/var/run/docker.sock:/var/run/docker.sock"</span> <span class="token operator">&lt;</span>job-name<span class="token operator">></span></code></pre></div>\n<p>Теперь вся сборка у нас будет происходить в контейнере образа <strong>docker</strong>, в котором доступна команда <code class="language-text">docker build</code>. А работать это будет благодаря пробросу <code class="language-text">docker.sock</code>, что означает что внутри образа будет использоваться на самом деле хостовый докер.</p>\n<p>Дальше нужно настроить <em>gitlab-ci.yml</em>. Я делал так:</p>\n<div class="gatsby-highlight" data-language="yaml"><pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">stages</span><span class="token punctuation">:</span>\n  <span class="token punctuation">-</span> build<span class="token punctuation">-</span>build\n  <span class="token punctuation">-</span> deploy<span class="token punctuation">-</span>build\n  <span class="token punctuation">-</span> build\n  <span class="token punctuation">-</span> deploy\n\n  <span class="token key atrule">build_build_container</span><span class="token punctuation">:</span>\n  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build<span class="token punctuation">-</span>build\n  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker\n  <span class="token key atrule">script</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> docker pull "my<span class="token punctuation">-</span>build" <span class="token punctuation">|</span><span class="token punctuation">|</span> true\n    <span class="token punctuation">-</span> docker pull "my<span class="token punctuation">-</span>build"<span class="token punctuation">:</span>$CI_COMMIT_REF_NAME <span class="token punctuation">|</span><span class="token punctuation">|</span> true\n    <span class="token punctuation">-</span> docker build <span class="token punctuation">-</span>t "my<span class="token punctuation">-</span>build"<span class="token punctuation">:</span>$CI_COMMIT_REF_NAME <span class="token punctuation">-</span><span class="token punctuation">-</span>cache<span class="token punctuation">-</span>from "my<span class="token punctuation">-</span>build" <span class="token punctuation">-</span><span class="token punctuation">-</span>cache<span class="token punctuation">-</span>from "my<span class="token punctuation">-</span>build"<span class="token punctuation">:</span>$CI_COMMIT_REF_NAME ./build\n  <span class="token key atrule">tags</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> docker\n\n  <span class="token key atrule">deploy_build_container</span><span class="token punctuation">:</span>\n    <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy<span class="token punctuation">-</span>build\n    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker\n    <span class="token key atrule">script</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> docker push "my<span class="token punctuation">-</span>build"<span class="token punctuation">:</span>$CI_COMMIT_REF_NAME\n    <span class="token key atrule">tags</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> docker\n\n  <span class="token key atrule">build_release</span><span class="token punctuation">:</span>\n  \t<span class="token key atrule">state</span><span class="token punctuation">:</span> build\n  \t<span class="token key atrule">image</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>build<span class="token punctuation">:</span>$<span class="token punctuation">{</span>CI_COMMIT_REF_NAME<span class="token punctuation">}</span>\n  \t<span class="token key atrule">script</span><span class="token punctuation">:</span>\n  \t <span class="token punctuation">...</span>\n  \t <span class="token punctuation">-</span> docker build <span class="token punctuation">-</span>t "release"<span class="token punctuation">:</span>$CI_COMMIT_REF_NAME .</code></pre></div>\n<ol>\n<li><strong>build-build</strong> Строится билд-образ докера, в котором будет строиться проект на этапе <code class="language-text">build</code>. В этом образе должны быть установлены все необходимые зависимости для построения всех проектов.</li>\n<li><strong>build-deploy</strong> Полученный билд-образ деплоится в реестр.</li>\n<li><strong>build</strong> Билд подпроекта FC3 внутри билд-образа. Обычно на этом этапе нужно скомпилировать исходники, скопировать из в контекст построения докер-образа подпроекта, после чего запустить билд образа. Внутри билд-образа установлен докер, поэтому можно использовать команду <code class="language-text">docker build</code>.</li>\n<li><strong>deploy</strong> Деплоятся образы, полученные на этапе <code class="language-text">build</code>.</li>\n</ol>\n<p>Пояснения:</p>\n<ul>\n<li>по адресу <code class="language-text">./build/Dockerfile</code> лежит докерфайл нашего билд-контейнера, в котором установлены все необходимые зависимости</li>\n<li>конструкция <code class="language-text">--cache-from</code> нужна, чтобы использовать кэш с предыдущего построения билд-контейнера, иначе все зависимости будут строиться каждый раз. Обычное кэширование тут не используется, потому что мы строим внутри образа <strong>docker</strong> и все промежуточные слои остаются в нем и пропадают при следующем билде.</li>\n</ul>\n<h2>Git submodules</h2>\n<p>Если в проекте используются субмодули, то нужно в <strong>gitlab-ci.yml</strong> добавить переменную:</p>\n<div class="gatsby-highlight" data-language="yaml"><pre class="language-yaml"><code class="language-yaml"><span class="token key atrule">variables</span><span class="token punctuation">:</span>\n  <span class="token key atrule">GIT_SUBMODULE_STRATEGY</span><span class="token punctuation">:</span> normal</code></pre></div>\n<p>И в <code class="language-text">.gitmodules</code> изменить пути к репозиториям на относительные:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">[submodule &quot;project&quot;]\n  path = project\n  url = ../../group/project.git</code></pre></div>\n<p>Это описано в документации. Проблема наступает, когда мы хотим использовать субмодули при построении в докере, который строится в докере.</p>\n<p>Там придется мапить субмодули с хоста на те пути, куда указывает <code class="language-text">.gitmodules</code>:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">gitlab-runner exec docker --docker-volumes &quot;/var/run/docker.sock:/var/run/docker.sock&quot; \\\n    --docker-volumes $(pwd)/.git/modules/project:/home/y/group/project.git \\\n    job_name</code></pre></div>',frontmatter:{path:"/blog/gitlab-ci",title:"Gitlab CI"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-gitlab-ci-2bd6e341f1d29fa93fee.js.map