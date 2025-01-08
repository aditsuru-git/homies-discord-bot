/**
 * @typedef {import("discord.js").Client} Client
 */

/**
 * @param {Client} client - Discord client
 * @param {string} guideId
 * @returns {Promise<ApplicationCommandManager>}
 */

module.exports = async (client, guildId) => {
  try {
    let applicationCommands;

    if (!client) {
      throw new Error("Client is required");
    }

    if (guildId) {
      const guild = await client.guilds.fetch(guildId);
      if (!guild) {
        throw new Error(`Guild not found: ${guildId}`);
      }
      applicationCommands = guild.commands;
    } else {
      applicationCommands = client.application.commands;
    }

    await applicationCommands.fetch();
    console.info("[Info] Successfully fetched application commands");
    return applicationCommands;
  } catch (error) {
    console.error(
      `[Error] Failed to fetch application commands: ${error.message}`
    );
    throw error;
  }
};
