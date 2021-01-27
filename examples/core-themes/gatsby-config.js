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
        // This option has no effect other than that it is passed through to page templates.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        collection: 'news',
        contentPath: 'content/articles',
        mdxOtherwiseConfigured: true,
        // This option has no effect other than that it is passed through to page templates.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-events-core',
      options: {
        // collection: 'events',
        // contentPath: 'content/events',
        mdxOtherwiseConfigured: true,
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
        mdxCollections: ['blog', 'news', 'events'],
      },
    },
  ],
};
