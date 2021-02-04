const { MessageEmbed, User } = require('discord.js');
const { CommandoClient, CommandoGuild } = require('discord.js-commando');

/**
 * @param { CommandoGuild } guild
 * @param {User} user
 * @param { CommandoClient } client
 */
module.exports = async (client, guild, user) => {
  const logChannel = guild.channels.cache.find((ch) => ch.name.includes('log'));

  // Do nothing if the channel wasn't found on this server
  if (!logChannel) return console.log('Log Channel not found!');
  // Send the message, mentioning the member

  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD',
  });
  // Since we only have 1 audit log entry in this collection, we can simply grab the first one
  const banLog = fetchedLogs.entries.first();

  // Let's perform a coherence check here and make sure we got *something*
  if (!banLog)
    return console.log(
      `${user.tag} was banned from ${guild.name} but no audit log could be found.`
    );

  // We now grab the user object of the person who banned the user
  // Let us also grab the target of this action to double check things
  const { executor, target, reason } = banLog;

  let banEmbed = new MessageEmbed()
    .setTimestamp(Date.now())
    .setAuthor(user.tag, user.displayAvatarURL())
    .setFooter(`ID: ${user.id}`)
    .setThumbnail(user.displayAvatarURL())
    .setDescription(`:hammer: ${user} has been **banned** from the server!`)
    .addField(
      'Banned By:',
      `<@${target.id === user.id ? executor.id : 'Unknown'}>`
    )
    .addField('Reason:', `${reason ? reason : 'none'}`)
    .setColor('#FFFF00');

  // And now we can update our output with a bit more information
  // We will also run a check to make sure the log we got was for the same kicked member
  console.log(
    `${user.tag} got hit with the swift hammer of justice, ${
      target.id === user.id
        ? `wielded by the mighty ${executor.tag}`
        : 'audit log fetch was inconclusive.'
    }`
  );

  logChannel.send(banEmbed);
};
