const mongoose = require('mongoose');

const CurrencyShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  cost: {
    type: Number,
    allowNull: false,
  },
  desc: {
    type: String,
  },
});

module.exports = mongoose.model('CurrencyShop', CurrencyShopSchema);
