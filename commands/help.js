const Command = require('../modules/command.js');

module.exports = class Help extends Command {
    constructor(client) {
        super(client);
        this.name = 'help';
        this.aliases = ['h'];
        this.strings = require('../strings/strings.json');
    }
    run(msg, args, strings) {
        let embed = this.client.getEmbed(msg);
        embed.setDescription(`**${strings.check_dm}**`);
        msg.channel.send({embed});
        let commandList = this.client.commands.filter(c => !c.hideHelp && this.strings.commands[c.name]).map(c => {
            return `**${c.name}**: \`${this.strings.commands[c.name]._usage}\`\n${this.strings.commands[c.name]._description}`;
        });
        msg.author.send(commandList.join("\n\n"));
    }
}