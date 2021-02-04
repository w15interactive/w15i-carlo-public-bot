const prefix = process.env.PREFIX;

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
};
