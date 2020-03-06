const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Test Site',
    description: 'This description overrides any placeholder descriptions.',
    siteUrl: pkg.homepage,
  },
  plugins: [
    'blog',
    'profiles',
    {
      resolve: '@undataforum/gatsby-theme-events',
      options: {
        basePath: '/events',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
