const { Command, CommandoMessage } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const Profile = require(`@models/profileSchema`);

/**
 * @param {CommandoMessage} message
 */

module.exports = class coinFlipCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'coinflip',
      aliases: ['cf'],
      group: 'fun',
      memberName: 'coinflip',
      description:
        'Flips a coin with (optional) a bet, landing either heads or tails. You can flip twice in 5 minutes.',
      argsType: 'multiple',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 300,
      },
      examples: [
        '`w!coinflip <heads or tails> <amount, if you want to gamble>`',
        '`w!cf <heads or tails> <amount, if you want to gamble>`',
      ],
    });
  }

  async run(message, args) {
    const userID = message.author.id;

    let choice = args[0].toLowerCase();

    if (!choice || (choice !== 'heads' && choice !== 'tails')) {
      return message.reply(
        `you need to choose what you're betting on!\n usage: ${this.examples}`
      );
    }

    let amount = parseInt(args[1]);

    if (!amount) {
      console.log('Amount is set to 0.');
      amount = 0;
    }

    let result = '';

    const coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip === 0) {
      console.log('you got a heads!');
      result = 'heads';
    } else {
      console.log('you got a tails!');
      result = 'tails';
    }

    console.log(result);
    let embed = new MessageEmbed()
      .setAuthor('Coin Flip!', message.author.displayAvatarURL())
      .setTimestamp(Date.now())
      .setFooter(`w!coinflip by ${message.author.tag}`);

    await Profile.findOne(
      {
        userID,
      },
      (err, profile) => {
        if (err) console.log(err);

        if (!profile) {
          return message.reply(
            `you don't have a profile set up! do ${this.client.commandPrefix}work to create a profile!`
          );
        }

        if (profile.money < amount) {
          return message.reply(
            `you don't have ${amount} Sylva in your balance!`
          );
        }

        if (result === choice) {
          console.log('Heads');
          profile.money += amount * 2;
          embed
            .setDescription(
              `You made a bet on **${choice}** and you got **${result}**! You get your money back **AND** ${
                amount * 2
              } Sylva prize!`
            )
            .setColor('#00FF00');
        } else {
          console.log('Tails');
          profile.money -= amount;
          embed
            .setDescription(
              `You made a bet on **${choice}** and you lost as you got **${result}**! You get ${amount} deducted from your balance.`
            )
            .setColor('#FF0000');
        }
        profile.save();
        message.channel.send(embed);
      }
    );
  }
};
