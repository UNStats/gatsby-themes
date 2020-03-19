const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Test Site',
    description: 'Test site description for SEO.',
    keywords: [
      'United Nations World Data Forum',
      '2030 Agenda',
      'Sustainable Development Goals',
    ],
    siteTwitterUsername: 'UNDataForum',
    siteUrl: pkg.homepage,
  },
  plugins: [
    'blog',
    'news',
    'profiles',
    'webinars',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
