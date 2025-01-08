const {
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

class MessageBuilder {
  constructor(options = {}) {
    this.embed = new EmbedBuilder();
    this.buttons = [];
    this.maxButtonsPerRow = 5;
    this.embed.setColor(options.color || 0xaed6ff);
  }

  // Added validation for common empty/null cases
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
      // Link buttons must use ButtonStyle.Link
      button.setStyle(ButtonStyle.Link);
    } else {
      button.setCustomId(customId);
    }

    if (emoji) button.setEmoji(emoji);

    this.buttons.push(button);
    return this;
  }

  build() {
    const message = { embeds: [this.embed] };

    if (this.buttons.length > 0) {
      message.components = [];
      for (let i = 0; i < this.buttons.length; i += this.maxButtonsPerRow) {
        const row = new ActionRowBuilder().addComponents(
          this.buttons.slice(i, i + this.maxButtonsPerRow)
        );
        message.components.push(row);
      }
    }

    return message;
  }

  static ButtonStyle = ButtonStyle;
}

module.exports = MessageBuilder;
