const path = require('path');

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src/pages'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: 'content',
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/layouts/Default.js'),
        },
      },
    },
    'gatsby-transformer-sharp',
    { resolve: 'gatsby-plugin-sharp', options: { defaultQuality: 75 } },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-undataforum'],
      },
    },
  ],
};
