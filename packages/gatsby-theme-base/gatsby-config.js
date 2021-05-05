// @ts-check
const path = require('path');
const withDefaults = require('./theme-options');

/**
 * This `gatsby-config.js` will be consolidated by Gatsby into the site's `gatsby-config.js`.
 *
 * @param { import("./src/types").Options } options
 */
module.exports = (options) => {
  const { mdxOtherwiseConfigured } = withDefaults(options);
  return {
    plugins: [
      {
        resolve: '@maiertech/gatsby-theme-pages-core',
        options: {
          contentPath: path.join(__dirname, 'content/pages'),
          mdxOtherwiseConfigured,
        },
      },
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sitemap',
    ],
  };
};
