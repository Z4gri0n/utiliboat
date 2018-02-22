const fs = require('fs');
const Discord = require('discord.js');

describe('Commands', function() {
  it('should load succesfully', function() {
    fs.readdirSync("./commands").forEach(file => {
      if (file.endsWith(".js")) {
        require("../commands/"+file);
      }
    });
  });
});

describe('Event Listeners', function() {
  it('should load succesfully', function() {
    fs.readdirSync("./listeners").forEach(file => {
      if (file.endsWith(".js")) {
        require("../listeners/"+file);
      }
    });
  });
});