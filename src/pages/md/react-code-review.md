---
title: "Как строится React"
path: "/blog/react-code-review"
---
# Как строится React

1. Запускается yarn build
2. В package.json видим node ./scripts/rollup/build.js
  (rollup это такая альтернатива webpack)
3. В этом скрипте buildEverything - итерирует по бандлам, для каждого делает createBundle
4. Внутри createBundle видим

  ```js
  await rollup(rollupConfig);  // здесь код для каждого
      пакета транспилируется и собирается в бандл
  await asyncCopyTo(mainOutputPath,
      otherOutputPaths[i]); // это, кажется, копирует все бандлы в build/node_modules
  ```

5. Возвращаемся в buildEverything, там вызывается Packaging.prepareNpmPackages
6. Внутри prepareNpmPackages проходим по всем пакетам в build/node_modules,
    для каждого копируем недостающие файлы из packages/{name} и
    запускаем `npm pack build/node_modules/${name}`


Работа с виртуальным стэком, остановка, отмена и возобновление процесса апдейта происходит в файле ReactFiberScheduler.js, сам стэк - ReactFiberStack.js
Коммиты - в ReactFiberCommitWork.js

Процесс реконсилейшна состоит из 2 шагов:

1. Реконсилейшн/рендер - строим work-in-progress tree, считаем изменения. Этот шаг может быть прерван.
2. Коммит - применяем изменения в DOM. Этот шаг **не** может быть прерван.

При вызове setState реакт добавляет Update в UpdateQueue (он есть у каждого фибера, а значит - компонента), после чего добавляет в расписание работу по превращению этого апдейта в жизнь.  Для добавления в расписание используется функция requestIdleCallback. Это значит регистрируем коллбэк, который будет выполнен, когда у главного потока браузера не будет другой работы. Когда свободное время появляется, браузер вызывает эту функцию и передает ей параметром, сколько у него есть времени. После этого вызывается функция workLoop. В этом методе происходит выполнение работы по "кусочкам" и постоянное возвращение в главный поток. Возвращение происходит после каждой обработанной ноды дерева. 

Везде говорят, что реакт использует requestIdleCallback, но это не так - в ReactScheduler используется свой полифилл для requestIdleCallback, использующий requestAnimationFrame. 

Начиная от ReactDOM.render:
1. ReactDOM.render(element, container, callback). Этот метод просто прокидывает параметры в следующий, добавляя только `forceHydrate: false`. true туда передается только из метода `hydrate`.
2. ReactDom.legacyRenderSubtreeIntoContainer()
3. DOMRenderer.unbatchedUpdates, внутрь которого передается функция рендера при помощи `ReactRoot.legacy_renderSubtreeIntoContainer`
4. Оттуда (через `DOMRenderer.updateContainer`) попадаем в `updateContainer` (`ReactFiberReconciler.js`), в качестве коллбэка передавая туда ReactWork._onCommit
5. ReactFiberReconciler.updateContainerAtExpirationTime ставит в очередь апдейт в методе scheduleRootUpdate
6. В scheduleRootUpdate создается инстанс апдейта, в поле payload ему пишется элемент, который рендерим. коллбэком передается переданный ранее ReactWork._onCommit и вызывается enqueueUpdate, то есть добавляет апдейт в UpdateQueue. Затем вызывается scheduleWork, который добавляет апдейт в расписание. 
7. UpdateQueue обрабатывает очередь в processUpdateQueue
