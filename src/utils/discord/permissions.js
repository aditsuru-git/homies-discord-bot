/**
 * Permission checking utilities for Discord commands
 */

/**
 * Checks permissions for slash commands
 * @param {string|string[]} permissions - Required permissions
 * @param {Interaction} interaction - Discord interaction
 * @param {boolean} [requireAll=true] - Whether all permissions are required
 * @returns {boolean} Whether permissions are met
 */
function checkSlashPermission(permissions, interaction, requireAll = true) {
  if (!interaction?.memberPermissions) return false;

  const perms = Array.isArray(permissions) ? permissions : [permissions];

  return requireAll
    ? perms.every((perm) => interaction.memberPermissions.has(perm))
    : perms.some((perm) => interaction.memberPermissions.has(perm));
}

/**
 * Checks permissions for prefix commands
 * @param {string|string[]} permissions - Required permissions
 * @param {Message} message - Discord message
 * @param {boolean} [requireAll=true] - Whether all permissions are required
 * @returns {boolean} Whether permissions are met
 */
function checkPrefixPermission(permissions, message, requireAll = true) {
  if (!message?.member || !message?.channel) return false;

  const perms = Array.isArray(permissions) ? permissions : [permissions];

  return requireAll
    ? perms.every((perm) =>
        message.member.permissionsIn(message.channel).has(perm)
      )
    : perms.some((perm) =>
        message.member.permissionsIn(message.channel).has(perm)
      );
}

module.exports = {
  checkSlashPermission,
  checkPrefixPermission,
};
