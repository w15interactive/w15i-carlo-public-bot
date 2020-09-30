const { Command } = require('discord.js-commando');

module.exports = class voiceMuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'voicechannel',
      aliases: ['vc'],
      group: 'misc',
      memberName: 'voicechannel mute/unmute',
      description:
        "Voice mutes/unmutes everyone in the voice call the invoker is in. 'Mute Members' permission required.",
      guildOnly: true,
      userPermissions: ['MUTE_MEMBERS'],
      examples: ['`w!voicechannel mute/unmute`', '`w!vc mute/unmute`'],
    });
  }

  async run(message) {
    const args = message.content.trim().split(/ +/g);
    let setting = args.slice(1).join(' ');

    if (!setting) {
      return message.channel.send(
        `You must either do \`${this.client.commandPrefix}vc mute\` or \`${this.client.commandPrefix}vc unmute\``
      );
    }
    // Checks if invoker is in a voice channel:
    if (message.member.voice.channel) {
      // Gets the voice channel of the invoker
      let channel = message.guild.channels.cache.get(
        message.member.voice.channel.id
      );

      // Iteration to mute/unmute every member in the call
      for (const [memberID, member] of channel.members) {
        if (setting === 'mute' || setting === 'm') {
          if (member.voice.serverMute === false) {
            member.voice.setMute(true);
          }
        } else if (setting === 'unmute' || setting === 'u') {
          if (member.voice.serverMute === true) {
            member.voice.setMute(false);
          }
        }
        message.delete({ timeout: 2000 });
      }
    } else {
      // If invoker is not in any voice-channel
      message.reply('you need to be in a voice channel first!');
    }
  }
};
