const path = require('path');
const fs = require('fs').promises;

module.exports = async (client) => {
  const readEvents = async (dir = 'events') => {
    // Read the directory/file
    let files = await fs.readdir(path.join(__dirname, dir));

    // Loop through each file.
    for (let file of files) {
      const stat = await fs.lstat(path.join(__dirname, dir, file));
      // If file is a directory, recursive call recurDir
      if (stat.isDirectory()) {
        readEvents(path.join(dir, file));
      } else {
        // Check if file is a .js file
        if (file.endsWith('.js')) {
          let eventName = file.substring(0, file.indexOf('.js'));
          try {
            let eventModule = require(path.join(__dirname, dir, file));
            client.on(eventName, eventModule.bind(null, client));
            console.log(`${eventName} was registered.`);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  };

  readEvents();
};
