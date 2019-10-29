const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Test Site',
    siteUrl: pkg.homepage,
  },
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-blog',
      options: { basePath: '/blog' },
    },
    {
      resolve: '@undataforum/gatsby-theme-events',
      options: {
        basePath: '/events',
      },
    },
  ],
};
