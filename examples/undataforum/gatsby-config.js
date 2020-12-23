const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    siteTitle: 'United Nations World Data Forum',
    siteDescription: 'This is the site description from gatsby-config.js.',
    siteUrl: pkg.homepage,
    siteTwitter: 'undataforum',
    siteLanguage: 'en',
  },
  plugins: [
    'gatsby-plugin-mdx',
    '@undataforum/gatsby-theme-base',
    {
      resolve: '@undataforum/gatsby-theme-blog-core',
      options: {
        collection: 'blog',
        // contentPath: 'content/posts',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-blog-core',
      options: {
        collection: 'news',
        contentPath: 'content/articles',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-events-core',
      options: {
        collection: 'webinars',
        // contentPath: 'content/events',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-profiles-core',
      options: {
        // collection: 'profiles',
        // contentPath: 'content/profiles',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
      },
    },
  ],
};
