const handleCommand = require("../../handlers/slashCommandHandler");
const handleButton = require("../../handlers/buttonHandler");

module.exports = async (client, interaction) => {
  try {
    if (interaction.isButton()) {
      await handleButton(client, interaction);
    } else if (interaction.isChatInputCommand()) {
      await handleCommand(client, interaction);
    }
  } catch (error) {
    console.log(`Error in handleInteraction: ${error}`);
  }
};
