const Command = require('../modules/command.js');
const request = require('request');
function youtube_parser(url){
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[1].length==11)? match[1] : false;
}

module.exports = class YouTubeToMp3 extends Command {
    constructor(client) {
        super(client);
        this.name = 'youtubetomp3'
        this.aliases = ['youtube2mp3', 'yttomp3', 'yt2mp3', 'ytmp3'];
    }
    run(msg, args, strings) {
        let embed = this.client.getEmbed(msg);
        if(!args[0]) {
            embed.addField(strings.dl_invalid_title, strings.dl_invalid_description);
            embed.setColor(this.client.colors.error);
            msg.channel.send({embed});
        } else if(!args[0].match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
            embed.addField(strings.dl_invalid_title, strings.dl_invalid_description);
            embed.setColor(this.client.colors.error);
            msg.channel.send({embed});
        } else if(args[0].match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
            let id = youtube_parser(args[0]);
            request(`https://youtubetoany.com/@api/json/mp3/${id}`, function (error, response, body) {
                let parsed = JSON.parse(body);
                embed.setTitle(strings.dl_title.replace('${0}', parsed.vidTitle));
                embed.addField('320Kbps', strings.dl_desc.replace('${0}', parsed.vidInfo[0].dloadUrl).replace('${1}', parsed.vidInfo[0].mp3size), true);
                embed.addField('256Kbps', strings.dl_desc.replace('${0}', parsed.vidInfo[1].dloadUrl).replace('${1}', parsed.vidInfo[1].mp3size), true);
                embed.addField('192Kbps', strings.dl_desc.replace('${0}', parsed.vidInfo[2].dloadUrl).replace('${1}', parsed.vidInfo[2].mp3size), true);
                embed.addField('128Kbps', strings.dl_desc.replace('${0}', parsed.vidInfo[3].dloadUrl).replace('${1}', parsed.vidInfo[3].mp3size), true);
                embed.addField('64Kbps', strings.dl_desc.replace('${0}', parsed.vidInfo[4].dloadUrl).replace('${1}', parsed.vidInfo[4].mp3size), true);
                embed.setThumbnail(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
                msg.channel.send({embed});
            });
        }
    }
}