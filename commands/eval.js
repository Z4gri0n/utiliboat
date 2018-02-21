function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}

exports.run = (client, msg, args, embed) => {
      if(msg.author.id !== process.env.OWNER) return;
          try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
              embed.setColor(client.colors.success);
              embed.setTitle('<:tickYes:412632634070532097> | Eval [success]');
              embed.addField('Input', '```'+args.join(" ")+'```');
              embed.addField('Output', '```'+clean(evaled)+'```');
              msg.channel.send({embed});
          } catch (err) {
              embed.setColor(client.colors.error);
              embed.setTitle('<:tickNo:412632888010604555> | Eval [error]');
              embed.addField('Input', '```'+args.join(" ")+'```');
              embed.addField('Output', '```'+clean(err)+'```');
              msg.channel.send({embed});
          }
}

exports.command = {
    name: "eval",
    fullCmd: process.env.PREFIX+"eval",
    description: "Evals JavaScript code",
    hidden: true
}