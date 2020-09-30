const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = class memeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'memes',
      aliases: ['meme'],
      group: 'fun',
      memberName: 'memes',
      description: 'Posts a random meme',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
      examples: ['`w!memes`', '`w!meme`'],
    });
  }

  async run(message, args) {
    try {
      const subReddits = ['meme', 'dankmeme', 'me_irl'];
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      const img = await randomPuppy(random);

      const embed = new Discord.MessageEmbed()
        .setImage(img)
        .setTitle(`from /r/${random}`)
        .setFooter(`[${message.author.tag}] Powered by the random-puppy API`)
        .setURL(`https://reddit.com/r/${random}`)
        .setColor('RANDOM');

      message.channel.send(embed);
    } catch (err) {
      console.log(err);
      message.say('There was a problem trying to fetch the meme');
    }
  }
};
