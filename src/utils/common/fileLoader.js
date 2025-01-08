const fs = require("fs");
const path = require("path");

module.exports = (directory, foldersOnly = false) => {
  let filesList = [];

  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(directory, file.name);
      if (file.isDirectory() && foldersOnly) {
        filesList.push(filePath);
      } else {
        if (file.isFile()) {
          filesList.push(filePath);
        }
      }
    }
    return filesList;
  } catch (error) {
    console.error(`Error reading directory: ${directory}\n${error}`);
  }
};
