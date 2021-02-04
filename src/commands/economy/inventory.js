const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const Profile = require('@models/profileSchema');
const Discord = require('discord.js');

module.exports = class invCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'inventory',
      aliases: ['inv'],
      group: 'economy',
      memberName: 'inventory',
      description: "Opens the specified user's inventory",
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 5,
      },
      examples: ['`w!inventory <optional user>`', '`w!inv <optional user>`'],
    });
  }

  async run(message) {
    const target = message.mentions.users.first() || message.author;

    await Profile.findOne({
      userID: target.id,
    }).exec((err, res) => {
      if (err) console.log(err);

      let embed = new Discord.MessageEmbed()
        .setAuthor('🎒 Inventory! 🎒', target.avatarURL())
        .setDescription(`**Inventory of <@${target.id}>**:`)
        .setTimestamp(Date.now())
        .setFooter(`Called by [${message.author.tag}]`);
      if (!res) {
        embed.setColor('RED');
        embed.addField(
          'No data found',
          'Buy items to show them in your inventory.'
        );
      } else if (res.items.length < 10) {
        //Less than 10 results
        embed.setColor('BLURPLE');
        for (let i = 0; i < res.items.length; i++) {
          let itemName = res.items[i].name || 'Undefined';
          embed.addField(
            `${i + 1}. ${itemName}   |   **Amount**: ${res.items[i].amount}`,
            `${res.items[i].desc}`
          );
        }
      }
      return message.channel.send(embed);
    });
  }
};
