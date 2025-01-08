# Discord Bot Utilities Guide

This guide covers two utility modules: Mention Parser and Permissions Checker.

## Mention Parser Utilities

The Mention Parser helps validate user and channel mentions in prefix commands. Both functions return either a valid ID or null after validation.

### Channel Mention Validation

```javascript
const { validateChannelMention } = require("../../utils/discord/mentionParser");

// Example usage
.setPrefixCommandLogic(async (client, message, args) => {
  const channelId = await validateChannelMention(args[0], client);

  if (channelId) {
    console.log(`Valid channel ID: ${channelId}`);
  } else {
    console.log("Invalid channel mention");
  }
});

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
.setPrefixCommandLogic(async (client, message, args) => {
  const userId = await validateUserMention(args[0], client);

  if (userId) {
    console.log(`Valid user ID: ${userId}`);
  } else {
    console.log("Invalid user mention");
  }
});

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

The permissions module handles permission checks for both slash and prefix commands.

### Permission Checks

```javascript
const {
  checkPrefixPermission,
  checkSlashPermission,
} = require("../../utils/discord/permissions");

// Single permission check
await checkPrefixPermission("BanMembers", message);

// Multiple permissions (require ALL)
await checkPrefixPermission(["BanMembers", "KickMembers"], message);

// Multiple permissions (require ANY)
await checkPrefixPermission(["BanMembers", "KickMembers"], message, false);

// Same pattern for slash commands
await checkSlashPermission("BanMembers", interaction);
```

### Parameters

- `permissions`: String or string array of permission flags
- `interaction/message`: Discord.js Interaction or Message object
- `requireAll`: Boolean (default: true)
  - `true`: User needs ALL specified permissions
  - `false`: User needs ANY of the specified permissions

### Available Permission Flags

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
"UseVAD";
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

Both utilities include comprehensive error handling:

### Mention Validation

- Returns `null` for invalid mentions
- Logs detailed error messages to console
- Handles invalid formats and inaccessible users/channels

### Permission Checks

- Returns `false` for invalid permissions
- Safely handles missing guild data
- Supports both single and batch permission checks
