# MessageBuilder Guide

A utility class for building Discord.js messages with embeds and buttons in a chainable manner.

> I advice using discord.js provided builders directly for complex embeds and buttons.

## Installation

```javascript
const MessageBuilder = require("../../base/MessageBuilder");
```

## Quick Start

```javascript
const builder = new MessageBuilder();

const message = builder
  .setTitle("Welcome!")
  .setDescription("This is a sample message")
  .addButton({
    customId: "click_me",
    label: "Click Me",
    style: MessageBuilder.ButtonStyle.Primary,
  })
  .build();

// Send the message
channel.send(message);
```

## Constructor Options

```javascript
const builder = new MessageBuilder({
  color: 0xaed6ff, // Default color, optional
});
```

## Embed Methods

All embed methods are chainable and optional:

- `setTitle(title)`: Sets embed title
- `setDescription(description)`: Sets embed description
- `setFooter(text, iconURL)`: Sets footer text and optional icon
- `setColor(color)`: Sets embed color (hex code)
- `setThumbnail(url)`: Sets thumbnail image
- `setImage(url)`: Sets main embed image
- `addField(name, value, inline = false)`: Adds a field to the embed

## Button Methods

- `addButton(options)`: Adds a button to the current row
  ```javascript
  {
    customId: string; // Required unless url is provided
    label: string; // Required
    style: ButtonStyle; // Optional, defaults to Primary
    emoji: string; // Optional
    disabled: boolean; // Optional, defaults to false
    url: string; // Optional, for link buttons
  }
  ```
- `addRow()`: Creates a new row for buttons

## Button Styles

Available through `MessageBuilder.ButtonStyle`:

- `Primary`
- `Secondary`
- `Success`
- `Danger`
- `Link` (requires URL instead of customId)

## Limitations

- Maximum 5 buttons per row
- Maximum 5 rows of buttons per message
- Buttons require either customId or url

## Final Build

Always end your chain with `.build()` to get the final message object:

```javascript
const message = builder
  // ... your chain of methods
  .build();
```

# Button Handler Guide

## Handling Button Interactions

The button handler automatically loads and processes button interactions from organized subdirectories.

### File Structure

```
buttons/
  ├── category1/
  │   ├── button1.js
  │   └── button2.js
  └── category2/
      └── button3.js
```

### Creating Button Handlers

1. Create a new file in a subdirectory of the `/buttons` folder
2. Export an object with the following structure:

```javascript
module.exports = {
  customId: "your-button-id", // Must match the customId set in your button
  callback: async (client, interaction) => {
    // Your button interaction logic here
  },
};
```

### Required Properties

- `customId`: String matching the button's customId
- `callback`: Async function that receives:
  - `client`: Discord.js Client instance
  - `interaction`: Button interaction object

### Error Handling

The button handler includes built-in error handling:

- Invalid button files are skipped with a warning
- Unhandled buttons receive an ephemeral error message
- Failed interactions are caught and logged
- Automatic handling of replied/deferred interactions

### Best Practices

1. Organize buttons in category folders
2. Use clear, descriptive customIds
3. Include try-catch blocks in callbacks
4. Handle interaction responses appropriately
5. Keep button logic focused and concise
