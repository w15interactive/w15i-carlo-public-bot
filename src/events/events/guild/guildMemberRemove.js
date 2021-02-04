const { GuildMember, MessageEmbed } = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const updateMembers = require('@utils/member/update-members');

/**
 * @param { GuildMember } member
 * @param { CommandoClient } client
 */

module.exports = async (client, member) => {
  const logChannel = member.guild.channels.cache.find((ch) =>
    ch.name.includes('log')
  );
  // Do nothing if the channel wasn't found on this server
  if (!logChannel) return console.log('Log channel not found!');

  updateMembers(client);

  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
  });
  // Since we only have 1 audit log entry in this collection, we can simply grab the first one
  const kickLog = fetchedLogs.entries.first();

  const { user } = member;

  // Let's perform a coherence check here and make sure we got *something*

  // Send the message, mentioning the member
  let leaveEmbed = new MessageEmbed()
    .setTimestamp(Date.now())
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setFooter(`ID: ${member.id}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor('#ff2d00');
  if (!kickLog) {
    leaveEmbed.setDescription(
      `:outbox_tray: ${member} has **left** the server.`
    );
  } else {
    const { executor, target, reason } = kickLog;
    leaveEmbed
      .setDescription(`:boot: ${member} has been **kicked** from the server!`)
      .addField(
        'Kicked By:',
        `<@${target.id === user.id ? executor.id : 'Unknown'}>`
      )
      .addField('Reason:', `${reason ? reason : 'none'}`);
  }

  logChannel.send(leaveEmbed);
};
