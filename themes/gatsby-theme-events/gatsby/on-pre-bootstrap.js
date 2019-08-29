const fs = require('fs');
const defaultOptions = require('../defaultOptions');

module.exports = (
  { reporter },
  {
    assetPath = defaultOptions.assetPath,
    contentPath = defaultOptions.contentPath,
  }
) => {
  const dirs = [assetPath, contentPath];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`Creating directory ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  });
};
