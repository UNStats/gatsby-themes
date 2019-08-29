const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
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
        description:
          'Events leading up to the United Nations World Data Forum.',
      },
    },
  ],
};
