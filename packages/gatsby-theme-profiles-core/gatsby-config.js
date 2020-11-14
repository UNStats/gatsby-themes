const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { collection, contentPath, mdxOtherwiseConfigured } = withDefaults(
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
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
    ].filter(Boolean),
  };
};
