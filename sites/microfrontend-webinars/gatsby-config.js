const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-events',
      options: {
        basePath: '/webinars',
        contentPath: path.join(__dirname, 'content', 'webinars'),
        assetPath: path.join(__dirname, 'content', 'assets'),
        collection: 'webinars',
        profiles: 'profiles',
      },
    },
  ],
};
