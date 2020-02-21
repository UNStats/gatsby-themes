module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-blog',
      options: {
        basePath: '/blog',
        contentPath: `${__dirname}/content/posts`,
        assetPath: `${__dirname}/content/assets`,
      },
    },
  ],
};
