exports.run = (client, msg, args, embed) => {
    msg.channel.send(`...`).then(reply => {
        let pingTime = Math.floor((reply.createdAt - msg.createdAt)/2);
        embed.setAuthor('🏓 | Pong!', client.user.avatarURL);
        embed.addField('Discord Latency', `**${pingTime}ms**`);
        embed.addField('Gateway Latency', `**${client.ping}ms**`);
        reply.edit({embed});
    });
}

exports.command = {
    name: "ping",
    fullCmd: process.env.PREFIX+"ping",
    description: "Checks Utiliboat's latency in miliseconds",
    hidden: false
}