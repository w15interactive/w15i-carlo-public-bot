const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class userinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      group: 'misc',
      memberName: 'userinfo',
      guildOnly: true,
      description: "Shows the user's info",
      throttling: {
        usages: 1,
        duration: 5,
      },
      examples: ['`w!userinfo`', '`w!userinfo <user>`'],
    });
  }

  async run(message) {
    const { guild, channel } = message;

    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);

    const uEmbed = new MessageEmbed()
      .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
      .setColor('RANDOM')
      .addFields(
        { name: 'User Tag:', value: user.tag },
        { name: 'Is bot:', value: user.bot },
        { name: 'Nickname:', value: member.nickname || 'None' },
        {
          name: 'Joined Server:',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: 'Joined Discord:',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        { name: 'Role Count:', value: member.roles.cache.size - 1 }
      );

    channel.send(uEmbed);
  }
};
