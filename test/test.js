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

describe('Event Files', function() {
  it('should load succesfully', function() {
    fs.readdirSync("./events").forEach(file => {
      if (file.endsWith(".js")) {
        require("../events/"+file);
      }
    });
  });
});