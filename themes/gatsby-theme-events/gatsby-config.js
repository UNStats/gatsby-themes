const defaultOptions = require('./defaultOptions');

module.exports = ({
  assetPath = defaultOptions.assetPath,
  basePath = defaultOptions.basePath,
  contentPath = defaultOptions.contentPath,
  type = defaultOptions.type,
  profileType = defaultOptions.profileType,
}) => ({
  siteMetadata: {
    basePath,
  },
  plugins: [
    '@undataforum/gatsby-theme-base',
    {
      resolve: '@undataforum/gatsby-theme-profiles',
      options: { basePath: '/profiles', type: profileType },
    },
    // You can Filter File nodes by sourceInstanceName:
    // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#how-to-query
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath,
        name: type,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: assetPath,
      },
    },
  ],
});
