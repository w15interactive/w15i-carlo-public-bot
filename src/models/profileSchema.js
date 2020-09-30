const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const profileSchema = Schema({
  serverID: {
    type: String,
  },
  userID: {
    type: String,
    primaryKey: true,
  },
  username: {
    type: String,
  },
  money: {
    type: Number,
    defaultValue: 0,
    allowNull: false,
  },
  items: [
    {
      itemID: {
        type: String,
        required: true,
      },
      name: String,
      amount: {
        type: Number,
        defaultValue: 0,
      },
      desc: String,
    },
  ],
});

module.exports = mongoose.model('Profile', profileSchema);
