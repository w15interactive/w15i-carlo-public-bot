const { Command } = require('discord.js-commando');
const Profile = require('../../models/profileSchema');
const Discord = require('discord.js');

module.exports = class balanceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'daily',
      group: 'economy',
      memberName: 'daily',
      description: 'Gives daily reward',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 86400,
      },
      examples: ['`w!daily`'],
    });
  }

  async run(message) {
    let amount = 300;

    Profile.findOne(
      {
        userID: message.author.id,
      },
      (err, profile) => {
        if (err) console.log(err);
        let embed = new Discord.MessageEmbed()
          .setColor('#22ff00')
          .setAuthor('💰 Daily Reward! 💰', message.author.displayAvatarURL())
          .setDescription(
            `${message.author.username} has claimed **${amount} Sylva**!!`
          )
          .setTimestamp(Date.now())
          .setFooter('Powered by W-15i Bank');

        if (!profile) {
          const newProfile = new Profile({
            userID: message.author.id,
            username: message.author.username,
            money: amount,
          });

          message.channel.send({
            embed: {
              author: {
                name: 'New Profile!',
                icon_url: message.author.displayAvatarURL(),
              },
              description: `New Profile created for <@${message.author.id}>.`,
              color: 'GREEN',
              timestamp: Date.now(),
            },
          });
          message.channel.send(embed);
          newProfile.save().catch((err) => console.log(err));
        } else {
          message.channel.send(embed);

          profile.money += amount;
          profile.save().catch((err) => console.log(err));
        }
      }
    );
  }
};
