//DEVTOOLS_HOME peker til katalogen hvor vi har de fleste scriptene våre.
//
//Dette er en nyttefunskjon for å kjøre disse scriptene fra hubot

var sys = require('sys');
var exec = require('child_process').exec;

module.exports = function(script, func) {
      var scripts = process.env.DEVTOOLS_HOME;
      var cmd = scripts + '/' + script;
      exec(cmd, func);
};
