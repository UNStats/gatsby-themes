const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Title placeholder (@undataforum/gatsby-theme-layout)',
    description: 'Description placeholder (@undataforum/gatsby-theme-layout)',
    twitter: 'undataforum',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src/pages'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/templates/default.js'),
        },
      },
    },
  ],
};
