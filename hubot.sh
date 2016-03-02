CMD=$1

if [[ -z ${CMD} ]]; then
    echo "Gyldige kommandoer: start | stop | dev"
    exit 1
fi

# (cd $DEVTOOLS_HOME ; git pull)

# Set this in order to make hubot serve static pages
export EXPRESS_STATIC=static

if [[ ${CMD} == 'start' ]]; then
    if [[ -f hubot.pid ]]; then
        PID=$(cat hubot.pid)
        rm hubot.pid
        test -z $PID || kill $PID || /bin/true
        echo "stopped hubot"
    fi


    echo Starter Hubot i bakgrunnen...
    HUBOT_SLACK_TOKEN=$SLACK_TOKEN nohup ./bin/hubot --adapter slack >> hubot.log &
    echo $! > hubot.pid
    echo ... Hubot er oppe og kjører!
fi

if [[ ${CMD} == 'stop' ]]; then
    PID=$(cat hubot.pid)
    rm hubot.pid
    test -z $PID || kill $PID || /bin/true
    echo "stopped hubot"
fi

if [[ ${CMD} == 'dev' ]]; then
    ./bin/hubot 
fi
