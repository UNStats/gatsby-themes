const path = require('path');

const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { mdxOtherwiseConfigured } = withDefaults(themeOptions);
  return {
    plugins: [
      {
        resolve: '@maiertech/gatsby-theme-pages-core',
        options: {
          contentPath: path.join(__dirname, 'content', 'pages'),
          mdxOtherwiseConfigured,
        },
      },
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sitemap',
    ],
  };
};
