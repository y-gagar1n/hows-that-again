webpackJsonp([0xe7301718c2bf],{478:function(e,o){e.exports={data:{markdownRemark:{html:'<iframe width="640" height="360" src="https://www.youtube.com/embed/iklmmxuwVrg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n<h2>Как обычно работает DDoS-защита</h2>\n<p>Сообщаем сторонней компании свой ip, она дает нам новый ip с защитой. ip с защитой становится нашим внешним адресом, пользователи обращаются на него. А на нем - умный прокси, который отфильтровывает "вредные" запросы и шлет на наш бэкэнд только "чистые".</p>\n<h3>Что может пойти не так</h3>\n<ul>\n<li>если незащищенный ip оставить в сети, то атака может спокойно продолжиться на него. Решение - закрыть 80 порт для доступа извне. Но атака может продолжиться на другие порты.</li>\n<li>если бэкэнд переместить на новый "секретный" ip, то злоумышленник все равно может его узнать из почтового заголовка писем, которые рассылаются с этого сервера. Например из письма, получаемого при регистрации. Кроме того, через сайт <code>myip.ms</code> можно узнать историю изменений ip-адресов сайта. А еще можно через <code>shodan</code> узнать, какие ip обслуживают один url.</li>\n</ul>',frontmatter:{path:"/blog/videos/after-ddos-defense",title:"После подключения DDoS-защиты: как 'положат'' Ваши ресурсы / Рамиль Хантимиров (StormWall)"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-videos-after-ddos-defense-7184e9b62ad0a41e9ccd.js.map