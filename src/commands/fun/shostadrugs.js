const { Command } = require('discord.js-commando');

module.exports = class shostaDrugsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shostadrugs',
      group: 'fun',
      memberName: 'shostadrugs',
      guildOnly: true,
      description: "Feed's mentioned member some cheap drugs",
      throttling: {
        usages: 1,
        duration: 5,
        examples: ['`w!shostadrugs <user>`'],
      },
    });
  }

  async run(message) {
    const user = message.mentions.users.first();
    if (!user) {
      message.channel.send('Please mention a user.');
      return;
    }
    message.channel.send(`Fed ${user} some cheap drugs`);
  }
};
