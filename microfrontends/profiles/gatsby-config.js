module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-profiles',
      options: {
        basePath: '/profiles',
        contentPath: `${__dirname}/content/profiles`,
        assetPath: `${__dirname}/content/assets`,
      },
    },
  ],
};
