webpackJsonp([9783932336651],{469:function(n,p){n.exports={data:{markdownRemark:{html:"<h1>SSL</h1>\n<p>Установка соединения обеспечивается в несколько этапов:</p>\n<ol>\n<li>\n<p>Клиент устанавливает соединение с сервером и запрашивает защищенное подключение. Это может обеспечиваться либо установлением соединения на порт, который изначально предназначен для работы с SSL/TLS, например, 443, либо дополнительным запросом клиентом установки защищенного соединения после установки обычного.</p>\n</li>\n<li>\n<p>При установке соединения клиент предоставляет список алгоритмов шифрования, которые он «знает». Сервер сверяет полученный список со списком алгоритмов, которые «знает» сам сервер, и выбирает наиболее надежный алгоритм, после чего сообщает клиенту, какой алгоритм использовать</p>\n</li>\n<li>\n<p>Сервер отправляет клиенту свой цифровой сертификат, подписанный удостоверяющим центром, и открытый ключ сервера.</p>\n</li>\n<li>\n<p>Клиент может связаться с сервером доверенного центра сертификации, который подписал сертификат сервера, и проверить, валиден ли сертификат сервера. Но может и не связываться. В операционной системе обычно уже установлены корневые сертификаты центров сертификации, с которыми сверяют подписи серверных сертификатов, например, браузеры.</p>\n</li>\n<li>\n<p>Генерируется сеансовый ключ для защищенного соединения. Это делается следующим образом:\n— Клиент генерирует случайную цифровую последовательность\n— Клиент шифрует ее открытым ключом сервера и посылает результат на сервер\n— Сервер расшифровывает полученную последовательность при помощи закрытого ключа\nУчитывая, что алгоритм шифрования является асимметричным, расшифровать последовательность может только сервер. При использовании асимметричного шифрования используется два ключа — приватный и публичный. Публичным отправляемое сообщение шифруется, а приватным расшифровывается. Расшифровать сообщение, имея публичный, ключ нельзя.</p>\n</li>\n<li>\n<p>Таким образом устанавливается зашифрованное соединение. Данные, передаваемые по нему, шифруются и расшифровываются до тех пор, пока соединение не будет разорвано</p>\n</li>\n</ol>\n<h2>TLS</h2>\n<p>Разницы между SSL и TLS нет, потому что TLS 1.0 = SSL 3.1</p>",frontmatter:{path:"/blog/ssl",title:"SSL"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-ssl-d27dc0e7877818ebe753.js.map