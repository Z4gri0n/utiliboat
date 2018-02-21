const exec = require("util").promisify(require("child_process").exec);

exports.run = (client, msg, args, embed) => {
    const input = args.join(" ");
    if(msg.author.id !== process.env.OWNER) return;
    const result = exec(input).catch((err) => { throw err; });
    const output = result.stdout ? `**\`OUTPUT\`**${"```sh"}\n${result.stdout}\n${"```"}` : "";
    const outerr = result.stderr ? `**\`ERROR\`**${"```sh"}\n${result.stderr}\n${"```"}` : "";
    const output2 = result.stdout ? `${"```sh"}\n${result.stdout}\n${"```"}` : "```Done.```";
    const outerr2 = result.stderr ? `${"```sh"}\n${result.stderr}\n${"```"}\n` : "";
    embed.setColor(client.colors.success);
    embed.setTitle('Exec / Shell');
    embed.addField(":inbox_tray: Input", `\`\`\`sh\n${input}\n\`\`\``);
    embed.addField(":outbox_tray: Output", `${output2}\n${outerr2}`);
    msg.channel.send({embed});
}

exports.command = {
    name: "exec",
    fullCmd: process.env.PREFIX+"exec",
    description: "Evals shell code",
    hidden: true
}