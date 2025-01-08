# Discord.js Bot Database Integration Guide

This guide will help you set up and use MongoDB and Redis with your Discord.js bot, whether you're a complete beginner or experienced developer.

## Prerequisites

Before starting, you'll need:
1. Node.js installed on your computer
2. A Discord bot token
3. MongoDB (local or Atlas)
4. Redis (optional - local or cloud-hosted)

## Database Setup Options

### Option 1: Local Development Setup (Recommended for beginners)

#### Setting Up Local MongoDB
1. **Install MongoDB Community Server**
   - **Windows**: Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **Mac**: `brew tap mongodb/brew && brew install mongodb-community`
   - **Linux**: `sudo apt-get install -y mongodb-org`

2. **Start MongoDB Service**
   - **Windows**: Service starts automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. **Verify Installation**: Run `mongosh` in terminal

#### Setting Up Local Redis (Optional)
1. **Install Redis**
   - **Windows**: Use WSL2 - `sudo apt-get install redis-server`
   - **Mac**: `brew install redis`
   - **Linux**: `sudo apt-get install redis-server`

2. **Start Redis Service**
   - **Windows** (in WSL2): `sudo service redis-server start`
   - **Mac**: `brew services start redis`
   - **Linux**: `sudo systemctl start redis-server`

3. **Verify Installation**: Run `redis-cli ping`

### Option 2: Cloud Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new project
   - Build a free cluster
   - Set up database access (username/password)
   - Set up network access ("Allow Access from Anywhere")
   - Get your connection string

## Project Setup

1. **Install Required Packages**
```bash
npm init -y
npm install discord.js mongoose ioredis dotenv
```

2. **Create Configuration Files**

Create a `config.json` file:
```json
{
    "max-memory": 1000000000,  // 1GB (set to 0 to disable Redis)
    "redis-expire-time": 3600  // Cache expiration in seconds (1 hour)
}
```

Create a `.env` file:
```env
DISCORD_TOKEN=your_bot_token
# For local setup:
MONGODB_URI=mongodb://localhost:27017/your_database_name
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Leave empty for local

# For cloud setup:
# MONGODB_URI=your_atlas_connection_string
# REDIS_HOST=your_redis_host
# REDIS_PORT=your_redis_port
# REDIS_PASSWORD=your_redis_password
```

3. **Basic Bot Setup (index.js)**
```javascript
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { DatabaseManager } = require('./config/database');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const dbManager = new DatabaseManager();

async function init() {
    try {
        await dbManager.connect();
        await client.login(process.env.DISCORD_TOKEN);
        console.log('Bot is online!');
    } catch (error) {
        console.error('Initialization error:', error);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    console.log('Shutting down...');
    dbManager.disconnect();
    client.destroy();
    process.exit(0);
});

init();
```

## Using the Database System

### Creating Schemas

1. **Basic Schema**
```javascript
const userSchema = new SchemaBuilder('User')
    .addField('userId', String, { required: true })
    .addField('balance', Number, { default: 0 })
    .build();
```

2. **Schema with Array Validation**
```javascript
// Array of strings with specific values
const guildSchema = new SchemaBuilder('Guild')
    .addField('name', String, { required: true })
    .addField('allowedRoles', Array, {
        arrayOf: 'string',
        enum: ['admin', 'moderator', 'user'],
        default: ['user']
    })
    .build();

// Array of objects with specific structure
const inventorySchema = new SchemaBuilder('Inventory')
    .addField('userId', String, { required: true })
    .addField('items', Array, {
        arrayOf: 'object',
        objectStructure: {
            itemId: { type: String, required: true },
            quantity: { type: Number, required: true, min: 0 },
            acquired: { type: Date, default: Date.now }
        }
    })
    .build();

// Array with custom validation
const playlistSchema = new SchemaBuilder('Playlist')
    .addField('songs', Array, {
        arrayType: String,
        validateEach: (url) => url.startsWith('https://'),
        validateMessage: 'All songs must have valid URLs'
    })
    .build();
```

### Using the Database Handler

```javascript
const handler = new DatabaseHandler(userSchema, 'user');

// CRUD Operations
try {
    // Create/Update
    await handler.set('userId', {
        userId: 'userId',
        balance: 100
    });

    // Read
    const userData = await handler.get('userId');

    // Delete
    await handler.delete('userId');
} catch (error) {
    console.error('Database operation failed:', error);
}
```

## Best Practices

1. **Schema Design**
   - Use appropriate data types
   - Add validation for arrays and objects
   - Set default values where appropriate
   - Make fields required when necessary

2. **Error Handling**
   - Wrap database operations in try-catch
   - Handle validation errors separately
   - Log errors with context

3. **Performance**
   - Use Redis for frequently accessed data
   - Index important fields
   - Monitor memory usage

## Troubleshooting

1. **Local Setup Issues**
   - Check if services are running:
     - MongoDB: `mongosh`
     - Redis: `redis-cli ping`
   - Verify ports aren't in use
   - Check service logs

2. **Data Validation Errors**
   - Verify schema matches data structure
   - Check array validation rules
   - Ensure required fields are present

3. **Connection Issues**
   - Verify connection strings
   - Check service status
   - Confirm network settings

## Development Tools

1. **MongoDB Compass** - GUI for MongoDB
2. **Redis Commander** - GUI for Redis:
   ```bash
   npm install -g redis-commander
   redis-commander
   ```

Need help?
- [MongoDB Docs](https://docs.mongodb.com/)
- [Redis Docs](https://redis.io/documentation)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Discord.js Guide](https://discordjs.guide/)
