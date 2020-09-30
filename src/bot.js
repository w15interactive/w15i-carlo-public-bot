require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const CurrencyShop = require('./models/CurrencyShopSchema');

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

//Connecting to the MongoDB Database
mongoose.connect(
  `mongodb+srv://WMK15:${process.env.dbPASSWORD}@w-15i.gbukf.gcp.mongodb.net/w15interactive?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

//Store that connection into a variable for easier use
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("We're connected!");
});

client.on('ready', async (message) => {
  console.log('Bot has logged in!');
  // Set the client user's presence
  client.user.setPresence({
    activity: {
      name: `the Billion Ideas of the IndieDev World! I'm in ${client.guilds.cache.size} Servers.`,
      type: 'LISTENING',
    },
    status: 'online',
  });
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  require('./events/moderation/antispam')(message);
});

client.login(process.env.BOT_TOKEN);
