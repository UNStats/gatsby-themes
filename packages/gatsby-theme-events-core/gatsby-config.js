const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { contentPath, collection, mdxOtherwiseConfigured } = withDefaults(
    themeOptions
  );
  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: contentPath,
          name: collection,
        },
      },
      !mdxOtherwiseConfigured && { resolve: 'gatsby-plugin-mdx', options: {} },
    ].filter(Boolean),
  };
};
