#!/bin/sh
HUBOT_HOME=/home/au2sys/hubot
DEVTOOLS_HOME=/home/au2sys/dev/devtools

IS_RUNNING=`ps -eo pid,cmd | grep node | grep hubot | awk '{print $1}'`

echo $IS_RUNNING
cd $HUBOT_HOME

if [ -z "$IS_RUNNING" ]; then
  echo "hubot not running, restarting..."
  ./hubot.sh stop
  echo "hubot stopped"
  ./hubot.sh start
  echo "hubot started"
  sleep 15
  http_proxy= && curl -X POST -d message="[INFO] hubot restarted automatically due to disconnect" http://hubot-server:8080/hubot/notify/devops
fi
