/**
 * @typedef {import("discord.js").Client} Client
 */

/**
 *
 * @param {string} mention - Mention String
 * @param {Client} client - Discord Client
 */
async function validateChannelMention(mention, client) {
  try {
    if (!mention || typeof mention !== "string") {
      throw new Error("Invalid channel format");
    }
    const channelMentionRegex = /^<#(\d{17,20})>$/;
    const match = mention.match(channelMentionRegex);
    if (!match) {
      throw new Error("Channel mention did not match expected format");
    }
    const channelId = match[1];
    const channel = await client.channels.fetch(channelId);

    if (!channel) {
      throw new Error(`Channel not found: <#${channelId}>`);
    }
    return channelId;
  } catch (error) {
    console.error(`[Error] Channel validation failed: ${error.message}`);
    return null;
  }
}

/**
 * @param {string} mention - User mention string
 * @param {Client} client - Discord client instance
 */

async function validateUserMention(mention, client) {
  try {
    if (!mention || typeof mention !== "string") {
      throw new Error("Invalid user mention format");
    }

    const userMentionRegex = /^<@!?(\d{17,20})>$/;
    const match = mention.match(userMentionRegex);

    if (!match) {
      throw new Error("User mention did not match expected format");
    }

    const userId = match[1];
    const user = await client.users.fetch(userId);

    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    return userId;
  } catch (error) {
    console.error(`[Error] User validation failed: ${error.message}`);
    return null;
  }
}

module.exports = {
  validateChannelMention,
  validateUserMention,
};
