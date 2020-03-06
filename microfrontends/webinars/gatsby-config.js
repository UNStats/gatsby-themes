module.exports = {
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-events',
      options: {
        basePath: '/webinars',
        contentPath: `${__dirname}/content/webinars`,
        assetPath: `${__dirname}/content/assets`,
        collection: 'webinars',
        profiles: 'profiles',
      },
    },
  ],
};
