const { name, description } = require('./package.json');

module.exports = {
  siteMetadata: {
    title: name,
    siteUrl: 'https://theme.undataforum.org',
    description,
    navigation: [
      { text: 'About', href: '/about/' },
      {
        text: 'Blog',
        href: '/blog/',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // Pages inside /src/pages are generated for all websites consuming gatsby-theme-undataforum.
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/layouts/Default.jsx'),
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
  ],
};
