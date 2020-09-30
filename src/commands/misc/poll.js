const { Command } = require('discord.js-commando');

module.exports = class pollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'misc',
      memberName: 'poll',
      description:
        "Puts an automatic poll. 'Manage Messages' permission required.",
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES'],
      examples: ['*Under a message* `w!poll`'],
    });
  }

  async run(message, args) {
    const addReactions = (message) => {
      message.react('👍');

      setTimeout(() => {
        message.react('👎');
      }, 750);
    };

    await message.delete();

    const fetched = await message.channel.messages.fetch({ limit: 1 });
    if (fetched && fetched.first()) {
      addReactions(fetched.first());
    }
  }
};
