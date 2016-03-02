// Description:
//   Få hendelser for melding sendt til dksh med id <id>
//
// Commands:
//   hubot dksh <id> - List opp hendelser for melding med meldingid <id>
//
// Notes:
//   <optional notes required for the script>
var devtoolsRun = require('../lib/devtools_run');
var slack = require('../lib/slack');

function format(data) {
    return data.meldingshendelser
    .map(function(hendelse) {
        return (
            hendelse.hendelsestype.navn + "\n"
            + "tidspunkt: " + hendelse.hendelsestidspunkt + "\n"
            + "hendelsestypeId: " + hendelse.hendelsestype.id + "\n"
        );
    })
    .map(function(hendelse) {
        return slack.codeBlock(hendelse);
    });
}

module.exports = function (robot) {

  robot.respond(/dksh (\d+)/i, function (res) {
      var id = res.match[1];
      devtoolsRun('scripts/dksh_loggetmelding_id.sh ' + id, function(error, stdout, stderr) {

          var response = JSON.parse(stdout);
          var slackMsg = "Fant ingen innslag i meldingsloggen for melding `" + id + "` (404 Not Found)";
          if(response.status !== 404) {
              var meldingId = "Jeg fant følgende innslag i meldingsloggen for melding `" + response.meldingId + "`:\n";
              var hendelser = format(response);
              slackMsg = meldingId + "\n" + hendelser.join("");
          }

          if(error) {
              res.send("ERROR: " + error);
          } else {
              res.send(slackMsg);
          }
      });
  });
};
