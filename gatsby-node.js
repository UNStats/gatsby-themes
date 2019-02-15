const path = require("path");

// This theme needs to be transpiled when installed as dependency.
// Corner case: when running the docs for this theme from inside this repo, the theme is obsviously not installed.
exports.onCreateWebpackConfig = ({ loaders, actions }) => {
  let dirname;
  try {
    dirname = require.resolve("gatsby-theme-undataforum");
  } catch (e) {
    // If theme is not installed, do not modify webpack config.
    return;
  }
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.dirname(dirname),
          use: [loaders.js()]
        }
      ]
    }
  });
};
