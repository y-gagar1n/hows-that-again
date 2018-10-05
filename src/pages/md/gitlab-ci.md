---
title: "Gitlab CI"
path: "/blog/gitlab-ci"
---

# Gitlab CI

Здесь будет перечисление камней, на которые я наткнулся при работе с гитлабом.

## Docker-in-Docker

Нужно, чтобы построение происходило в докере, а в результате публиковался другой докер-образ.

Для начала нужно настроить работу докера в докере. 

Если у нас раннер зарегистрирован в гитлабе (*shared runner*), то нужно редактировать конфиг `/etc/gitlab-runner/config.toml`

Туда нужно вписать строки:

```
executor = "docker"
[runners.docker]
	image = "docker"
	volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
```

Если же мы используем локальный билд в раннере командой `build-runner exec docker <job-name>`, то конфиг тут не используется и нам придется передавать параметры аргументов командной строки:

```shell
gitlab-runner exec docker --docker-volumes "/var/run/docker.sock:/var/run/docker.sock" <job-name>
```

Теперь вся сборка у нас будет происходить в контейнере образа **docker**, в котором доступна команда `docker build`. А работать это будет благодаря пробросу `docker.sock`, что означает что внутри образа будет использоваться на самом деле хостовый докер.

Дальше нужно настроить *gitlab-ci.yml*. Я делал так:

```yaml
stages:
  - build-build
  - deploy-build
  - build
  - deploy

  build_build_container:
  stage: build-build
  image: docker
  script:
    - docker pull "my-build" || true
    - docker pull "my-build":$CI_COMMIT_REF_NAME || true
    - docker build -t "my-build":$CI_COMMIT_REF_NAME --cache-from "my-build" --cache-from "my-build":$CI_COMMIT_REF_NAME ./build
  tags:
    - docker

  deploy_build_container:
    stage: deploy-build
    image: docker
    script:
      - docker push "my-build":$CI_COMMIT_REF_NAME
    tags:
      - docker

  build_release:
  	state: build
  	image: my-build:${CI_COMMIT_REF_NAME}
  	script:
  	 ...
  	 - docker build -t "release":$CI_COMMIT_REF_NAME .
```

1. **build-build** Строится билд-образ докера, в котором будет строиться проект на этапе `build`. В этом образе должны быть установлены все необходимые зависимости для построения всех проектов.
2. **build-deploy** Полученный билд-образ деплоится в реестр.
3. **build** Билд подпроекта FC3 внутри билд-образа. Обычно на этом этапе нужно скомпилировать исходники, скопировать из в контекст построения докер-образа подпроекта, после чего запустить билд образа. Внутри билд-образа установлен докер, поэтому можно использовать команду `docker build`.
4. **deploy** Деплоятся образы, полученные на этапе `build`.

Пояснения:
  - по адресу `./build/Dockerfile` лежит докерфайл нашего билд-контейнера, в котором установлены все необходимые зависимости
  - конструкция `--cache-from` нужна, чтобы использовать кэш с предыдущего построения билд-контейнера, иначе все зависимости будут строиться каждый раз. Обычное кэширование тут не используется, потому что мы строим внутри образа **docker** и все промежуточные слои остаются в нем и пропадают при следующем билде.

## Git submodules

Если в проекте используются субмодули, то нужно в **gitlab-ci.yml** добавить переменную:

```yaml
variables:
  GIT_SUBMODULE_STRATEGY: normal
```

И в `.gitmodules` изменить пути к репозиториям на относительные:

```
[submodule "project"]
  path = project
  url = ../../group/project.git
```

Это описано в документации. Проблема наступает, когда мы хотим использовать субмодули при построении в докере, который строится в докере.

Там придется мапить субмодули с хоста на те пути, куда указывает `.gitmodules`:

```
gitlab-runner exec docker --docker-volumes "/var/run/docker.sock:/var/run/docker.sock" \
    --docker-volumes $(pwd)/.git/modules/project:/home/y/group/project.git \
    job_name
```
