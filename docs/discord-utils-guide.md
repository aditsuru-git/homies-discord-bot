# Discord Bot Utilities Guide

This guide covers two utility modules for Discord bots: Mention Parser and Permissions Checker.

## Mention Parser Utilities

The mention parser provides functions to validate and extract IDs from Discord channel and user mentions. You will use this to validate prefix command args where the channel and user mentions will be in markdown like this "`<@user>`" and "`<@#channel>`".

### Channel Mention Validation

```javascript
const { validateChannelMention } = require("../../utils/discord/mentionParser");

// Example usage
.setPrefixCommandLogic(function(client, message, args)) {
  const channelId = await validateChannelMention(args[0], client);

  if (channelId) {
    console.log(`Valid channel ID: ${channelId}`);
  } else {
    console.log("Invalid channel mention");
  }
}

// Valid format: <#123456789012345678>
```

#### Channel Validation Rules

- Must be a string in the format `<#ID>`
- ID must be 17-20 digits long
- Channel must exist and be accessible to the bot
- Returns `null` if validation fails

### User Mention Validation

```javascript
const { validateUserMention } = require("../../utils/discord/mentionParser");

// Example usage
.setPrefixCommandLogic(function(client, message, args)) {
  const userId = await validateUserMention(args[0], client);

  if (userId) {
    console.log(`Valid user ID: ${userId}`);
  } else {
    console.log("Invalid user mention");
  }
}

// Valid formats:
// <@123456789012345678>
// <@!123456789012345678>
```

#### User Validation Rules

- Must be a string in the format `<@ID>` or `<@!ID>`
- ID must be 17-20 digits long
- User must exist and be fetchable by the bot
- Returns `null` if validation fails

## Permissions Utilities

The permissions module provides functions to check user permissions for both slash and prefix commands.

### Slash Command Permissions

```javascript
const { checkSlashPermission } = require("../../utils/discord/permissions");

// Single permission check
function handleKickCommand(interaction) {
  if (!checkSlashPermission("KickMembers", interaction)) {
    return interaction.reply("You need Kick Members permission!");
  }
  // Command logic here
}

// Multiple permissions check
function handleModCommand(interaction) {
  const requiredPerms = ["KickMembers", "BanMembers", "ManageMessages"];
  const requireAll = true; // Must have all permissions

  if (!checkSlashPermission(requiredPerms, interaction, requireAll)) {
    return interaction.reply("Insufficient permissions!");
  }
  // Command logic here
}
```

### Prefix Command Permissions

```javascript
const { checkPrefixPermission } = require("../../utils/discord/permissions");

// Single permission check
function handleBanCommand(message) {
  if (!checkPrefixPermission("BanMembers", message)) {
    return message.reply("You need Ban Members permission!");
  }
  // Command logic here
}

// Multiple permissions with ANY logic
function handleAdminCommand(message) {
  const requiredPerms = ["Administrator", "ManageGuild"];
  const requireAll = false; // Only need one of these permissions

  if (!checkPrefixPermission(requiredPerms, message, requireAll)) {
    return message.reply("You need Administrator OR Manage Server permission!");
  }
  // Command logic here
}
```

### Permission Check Parameters

- `permissions`: String or array of permission strings
- `interaction/message`: Discord interaction or message object
- `requireAll`: Boolean (default: true)
  - `true`: User must have ALL specified permissions
  - `false`: User must have ANY of the specified permissions

### Common Permission Flags

```javascript
"CreateInstantInvite";
"KickMembers";
"BanMembers";
"Administrator";
"ManageChannels";
"ManageGuild";
"AddReactions";
"ViewAuditLog";
"PrioritySpeaker";
"Stream";
"ViewChannel";
"SendMessages";
"SendTTSMessages";
"ManageMessages";
"EmbedLinks";
"AttachFiles";
"ReadMessageHistory";
"MentionEveryone";
"UseExternalEmojis";
"ViewGuildInsights";
"Connect";
"Speak";
"MuteMembers";
"DeafenMembers";
"MoveMembers";
"UseVAD"; // Voice Activity Detection
"ChangeNickname";
"ManageNicknames";
"ManageRoles";
"ManageWebhooks";
"ManageEmojisAndStickers";
"UseApplicationCommands";
"RequestToSpeak";
"ManageEvents";
"ManageThreads";
"CreatePublicThreads";
"CreatePrivateThreads";
"UseExternalStickers";
"SendMessagesInThreads";
"UseEmbeddedActivities";
"ModerateMembers";
```

## Error Handling

Both utilities include built-in error handling:

- Mention validation functions:

  - Return `null` on failure
  - Log errors to console with detailed messages
  - Handle invalid formats, non-existent users/channels

- Permission checks:
  - Return `false` if permissions or objects are invalid
  - Safely handle missing member/channel data
  - Support both single and multiple permission checks
