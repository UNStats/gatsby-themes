const defaultOptions = require('./defaultOptions');

module.exports = ({
  assetPath = defaultOptions.assetPath,
  basePath = defaultOptions.basePath,
  contentPath = defaultOptions.contentPath,
  profileType = defaultOptions.profileType,
}) => ({
  siteMetadata: {
    basePath,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@undataforum/gatsby-theme-events'],
      },
    },
    '@undataforum/gatsby-theme-base',
    {
      resolve: '@undataforum/gatsby-theme-profiles',
      options: { basePath: '/profiles', type: profileType },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath,
        name: contentPath,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: assetPath,
        name: assetPath,
      },
    },
  ],
});
