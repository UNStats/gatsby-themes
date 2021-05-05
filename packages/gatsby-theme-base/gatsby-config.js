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
        // This plugin creates standardized pages that are required on all websites.
        resolve: '@maiertech/gatsby-theme-pages-core',
        options: {
          contentPath: path.join(__dirname, 'content/pages'),
          mdxOtherwiseConfigured,
        },
      },
      // This plugin is required to make the `SEO` component work.
      'gatsby-plugin-react-helmet',
      // This plugin creates a [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) that you can submit to Google.
      'gatsby-plugin-sitemap',
    ],
  };
};
