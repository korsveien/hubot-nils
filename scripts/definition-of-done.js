//Commands:
//  hubot DoD - viser definition of done

module.exports = function (robot) {
    robot.respond(/DoD$/i, function (msg) {
        msg.send('1. QA er gjennomført av annen utvikler.');
        msg.send('2. Testet eller godkjent av kunde');
        msg.send('3. Feature branch merged til master');
        msg.send('4. Feature branch slettet');
        msg.send('5. FixVersion satt i Jira til neste versjonsnummer');
        msg.send('6. Status i Jira satt til closed.');
    });

};
