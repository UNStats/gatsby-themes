const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-blog',
      options: {
        basePath: '/news',
        contentPath: path.join(__dirname, 'content', 'articles'),
        assetPath: path.join(__dirname, 'content', 'assets'),
        collection: 'news',
      },
    },
  ],
};
