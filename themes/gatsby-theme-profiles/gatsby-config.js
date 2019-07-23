const defaultOptions = require('./index');

module.exports = ({
  assetPath = defaultOptions.assetPath,
  basePath = defaultOptions.basePath,
  contentPath = defaultOptions.contentPath,
}) => ({
  siteMetadata: {
    basePath,
  },
  plugins: [
    '@undataforum/gatsby-theme-base',
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
});
