const defaultOptions = require('./defaultOptions');

module.exports = ({
  assetPath = defaultOptions.assetPath,
  basePath = defaultOptions.basePath,
  contentPath = defaultOptions.contentPath,
  type = defaultOptions.type,
}) => ({
  siteMetadata: {
    basePath,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@undataforum/gatsby-theme-profiles'],
      },
    },
    '@undataforum/gatsby-theme-base',
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
});
