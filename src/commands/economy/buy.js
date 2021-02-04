const { Command } = require('discord.js-commando');
const mongoose = require('mongoose');
const UserItems = require('@models/UserItemsSchema');
const Profile = require('@models/profileSchema');
const CurrencyShop = require('@models/CurrencyShopSchema');
const { MessageEmbed } = require('discord.js');

//Transaction Successful Embed
const transactionEmbed = (item, id, message) => {
  const embed = new MessageEmbed()
    .setAuthor('💰 Shop Transaction! 💰', message.author.displayAvatarURL())
    .setTimestamp(Date.now())
    .setDescription(
      `<@${id}>, you have successfully bought ${item.name} for ${item.cost} Sylva!`
    )
    .setColor('GREEN');

  message.channel.send(embed);
};

module.exports = class buyCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'buy',
      group: 'economy',
      memberName: 'buy',
      description: 'Buys an Item from the Shop',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 5,
      },
      examples: ['`w!buy <item>`'],
    });
  }

  async run(message) {
    // Starting declarations for easier use
    const userID = message.author.id;
    const username = message.author.username;
    const args = message.content.trim().split(/ +/g);
    let argsText = args.slice(1).join(' ');

    if (!argsText) {
      return message.channel.send('You must specify an item.');
    }

    // Search for the CurrencyShop Database for the specific item name
    const item = await CurrencyShop.findOne({
      name: { $regex: `.*${argsText}.*`, $options: 'i' },
    });

    // If there is no match, return
    if (!item) {
      return message.channel.send(`That item doesn't exist.`);
    }

    // Search for a user with that userID
    const userProfile = await Profile.findOne({ userID });

    // If there is not match, return
    if (!userProfile) {
      return message.channel.send(
        `You do not have a registered Profile, please do \`${this.client.commandPrefix}work\` \`${this.client.commandPrefix}daily\` to register yourself.`
      );
    }
    // If the user's Balance is less than the Item Cost, return
    else if (userProfile.money < item.cost) {
      return message.channel.send(
        'You do not have enough money to buy this item.'
      );
    }

    // Search for a user (by userID) with the specific item (itemID, itemName)
    const itemInInv = await UserItems.findOne({
      userID,
      itemID: item.id,
      itemName: item.name,
    });

    /* If there is no match, register the specific item (itemID, itemName, desc, amount)
    under the user (userID, username)*/
    if (!itemInInv) {
      console.log('This is a First-Bought Item.');
      const newUserItem = new UserItems({
        userID,
        username,
        itemID: item.id,
        itemName: item.name,
        amount: 1,
        desc: item.desc,
      });
      newUserItem.save();

      Profile.findOneAndUpdate(
        { userID },
        {
          $addToSet: {
            items: [
              {
                itemID: newUserItem.itemID,
                name: newUserItem.itemName,
                amount: newUserItem.amount,
                desc: newUserItem.desc,
              },
            ],
          },
        },
        (err, profile) => {
          if (err) console.log(err);
          profile.money -= item.cost;
          profile.save();

          transactionEmbed(item, userID, message);
          return;
        }
      );
    } else {
      console.log('This is an already Registered Item.');
      itemInInv.amount += 1;
      itemInInv.save();

      Profile.findOneAndUpdate(
        { userID, 'items.itemID': item.id },
        {
          $inc: {
            'items.$.amount': 1,
          },
        },
        async (err, profile) => {
          if (err) console.log(err);
          profile.money -= item.cost;
          profile.save();

          transactionEmbed(item, userID, message);
          return;
        }
      );
    }
  }
};
