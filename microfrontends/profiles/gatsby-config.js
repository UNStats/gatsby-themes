const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-profiles',
      options: {
        basePath: '/profiles',
        contentPath: path.join(__dirname, 'content', 'profiles'),
        assetPath: path.join(__dirname, 'content', 'assets'),
        postCollection: 'blog',
      },
    },
  ],
};
