module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/components/mdx-page.js'),
        },
        gatsbyRemarkPlugins: ['gatsby-remark-smartypants'],
      },
    },
    'gatsby-plugin-sitemap',
  ],
};
