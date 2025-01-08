const path = require("path");
const fileLoader = require("../utils/common/fileLoader");

/**
 * @typedef {import("discord.js").Client} Client
 * @typedef {import("discord.js").Interaction} Interaction
 */

/**
 * @param {Client} client - Discord client
 * @param {Interaction} interaction - Discord client
 */

module.exports = async (client, interaction) => {
  if (!interaction.guild || !interaction.isButton()) return;
  try {
    let buttonHandled = false;
    const buttonCategories = fileLoader(
      path.join(__dirname, "..", "buttons"),
      true
    );
    for (const buttonCategory of buttonCategories) {
      const buttonFiles = fileLoader(buttonCategory);
      for (const buttonFile of buttonFiles) {
        const button = require(buttonFile);

        if (!button.customId || !button.callback) {
          console.warn(`Invalid button file structure at ${buttonFile}`);
          continue;
        }
        if (interaction.customId === button.customId) {
          await button.callback(client, interaction);
          buttonHandled = true;
          break;
        }
      }
    }
    if (!buttonHandled && !interaction.replied) {
      await handleInteractionError(interaction, "Button handler not found");
    }
  } catch (error) {
    console.error("Error in button handler:", error);
    await handleInteractionError(interaction);
  }
};

async function handleInteractionError(
  interaction,
  message = "There was an error processing this button."
) {
  if (!interaction.replied && !interaction.deferred) {
    try {
      await interaction.reply({
        content: message,
        ephemeral: true,
      });
    } catch (replyError) {
      console.error("Error sending error message:", replyError);
    }
  }
}
