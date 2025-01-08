const path = require("path");
const fileLoader = require("../utils/common/fileLoader");

/**
 * @typedef {import("discord.js").Client} Client
 */

/**
 * @param {Client} client - Discord client
 */

module.exports = (client) => {
  try {
    const eventsPath = path.join(__dirname, "..", "events");
    const eventFolders = fileLoader(eventsPath, true);

    for (const eventFolder of eventFolders) {
      try {
        const eventName = path.basename(eventFolder);
        const eventFiles = fileLoader(eventFolder).sort();

        client.on(eventName, async (...args) => {
          for (const eventFile of eventFiles) {
            const eventFunction = require(eventFile);
            if (typeof eventFunction !== "function") return;
            await eventFunction(client, ...args);
          }
        });
      } catch (error) {
        console.error(
          `Error processing event folder ${eventFolder}:\n`,
          folderError
        );
      }
    }
  } catch (error) {
    console.error(`Couldn't run event handler.\n${error}`);
  }
};
