const EventListener = require('../modules/eventListener.js');

module.exports = class MessageListener extends EventListener {

    constructor(client) {
        super(client);
    }

    async onMessage(msg) {
        if(!msg.guild || msg.author.bot || msg.content.indexOf(this.config.prefix) !== 0) return;
        if(msg.content.startsWith(this.config.prefix)) {
            let fullCmd = msg.content.split(" ").filter(a => a).map(s => s.trim());
            let args = fullCmd.slice(1);
            let cmd = fullCmd[0].substring(this.config.prefix.length).toLowerCase();
            let command = this.commands.find(c => c.name.toLowerCase() == cmd || c.aliases.includes(cmd));
            if (command && command.canRun(msg, args)) {
                let commandStrings = this.strings['strings'].commands[command.name];
                command._run(msg, args, commandStrings);
            }
        }
    }
}