// Description:
//   Displays errors from prodlogs
//
// Dependencies:
//   "<module name>": "<module version>"
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot errors [app] dd.mm.yy - displays errors on given day
//   <trigger> - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>

var devtools_run = require('../lib/devtools_run');

module.exports = function (robot) {
    robot.hear(/^hubot errors (.*) (\d\d.\d\d.\d\d)$/i, function (msg) {
        devtools_run('scripts/errors.sh ' + msg.match[1] + ' ' +  msg.match[2], function(error, stdout, stderr) {
            msg.send(stdout);
        });
    });
};
