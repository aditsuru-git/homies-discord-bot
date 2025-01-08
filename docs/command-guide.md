# Command Class Usage Guide

The Command class is designed to handle both prefix and slash commands for a Discord bot. This guide explains how to use the class effectively and details its rules and constraints.

## Basic Usage

```javascript
const Command = require("./command");

const myCommand = new Command()
  .setName("commandname")
  .setDescription("Command Description")
  .setPrefixCommandLogic((client, message, args) => {
    //Prefix command logic
  })
  .setSlashCommandLogic((client, interaction) => {
    //Slash command logic
  });
```

## Properties

### Required Properties

- `name`: Command identifier (1-32 characters)
- `description`: Command description (1-100 characters)

### Optional Properties

- `testingPhase`: Boolean flag for commands in testing
- `devsOnly`: Boolean flag for developer-only commands
- `prefixOnly`: Boolean flag for prefix-only commands
- `options`: Array of command options
- `deleted`: Boolean flag for soft-deleted commands

## Validation Rules

### Command Name Rules

- Must be a string
- Length: 1-32 characters
- Allowed characters: letters, numbers, hyphens, underscores
- Automatically converted to lowercase
- Must match regex: `/^[\w-]{1,32}$/`

### Description Rules

- Must be a string
- Length: 1-100 characters

### Options Rules

- Must be an array
- Each option must have:
  - `name`: Following command name rules
  - `description`: Following description rules

## Methods

### Builder Methods

All builder methods return `this` for method chaining:

```javascript
myCommand
  .setName("command-name")
  .setDescription("Command description")
  .setTestingPhase(true)
  .setDevsOnly(false)
  .setPrefixOnly(false)
  .setOptions([
    {
      name: "option-one",
      description: "First option",
    },
  ]);
```

### Command Logic

Two types of command handlers:

1. Prefix Command Logic:

```javascript
setPrefixCommandLogic((client, message, args) => {
  // Handle prefix command
});
```

2. Slash Command Logic:

```javascript
setSlashCommandLogic((client, interaction) => {
  // Handle slash command
});
```

### Error Handling

- The class includes built-in error handling in the `callback` method
- Validation errors are thrown immediately when setting properties
- Command execution errors are caught and logged

## Best Practices

1. Always set both name and description
2. Validate command properties before deployment
3. Implement both prefix and slash command logic unless using `prefixOnly`
4. Use appropriate error handling in command logic
5. Keep command names simple and descriptive

## Example Implementation

```javascript
const Command = require("./command");

const kickCommand = new Command()
  .setName("kick")
  .setDescription("Kicks a user from the server")
  .setDevsOnly(true)
  .setOptions([
    {
      name: "user",
      description: "The user to kick",
    },
    {
      name: "reason",
      description: "Reason for kicking",
    },
  ])
  .setPrefixCommandLogic(async (client, message, args) => {
    // Prefix command implementation
  })
  .setSlashCommandLogic(async (client, interaction) => {
    // Slash command implementation
  });
```
