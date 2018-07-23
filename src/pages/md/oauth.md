---
title: "OAuth"
path: "/blog/oauth"
---
# OAuth

OAUth2 работает так (https://aaronparecki.com/2012/07/29/2/oauth2-simplified): 

Есть сервис автоматизирующий что-нибудь на фейсбуке. Это клиент. Когда я хочу залогиниться в него через фейсбук, происходит следующее: 

1. При создании приложение клиента регистрируется в ФБ, указывая URI редиректа и получает Client ID. 
2. При запросе авторизации клиент редиректит пользователя к Oauth API фейсбука, передавая в ссылке Client Id, redirect URI и возможно дополнительную информацию об уровне доступа. Ссылка примерно такого вида: 

https://oauth2server.com/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos 

На этой странице у пользователя спрашивается, готов ли он предоставить доступ. 

3. Если пользователь согласен, то ФБ редиректит его по redirect URI обратно на клиента, передавая параметром auth code 

https://oauth2client.com/cb?code=AUTH_CODE_HERE 

4. Клиент, получив auth code, отправляет его серверу чтобы получить access_token. В запросе он указывает известный только ему client_secret. 

```
POST https://api.oauth2server.com/token 
grant_type=authorization_code&
code=AUTH_CODE_HERE&
redirect_uri=REDIRECT_URI&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET 
```

5. Все операции клиента в дальнейшем проводятся с использованием этого токена. 

Это процесс для серверных приложений (процесс называется **authorization code flow / explicit flow**). Важное отличие от клиентских: на этапе 2 передается `response_type=code`. 

## Implicit flow

В случае client-side приложений используется **implicit flow**, на 2 этапе передается response_type=token и на этапе 3 клиенту приходит сразу токен (https://oauth2client.com/cb?token=ACCESS_TOKEN) 

Explicit mode нужен, чтобы пользователь не узнал токен. Если пользователю известен токен, то он может утечь к другому, опасному приложению. Чтобы этого не было, такие токены обычно делают short-lived. 

## Resource Owner Password Flow

При локальном логине (т.е. без использования сторонних соцсетей) используется Resource Owner Password Flow (http://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html) 

В этом случае все довольно просто: 

1. пользователь шлет серверу авторизации в открытом виде (через https!) логин и пароль 
2. сервер авторизации отвечает токеном 
3. в последующих запросах клиент включает токен в заголовок http. 

По идее это нужно для того, чтобы когда у тебя отдельные сервер авторизации и сервер приложения, то сервер приложения ничего не знал о логине и пароле пользователя. 

Пример использования этого flow для WebAPI (http://www.asp.net/web-api/overview/security/individual-accounts-in-web-api) 

Зачем нужно использовать OAuth http://stackoverflow.com/questions/7561631/oauth-2-0-benefits-and-use-cases-why
