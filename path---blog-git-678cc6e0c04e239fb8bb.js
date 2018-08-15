webpackJsonp([60149745945718],{406:function(e,t){e.exports={data:{markdownRemark:{html:'<h1>Git</h1>\n<p>Хороший сайт для изучения бранчинга: <a href="https://learngitbranching.js.org/">https://learngitbranching.js.org/</a></p>\n<h2>Просмотр коммитов свой ветки</h2>\n<p>Предполагаем, что нас интересуют коммиты начиная с момента, когда мы форкнулись от ветки <code>master</code>:</p>\n<p><code>git log master..</code></p>\n<h2>Разные команды</h2>\n<p><code>git diff</code> - просмотр всех изменений, как в индексе так и вне</p>\n<p><code>git diff --cached</code> - просмотр только изменений в индексе</p>\n<p><code>git add &#x3C;file></code> - добавление файла в индекс</p>\n<p><code>git rm &#x3C;file></code> - удаление файла из индекса И с диска</p>\n<p><code>git rm &#x3C;file> \\--cached</code> - удаление файла только из индекса, оставляя его на диске</p>\n<p>Если в файл уже были внесены изменения, то для удаления нужно сделать:</p>\n<p><code>git rm &#x3C;file> -f</code></p>\n<p><code>git mv &#x3C;file_old> &#x3C;file_new></code> - переименование файла. На самом деле гит не хранит метаданные и эта команда аналогична: <code>mv &#x3C;file_old> &#x3C;file_new> &#x26; git rm &#x3C;fie_old> &#x26; git add &#x3C;file_new></code></p>\n<p><code>git log -p</code> - выводит лог с diff-ом изменений</p>\n<p><code>git log -2</code> - показывает только 2 последние записи лога</p>\n<p><code>git reset HEAD &#x3C;file></code> - исключение файла из индекса. При этом изменения в файле не откатываются!</p>\n<p><code>git reset --hard</code> - сбрасывает индекс и рабочую папку</p>\n<p><code>git reset --hard &#x3C;commit></code> - сбрасывает индекс, рабочую папку, а так же устанавливает HEAD текущего бранча на указанный коммит</p>\n<p><code>git checkout -- &#x3C;file></code> - отмена изменений в файле</p>\n<p><code>git clean -df</code> - откат untracked файлов, которых нет в .gitignore</p>\n<p><code>git clean -dfn</code> - откат untracked файлов, которых нет в .gitignore, но ничего не удаляет, только показывает что будет удалять</p>\n<p><code>git fetch &#x3C;remote></code> - получение метаинфы об удаленном репозитории, но пока без обновления на другую ревизию</p>\n<p>При клонировании адрес репозитория автоматически добавляется как origin</p>\n<p><code>git push origin master</code> - пуш в дефолтную ветку в origin</p>\n<p><code>git remote show &#x3C;remote></code> - показать информацию об удаленном репозитории</p>\n<p><code>git branch &#x3C;new-branch></code> - создать новую ветку</p>\n<p><code>git checkout &#x3C;branch-name></code> - переход на ветку</p>\n<p><code>git checkout -b &#x3C;new-branch></code> - создание и сразу переход на новую ветку</p>\n<p><code>git checkout master &#x26; git merge &#x3C;branch></code> - мерж бранча в мастер</p>\n<p><code>git branch -d &#x3C;branch></code> - удаление бранча</p>\n<p><code>git mergetool</code> - использование графической утилиты для разрешения конфликтов</p>\n<p><code>git config --global alias.co checkout</code> - создание алиаса</p>\n<h2>Detached HEAD</h2>\n<p><strong>detached HEAD</strong> - состояние, когда сделан checkout на конкретный коммит и мы сейчас не на голове бранча. Опасность в том, что если в этом состоянии сделать коммит, то он не будет принадлежать ни к какому бранчу. Если после этого переключиться на другой бранч, то они вообще потеряются. Поэтому <strong>крайне рекомендуется</strong> коммиты из такого состояния делать только в новый именованный бранч.</p>\n<p>Пример:</p>\n<pre><code class="language-shell">//сначала мы находимся в состоянии detached HEAD\ngit commit -m "....." // делаем "оторванный коммит"\ngit branch my-temporary-work // создаем новую ветку, как указатель на коммит, сделанный в предыдущей строчке\ngit checkout master\ngit merge my-temporary-work // мержим нашу ветку в мастер\n</code></pre>\n<p>Ветка в <em>git</em> — это плавающий указатель на коммит. у указателя нет и не может быть никакой «вершины». Специальный указатель <code>HEAD</code> вполне может указывать и не на ветку, а на конкретный коммит (т.н. <em>detached head</em> ), как в нашем случае.</p>\n<p>Хорошее объяснение на тему detached HEAD: <a href="https://ru.stackoverflow.com/a/543892">https://ru.stackoverflow.com/a/543892</a></p>\n<h2>Squashing commits</h2>\n<p><code>git rebase -i HEAD~3</code> // 3 - это количество последних коммитов, которые надо засквошить</p>\n<p>После этого появится текстовый редактор с редактированием сценария ребейса. Самый ранний коммит в нем будет наверху. Пример:\n<br>\n<br>\npick f7f3f6d changed my name a bit\npick 310154e updated README formatting and added blame\npick a5f4a0d added cat-file\n</p>\n<p>Нужно отредактировать этот коммит следующим образом (поменять команду на squash у коммитов после первого):\n<br>\n<br>\npick f7f3f6d changed my name a bit\nsquash 310154e updated README formatting and added blame\nsquash a5f4a0d added cat-file\n</p>\n<p>После этого все 3 коммита будут объединены в 1. Коммит f7f3f6d будет переписан - в него будут добавлены изменения коммитов 310154e и a5f4a0d.</p>\n<h2>Изменение состава файлов в предыдущем коммите</h2>\n<pre><code class="language-shell">git reset --soft HEAD^    // откатывает HEAD на предыдущий коммит, при этом все изменения последнего коммита остаются на диске и фигурируют в индексе\ngit reset HEAD path/to/unwanted_file // убираем ненужный файл из индекса\ngit commit -c ORIG_HEAD // коммитим еще раз с тем же сообщением, что и оригинальный коммит\n</code></pre>\n<p><a href="https://git%5C-">https://git-</a> scm.com/book/ru/v1/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1 %8B- Git-%D0%9F%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C-%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8</p>\n<h2>Перемещение одного коммита на другую ветку</h2>\n<pre><code class="language-shell">git checkout master\ngit cherry-pick &#x3C;commit ID of XX>\n</code></pre>\n<h2>Перемещение 3 последних коммитов из ветки master в новую ветку experiment</h2>\n<p>С начала ветки experiment у нас не существует</p>\n<pre><code class="language-shell">git checkout master\ngit branch experiment // создаем на последнем коммите ветку experiment, сами же остаемся на master\ngit reset --hard HEAD~3 // перемещаем HEAD master\'а на 3 коммита назад. В результате у нас master указывает на старый коммит, а experiment - на самый последний\ngit checkout experiment // перемещаемся на последний коммит, но уже в рамках бранча experiment\n</code></pre>\n<p>В третьей строчке можно иначе:</p>\n<p><code>git branch -f master HEAD~3</code></p>\n<h2>Патчи:</h2>\n<p>Допустим, нужно сделать патч для коммита 96d262d9 и 2 патчей до него. Делается это так:</p>\n<p><code>git format-patch -3 96d262d9</code> // здесь 3 - это как раз количество коммитов</p>\n<p>Если сделать просто <code>git format-patch 85ad802</code>, то в патче будут все коммиты, начиная от первого <strong>после</strong> 85ad802 и заканчивая tip текущей ветки.</p>\n<p>Однако такой метод создат по 1 патчу на каждый коммит. Чтобы получить 1 файл, в котором все коммиты:</p>\n<pre><code class="language-shell">git diff 85ad802 > patch` \\- эта команда выведет все изменения **после**\nкоммита в файл patch.\ngit apply --stat &#x3C;путь к файлу патча> \\- вывести инфу об изменениях в патче\ngit apply --check &#x3C;путь к файлу патча> \\- проверить, накатится ли патч\ngit apply &#x3C;путь к файлу патча> \\- накатить патч\n</code></pre>\n<h2>Диффы</h2>\n<p>Чтобы сделать дифф между своей текущей веткй и другой (например, мастером):</p>\n<p><code>git diff master...current</code></p>\n<h2>Работа с пулл-реквестами в гитхабе</h2>\n<pre><code class="language-shell">git remote add upstream &#x3C;https://github.com/y-gagar1n/autoprefixer> \\- добавление своего форка как нового ремоута под именем upstream\n\ngit fetch upstream - выкачивание изменений из своего форка\n\ngit checkout my-branch\n</code></pre>',frontmatter:{path:"/blog/git",title:"Git"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-git-678cc6e0c04e239fb8bb.js.map