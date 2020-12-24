module.exports = {
  siteMetadata: {
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    siteTwitterUsername: 'dummy',
  },
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        // collection: 'posts',
        // contentPath: 'content/posts',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        collection: 'news',
        contentPath: 'content/articles',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-events-core',
      options: {
        // collection: 'events',
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
