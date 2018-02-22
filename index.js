const config = require('./config.json');
const Utiliboat = require('./bot.js');
const client = new Utiliboat({config});
client.start();