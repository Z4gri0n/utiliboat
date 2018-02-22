const EventListener = require('../modules/eventListener.js');
const fs = require('fs');

module.exports = class ReadyListener extends EventListener {

    constructor(client) {
        super(client);
    }

    onReady() {
        this.user.setActivity(this.config.customGame || `${this.config.prefix}help`, {type: 'PLAYING'});
        this.log(['BOT', 'Discord'], `Ready! Authenticated as ${this.user.tag}`.green.bold);
    }
}