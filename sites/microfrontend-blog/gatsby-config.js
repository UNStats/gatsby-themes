const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-blog',
      options: {
        basePath: '/blog',
        contentPath: path.join(__dirname, 'content', 'posts'),
        assetPath: path.join(__dirname, 'content', 'assets'),
        collection: 'blog',
      },
    },
  ],
};
