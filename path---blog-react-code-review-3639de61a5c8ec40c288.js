webpackJsonp([0xaeb5117886ee],{435:function(e,a){e.exports={data:{markdownRemark:{html:'<h1>Как строится React</h1>\n<ol>\n<li>Запускается yarn build</li>\n<li>В package.json видим node ./scripts/rollup/build.js\n(rollup это такая альтернатива webpack)</li>\n<li>В этом скрипте buildEverything - итерирует по бандлам, для каждого делает createBundle</li>\n<li>Внутри createBundle видим</li>\n</ol>\n<pre><code class="language-js">await rollup(rollupConfig);  // здесь код для каждого\n    пакета транспилируется и собирается в бандл\nawait asyncCopyTo(mainOutputPath,\n    otherOutputPaths[i]); // это, кажется, копирует все бандлы в build/node_modules\n</code></pre>\n<ol start="5">\n<li>Возвращаемся в buildEverything, там вызывается Packaging.prepareNpmPackages</li>\n<li>Внутри prepareNpmPackages проходим по всем пакетам в build/node<em>modules,\nдля каждого копируем недостающие файлы из packages/{name} и\nзапускаем `npm pack build/node</em>modules/${name}`</li>\n</ol>\n<p>Работа с виртуальным стэком, остановка, отмена и возобновление процесса апдейта происходит в файле ReactFiberScheduler.js, сам стэк - ReactFiberStack.js\nКоммиты - в ReactFiberCommitWork.js</p>\n<p>Процесс реконсилейшна состоит из 2 шагов:</p>\n<ol>\n<li>Реконсилейшн/рендер - строим work-in-progress tree, считаем изменения. Этот шаг может быть прерван.</li>\n<li>Коммит - применяем изменения в DOM. Этот шаг <strong>не</strong> может быть прерван.</li>\n</ol>\n<p>При вызове setState реакт добавляет Update в UpdateQueue (он есть у каждого фибера, а значит - компонента), после чего добавляет в расписание работу по превращению этого апдейта в жизнь.  Для добавления в расписание используется функция requestIdleCallback. Это значит регистрируем коллбэк, который будет выполнен, когда у главного потока браузера не будет другой работы. Когда свободное время появляется, браузер вызывает эту функцию и передает ей параметром, сколько у него есть времени. После этого вызывается функция workLoop. В этом методе происходит выполнение работы по "кусочкам" и постоянное возвращение в главный поток. Возвращение происходит после каждой обработанной ноды дерева. </p>\n<p>Везде говорят, что реакт использует requestIdleCallback, но это не так - в ReactScheduler используется свой полифилл для requestIdleCallback, использующий requestAnimationFrame. </p>\n<p>Начиная от ReactDOM.render:</p>\n<ol>\n<li>ReactDOM.render(element, container, callback). Этот метод просто прокидывает параметры в следующий, добавляя только <code>forceHydrate: false</code>. true туда передается только из метода <code>hydrate</code>.</li>\n<li>ReactDom.legacyRenderSubtreeIntoContainer()</li>\n<li>DOMRenderer.unbatchedUpdates, внутрь которого передается функция рендера при помощи <code>ReactRoot.legacy_renderSubtreeIntoContainer</code></li>\n<li>Оттуда (через <code>DOMRenderer.updateContainer</code>) попадаем в <code>updateContainer</code> (<code>ReactFiberReconciler.js</code>), в качестве коллбэка передавая туда ReactWork._onCommit</li>\n<li>ReactFiberReconciler.updateContainerAtExpirationTime ставит в очередь апдейт в методе scheduleRootUpdate</li>\n<li>В scheduleRootUpdate создается инстанс апдейта, в поле payload ему пишется элемент, который рендерим. коллбэком передается переданный ранее ReactWork._onCommit и вызывается enqueueUpdate, то есть добавляет апдейт в UpdateQueue. Затем вызывается scheduleWork, который добавляет апдейт в расписание. </li>\n<li>UpdateQueue обрабатывает очередь в processUpdateQueue</li>\n</ol>',frontmatter:{path:"/blog/react-code-review",title:"Как строится React"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-react-code-review-3639de61a5c8ec40c288.js.map