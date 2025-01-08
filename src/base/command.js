class Command {
  constructor() {
    this.name = null;
    this.description = null;
    this.testingPhase = false;
    this.devsOnly = false;
    this.prefixOnly = false;
    this.options = [];
    this.deleted = false;
    this.prefixCommandLogic = () => {};
    this.slashCommandLogic = () => {};
  }

  validateName(name) {
    if (typeof name !== "string") {
      throw new Error("Command name must be a string");
    }
    const nameRegex = /^[\w-]{1,32}$/;
    if (!nameRegex.test(name)) {
      throw new Error(
        "Command name must be 1-32 characters long and contain only letters, numbers, hyphens, or underscores"
      );
    }
    return name.toLowerCase();
  }

  validateDescription(description) {
    if (typeof description !== "string") {
      throw new Error("Command description must be a string");
    }
    if (description.length < 1 || description.length > 100) {
      throw new Error(
        "Command description must be between 1 and 100 characters"
      );
    }
    return description;
  }

  validateOptions(options) {
    if (!Array.isArray(options)) {
      throw new Error("Options must be an array");
    }

    return options.map((option) => {
      if (!option.name || !option.description) {
        throw new Error("Each option must have a name and description");
      }
      return {
        ...option,
        name: this.validateName(option.name),
        description: this.validateDescription(option.description),
      };
    });
  }

  validateRequiredProperties() {
    if (!this.name || !this.description) {
      console.error("Command must have a name and description");
      return false;
    }
    return true;
  }

  setName(name) {
    this.name = this.validateName(name);
    return this;
  }

  setDescription(description) {
    this.description = this.validateDescription(description);
    return this;
  }

  setTestingPhase(isTestingPhase) {
    this.testingPhase = Boolean(isTestingPhase);
    return this;
  }

  setDevsOnly(isDevsOnly) {
    this.devsOnly = Boolean(isDevsOnly);
    return this;
  }

  setPrefixOnly(isPrefixOnly) {
    this.prefixOnly = Boolean(isPrefixOnly);
    return this;
  }

  setOptions(options) {
    this.options = this.validateOptions(options);
    return this;
  }

  setDeleted(isDeleted) {
    this.deleted = Boolean(isDeleted);
    return this;
  }

  setPrefixCommandLogic(callback) {
    if (typeof callback !== "function") {
      throw new Error("Prefix command logic must be a function");
    }
    this.prefixCommandLogic = callback;
    return this;
  }

  setSlashCommandLogic(callback) {
    if (typeof callback !== "function") {
      throw new Error("Slash command logic must be a function");
    }
    this.slashCommandLogic = callback;
    return this;
  }

  async handlePrefix(client, message, args) {
    return this.prefixCommandLogic(client, message, args);
  }

  async handleSlash(client, interaction) {
    return this.slashCommandLogic(client, interaction);
  }

  async callback(
    client,
    messageOrInteraction,
    args = undefined,
    isPrefix = false
  ) {
    try {
      if (!this.validateRequiredProperties()) return;

      if (isPrefix) {
        return await this.handlePrefix(client, messageOrInteraction, args);
      }
      return await this.handleSlash(client, messageOrInteraction);
    } catch (error) {
      console.error(
        `[Error] [Command] [${
          this.name || "Unknown"
        }]: Error executing command\n`,
        error
      );
    }
  }
}

module.exports = Command;
