module.exports = (themeOptions) => ({
  basePath: '/',
  collection: 'posts',
  contentPath: 'content/posts',
  mdxOtherwiseConfigured: false,
  ...themeOptions,
});
