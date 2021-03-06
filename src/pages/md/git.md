---
title: "Git"
path: "/blog/git"
---
# Git


Хороший сайт для изучения бранчинга: https://learngitbranching.js.org/

## Просмотр коммитов свой ветки

Предполагаем, что нас интересуют коммиты начиная с момента, когда мы форкнулись от ветки `master`:

`git log master..`

## Разные команды

`git diff` \- просмотр всех изменений, как в индексе так и вне

`git diff --cached` \- просмотр только изменений в индексе

`git add <file>` \- добавление файла в индекс

`git rm <file>` \- удаление файла из индекса И с диска

`git rm <file> \--cached` \- удаление файла только из индекса, оставляя его на диске

Если в файл уже были внесены изменения, то для удаления нужно сделать:

`git rm <file> -f`

`git mv <file_old> <file_new>` \- переименование файла. На самом деле гит не хранит метаданные и эта команда аналогична: `mv <file_old> <file_new> & git rm <fie_old> & git add <file_new>`

`git log -p` \- выводит лог с diff-ом изменений

`git log -2` \- показывает только 2 последние записи лога

`git reset HEAD <file>` \- исключение файла из индекса. При этом изменения в файле не откатываются!

`git reset --hard` \- сбрасывает индекс и рабочую папку

`git reset --hard <commit>` \- сбрасывает индекс, рабочую папку, а так же устанавливает HEAD текущего бранча на указанный коммит

`git checkout -- <file>` \- отмена изменений в файле

`git clean -df` \- откат untracked файлов, которых нет в .gitignore

`git clean -dfn` \- откат untracked файлов, которых нет в .gitignore, но ничего не удаляет, только показывает что будет удалять

`git fetch <remote>` \- получение метаинфы об удаленном репозитории, но пока без обновления на другую ревизию

При клонировании адрес репозитория автоматически добавляется как origin

`git push origin master` \- пуш в дефолтную ветку в origin

`git remote show <remote>` \- показать информацию об удаленном репозитории

`git branch <new-branch>` \- создать новую ветку

`git checkout <branch-name>` \- переход на ветку

`git checkout -b <new-branch>` \- создание и сразу переход на новую ветку

`git checkout master & git merge <branch>` \- мерж бранча в мастер

`git branch -d <branch>` \- удаление бранча

`git mergetool` \- использование графической утилиты для разрешения конфликтов

`git config --global alias.co checkout` \- создание алиаса

## Detached HEAD

**detached HEAD** \- состояние, когда сделан checkout на конкретный коммит и мы сейчас не на голове бранча. Опасность в том, что если в этом состоянии сделать коммит, то он не будет принадлежать ни к какому бранчу. Если после этого переключиться на другой бранч, то они вообще потеряются. Поэтому **крайне рекомендуется** коммиты из такого состояния делать только в новый именованный бранч.

Пример:

```shell
//сначала мы находимся в состоянии detached HEAD
git commit -m "....." // делаем "оторванный коммит"
git branch my-temporary-work // создаем новую ветку, как указатель на коммит, сделанный в предыдущей строчке
git checkout master
git merge my-temporary-work // мержим нашу ветку в мастер
```

Ветка в *git* — это плавающий указатель на коммит. у указателя нет и не может быть никакой «вершины». Специальный указатель `HEAD` вполне может указывать и не на ветку, а на конкретный коммит (т.н. *detached head* ), как в нашем случае.

Хорошее объяснение на тему detached HEAD: <https://ru.stackoverflow.com/a/543892>

## Squashing commits

`git rebase -i HEAD~3` // 3 - это количество последних коммитов, которые надо засквошить

После этого появится текстовый редактор с редактированием сценария ребейса. Самый ранний коммит в нем будет наверху. Пример:
    
    
    pick f7f3f6d changed my name a bit
    pick 310154e updated README formatting and added blame
    pick a5f4a0d added cat-file
    

Нужно отредактировать этот коммит следующим образом (поменять команду на squash у коммитов после первого):
    
    
    pick f7f3f6d changed my name a bit 
    squash 310154e updated README formatting and added blame 
    squash a5f4a0d added cat-file
    

После этого все 3 коммита будут объединены в 1. Коммит f7f3f6d будет переписан - в него будут добавлены изменения коммитов 310154e и a5f4a0d.

## Изменение состава файлов в предыдущем коммите

```shell
git reset --soft HEAD^    // откатывает HEAD на предыдущий коммит, при этом все изменения последнего коммита остаются на диске и фигурируют в индексе
git reset HEAD path/to/unwanted_file // убираем ненужный файл из индекса
git commit -c ORIG_HEAD // коммитим еще раз с тем же сообщением, что и оригинальный коммит
```

https://git\- scm.com/book/ru/v1/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1 %8B- Git-%D0%9F%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C-%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8

## Перемещение одного коммита на другую ветку

```shell
git checkout master
git cherry-pick <commit ID of XX>
```

## Перемещение 3 последних коммитов из ветки master в новую ветку experiment

С начала ветки experiment у нас не существует

```shell
git checkout master
git branch experiment // создаем на последнем коммите ветку experiment, сами же остаемся на master
git reset --hard HEAD~3 // перемещаем HEAD master'а на 3 коммита назад. В результате у нас master указывает на старый коммит, а experiment - на самый последний
git checkout experiment // перемещаемся на последний коммит, но уже в рамках бранча experiment
```

В третьей строчке можно иначе:

`git branch -f master HEAD~3`

## Патчи:

Допустим, нужно сделать патч для коммита 96d262d9 и 2 патчей до него. Делается это так:

`git format-patch -3 96d262d9` // здесь 3 - это как раз количество коммитов

Если сделать просто `git format-patch 85ad802`, то в патче будут все коммиты, начиная от первого **после** 85ad802 и заканчивая tip текущей ветки.

Однако такой метод создат по 1 патчу на каждый коммит. Чтобы получить 1 файл, в котором все коммиты:

```shell
git diff 85ad802 > patch` \- эта команда выведет все изменения **после**
коммита в файл patch.
git apply --stat <путь к файлу патча> \- вывести инфу об изменениях в патче
git apply --check <путь к файлу патча> \- проверить, накатится ли патч
git apply <путь к файлу патча> \- накатить патч
```

## Диффы

Чтобы сделать дифф между своей текущей веткй и другой (например, мастером):

`git diff master...current`


## Работа с пулл-реквестами в гитхабе

```shell
git remote add upstream <https://github.com/y-gagar1n/autoprefixer> \- добавление своего форка как нового ремоута под именем upstream

git fetch upstream - выкачивание изменений из своего форка

git checkout my-branch
```

## Изменение автора для прошлых коммитов

Сначала выставляем нового автора:

```shell
git config --local user.name y-gagar1n
git config --local user.email "y.timofeyev@gmail.com"
```

Затем интерактивно проходим по каждому коммиту и выставляем ему нового автора.

```shell
git rebase -i HEAD~N
```

где `N` - "глубина" самого старшего коммита, которому нужно сменить автора. Например, если нужно сменить трем последним, или третьему коммиту "сверху", то N=3.

Выставляем `e` у тех коммитов, которые нам нужно отредактировать.

Затем в цикле повторяем N раз:

```shell
git commit --amend --reset-author
git rebase --continue
```

## Пуш/пулл без ввода логина и пароля

Открываем .git/config

В поле `url` должна быть запись следующего вида:

```
url = ssh://git@github.com/y-gagar1n/dotfiles.git
```

Чтобы у коммита в гитхабе выставился правильный ник, отличный от установленного глобально на системе, нужно его указать дополнительно:

```
[user]                                                                                                                                                                                                   
name = y-gagar1n                                                                                                                                                                                     
email = yggr1n@gmail.com
```  