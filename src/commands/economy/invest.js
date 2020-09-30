const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const Profile = require('../../models/profileSchema');
const Discord = require('discord.js');

module.exports = class investCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invest',
      group: 'economy',
      memberName: 'invest',
      description:
        'Invests 5000 Sylva per person on the bot, to get double the money back next week.',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 604800,
      },
      examples: ['`w!invest`'],
    });
  }

  async run(message) {
    const recipient = this.client.user;
    let invested = false;
    const amount = 5000;

    const payEmbed = new Discord.MessageEmbed()
      .setTitle(':money_with_wings: **Investment Details**')
      .addField('Bank', recipient)
      .addField('Investor', message.guild.members.cache.get(message.author.id))
      .addField('Payment Amount', amount)
      .setTimestamp(new Date())
      .setFooter('Powered by W-15i Bank');

    await Profile.findOne(
      {
        userID: message.author.id,
        serverID: message.guild.id,
      },
      (err, profile) => {
        if (err) {
          console.log(err);
          return message.reply('Sorry, an error occurred!');
        }
        if (!profile) {
          const newProfile = new Profile({
            userID: message.author.id,
            serverID: message.guild.id,
            username: message.author.username,
            money: 0,
          });

          newProfile.save().catch((err) => console.error(err));

          return message.reply(
            "You can't make a payment since you do not have any coins associated with your account"
          );
        } else {
          if (profile.money < amount) {
            message.reply('You do not have enough coins to invest in the bot.');
            return (invested = false);
          }

          invested = true;
          profile.money = profile.money - amount;
          profile.save().catch((err) => console.log(err));

          message.say(payEmbed);
          console.log('success');
        }
      }
    );

    await Profile.findOne(
      {
        userID: recipient.id,
        serverID: message.guild.id,
      },
      (err, profile) => {
        if (err) {
          console.error(err);
          return message.reply('Sorry, an error occurred!');
        }
        if (invested === false) return;
        if (!profile) {
          const newProfile = new Profile({
            userID: recipient.id,
            serverID: message.guild.id,
            username: recipient.user.username,
            money: amount,
          });

          newProfile.save().catch((err) => console.error(err));
        } else {
          profile.money += amount;
          profile.save().catch((err) => console.error(err));
        }
      }
    );
  }
};
