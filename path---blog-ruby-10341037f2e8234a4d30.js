webpackJsonp([0x70bff8d6df42],{482:function(n,e){n.exports={data:{markdownRemark:{html:'<h1>Ruby on Rails</h1>\n<p><strong>Heroku</strong> - позволяет Деплоить приложение одной строкой в консоли</p>\n<p>В моделях RoR можно указывать атрибуты <em>has_many</em> и <em>depends_on</em> и потом в консоли (<strong>rails console</strong>) использовать что-то вроде ORM.</p>\n<p><strong>rspec</strong> - библиотека для тестирования <strong>Capybara</strong> - DSL для тестирования</p>\n<p>Генерация контроллера: <code>rails generate controller StaticPages home help</code></p>\n<p>Генерация теста: <code>rails generate integration_test static_pages</code></p>\n<p>ERB = <strong>Embedded Ruby</strong></p>\n<p>Дефолтный шаблон (Master Page) хранится в <strong>view/layouts/application.html.erb</strong>. Он содержит команду <strong>&#x3C;%=yield%></strong>, которая вставляет содержимое дочерней страницы. Команда <strong>csrf<em>meta</em>tags</strong> предотвращает подделку межсайтовых запросов.</p>\n<p>\'\' отличается от "" тем, что внутри \'\' не нужно экранировать спецсимволы</p>\n<p>Интерполяция:</p>\n<pre><code class="language-ruby">name = "bar"\nputs "foo #{name}"\n#foo bar\n</code></pre>\n<p>name.empty? - вопросительный знак в конце это просто соглашение для булевых методов</p>\n<p>Есть метод <strong>nil?</strong></p>\n<p>unless = "Если-не"</p>\n<p>Все объекты кроме nil равны true, nil == false.</p>\n<p>return использовать необязательно, при его отсутствии будет возвращен результат выполнения последнего оператора</p>\n<pre><code class="language-ruby">a = [42,8,17]\nputs a.sort #[8,17,42]\nputs a #[42,8,17]\na.sort! # бэнг-метод изменяет исходный массив\nputs a #[8,17,42]\n</code></pre>\n<p>Добавлять в массив можно методом push или оператором &#x3C;&#x3C;</p>\n<pre><code class="language-ruby">a.push 6\na &#x3C;&#x3C; 7\n</code></pre>\n<p>Помимо массивов есть диапазоны. Пример диапазона: (0..9)</p>\n<p>Преобразование диапазона в массив:</p>\n<pre><code class="language-ruby">(0..9).to_a\n</code></pre>\n<p>Можно использовать диапазоны для доступа к массиву:</p>\n<pre><code class="language-ruby">a = %w[foo bar baz quux]\n=> [\'foo\',\'bar\',\'baz\', \'quux\']\na[0..2]\n=> [\'foo\',\'bar\',\'baz\']\n</code></pre>\n<p>a[2..-1] - От второго и до конца</p>\n<p>Блоки - это лямбды.</p>\n<pre><code class="language-ruby">(1..5).each{|x| puts 2*x}\n=> 2 4 6 8 10\n</code></pre>\n<p>Способ без фигурных скобок:</p>\n<pre><code class="language-ruby">(1..5).each do |x|\n  puts 2 * x\nend\n</code></pre>\n<h1>Хэши (словари)</h1>\n<pre><code class="language-ruby">d = {}\nd["name"] = "Ivan"\na = { "name" => "Yury", "surname" => "Timofeev" }\na["email"]\n=> nil\n</code></pre>\n<p>Знак => называется hashrocket</p>\n<h1>Символы</h1>\n<p>:title - символ</p>\n<p>О символах можно думать как о строках без дополнительного багажа</p>\n<p>Начиная с Ruby 1.9 введен новый синтаксис для хэшей с символами:</p>\n<pre><code class="language-ruby">h1 = { :name => "Ivan", :last_name => "Petrov" }\nh2 = { name: "Ivan", last_name: "Petrov" }\nh1 == h2 \n=> true\n</code></pre>\n<p>Метод inspect() возвращает буквальное представление объекта Есть даже специальная функция p, где p :name == puts :name.inspect</p>\n<p>Когда хэш - последний аргумент в вызове функции, фигурные скобки вокруг его обьявления необязательны.</p>\n<p>base64 так называется, потому что его алфавит имеет длину 64: a-z, A-Z, 0-9, -, длинное тире</p>\n<p>В Ruby есть оператор ||=, он по аналогии оператору += аналогичен записи x = x || y</p>',frontmatter:{path:"/blog/ruby",title:"Ruby on Rails"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-ruby-10341037f2e8234a4d30.js.map