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
        duration: 1800,
      },
      examples: ['`w!work`'],
    });
  }

  async run(message) {
    let work = Math.floor(Math.random() * 500);

    const jobs = [
      `you worked as a **Game Developer** and did some debugging on the game. You earned **${work} Sylva**!`,
      `you worked as a **Full-Stack Web Developer** and improved your backend, it's more efficient now!. You earned **${work} Sylva**!`,
      `you worked as a **Barista** and made a few espressos and lattes. You earned **${work} Sylva**!`,
      `you worked as a **Part-time Officer** and patrolled the streets of Adalia. You earned **${work} Sylva**!`,
      `you worked as a **Music Artist**, composing some bops, You earned **${work} Sylva**!`,
      `you worked as a **3D Graphics Designer**, you progressed on one of your renders today. You earned **${work} Sylva**!`,
      `you worked as a **Gym Instructor** and made people do some important drills. You earned **${work} Sylva**!`,
      `you worked as an **eSports Player** and participated in competitive scrims. You earned **${work} Sylva**!`,
      `you worked as a **Content Creator**, produced some videos, and published it online! You earned **${work} Sylva**!`,
      `you worked as an **IT Technician**, fixing some software and hardware fault on PCs. You earned **${work} Sylva**!`,
      `you worked as a **Taxi Driver**, getting people to their destinations safely. You earned **${work} Sylva**!`,
      `you worked as a **Construction Worker**, seeing off the construction of the building. You earned **${work} Sylva**!`,
    ];

    let job = jobs[Math.floor(Math.random() * jobs.length)];

    if (work === 0) {
      return message.reply(`you failed in your work!`);
    } else {
      Profile.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        { username: message.author.username },
        { new: true },
        (err, profile) => {
          if (err) console.log(err);
          if (!profile) {
            const newProfile = new Profile({
              userID: message.author.id,
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
            profile.money += work;
            profile.save().catch((err) => console.log(err));
          }

          message.say(job).catch((err) => console.log(err));
        }
      );
    }
  }
};
