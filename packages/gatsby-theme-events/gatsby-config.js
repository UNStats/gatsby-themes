const withDefaults = require('./utils/default-options');

module.exports = (themeOptions) => {
  const { contentPath, assetPath, collection } = withDefaults(themeOptions);
  return {
    plugins: [
      '@undataforum/gatsby-theme-base',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: contentPath,
          name: collection,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: assetPath,
        },
      },
    ],
  };
};
