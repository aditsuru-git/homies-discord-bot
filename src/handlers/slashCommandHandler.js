const getLocalCommands = require("../utils/command/localCommands");
const config = require("../config/config");
const Command = require("../base/command");
const { devs, testers } = require("../config/config.json");

function getCommandObject(localCommands, commandName) {
  return localCommands.find((cmd) => cmd.name === commandName);
}

/**
 * @typedef {import("discord.js").Client} Client
 * @typedef {import("discord.js").Interaction} Interaction
 */

/**
 * @param {Client} client - Discord client
 * @param {Interaction} interaction - Discord interaction
 */

module.exports = async (client, interaction) => {
  if (!interaction.guild || !interaction.isChatInputCommand()) return;
  try {
    const localCommands = getLocalCommands();
    const commandObject = getCommandObject(
      localCommands,
      interaction.commandName
    );

    if (!commandObject || !(commandObject instanceof Command)) return;

    if (commandObject.prefixOnly) {
      await interaction.reply({
        content: "This command can only be used as a prefix command.",
        ephemeral: true,
      });
      return;
    }

    const userId = interaction.user.id;

    if (commandObject.devsOnly && !devs.includes(userId)) {
      await interaction.reply({
        content: "This command is only available to developers.",
        ephemeral: true,
      });
      return;
    }
    if (
      commandObject.testingPhase &&
      !devs.includes(userId) &&
      !testers.includes(userId)
    ) {
      await interaction.reply({
        content: "This command is currently in testing phase.",
        ephemeral: true,
      });
      return;
    }
    await commandObject.callback(client, interaction);
  } catch (error) {
    console.error(
      `Error in slash command handler for command ${interaction.commandName}:`,
      error
    );

    try {
      if (!interaction.replied) {
        await interaction.reply({
          content: "There was an error executing this command!",
          ephemeral: true,
        });
      }
    } catch (replyError) {
      console.error("Error sending error message:", replyError);
    }
  }
};
