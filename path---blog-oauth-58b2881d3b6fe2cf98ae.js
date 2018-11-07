webpackJsonp([0xe91c53f15dc3],{444:function(t,e){t.exports={data:{markdownRemark:{html:'<h1>OAuth</h1>\n<p>OAUth2 работает так (<a href="https://aaronparecki.com/2012/07/29/2/oauth2-simplified">https://aaronparecki.com/2012/07/29/2/oauth2-simplified</a>): </p>\n<p>Есть сервис автоматизирующий что-нибудь на фейсбуке. Это клиент. Когда я хочу залогиниться в него через фейсбук, происходит следующее: </p>\n<ol>\n<li>При создании приложение клиента регистрируется в ФБ, указывая URI редиректа и получает Client ID. </li>\n<li>При запросе авторизации клиент редиректит пользователя к Oauth API фейсбука, передавая в ссылке Client Id, redirect URI и возможно дополнительную информацию об уровне доступа. Ссылка примерно такого вида: </li>\n</ol>\n<p><a href="https://oauth2server.com/auth?response_type=code&#x26;client_id=CLIENT_ID&#x26;redirect_uri=REDIRECT_URI&#x26;scope=photos">https://oauth2server.com/auth?response<em>type=code&#x26;client</em>id=CLIENT<em>ID&#x26;redirect</em>uri=REDIRECT_URI&#x26;scope=photos</a> </p>\n<p>На этой странице у пользователя спрашивается, готов ли он предоставить доступ. </p>\n<ol start="3">\n<li>Если пользователь согласен, то ФБ редиректит его по redirect URI обратно на клиента, передавая параметром auth code </li>\n</ol>\n<p><a href="https://oauth2client.com/cb?code=AUTH_CODE_HERE">https://oauth2client.com/cb?code=AUTH<em>CODE</em>HERE</a> </p>\n<ol start="4">\n<li>Клиент, получив auth code, отправляет его серверу чтобы получить access<em>token. В запросе он указывает известный только ему client</em>secret. </li>\n</ol>\n<pre><code>POST https://api.oauth2server.com/token \ngrant_type=authorization_code&#x26;\ncode=AUTH_CODE_HERE&#x26;\nredirect_uri=REDIRECT_URI&#x26;\nclient_id=CLIENT_ID&#x26;\nclient_secret=CLIENT_SECRET \n</code></pre>\n<ol start="5">\n<li>Все операции клиента в дальнейшем проводятся с использованием этого токена. </li>\n</ol>\n<p>Это процесс для серверных приложений (процесс называется <strong>authorization code flow / explicit flow</strong>). Важное отличие от клиентских: на этапе 2 передается <code>response_type=code</code>. </p>\n<h2>Implicit flow</h2>\n<p>В случае client-side приложений используется <strong>implicit flow</strong>, на 2 этапе передается response<em>type=token и на этапе 3 клиенту приходит сразу токен (<a href="https://oauth2client.com/cb?token=ACCESS">https://oauth2client.com/cb?token=ACCESS</a></em>TOKEN) </p>\n<p>Explicit mode нужен, чтобы пользователь не узнал токен. Если пользователю известен токен, то он может утечь к другому, опасному приложению. Чтобы этого не было, такие токены обычно делают short-lived. </p>\n<h2>Resource Owner Password Flow</h2>\n<p>При локальном логине (т.е. без использования сторонних соцсетей) используется Resource Owner Password Flow (<a href="http://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html">http://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html</a>) </p>\n<p>В этом случае все довольно просто: </p>\n<ol>\n<li>пользователь шлет серверу авторизации в открытом виде (через https!) логин и пароль </li>\n<li>сервер авторизации отвечает токеном </li>\n<li>в последующих запросах клиент включает токен в заголовок http. </li>\n</ol>\n<p>По идее это нужно для того, чтобы когда у тебя отдельные сервер авторизации и сервер приложения, то сервер приложения ничего не знал о логине и пароле пользователя. </p>\n<p>Пример использования этого flow для WebAPI (<a href="http://www.asp.net/web-api/overview/security/individual-accounts-in-web-api">http://www.asp.net/web-api/overview/security/individual-accounts-in-web-api</a>) </p>\n<p>Зачем нужно использовать OAuth <a href="http://stackoverflow.com/questions/7561631/oauth-2-0-benefits-and-use-cases-why">http://stackoverflow.com/questions/7561631/oauth-2-0-benefits-and-use-cases-why</a></p>',frontmatter:{path:"/blog/oauth",title:"OAuth"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-oauth-58b2881d3b6fe2cf98ae.js.map