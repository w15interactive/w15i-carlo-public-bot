const mongo = require('@utils/mongo');
const loadFeatures = require('@src/features/load-features');
const updateMembers = require('@utils/member/update-members');

module.exports = async (client) => {
  loadFeatures(client);
  try {
    await mongo();
  } catch (err) {
    console.log(err);
  }

  updateMembers(client);

  client.user.setActivity(
    `The Billion Ideas of the IndieDev World! I'm in ${client.guilds.cache.size} servers!`,
    {
      type: 'LISTENING',
    }
  );

  console.log(`Bot has logged in to ${client.user.tag}!`);
};
