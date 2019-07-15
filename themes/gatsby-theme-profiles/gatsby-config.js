module.exports = ({
  assetPath = 'content/assets/profiles',
  contentPath = 'content/profiles',
}) => ({
  siteMetadata: {
    title: '@undataforum/gatsby-themes-profiles title placeholder',
    basePath: '/',
  },
  plugins: [
    { resolve: 'gatsby-plugin-mdx', options: {} },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath,
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
