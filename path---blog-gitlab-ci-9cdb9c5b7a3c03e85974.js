webpackJsonp([0x76cacfca92bf],{424:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>Gitlab CI</h1>\n<p>Здесь будет перечисление камней, на которые я наткнулся при работе с гитлабом.</p>\n<h2>Docker-in-Docker</h2>\n<p>Нужно, чтобы построение происходило в докере, а в результате публиковался другой докер-образ.</p>\n<p>Для начала нужно настроить работу докера в докере. </p>\n<p>Если у нас раннер зарегистрирован в гитлабе (<em>shared runner</em>), то нужно редактировать конфиг <code>/etc/gitlab-runner/config.toml</code></p>\n<p>Туда нужно вписать строки:</p>\n<pre><code>executor = "docker"\n[runners.docker]\n    image = "docker"\n    volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]\n</code></pre>\n<p>Если же мы используем локальный билд в раннере командой <code>build-runner exec docker &#x3C;job-name></code>, то конфиг тут не используется и нам придется передавать параметры аргументов командной строки:</p>\n<pre><code class="language-shell">gitlab-runner exec docker --docker-volumes "/var/run/docker.sock:/var/run/docker.sock" &#x3C;job-name>\n</code></pre>\n<p>Теперь вся сборка у нас будет происходить в контейнере образа <strong>docker</strong>, в котором доступна команда <code>docker build</code>. А работать это будет благодаря пробросу <code>docker.sock</code>, что означает что внутри образа будет использоваться на самом деле хостовый докер.</p>\n<p>Дальше нужно настроить <em>gitlab-ci.yml</em>. Я делал так:</p>\n<pre><code class="language-yaml">stages:\n  - build-build\n  - deploy-build\n  - build\n  - deploy\n\n  build_build_container:\n  stage: build-build\n  image: docker\n  script:\n    - docker pull "my-build" || true\n    - docker pull "my-build":$CI_COMMIT_REF_NAME || true\n    - docker build -t "my-build":$CI_COMMIT_REF_NAME --cache-from "my-build" --cache-from "my-build":$CI_COMMIT_REF_NAME ./build\n  tags:\n    - docker\n\n  deploy_build_container:\n    stage: deploy-build\n    image: docker\n    script:\n      - docker push "my-build":$CI_COMMIT_REF_NAME\n    tags:\n      - docker\n\n  build_release:\n    state: build\n    image: my-build:${CI_COMMIT_REF_NAME}\n    script:\n     ...\n     - docker build -t "release":$CI_COMMIT_REF_NAME .\n</code></pre>\n<ol>\n<li><strong>build-build</strong> Строится билд-образ докера, в котором будет строиться проект на этапе <code>build</code>. В этом образе должны быть установлены все необходимые зависимости для построения всех проектов.</li>\n<li><strong>build-deploy</strong> Полученный билд-образ деплоится в реестр.</li>\n<li><strong>build</strong> Билд подпроекта FC3 внутри билд-образа. Обычно на этом этапе нужно скомпилировать исходники, скопировать из в контекст построения докер-образа подпроекта, после чего запустить билд образа. Внутри билд-образа установлен докер, поэтому можно использовать команду <code>docker build</code>.</li>\n<li><strong>deploy</strong> Деплоятся образы, полученные на этапе <code>build</code>.</li>\n</ol>\n<p>Пояснения:</p>\n<ul>\n<li>по адресу <code>./build/Dockerfile</code> лежит докерфайл нашего билд-контейнера, в котором установлены все необходимые зависимости</li>\n<li>конструкция <code>--cache-from</code> нужна, чтобы использовать кэш с предыдущего построения билд-контейнера, иначе все зависимости будут строиться каждый раз. Обычное кэширование тут не используется, потому что мы строим внутри образа <strong>docker</strong> и все промежуточные слои остаются в нем и пропадают при следующем билде.</li>\n</ul>\n<h2>Git submodules</h2>\n<p>Если в проекте используются субмодули, то нужно в <strong>gitlab-ci.yml</strong> добавить переменную:</p>\n<pre><code class="language-yaml">variables:\n  GIT_SUBMODULE_STRATEGY: normal\n</code></pre>\n<p>И в <code>.gitmodules</code> изменить пути к репозиториям на относительные:</p>\n<pre><code>[submodule "project"]\n  path = project\n  url = ../../group/project.git\n</code></pre>\n<p>Это описано в документации. Проблема наступает, когда мы хотим использовать субмодули при построении в докере, который строится в докере.</p>\n<p>Там придется мапить субмодули с хоста на те пути, куда указывает <code>.gitmodules</code>:</p>\n<pre><code>gitlab-runner exec docker --docker-volumes "/var/run/docker.sock:/var/run/docker.sock" \\\n    --docker-volumes $(pwd)/.git/modules/project:/home/y/group/project.git \\\n    job_name\n</code></pre>',frontmatter:{path:"/blog/gitlab-ci",title:"Gitlab CI"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-gitlab-ci-9cdb9c5b7a3c03e85974.js.map