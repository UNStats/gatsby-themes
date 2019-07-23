const defaultOptions = require('./index');

module.exports = ({
  assetPath = defaultOptions.assetPath,
  basePath = defaultOptions.basePath,
  contentPath = defaultOptions.contentPath,
}) => ({
  siteMetadata: {
    // Title, description, and twitter are required by @undataforum/gatsby-theme-base.
    title: 'Title placeholder (@undataforum/gatsby-themes-profiles)',
    description:
      'Description placeholder (@undataforum/gatsby-themes-profiles)',
    twitter: 'Twitter handle placeholder (@undataforum/gatsby-themes-profiles)',
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
