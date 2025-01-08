const getLocalCommands = require("../../utils/command/localCommands");
const getApplicationCommands = require("../../utils/command/applicationCommands");
const areCommandsDifferent = require("../../utils/command/validation");
require("dotenv").config();

module.exports = async (client) => {
  try {
    const localCommands = await getLocalCommands();
    const applicationCommandManager = await getApplicationCommands(
      client,
      process.env.GUILD_ID
    );

    if (!applicationCommandManager) {
      throw new Error("Failed to get application commands");
    }

    for (const localCommand of localCommands) {
      if (!localCommand) continue;

      // Skip prefix-only commands
      if (localCommand.prefixOnly) {
        console.log(`Skipping prefix-only command: ${localCommand.name}`);
        continue;
      }

      const { name, description, options } = localCommand;

      // Validate required properties
      if (!name || !description) {
        console.log(`Invalid command format for: ${name || "Unknown"}`);
        continue;
      }

      const existingCommand = applicationCommandManager.cache?.find(
        (cmd) => cmd.name === name
      );

      try {
        if (existingCommand) {
          if (localCommand.deleted) {
            await applicationCommandManager.delete(existingCommand.id);
            console.log(`Deleted command: ${name}`);
            continue;
          }

          if (areCommandsDifferent(existingCommand, localCommand)) {
            await applicationCommandManager.edit(existingCommand.id, {
              description,
              options,
            });
            console.log(`Updated command: ${name}`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(`Skipping deleted command: ${name}`);
            continue;
          }

          await applicationCommandManager.create({
            name,
            description,
            options,
          });
          console.log(`Registered new command: ${name}`);
        }
      } catch (cmdError) {
        console.error(`Error processing command ${name}:`, cmdError.message);
      }
    }
  } catch (error) {
    console.error("Command registration error:", error.message);
  }
};
