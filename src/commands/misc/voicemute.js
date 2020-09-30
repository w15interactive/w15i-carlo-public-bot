const { Command } = require('discord.js-commando');

module.exports = class voiceMuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'voicemute',
      aliases: ['vm', 'vmute'],
      group: 'misc',
      memberName: 'voicemute',
      description:
        "Voice mutes everyone in the voice call the invoker is in. 'Mute Members' permission required.",
      guildOnly: true,
      userPermissions: ['MUTE_MEMBERS'],
      examples: ['`w!voicemute`', '`w!vm`'],
    });
  }

  async run(message, args) {
    // Checks if invoker is in a voice channel:
    if (message.member.voice.channel) {
      // Gets the voice channel of the invoker
      let channel = message.guild.channels.cache.get(
        message.member.voice.channel.id
      );

      // Iteration to mute/unmute every member in the call
      for (const [memberID, member] of channel.members) {
        // Checks if the current member is server-muted or not
        if (member.voice.serverMute === true) {
          // Server-unmute the current member
          member.voice.setMute(false);
        } else {
          // Server-mute the current member
          member.voice.setMute(true);
        }
        message.delete({ timeout: 2000 });
      }
    } else {
      // If invoker is not in any voice-channel
      message.reply('you need to be in a voice channel first!');
    }
  }
};
