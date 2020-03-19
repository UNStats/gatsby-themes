module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-blog',
      options: {
        basePath: '/news',
        contentPath: `${__dirname}/content/articles`,
        assetPath: `${__dirname}/content/assets`,
        collection: 'news',
      },
    },
  ],
};
