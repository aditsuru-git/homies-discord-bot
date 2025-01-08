const handlePrefixCommand = require("../../handlers/prefixCommandHandler");

const prefix = "!";

module.exports = async (client, message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  await handlePrefixCommand(client, message, prefix);
};
