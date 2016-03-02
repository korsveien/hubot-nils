# Kom i gang med Slackaton!

### Hvordan rendre markdown-filer:

#### Atom
ctrl + shift + M

#### Vim
https://github.com/shime/vim-livedown

(pro tip: Legg pathen til hubot-repoet i $HUBOT_HOME og trykk gf når markøren er over paths for å gå til fila)

#### Sublime
* cmd + shift + P
* installer markdown preview

### Hubot + Slack = ❤️

Hubot er en node-server som kjører på byggserveren som har bl.a. integrasjon mot Slack. I hubot-mappen ligger det et startup-script `hubot.sh`
som vil enten starte hubot, stoppe hubot eller fyre opp en hubot-terminal som vil printe ut det som hadde endt opp i Slack.

Hubot kan lytte på chatten eller man kan sende melding direkte til hubot ved å skrive `hubot <kommando>` i Slack.

### Et helt vanlig hubot-script
Når hubot starter laster den alle scripts som ligger i `$HUBOT_HOME/scripts` slik at de er tilgjengelig via kommandoer i Slack.

Et helt vanlig hubot-script ser omtrent sånn ut:

    //Commands:
    //  hubot status test - oversikt over apper som kjører på test-server

    var devtools_run = require('../lib/devtools_run');

    module.exports = function (robot) {
      robot.respond(/status test$/i, function (msg) {
          devtools_run('scripts/l33tHaxx0r.sh', function(error, stdout, stderr) {
              msg.send(result);
          });
      });
    };



#### Lytte på chatten og respondere

    robot.respond(/status test$/i, function (msg) {
      ...
    });

Denne kodesnutten vil få hubot til å respondere når noen skriver ``hubot <kommando>`` i Slack. Alternativt kan man bruke ``robot.hear(regex, callback)``
hvis man vil at hubot skal lytte på alt som blir skrevet i alle kanaler hubot er medlem av. Om regexen matcher vil callbacken kalles.
Om man vil ta inn parametere kan man gjøre det via regex-groups. Si at noen skriver `hubot test 4` i slack/hubot-terminalen:

    robot.respond(/status test (/d+)$/i, function (msg) {
      var parameter = msg.match[1]; // index 1 fordi nr 0 er hele strengen
      msg.send(parameter)
    });

I dette ganske trivielle eksempelet vil hubot printe "4" til kanalen.


#### Kalle på scripts i `/devtools`

Vi har laget noen nyttige scripts som ligger i `$HUBOT_HOME/scripts/lib`. Blant disse finner du `devtools_run.js`.
Dette skriptet vil cd'e til `$DEVTOOLS_HOME` og kjøre skriptet for så å returnere error, stdout og stderr.


    devtools_run('scripts/l33tHaxx0r.sh', function(error, stdout, stderr) {
        msg.send(result);
    });

#### Formatere meldinger til slack
I `/lib` ligger også `slack.js` som har noen nyttefunksjoner for å formatere strenger som skal til slack.

    var slack = require('../lib/slack');

    //formaterer en kodeblokk slik som den du ser på nå, herregud så meta!
    slack.codeBlock(inputString);

### Hvordan lage nye hubot-scripts

1. Opprett et nytt script i ``/scripts``)
2. Kjør ``./hubot.sh dev`` i terminalen, en hubot-terminal dukker opp
3. Kjør ``hubot reload`` i hubot-terminalen for å laste inn scripts på nytt etter at du har gjort endringer

### Poste til hubot
Man kan også sende POST-requester for å få hubot til å skrive til en kanal. Dette er mulig via koden i `$HUBOT_HOME/scripts/notifier.coffee`. Man må sende med et message-parameter som er strenge hubot skal skrive til slack, og appende URL'en med romnavn. Se `$DEVTOOLS_HOME/scripts/deploy/deploy.sh` for et eksempel:

    curl -X POST -d message="[_deploy.sh_] *$BRUKER* deployet \`$APP\` til \`test\`" <url>/hubot/notify/devops

### Debugging
Den enkleste måten å debugge på er rett og slett å printe output til hubot-terminalen via ``msg.send()``.

### Oppsett av repo og andre ressurser
http://wiki.vegvesen.no/display/Autosysenkeltgodkjenning/Legge+til+nytt+hubot-script

#### Forslag til oppgaver
http://jira.vegvesen.no:8080/browse/AEG-804

God Slackaton!!
