module.exports = async (client, guild) => {
  if (!guild.available) return;
  client.user.setPresence({
    activity: {
      name: `the Billion Ideas of the IndieDev World! I'm in ${client.guilds.cache.size.toLocaleString()} Servers.`,
      type: 'LISTENING',
    },
    status: 'online',
  });
};
