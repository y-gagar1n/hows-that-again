---
title: "Debian Bootstrap"
path: "/blog/debian-bootstrap"
---

Here are some commands that will be useful after you start a fresh install of Debian

# Time/date

```shell
$ timedatectl list-timezones | grep Moscow
Europe/Moscow
$ timedatectl set-timezone Europe/Moscow
```

# Russian keyboard

```shell
dpkg-reconfigure keyboard-configuration
service keyboard-setup restart
```

# Fonts

To make default fonts more pretty, like in Ubuntu:

```shell
mkdir -p $HOME/.config/fontconfig/
gedit $HOME/.config/fontconfig/fonts.conf
```

And save the file with the following contents:

```xml
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
 <match target="font">
  <edit mode="assign" name="rgba">
   <const>rgb</const>
  </edit>
 </match>
 <match target="font">
  <edit mode="assign" name="hinting">
   <bool>true</bool>
  </edit>
 </match>
 <match target="font">
  <edit mode="assign" name="hintstyle">
   <const>hintslight</const>
  </edit>
 </match>
 <match target="font">
  <edit mode="assign" name="antialias">
   <bool>true</bool>
  </edit>
 </match>
  <match target="font">
    <edit mode="assign" name="lcdfilter">
      <const>lcddefault</const>
    </edit>
  </match>
</fontconfig>
```

Now log out and in again.

# sudo

```shell
su
apt-get update
apt-get install sudo  
usermod -a -G sudo <user_name>
 # here you may need a logoff-login
```

# curl

```shell
sudo apt install -y curl
```

# Proxy

Add to .bashrc:

```shell
export http_proxy=http://192.168.2.102:3128
export https_proxy=http://192.168.2.102:3128
```

# Chrome

```shell
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb 
```

# Keepass2

```shell
sudo apt install -y keepass2
```shell

# Dropbox

Use your favourite text editor and edit /etc/apt/sources.list by adding non-free after main on each line. For example:

```
FROM:
deb http://ftp.au.debian.org/debian/ stretch main
TO:
deb http://ftp.au.debian.org/debian/ stretch main non-free
```

Once ready, run:

```shell
apt update
apt install nautilus-dropbox
dropbox start -i
dropbox proxy manual 192.168.2.102 3128
```

# git

```shell
sudo apt install -y git
git config --global http.proxy http://192.168.2.102:3128
git config --global user.name yuriy.timofeev
git config --global user.email yuriy.timofeev@vocord.ru
git config --global url."https://".insteadOf git://
```

## Add SSH keys to git

```shell
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
sudo apt install -y xclip
xclip -sel clip < ~/.ssh/id_rsa.pub
```



# zsh

```shell
sudo apt install -y zsh
chsh -s $(which zsh)
# log out, log in
```

## Oh My Zsh

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

If you are behind a corporate proxy, use:

```shell
sh -c "$(curl --proxy http://192.168.2.102:3128 -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo apt-get install -y fonts-powerline
```

# tmux

```shell
sudo apt install -y tmux
```

## VS Code

```shell
wget https://vscode-update.azurewebsites.net/latest/linux-deb-x64/stable -O /tmp/code_latest_amd64.deb && sudo dpkg -i /tmp/code_latest_amd64.deb
```

## Docker

```shell
sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
```

### Proxy

Next we may need to set the proxy.

First, create a systemd drop-in directory for the docker service:

```shell
mkdir /etc/systemd/system/docker.service.d
```

Now create a file called /etc/systemd/system/docker.service.d/http-proxy.conf that adds the HTTP_PROXY environment variable:

```
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80/"
```

Flush changes and restart docker:

```shell
systemctl daemon-reload
systemctl restart docker
```

### Give sudo rights to docker

```shell
sudo groupadd docker
sudo usermod -aG docker $USER
 # then you may have to completely restart your system
```

### Add custom corporate registry

```shell
sudo cat > /etc/docker/daemon.json
{ "insecure-registries":["gitlab.factory.vocord.ru:5000"] }
sudo service docker restart
```

# Docker-compose

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

# Sublime text

```shell
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt-get update
sudo apt-get install sublime-text
```

# Autojump

```shell
git clone git://github.com/wting/autojump.git
cd autojump
./install.py
```




