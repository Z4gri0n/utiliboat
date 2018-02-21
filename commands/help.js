const fs = require('fs');
const commands = [];
fs.readdir('./commands/', (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    jsfile.forEach((f, i) => {
        let jsCmd = require(`./${f}`).command;
        let jsName = jsCmd.name;
        let jsFull = jsCmd.fullCmd;
        let jsDesc = jsCmd.description;
        let jsHidden = jsCmd.hidden;
        if(jsHidden == true) return;
        else if(jsHidden == false) {
            commands.push([jsName, jsFull, jsDesc]);
        }
    })
});

exports.run = (client, msg, args, embed) => {
    embed.setAuthor(client.user.tag+' Commands', client.user.avatarURL);
    embed.addField('Command List', commands.map(c => c[1]+'** ➤ '+c[2]+'**'));
    embed.addBlankField();
    embed.addField('Useful Links', 'Invite me to your server: [https://goo.gl/Y6zJNv](https://goo.gl/Y6zJNv)\nGithub repository: [https://github.com/PillGP/utiliboat](https://github.com/PillGP/utiliboat)\nDonate so that I can stay online 24/7: [http://vgh.ftp.sh/donations](http://vgh.ftp.sh/donations)');
    msg.channel.send({embed});
}

exports.command = {
    name: "help",
    fullCmd: process.env.PREFIX+"help",
    description: "Shows the help menu",
    hidden: false
}
