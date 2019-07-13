const fs = require('fs');

module.exports.onPreBootstrap = ({ reporter }) => {
  const dirs = ['content/profiles', 'content/assests/profiles'];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`creating the ${dir} directory`);
    fs.mkdirSync(dir, { recursive: true });
  });
};
