webpackJsonp([0xa799ff559e76],{514:function(a,e){a.exports={data:{markdownRemark:{html:'<h1>X86 assembler tutorial</h1>\n<p><a href="http://www.hep.wisc.edu/~pinghc/x86AssmTutorial.htm">Источник</a></p>\n<p>Ассемблер в UNIX использует особенный синтакс, в котором source и destination перепутаны местами:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">opcode source, dest\n\nmovl %edx, %eax\t\t# перемещает содержимое регистра edx в регистр eax\naddl %edx, %eax\t\t# складывает содержимое регистров edx и eax, результат кладет в eax</code></pre></div>\n<p>Также, к отличиям относится то, что все назнания регистров должны начинаться со знака <code class="language-text">%</code>, а инструкции кончаются на <code class="language-text">l</code>, <code class="language-text">w</code> или <code class="language-text">b</code>, означающие размер операнда: long (32 бита), word (16 бит), или byte (8 бит), соответственно.</p>\n<h2>Регистры</h2>\n<p>Регистры 32-битные.</p>\n<p>Для разных частей одного и того же регистра есть разные имена, например, младшие 8 бит (0-7) регистра <code class="language-text">%eax</code> носят имя <code class="language-text">%al</code>, а следующие после них (8-15) - <code class="language-text">%ah</code>. Первые 16 бит <code class="language-text">%eax</code> (0-15) носят имя <code class="language-text">%ax</code>. А <code class="language-text">%eax</code> используется, когда нужно обратиться ко всем 32 битам регистра <code class="language-text">eax</code>. Форма имени регистра должна совпадать с суффиксом инструкции, то есть для инструкций, кончающихся на <code class="language-text">b</code> используются <code class="language-text">%al</code> и <code class="language-text">%ah</code>, для <code class="language-text">w</code> - <code class="language-text">%ax</code>, а для <code class="language-text">l</code> - <code class="language-text">%eax</code>.</p>\n<p>Вот основные регистры процессора:</p>\n<table>\n<thead>\n<tr>\n<th>Название</th>\n<th>Описание</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>EAX, EBX, ECX, EDX</td>\n<td>регистры общего назначения, EAX обычено используется для вохвращаемых значений (stdcall)</td>\n</tr>\n<tr>\n<td>EBP</td>\n<td>Базовый указатель для текущего фрейма стека.</td>\n</tr>\n<tr>\n<td>ESI, EDI</td>\n<td>Индексные регистры, относятся к DS и ES соответственно</td>\n</tr>\n<tr>\n<td>SS, DS, CS, ES, FS, GS</td>\n<td>Сегментные регистры. Содержат селектор начала сегмента данных. Все содержат по 16 бит.</td>\n</tr>\n<tr>\n<td>EIP</td>\n<td>program counter / instruction pointer, относителен к CS (code segment)</td>\n</tr>\n<tr>\n<td>ESP</td>\n<td>stack pointer, относителен к SS (stack segment). Автоматически изменяется при push/pop</td>\n</tr>\n<tr>\n<td>EFLAGS</td>\n<td>Флаги</td>\n</tr>\n</tbody>\n</table>\n<h3>Разница между EBP и ESP</h3>\n<p>ESP - указатель на вершину стека (т.к. стек растет сверху вниз, то вершина стека будет внизу стека). После пролога все локальные переменные, адрес возврата и аргументы функции оказываются над ним.</p>\n<p>EBP - указатель на начало текущего фрейма стека (будет наверху той части стека, которая предназначается для текущей процедуры). Над ним - адрес возврата и аргументы функции, под ним - локальные переменные.</p>\n<p>Обращение к локальным переменным обычно идет через EBP.</p>\n<p>Пролог обычно выглядит так:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">pushl %ebp\nmovl %esp, %ebp\nsubl  &lt;some_number&gt;, %esp</code></pre></div>\n<p>Таким образом, EBP всегда означает начало текущего фрейма, а ESP - инструкция, следующая за его концом, то есть место, куда будет сунуто значение при следующей команде <code class="language-text">push</code>. Когда мы вызовем еще одну функцию, то она в своем прологе запушит на стек наш EBP и присвоит ему ESP, то есть инструкция, следующая за концом нашего фрейма, станет началом ее фрейма.</p>\n<p>Обращение в коде к локальным переменным может выглядеть так:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">movl eax, -4(%ebp)\nmovl -8(%ebp), ebx</code></pre></div>\n<p>Обращение к аргументам (аргументы пушатся на стек в обратном порядке, то ест сначала самый правый, в конце самый левый):</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">movl 4(%ebp), %eax # прочесть **первый** аргумент в EAX\nmovl 8(%ebp), %ebx # прочесть **второй** аргумент в EBX</code></pre></div>\n<p>А выход из функции (эпилог) выглядит так:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">mov esp, ebp ;\npop ebp ;\nret</code></pre></div>\n<p>Для перечисленных ниже соглашений (кроме <code class="language-text">[cdecl]</code> перед возвратом значений из функции подпрограмма обязана восстановить значения сегментных регистров, регистров <code class="language-text">esp</code> и <code class="language-text">ebp</code>. Значения остальных регистров могут не восстанавливаться.</p>\n<p>Если размер возвращаемого значения функции не больше размера регистра <code class="language-text">eax</code>, возвращаемое значение сохраняется в регистре <code class="language-text">eax</code>. Иначе, возвращаемое значение сохраняется на вершине стека, а указатель на вершину стека сохраняется в регистре <code class="language-text">eax</code>.</p>\n<p>(в X64 везде используется fastcall, то есть при передаче аргументов в функцию первые несколько аргументов хранятся в регистрах (rcx-rdx-r8-r9 для Windows и rdi-rsi-rdx-rcx-r8-r9 для линукса, остальные - в стеке)</p>\n<h2>Сегментация</h2>\n<p>Все адреса формируются из адреса начала сегмента и сдвига. Чтобы вычислить адрес начала сегмента, процессор определяет, какой регистр сегмента используется, берет его значение и использует его в качестве индекса для GDT (global descriptor table), откуда получает абсолютный физический адрес начала сегмента. Затем процессор складывает этот адрес с указанным в инструкции сдвигом и получает финальный физический адрес.</p>\n<p>У i486 есть 6 16-битных сегментных регистров:</p>\n<ol>\n<li><strong>CS</strong>: Code segment register - для обращения к инструкциям</li>\n<li><strong>SS</strong>: Stack segment register - для обращения к стеку</li>\n<li><strong>DS</strong>: Data segment register - для обращения памяти, не относящейся к стеку, то есть к куче</li>\n<li><strong>ES, FS, GS</strong>: Extra segment registers - хз зачем, вроде могут использоваться в каких-то специальных инструкциях</li>\n</ol>\n<p><strong>НЕЛЬЗЯ</strong> копировать из сегментного регистра в сегментный регистр, то есть следующая операция запрещена:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">movw seg-reg, seg-reg</code></pre></div>\n<p>Зато ничто не запрещает использовать в качестве промежуточного хранилища регистр или область памяти:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">movw seg-reg,memory\nmovw memory,seg-reg\nmovw seg-reg,reg\nmovw reg,seg-reg</code></pre></div>\n<h2>Частые/полезные инструкции</h2>\n<ul>\n<li><strong>pushl/popl</strong> - положить/снять 32-битное значение на стек</li>\n<li><strong>pushal/popal</strong> - положить/снять со стека EAX, EBX, ECX, EDX, ESP, EBP, ESI, EDI (аналога в x64 нет)</li>\n<li><strong>call</strong> - положить адрес возврата на стек и перейти к указанной метке в коде</li>\n<li><strong>int</strong> - вызвать программное прерывание</li>\n<li><strong>ret</strong> - вернуться из куска кода, в который перешли инструкцией <code class="language-text">call</code>, то есть использовать лежащий на стеке адрес возврата и передать по нему управление. Адрес возврата ищется по адресу <code class="language-text">RBP + 4</code>, поэтому регистр RBP обязательно нужно сохранять в прологе и восстанавливать в эпилоге.</li>\n<li><strong>iretl</strong> - вернуться из куска кода, в который перешли благодаря прерыванию</li>\n<li><strong>sti/cli</strong> - установить/очистить бит прерывания, чтобы включить/выключить все прерывания</li>\n<li><strong>lea</strong> - Load Effective Address, похож на MOV, см. далее</li>\n</ul>\n<h2>Адресация</h2>\n<p>Использование круглых скобок позволяет получить значение по указанному адресу.</p>\n<p>Пример:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">mov (%rsp), %rax\t\t# прочитай 8 байт по адресу, указанному в регистре RSP и сохрани их в регистр RAX</code></pre></div>\n<p>Можно сразу указывать смещение (положительное либо отрицательное) относительно адреса:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">mov 8(%rsp), %rax\t\t# возьми rsp, прибавь к нему 8, прочитай 8 байт по получившемуся адресу и положи их в rax</code></pre></div>\n<p>Команда LEA позволяет выполнить умножение и несколько сложений сразу:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm"># rax := rcx*8 + rax + 123\nlea 123(%rax,%rcx,8), %rax</code></pre></div>\n<h2>Пример</h2>\n<div class="gatsby-highlight" data-language="c"><pre class="language-c"><code class="language-c"><span class="token keyword">void</span> <span class="token function">function1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">int</span> A <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>\n\tA <span class="token operator">+=</span> <span class="token number">66</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>компилится в:</p>\n<div class="gatsby-highlight" data-language="asm"><pre class="language-asm"><code class="language-asm">function1:\n1\tpushl %ebp #\n2\tmovl %esp, %ebp #,\n3\tsubl $4, %esp #,\n4\tmovl $10, -4(%ebp) #, A\n5\tleal -4(%ebp), %eax #, \n6\taddl $66, (%eax) #, A\n7\tleave\n8\tret</code></pre></div>\n<ol>\n<li>Бэкапим EBP на стек</li>\n<li>Копируем указатель стека в EBP</li>\n<li>Выделяем место на стеке в размере 4 байта для локальной переменной</li>\n<li>Кладем значение 10 в область локальных переменных стека, то есть создаем переменную А со значением 10</li>\n<li>Загружаем адрес переменной A в регистр EAX</li>\n<li>Прибавляем 66 к EAX и кладем результат в EAX</li>\n</ol>\n<p>1-3: типичный пролог</p>',frontmatter:{path:"/blog/x64",title:"x64"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-x-64-027becd65117534a097c.js.map