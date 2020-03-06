const { urlResolve } = require(`gatsby-core-utils`);

module.exports = (...segments) => {
  const path = urlResolve(...segments);
  // Add trailing slash if there is none.
  return path.replace(/\/*$/, `/`);
};
