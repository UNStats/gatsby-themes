const fs = require('fs');

const withDefaults = require('../utils/default-options');

// Ensure that content directories exist.
// contentPath and assetPath are relative to the root of the project to which this theme has been added as dependency.
module.exports = ({ reporter }, themeOptions) => {
  const { contentPath, assetPath } = withDefaults(themeOptions);
  const dirs = [assetPath, contentPath];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`Creating directory ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  });
};
