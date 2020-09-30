const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class coffeeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'coffee',
      group: 'fun',
      memberName: 'coffee',
      description:
        'Gives the mentioned user OR the command caller a mug of coffee',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
      examples: ['`w!coffee`', '`w!coffee <user>`'],
    });
  }

  async run(message, args) {
    const sender = message.author;
    const reciever = message.mentions.members.first();
    if (!reciever || reciever.user.username === sender.username) {
      const selfEmbed = new Discord.MessageEmbed()
        .setTitle('Coffee ☕!')
        .setFooter('Powered by WaFar Cafe X W-15 Interactive')
        .setDescription(
          `${this.client.user.username} gave ${message.author.username} a cup of coffee!`
        )
        .setColor('#6e4119');

      message.channel.send(selfEmbed);
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle('Coffee ☕!')
        .setFooter('Powered by WaFar Cafe™')
        .setDescription(
          `${sender.username} gave ${reciever.user.username} a cup of coffee!`
        )
        .setColor('#6e4119');

      message.channel.send(embed);
    }
  }
};
