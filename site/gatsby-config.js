const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Test Site',
    siteUrl: pkg.homepage,
  },
  plugins: [
    {
      resolve: '@undataforum/gatsby-theme-blog',
      options: {
        basePath: '/blog',
        description:
          'Blog posts authored by the United Nations World Data Forum community.',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-events',
      options: {
        basePath: '/events',
        description:
          'Events in preparation of the 2020 United Nations World Data Forum.',
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
