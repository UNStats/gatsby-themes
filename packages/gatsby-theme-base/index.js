if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/gatsby-theme-base.cjs.production.min.js');
} else {
  module.exports = require('./dist/gatsby-theme-base.cjs.development.js');
}
