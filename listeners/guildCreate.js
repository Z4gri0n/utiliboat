const EventListener = require('../modules/eventListener.js');

module.exports = class GuildCreateListener extends EventListener {

    constructor(client) {
        super(client);
    }

    onGuildCreate(guild) {
        let embed = this.client.getEmbed(msg);
        embed.addField(strings.server_join.title, strings.server_join.description
            .replace('${0}', 'https://goo.gl/Y6zJNv')
            .replace('${1}', 'https://github.com/pillgp/utiliboat')
            .replace('${2}', 'http://vgh.ftp.sh/donations'));
        embed.setThumbnail(this.user.avatarURL);
        guild.channels.filter(c => c.type == 'text')[0].send({embed});
    }
}