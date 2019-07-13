module.exports = {
  siteMetadata: {
    title: '@undataforum/gatsby-themes-profiles title placeholder',
    basePath: '/',
  },
  plugins: [
    { resolve: 'gatsby-plugin-mdx', options: {} },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content/profiles',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content/assets/profiles',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
