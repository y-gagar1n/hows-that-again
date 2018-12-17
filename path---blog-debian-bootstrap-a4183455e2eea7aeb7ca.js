webpackJsonp([0x9fad8d1a8808],{427:function(e,n){e.exports={data:{markdownRemark:{html:'<p>Here are some commands that will be useful after you start a fresh install of Debian</p>\n<h1>Time/date</h1>\n<pre><code class="language-shell">$ timedatectl list-timezones | grep Moscow\nEurope/Moscow\n$ timedatectl set-timezone Europe/Moscow\n</code></pre>\n<h1>Russian keyboard</h1>\n<pre><code class="language-shell">dpkg-reconfigure keyboard-configuration\nservice keyboard-setup restart\n</code></pre>\n<h1>Fonts</h1>\n<p>To make default fonts more pretty, like in Ubuntu:</p>\n<pre><code class="language-shell">mkdir -p $HOME/.config/fontconfig/\ngedit $HOME/.config/fontconfig/fonts.conf\n</code></pre>\n<p>And save the file with the following contents:</p>\n<pre><code class="language-xml">&#x3C;?xml version=\'1.0\'?>\n&#x3C;!DOCTYPE fontconfig SYSTEM \'fonts.dtd\'>\n&#x3C;fontconfig>\n &#x3C;match target="font">\n  &#x3C;edit mode="assign" name="rgba">\n   &#x3C;const>rgb&#x3C;/const>\n  &#x3C;/edit>\n &#x3C;/match>\n &#x3C;match target="font">\n  &#x3C;edit mode="assign" name="hinting">\n   &#x3C;bool>true&#x3C;/bool>\n  &#x3C;/edit>\n &#x3C;/match>\n &#x3C;match target="font">\n  &#x3C;edit mode="assign" name="hintstyle">\n   &#x3C;const>hintslight&#x3C;/const>\n  &#x3C;/edit>\n &#x3C;/match>\n &#x3C;match target="font">\n  &#x3C;edit mode="assign" name="antialias">\n   &#x3C;bool>true&#x3C;/bool>\n  &#x3C;/edit>\n &#x3C;/match>\n  &#x3C;match target="font">\n    &#x3C;edit mode="assign" name="lcdfilter">\n      &#x3C;const>lcddefault&#x3C;/const>\n    &#x3C;/edit>\n  &#x3C;/match>\n&#x3C;/fontconfig>\n</code></pre>\n<p>Now log out and in again.</p>\n<h1>sudo</h1>\n<pre><code class="language-shell">su\napt-get update\napt-get install sudo  \nusermod -a -G sudo &#x3C;user_name>\n # here you may need a logoff-login\n</code></pre>\n<h1>curl</h1>\n<pre><code class="language-shell">sudo apt install -y curl\n</code></pre>\n<h1>Proxy</h1>\n<p>Add to .bashrc:</p>\n<pre><code class="language-shell">export http_proxy=http://192.168.2.102:3128\nexport https_proxy=http://192.168.2.102:3128\n</code></pre>\n<h1>Chrome</h1>\n<pre><code class="language-shell">wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb\ndpkg -i google-chrome-stable_current_amd64.deb \n</code></pre>\n<h1>Keepass2</h1>\n<pre><code class="language-shell">sudo apt install -y keepass2\n```shell\n\n# Dropbox\n\nUse your favourite text editor and edit /etc/apt/sources.list by adding non-free after main on each line. For example:\n</code></pre>\n<p>FROM:\ndeb <a href="http://ftp.au.debian.org/debian/">http://ftp.au.debian.org/debian/</a> stretch main\nTO:\ndeb <a href="http://ftp.au.debian.org/debian/">http://ftp.au.debian.org/debian/</a> stretch main non-free</p>\n<pre><code>Once ready, run:\n\n```shell\napt update\napt install nautilus-dropbox\ndropbox start -i\ndropbox proxy manual 192.168.2.102 3128\n</code></pre>\n<h1>git</h1>\n<pre><code class="language-shell">sudo apt install -y git\ngit config --global http.proxy http://192.168.2.102:3128\ngit config --global user.name yuriy.timofeev\ngit config --global user.email yuriy.timofeev@vocord.ru\ngit config --global url."https://".insteadOf git://\n</code></pre>\n<h2>Add SSH keys to git</h2>\n<pre><code class="language-shell">ssh-keygen -t rsa -C "your.email@example.com" -b 4096\nsudo apt install -y xclip\nxclip -sel clip &#x3C; ~/.ssh/id_rsa.pub\n</code></pre>\n<h1>zsh</h1>\n<pre><code class="language-shell">sudo apt install -y zsh\nchsh -s $(which zsh)\n# log out, log in\n</code></pre>\n<h2>Oh My Zsh</h2>\n<pre><code class="language-shell">sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"\n</code></pre>\n<p>If you are behind a corporate proxy, use:</p>\n<pre><code class="language-shell">sh -c "$(curl --proxy http://192.168.2.102:3128 -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"\nsudo apt-get install -y fonts-powerline\n</code></pre>\n<h1>tmux</h1>\n<pre><code class="language-shell">sudo apt install -y tmux\n</code></pre>\n<h2>VS Code</h2>\n<pre><code class="language-shell">wget https://vscode-update.azurewebsites.net/latest/linux-deb-x64/stable -O /tmp/code_latest_amd64.deb &#x26;&#x26; sudo dpkg -i /tmp/code_latest_amd64.deb\n</code></pre>\n<h2>Docker</h2>\n<pre><code class="language-shell">sudo apt-get install \\\n     apt-transport-https \\\n     ca-certificates \\\n     curl \\\n     gnupg2 \\\n     software-properties-common\ncurl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -\nsudo apt-key fingerprint 0EBFCD88\nsudo add-apt-repository \\\n   "deb [arch=amd64] https://download.docker.com/linux/debian \\\n   $(lsb_release -cs) \\\n   stable"\nsudo apt-get update\nsudo apt-get install docker-ce\n</code></pre>\n<h3>Proxy</h3>\n<p>Next we may need to set the proxy.</p>\n<p>First, create a systemd drop-in directory for the docker service:</p>\n<pre><code class="language-shell">mkdir /etc/systemd/system/docker.service.d\n</code></pre>\n<p>Now create a file called /etc/systemd/system/docker.service.d/http-proxy.conf that adds the HTTP_PROXY environment variable:</p>\n<pre><code>[Service]\nEnvironment="HTTP_PROXY=http://proxy.example.com:80/"\n</code></pre>\n<p>Flush changes and restart docker:</p>\n<pre><code class="language-shell">systemctl daemon-reload\nsystemctl restart docker\n</code></pre>\n<h3>Give sudo rights to docker</h3>\n<pre><code class="language-shell">sudo groupadd docker\nsudo usermod -aG docker $USER\n # then you may have to completely restart your system\n</code></pre>\n<h3>Add custom corporate registry</h3>\n<pre><code class="language-shell">sudo cat > /etc/docker/daemon.json\n{ "insecure-registries":["gitlab.factory.vocord.ru:5000"] }\nsudo service docker restart\n</code></pre>\n<h1>Docker-compose</h1>\n<pre><code class="language-shell">sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\nsudo chmod +x /usr/local/bin/docker-compose\n</code></pre>\n<h1>Sublime text</h1>\n<pre><code class="language-shell">wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -\nsudo apt-get install apt-transport-https\necho "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list\nsudo apt-get update\nsudo apt-get install sublime-text\n</code></pre>\n<h1>Autojump</h1>\n<pre><code class="language-shell">git clone git://github.com/wting/autojump.git\ncd autojump\n./install.py\n</code></pre>\n<h1>Desktop shortcuts</h1>\n<p>If you want to add a shortcut for e.g. Telegram, create <code>~/Desktop/Telegram.desktop</code> with the following contents:</p>\n<pre><code>[Desktop Entry]\nVersion=1.0\nType=Application\nTerminal=false\nExec=/usr/bin/telegram\nName=Telegram\nComment=Telegram\n</code></pre>\n<h1>Fira Code</h1>\n<pre><code class="language-shell">sudo vi /etc/apt/sources.list\n</code></pre>\n<p>Change lines ending with <code>main</code> to ending with <code>main contrib non-free</code>.</p>\n<p>Example content:</p>\n<pre><code>deb http://deb.debian.org/debian stretch main contrib non-free\ndeb-src http://deb.debian.org/debian stretch main contrib non-free\n\ndeb http://deb.debian.org/debian-security/ stretch/updates main contrib non-free\ndeb-src http://deb.debian.org/debian-security/ stretch/updates main contrib non-free\n\ndeb http://deb.debian.org/debian stretch-updates main contrib non-free\ndeb-src http://deb.debian.org/debian stretch-updates main contrib non-free\n</code></pre>\n<p>After that you can install Fira Code:</p>\n<pre><code class="language-shell">sudo apt update\nsudo apt install -y fonts-firacode\n</code></pre>\n<h2>Setup Vs Code</h2>\n<p>Press Ctrl+`, change following properties:</p>\n<pre><code class="language-json">"editor.fontFamily": "\'Fira Code\'",\n"editor.fontLigatures": true,\n</code></pre>\n<p>Restart VS Code.</p>\n<h1>mail</h1>\n<pre><code class="language-shell">sudo apt install -y mailutils ssmtp\nsudo vi /etc/ssmtp/ssmtp.conf\n</code></pre>\n<p>ssmt.conf contents example:</p>\n<pre><code>mailhub=smtp-relay.gmail.com:587\nAuthUser=yuriy.timofeev@mail.ru\nAuthPass=YOUR_PASSWORD\nUseTLS=YES\nUseSTARTTLS=YES\nFromLineOverride=YES\n</code></pre>\n<p>After that you can send email like this:</p>\n<pre><code class="language-shell">echo "LETTER_BODY" | mail -s "LETTER_SUBJ" -a "From: Юрий Тимофеев&#x3C;yuriy.timofeev@mail.ru>" some.recipient@mail.ru\n</code></pre>',frontmatter:{path:"/blog/debian-bootstrap",title:"Debian Bootstrap"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-debian-bootstrap-a4183455e2eea7aeb7ca.js.map