const { Command } = require('discord.js-commando');

module.exports = class coinFlipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'coinflip',
      aliases: ['cf'],
      group: 'fun',
      memberName: 'coinflip',
      description: 'Flips a coin, landing either heads or tails.',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
      examples: ['`w!coinflip`', '`w!cf`'],
    });
  }

  async run(message, args) {
    const coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip === 0) message.reply('you got a heads!');
    else message.reply('you got a tails!');
  }
};
