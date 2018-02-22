const Discord = require('discord.js');
const fs = require('fs');

const utils = require('./modules/utils.js')

require('dotenv').config();
require('colors');
require('./modules/prototypes.js');

module.exports = class Utiliboat extends Discord.Client {
  
  constructor(options = {}) {
    super(options);

    this.config = options.config;
    this.colors = require('./assets/colors.json');
    
    this.commands = [];
    this.listeners = [];
    this.strings = [];

    this.startCommands();
    this.startListeners();
    this.startStrings();
  }

  start(token) {
    this.log(['BOT', 'Discord'], 'Authenticating...'.yellow);
    if(!token && this.config) token = this.config.discord;
    this.login(token);
  }

  getEmbed(msg) {
    return new Discord.RichEmbed()
          .setColor(this.colors.embed)
          .setFooter(msg.author.tag, msg.author.avatarURL);
  }
  
  log(tags, message) {
    tags = tags.map(t => `[${t}]`);
    tags.push(message);
    console.log(tags.join(' '));
  }

  startCommands() {
    let failed = 0;
    fs.readdirSync('./commands').forEach(file => {
      if(file.endsWith('.js')) {
        try {
          let Command = require(`./commands/${file}`);
          this.commands.push(new Command(this));
        } catch(e) {
          console.log(e);
          this.log(['BOT', 'Commands'], `${file} failed to load.`.red);
          failed++;
        }
      }
    });
    if (failed) this.log(['BOT', 'Commands'], `${this.commands.length} commands loaded succesfully, ${failed} failed.`.yellow);
    else this.log(['BOT', 'Commands'], `${this.commands.length} commands loaded succesfully`.green);
  }

  startListeners() {
    let failed = 0;
    fs.readdirSync('./listeners').forEach(file => {
      if (file.endsWith(".js")) {
        try {
          let EventListener = require(`./listeners/${file}`);
          this.listeners.push(new EventListener(this));
        } catch (e) {
          this.log(['BOT', 'EventListeners'], `${file} failed to load.`.red);
          failed++;
        }
      }
    });
    if (failed) this.log(['BOT', 'EventListeners'], `${this.listeners.length} event listeners loaded succesfully, ${failed} failed.`.yellow);
    else this.log(['BOT', 'EventListeners'], `${this.listeners.length} event listeners loaded succesfully`.green);
  }

  startStrings() {
    fs.readdirSync('./strings').forEach(file => {
      if(file.endsWith('.json')) {
        try {
          this.strings[file.replace('.json', '')] = Object.assign(require("./strings/strings.json"));
        } catch(e) {
          this.log(['BOT', 'Strings'], `${file} failed to load. Exiting...`.red);
          process.exit(0);
        }
      }
    });
    this.log(['BOT', 'Strings'], `${Object.keys(this.strings).length} string files loaded succesfully`.green);
  }
}