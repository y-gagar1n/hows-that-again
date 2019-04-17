webpackJsonp([0x5b47e366de4f],{487:function(p,e){p.exports={data:{markdownRemark:{html:'<iframe width="640" height="360" src="https://www.youtube.com/embed/7K6tW_Enhwg?list=PLyKHoHx4tuqoKfxRdDUHfOd3h7Br0f8Ol" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n<h1>dapp</h1>\n<p>Сейчас умеет только собирать образ и складывать в Docker Registry</p>\n<p>Будет поддержка полного цикла CI/CD</p>\n<h2>Требования к подобной системе</h2>\n<ul>\n<li>образы должны собираться меньше чем за 10 секунд</li>\n<li>размер образов должен быть меньше 200 МБ</li>\n<li>коммит на 10 КБ должен увеличивать образ на 10 КБ, а не на 400 МБ</li>\n</ul>\n<h2>Проблемы и решения</h2>\n<h3>Стейджи</h3>\n<p>В dapp выделили несколько стейджей в процессе сборки:</p>\n<ul>\n<li>before_install</li>\n<li>install</li>\n<li>before_setup</li>\n<li>setup</li>\n</ul>\n<p>Каждый шаг сборки относится к одному из этих стейджей. Идея в том, что те шаги, которые меняются реже, должны выполняться раньше.</p>\n<h3>Внешний контекст</h3>\n<p>Если мы одним из шагов в Dockerfile делаем <code>RUN apt-get update</code>, то размер образа сильно вырастает.</p>\n<p>Мы можем сделать так:</p>\n<pre><code>RUN apt-get update &#x26;&#x26; apt-get install -y netcat &#x26;&#x26; rm -rf /var/lib/apt\n</code></pre>\n<p>Но в этом случае апдейт будет выполняться при каждой сборке и не будет выполняться требование 10 секунд.</p>\n<p><strong>Решение</strong>: маунтить папку <code>/var/lib/apt</code> с хоста. Первое построение образа ее заполнит, остальные будут переиспользовать. Если воркеров несколько, то эту папку можно положить на отдельный сервак и пошарить через NFS.</p>\n<p>Можно использовать этот паттерн, например, для: </p>\n<ul>\n<li>apt, yum</li>\n<li>bundler, pip, composer, npm, bower</li>\n<li>ccache, кэш "сборщика ассетов"</li>\n</ul>\n<h3>git</h3>\n<p>Добавлять все исходники каждый раз в проект - долго.</p>\n<p>Непонятно, какие стадии пересобирать при добавлении каких файлов.</p>\n<p>Непонятно, как проставлять владельца и права.</p>\n<p><strong>Решение</strong>: в dapp сделали специальный стейдж <code>git archive</code> - это выкачивание исходников из репозиторий на момент первой сборки. Этот стейдж идет вторым этапом, между <code>before_install</code> и <code>install</code>. А последний шаг - <code>git patch apply</code>.</p>\n<p>В результате каждый следующий коммит это добавление дельты между архивом и текущим состоянием.</p>\n<p>При этом в dapp мы можем указать, что изменения в каком-либо файле должны приводить к пересборке какого-либо из более ранних стейджей. Например, изменения в <code>packages.json</code> должны приводить к пересборке <code>install</code>.</p>\n<p>Когда размер дельты между архивом и текущим состоянием достигает 1 МБ - этот патч фиксируется в образе в виде слоя и следующие патчи пойдут уже поверх этого слоя. Когда достигается лимит на количество слоев в образе - пересобирается архив.</p>\n<h3>Артефакты</h3>\n<p>В образе нашего приложения много места занимают всякие сборщики, среды разработки и прочее. То есть собрали приложение нодой, а нода осталась в образе и занимает место. Можно на одном из последующих слоев ее удалить, но размер образа это не изменит, так как она останется в истории слоев.</p>\n<p><strong>Решение</strong>: сборка идет в отдельном образе, после чего артефакты оттуда копируются в отдельный конечный образ.</p>\n<h3>Chef</h3>\n<p>Там еще какая-то поддержка модулей shell через использование Chef, но я в этом не разбираюсь.</p>',frontmatter:{path:"/blog/video/dapp-introduction",title:"Собираем Docker-образы быстро и удобно / Дмитрий Столяров (Флант)"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-video-dapp-introduction-18a08af6d97c4f55c2fa.js.map