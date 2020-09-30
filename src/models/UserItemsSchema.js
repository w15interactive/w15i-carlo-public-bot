const mongoose = require('mongoose');

const UserItemsSchema = mongoose.Schema({
  serverID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    primaryKey: true,
  },
  username: {
    type: String,
  },
  itemID: {
    type: String,
  },
  itemName: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
    allowNull: false,
  },
  desc: {
    type: String,
  },
});

module.exports = mongoose.model('UserItems', UserItemsSchema);
