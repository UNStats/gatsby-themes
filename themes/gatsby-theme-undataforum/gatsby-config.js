module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    // Install "gatsby-plugin-page-creator" if the theme should be able to generate pages.
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/src/pages`
    //   }
    // },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/components/ContainerLayout.jsx'),
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
  ],
};
