module.exports = {
  siteMetadata: {
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    siteTwitterUsername: 'dummy',
  },
  plugins: [
    { resolve: 'gatsby-plugin-mdx', options: {} },
    {
      resolve: '@undataforum/gatsby-theme-blog-core',
      options: {
        collection: 'blog',
        contentPath: 'content/posts',
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
