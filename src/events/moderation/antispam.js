const AntiSpam = require('discord-anti-spam');
const { MessageEmbed } = require('discord.js');

const antiSpam = new AntiSpam({
  warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
  kickThreshold: 10, // Amount of messages sent in a row that will cause a kick.
  banThreshold: 10, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 1000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: '{@user} has been warned, please stop spamming.', // Message that will be sent in chat upon warning a user.
  kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
  banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 3, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 7, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 10, // Amount of duplicate messages that trigger a warning.
  exemptPermissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredUsers: [], // Array of User IDs that get ignored.
  ignoredChannels: [
    '611545410133032961',
    '579997860255236108',
    '736592704443514931',
    '612949862530678784',
  ],
  // And many more options... See the documentation.7
});

module.exports = async (message) => {
  antiSpam.message(message);
};
