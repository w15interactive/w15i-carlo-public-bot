const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
    default: 'w!',
  },
  defaultMemberRole: {
    type: String,
    required: false,
  },
  welcomeChannelId: {
    type: String,
    required: false,
  },
  logChannelId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('guildConfig', guildConfigSchema);
