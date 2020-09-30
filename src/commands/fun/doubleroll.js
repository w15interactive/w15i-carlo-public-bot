const { Command } = require('discord.js-commando');

module.exports = class doublerollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'doubleroll',
      aliases: ['dbr'],
      group: 'fun',
      memberName: 'doubleroll',
      description: 'Rolls two dices.',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
      examples: ['`w!doubleroll`', '`w!dbr`'],
    });
  }

  async run(message, args) {
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const diceRoll = numbers[Math.floor(Math.random() * numbers.length)];
    console.log(diceRoll);
    message.reply(`you rolled a total of ${diceRoll}!`);
  }
};
