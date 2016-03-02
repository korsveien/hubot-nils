// URLS:
// POST /hubot/dksh/<room> (message=<message>)
var devtools_run = require('../lib/devtools_run');

function format(msg) {
    return "```beskrivelse: " + msg.sluttbrukerbeskrivelse  + '\n'
    + "meldingId: " + msg.meldingId  + '\n'
    + "hendelsestypeNavn: " + msg.hendelsestypeNavn + '\n'
    + "hendelsestypeId: " + msg.hendelsestypeId + '\n'
    + "mottakerId: " + msg.mottakerId + '\n'
    + "tidspunkt: " + msg.hendelsestidspunkt + '\n'
    + '```'
}

module.exports = function(robot) {
  return robot.router.post('/hubot/dksh/:room', function(req, res) {
    var body = req.body;
    if(body.length === 0) {
	msg = "[_dksh_loggetmelding.sh_] Ingen feil! :simple_smile:";
    } else {
        var msg = body.map(function(data) {
            return format(data)
        }).join('\n');
        msg = "[_dksh_loggetmelding.sh_] *Jeg fant følgende feil:*\n" + msg;
    }
    var room = req.params.room;
    robot.messageRoom(room, msg);
    return res.end();
  });
};
