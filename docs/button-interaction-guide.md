> To keep styles consistent accross the app, put your styles inside `src/config/styles.json`.

# Handling Button Interactions

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
- Automatic handling of replied/deferred interactions on interaction failure

### Best Practices

1. Organize buttons in category folders
2. Use clear, descriptive customIds
3. Include try-catch blocks in callbacks
4. Handle interaction responses appropriately
5. Keep button logic focused and concise
