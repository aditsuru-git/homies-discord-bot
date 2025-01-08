# MessageBuilder Class Usage Guide

The MessageBuilder class simplifies the creation of rich Discord messages with embeds and buttons. This guide covers usage patterns, rules, and best practices.

## Basic Usage

```javascript
const MessageBuilder = require("./messageBuilder");

const message = new MessageBuilder()
  .setTitle("Hello World")
  .setDescription("This is a sample message")
  .build();
```

## Embed Properties

### Optional Properties

All embed properties are optional but should be used appropriately:

- `title`: Message title
- `description`: Main message content
- `footer`: Footer text and optional icon
- `color`: Hex color code (default: 0xaed6ff)
- `thumbnail`: Small image in top right
- `image`: Large image below description
- `fields`: Additional titled sections

## Button Properties

### Required Button Properties

When adding a button, you must provide:

- `label`: Button text
- Either `customId` (for interactive buttons) or `url` (for link buttons)

### Optional Button Properties

- `style`: Button style (defaults to Primary)
- `emoji`: Button emoji
- `disabled`: Boolean to disable button
- `url`: Makes the button a link button

## Rules and Constraints

### Button Rules

- Maximum 5 buttons per row
- Link buttons must use ButtonStyle.Link
- Buttons require either customId or url
- Cannot mix customId and url in same button

### Embed Rules

- Empty or null values are safely handled
- Color must be a valid hex code
- URLs must be valid strings

## Methods

### Embed Methods

All methods return `this` for chaining:

```javascript
messageBuilder
  .setTitle("Title")
  .setDescription("Description")
  .setFooter("Footer")
  .setColor(0xff0000)
  .setThumbnail("thumbnail-url")
  .setImage("image-url")
  .addField("Field Name", "Field Value", false);
```

### Button Methods

Add buttons using the addButton method:

```javascript
messageBuilder.addButton({
  customId: "button-id",
  label: "Click Me",
  style: MessageBuilder.ButtonStyle.Primary,
  emoji: "👋",
  disabled: false,
});
```

### Available Button Styles

```javascript
MessageBuilder.ButtonStyle.Primary; // Blue
MessageBuilder.ButtonStyle.Secondary; // Grey
MessageBuilder.ButtonStyle.Success; // Green
MessageBuilder.ButtonStyle.Danger; // Red
MessageBuilder.ButtonStyle.Link; // Link button
```

## Examples

### Basic Embed Message

```javascript
const message = new MessageBuilder()
  .setTitle("Welcome")
  .setDescription("Welcome to our server!")
  .setFooter("Created by Bot")
  .setColor(0x00ff00)
  .build();
```

### Message with Buttons

```javascript
const message = new MessageBuilder()
  .setTitle("Reaction Roles")
  .setDescription("Click a button to get a role")
  .addButton({
    customId: "role-1",
    label: "Get Role",
    style: MessageBuilder.ButtonStyle.Primary,
  })
  .addButton({
    url: "https://discord.com",
    label: "Visit Website",
    style: MessageBuilder.ButtonStyle.Link,
  })
  .build();
```

### Complex Message with Fields and Multiple Buttons

```javascript
const message = new MessageBuilder()
  .setTitle("Server Status")
  .setDescription("Current server status and options")
  .addField("Online Users", "127", true)
  .addField("Total Channels", "15", true)
  .setFooter("Last updated")
  .addButton({
    customId: "refresh",
    label: "Refresh",
    emoji: "🔄",
  })
  .addButton({
    customId: "settings",
    label: "Settings",
    style: MessageBuilder.ButtonStyle.Secondary,
  })
  .build();
```

## Handling Button Callbacks

- Create a file for your button callback inside a subfolder of `/src/buttons`

```javascript
module.exports = {
  customId = "button_id"
  callback (client, interaction) {
    const originalMessage = interaction.message // To get the original message which has the button.
  }
}
```

- Use database to perform security checks like allowing only specific users to use the button.
