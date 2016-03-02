#setup

npm install

## start hubot local
./hubot.sh dev

## start hubot slack
./hubot.sh start

## stop hubot slack
./hubot.sh stop

## crontab
edit: crontab -e

Ligger en crontab som kjører hvert minutt og sjekker om hubot kjører gjennom restart-if-dead.sh scriptet.
