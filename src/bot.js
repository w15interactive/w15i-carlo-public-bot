require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({
  commandPrefix: process.env.PREFIX,
  owner: process.env.OWNER,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['economy', 'Economy Commands'],
    ['fun', 'Fun Commands'],
    ['misc', 'Miscellaneous Commands'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

const loadEvents = require('./events/load-events');
loadEvents(client);

client.login(process.env.BOT_TOKEN);
