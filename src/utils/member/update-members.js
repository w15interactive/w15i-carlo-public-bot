module.exports = (client) => {
  const guildId = process.env.GUILD_ID;
  const guild = client.guilds.cache.get(guildId);
  if (!guild) return console.log('Could not find guild.');

  const channelId = process.env.MEMBER_CHANNEL || process.env.DEVMEMBER_CHANNEL;
  const channel = guild.channels.cache.get(channelId);
  if (!channel) return console.log('Member Channel not Found.');

  channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
};
