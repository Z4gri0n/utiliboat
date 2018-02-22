const Command = require('../modules/command.js');

module.exports = class Eval extends Command {

  constructor(client) {
    super(client);

    this.name     = "eval";
    this.aliases  = ["e", "evaluate", "execute", "exec"];
    this.hideHelp = true;
  }

  run(msg, args) {
    try {
      const code = args.join(" ");
      let evaled = this.clean(require("util").inspect(eval(code)));
      msg.channel.send(evaled, {code: "xl" }).catch(err => {
        msg.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
      });
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
    }
  }

  canRun(msg) {
    return msg.author.id == this.client.config.ownerId;
  }

  clean(text) {
    return typeof text === "string" ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;
  }

}