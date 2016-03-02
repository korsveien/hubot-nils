// Description:
// Send melding om en git push til rom med samme navn som git branchen du står i
//
// URLS:
//   POST /hubot/pushit/<room> (message=<message>)

var slack = require('../lib/slack.js');

module.exports = function(robot) {
  return robot.router.post('/hubot/pushit/:room', function(req, res) {
    var room = req.params.room;
    var body = req.body;
    var commits = body.commits.join("\n");
    var msg = '*' + body.username + "* pushet til branch `" + body.branch + "`:\n" + commits;
    robot.messageRoom(room, msg);
    return res.end();
  });
};

