const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const Profile = require('../../models/profileSchema');
const Discord = require('discord.js');

module.exports = class payCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pay',
      aliases: ['transfer'],
      group: 'economy',
      memberName: 'pay',
      description: 'Pays the mentioned member',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 5,
      },
      examples: ['`w!pay <user> <amount>`', '`w!transfer <user> <amount>`'],
    });
  }

  async run(message) {
    const args = message.content
      .trim()
      .split(/ +/g)
      .slice(process.env.PREFIX.length);
    const recipient = message.mentions.members.first();
    const sender = message.author;

    let hasAmount = false;

    if (!recipient) {
      return message.reply('`usage: w!pay @member <amount>`');
    } else if (recipient === this.client.user.username) {
      return message.channel.send(
        "You can't pay the bot. You can only invest (5000 Sylva) by `w!invest`!"
      );
    } else if (recipient.user.username === sender.username) {
      return message.reply("you can't pay yourself! Pick a `member`.");
    }

    const amount = parseInt(args[0]);

    if (!Number(amount) || amount <= 0) {
      return message.reply('Please provide a valid number for payment amount!');
    }

    await Profile.findOne(
      {
        userID: sender.id,
      },
      (err, profile) => {
        if (err) {
          console.log(err);
          return message.reply('Sorry, an error occurred!');
        }

        if (!profile) {
          return message.channel.send(
            `You do not have a registered Profile, please do \`${this.client.commandPrefix}work\` \`${this.client.commandPrefix}daily\` to register yourself.`
          );
        } else if (profile.money < amount) {
          message.reply(
            'You do not have enough coins to complete the payment.'
          );
          return (hasAmount = false);
        } else {
          hasAmount = true;
          profile.money = profile.money - amount;
          profile.save().catch((err) => console.log(err));
        }
      }
    );

    await Profile.findOne(
      {
        userID: recipient.id,
      },
      (err, profile) => {
        if (err) {
          console.error(err);
          return message.reply('Sorry, an error occurred!');
        }
        if (hasAmount === false) return;
        if (!profile) {
          const newProfile = new Profile({
            userID: recipient.id,
            username: recipient.user.username,
            money: amount,
          });

          newProfile.save().catch((err) => console.error(err));
        } else {
          profile.money += amount;
          profile.save().catch((err) => console.error(err));
        }

        const payEmbed = new Discord.MessageEmbed()
          .setTitle(':money_with_wings: **Transaction Details**')
          .addField('Recipient', recipient)
          .addField('Payer', message.guild.members.cache.get(message.author.id))
          .addField('Payment Amount', amount)
          .setTimestamp(new Date())
          .setFooter('Powered by W-15i Bank');
        message.say(payEmbed);
        console.log('success');
      }
    );
  }
};
