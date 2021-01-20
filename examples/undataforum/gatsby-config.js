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
    '@undataforum/gatsby-theme-theme-ui',
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        collection: 'blog',
        // contentPath: 'content/posts',
        mdxOtherwiseConfigured: true,
        // This option is passed through to page components.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        collection: 'news',
        contentPath: 'content/articles',
        mdxOtherwiseConfigured: true,
        // This option is passed through to page components.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-events-core',
      options: {
        collection: 'webinars',
        // contentPath: 'content/events',
        mdxOtherwiseConfigured: true,
        // This option is passed through to page components.
        tagCollection: 'tags',
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
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: {
        // tagCollection: 'tags',
        mdxCollections: ['blog', 'news', 'webinars'],
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
