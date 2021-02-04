const { GuildMember, MessageEmbed } = require('discord.js');
const { CommandoClient } = require('discord.js');
const updateMembers = require('@utils/member/update-members');

/**
 * @param { GuildMember } member
 * @param { CommandoClient } client
 */
module.exports = async (client, member) => {
  const wChannel = member.guild.channels.cache.find((ch) =>
    ch.name.includes('welcome')
  );

  const logChannel = member.guild.channels.cache.find((ch) =>
    ch.name.includes('log')
  );

  // Do nothing if the channel wasn't found on this server
  if (!wChannel) {
    console.log('Welcome Channel not found!');
  } else {
    // Send the message, mentioning the member
    wChannel.send(
      `Welcome to the server, ${member}! Check out the rules in #📏rules-tower`
    );
  }

  if (!logChannel) {
    console.log('Log Channel not found');
  } else {
    const accCreation = member.user.createdAt.toString().split(' ');
    const accCreationDate = `created on **${accCreation[1]} ${accCreation[2]}, ${accCreation[3]}**`;
    const welcomeEmbed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setFooter(`ID: ${member.id}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addField('Account Creation:', accCreationDate)
      .setDescription(`:inbox_tray: ${member} **has joined the server**`)
      .setColor('#008000');
    logChannel.send(welcomeEmbed);
  }

  updateMembers(client);
};
