# Discord Bot Template

A modern Discord.js bot template with utility classes and structured command handling.

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Set up configuration:
   - Copy `.env.example` to `.env` and fill in your environment variables
   - Edit `config.json` and add your Discord user ID in `devs: ["your_id_here"]`

> If you are not using a database then make sure to remove `await connectDatabase();` from `index.js`.

## Project Structure

Make sure to:

- Place command categories in subfolders within the `commands` folder
- Keep button handlers in subfolders within the `buttons` folder
- Place database schemas in `database/models`
- Remove all `.gitkeep` files

## Available Scripts

- Development mode:

```bash
npm run dev    # Runs index.js using nodemon
```

- Production mode:

```bash
npm run start   # Runs normally using node
```

## Documentation

Refer to these guides to get started:

1. **Commands Guide** - Learn how to build bot commands
2. **Message Builder Guide** - Create embeds with buttons using the MessageBuilder utility class
3. **Utils Guide** - Understand available utility functions

## Best Practices

- Keep commands organized in category subfolders
- Don't place files directly in the `commands` or `buttons` folders
- Follow the database schema structure for models
- Use the provided utility classes for consistent functionality
