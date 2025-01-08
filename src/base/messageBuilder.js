const {
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

class MessageBuilder {
  constructor(options = {}) {
    this.embed = new EmbedBuilder();
    this.buttonRows = [[]]; // Initialize with one empty row
    this.maxButtonsPerRow = 5;
    this.embed.setColor(options.color || 0xaed6ff);
  }

  // Existing embed methods remain the same
  setTitle(title) {
    if (title) this.embed.setTitle(title);
    return this;
  }

  setDescription(description) {
    if (description) this.embed.setDescription(description);
    return this;
  }

  setFooter(text, iconURL) {
    if (text) this.embed.setFooter({ text, iconURL: iconURL || null });
    return this;
  }

  setColor(color) {
    if (color) this.embed.setColor(color);
    return this;
  }

  setThumbnail(url) {
    if (url) this.embed.setThumbnail(url);
    return this;
  }

  setImage(url) {
    if (url) this.embed.setImage(url);
    return this;
  }

  addField(name, value, inline = false) {
    if (name && value) this.embed.addFields({ name, value, inline });
    return this;
  }

  // Add a new method to create a new row
  addRow() {
    // Only add a new row if the current row has buttons
    if (this.buttonRows[this.buttonRows.length - 1].length > 0) {
      this.buttonRows.push([]);
    }
    return this;
  }

  addButton({
    customId,
    label,
    style = ButtonStyle.Primary,
    emoji = null,
    disabled = false,
    url = null,
  }) {
    // Validate required parameters
    if (!label || !(customId || url)) {
      throw new Error("Button requires label and either customId or url");
    }

    const button = new ButtonBuilder()
      .setLabel(label)
      .setStyle(style)
      .setDisabled(disabled);

    if (url) {
      button.setURL(url);
      button.setStyle(ButtonStyle.Link);
    } else {
      button.setCustomId(customId);
    }

    if (emoji) button.setEmoji(emoji);

    // Get the current row
    const currentRow = this.buttonRows[this.buttonRows.length - 1];

    // Check if current row has space
    if (currentRow.length >= this.maxButtonsPerRow) {
      throw new Error(
        `Cannot add more than ${this.maxButtonsPerRow} buttons to a row`
      );
    }

    // Add button to current row
    currentRow.push(button);
    return this;
  }

  build() {
    const message = { embeds: [this.embed] };

    // Filter out empty rows and create components
    const nonEmptyRows = this.buttonRows.filter((row) => row.length > 0);

    if (nonEmptyRows.length > 0) {
      message.components = nonEmptyRows.map((row) =>
        new ActionRowBuilder().addComponents(row)
      );
    }

    return message;
  }

  static ButtonStyle = ButtonStyle;
}

module.exports = MessageBuilder;
