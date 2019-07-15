const fs = require('fs');

module.exports.onPreBootstrap = (
  { reporter },
  { assetPath = 'content/assets/profiles', contentPath = 'content/profiles' }
) => {
  const dirs = [assetPath, contentPath];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`creating the ${dir} directory`);
    fs.mkdirSync(dir, { recursive: true });
  });
};
