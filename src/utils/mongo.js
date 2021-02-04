const mongoose = require('mongoose');
const mongoPath = process.env.MONGO_PATH;

module.exports = async () => {
  mongoose.connect(`${mongoPath}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  //Store that connection into a variable for easier use
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to the MongoDB Server!');
  });
};
