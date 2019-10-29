const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Site title placeholder (from @undataforum/gatsby-theme-base)',
    description:
      'Site description placeholder (from @undataforum/gatsby-theme-base)',
    twitter: 'Site Twitter placeholder (from @undataforum/gatsby-theme-base)',
    siteUrl: 'Site URL placeholder (from @undataforum/gatsby-theme-base)',
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@undataforum/gatsby-theme-base'],
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src/pages'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/templates/default.js'),
        },
        gatsbyRemarkPlugins: ['gatsby-remark-smartypants'],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
  ],
};
