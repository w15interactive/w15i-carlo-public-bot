const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const Profile = require('../../models/profileSchema');

module.exports = class workCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'work',
      group: 'economy',
      memberName: 'work',
      description: 'works a random job to earn money',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 1500,
      },
      examples: ['`w!work`'],
    });
  }

  async run(message) {
    const jobs = [
      'Game Developer',
      'Full-Stack Web Developer',
      'Barista',
      'Part-time Officer',
    ];
    let job = jobs[Math.floor(Math.random() * jobs.length)];

    let work = Math.floor(Math.random() * 500);
    if (work === 0) {
      return message.reply(`you failed in your work!`);
    } else {
      Profile.findOne(
        {
          userID: message.author.id,
          serverID: message.guild.id,
        },
        (err, profile) => {
          if (err) console.log(err);
          if (!profile) {
            const newProfile = new Profile({
              userID: message.author.id,
              serverID: message.guild.id,
              username: message.author.username,
              money: work,
            });

            newProfile.save().catch((err) => console.log(err));
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
          } else {
            profile.money = profile.money + work;
            profile.save().catch((err) => console.log(err));
          }

          message
            .say(
              `${message.author.username}, you worked as a **${job}** and earned **${work} Sylva!**`
            )
            .catch((err) => console.log(err));
        }
      );
    }
  }
};
