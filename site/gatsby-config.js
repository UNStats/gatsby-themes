const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    siteUrl: pkg.homepage,
  },
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-profiles',
      options: { basePath: '/profiles' },
    },
  ],
};
