const { Client, IntentsBitField, Message } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
// const connectDatabase = require("./config/database");

require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    // await connectDatabase();
    eventHandler(client);
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error(`There was an error starting the app.\n${error}`);
  }
})();
