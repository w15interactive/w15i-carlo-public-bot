const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const CurrencyShop = require('@models/CurrencyShopSchema');

module.exports = class shopCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'shop',
      group: 'economy',
      memberName: 'shop',
      description: 'Opens the Shop Page',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 5,
      },
      examples: ['`w!shop`'],
    });
  }

  async run(message) {
    await CurrencyShop.find({}).exec((err, res) => {
      if (err) console.log(err);

      let embed = new Discord.MessageEmbed()
        .setAuthor('🛒 Shop! 🛒', message.author.avatarURL())
        .setDescription(`**Items    |     Cost**:`)
        .setTimestamp(Date.now())
        .setFooter(`Called by [${message.author.tag}]`);
      if (res.length === 0 || !res) {
        embed.setColor('RED');
        embed.addField('No data found');
      } else if (res.length < 10) {
        //Less than 10 results
        embed.setColor('YELLOW');
        for (let i = 0; i < res.length; i++) {
          let itemName = res[i].name || 'Undefined';
          embed.addField(
            `${i + 1}.${itemName} | ${res[i].cost} Sylva`,
            `${res[i].desc}`
          );
        }
      }
      message.channel.send(embed);
    });
  }
};
