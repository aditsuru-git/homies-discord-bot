const path = require("path");
const fileLoader = require("../common/fileLoader");

module.exports = () => {
  try {
    const localCommands = [];
    const commandsPath = path.join(__dirname, "..", "..", "commands");

    const commandCategories = fileLoader(commandsPath, true);

    for (const commandCategory of commandCategories) {
      const commandFiles = fileLoader(commandCategory);
      for (const commandFile of commandFiles) {
        try {
          const commandObject = require(commandFile);
          if (!commandObject || typeof commandObject !== "object") continue;
          if (!validateCommandProperties(commandObject, commandFile)) continue;
          localCommands.push(commandObject);
        } catch (error) {
          console.error(
            `[Error] Failed to load command file: ${commandFile}\n${error}`
          );
        }
      }
    }
    return localCommands;
  } catch (error) {
    console.error(`[Error] Failed to load local commands:`, error);
    return [];
  }
};

function validateCommandProperties(command, commandFile) {
  const requiredProps = {
    name: "string",
    description: "string",
    callback: "function",
  };
  for (const [prop, type] of Object.entries(requiredProps)) {
    if (!command[prop] || typeof command[prop] !== type) {
      console.log(
        `[Error] Command at ${commandFile} missing required ${prop} (${type})`
      );
      return false;
    }
  }
  return true;
}
