# Creating a New Event Listener

- Create a folder in `/src/events`:

  - Name the folder after the event you want to listen for.

- Add files for event handling:

  - Inside the folder, add JavaScript files for the code to execute when the event occurs.
  - Name the files in numeric order (e.g., `01-file.js`, `02-file.js`). This ensures the execution order is clear and predictable.

- Export a function in each file:
  - Each file should export a function.
  - The function must take at least one argument, client (this represents your bot or application instance).
  - Additional arguments depend on the event you are listening for. For example:
    - If listening to a `messageCreate` event, the arguments might include `message`.
    - If listening to a `guildMemberAdd` event, the arguments might include `member`.
