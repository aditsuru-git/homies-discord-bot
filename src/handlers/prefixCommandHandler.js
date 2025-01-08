const getLocalCommands = require("../utils/command/localCommands");
const config = require("../config/config.json");

function getCommandObject(localCommands, commandName) {
  return localCommands.find((cmd) => cmd.name === commandName);
}

/**
 * @typedef {import("discord.js").Client} Client
 * @typedef {import("discord.js").Message} Message
 */

/**
 * @param {Client} client - Discord client
 * @param {Message} message - Discord messag
 * @param {Array} args - Arguements
 */

module.exports = async (client, message, prefix) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  try {
    const localCommands = getLocalCommands();
    const commandObject = getCommandObject(localCommands, commandName);
    if (!commandObject) return;
    const userId = message.author.id;

    if (commandObject.devsOnly && !config.devs.includes(userId)) {
      await message.reply("This command is only available to developers.");
      return;
    }

    if (
      commandObject.testingPhase &&
      !config.devs.includes(userId) &&
      !config.testers.includes(userId)
    ) {
      await message.reply("This command is currently in testing phase.");
      return;
    }
    await commandObject.callback(client, message, args, true);
  } catch (error) {
    console.error(
      `Error in prefix command handler for command ${commandName}:`,
      error
    );
  }
};
