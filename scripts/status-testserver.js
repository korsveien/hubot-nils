//Commands:
//  hubot status test - oversikt over apper som kjører på test-server 

var devtools_run = require('../lib/devtools_run');

module.exports = function (robot) {
  robot.hear(/^hubot status test$/i, function (msg) {
      devtools_run('scripts/status-testserver.sh', function(error, stdout, stderr) {
          var result = stdout.replace(/\.pid/g, '');
          msg.send(result);
      });
  });
};
