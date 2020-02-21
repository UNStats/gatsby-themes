const withDefaults = require('../utils/default-options');
const urlResolve = require('../utils/url-resolve');

module.exports = async ({ graphql, actions }, themeOptions) => {
  const { basePath, collection } = withDefaults(themeOptions);
  const { createPage } = actions;

  const {
    data: {
      allPost: { nodes: posts },
    },
  } = await graphql(
    `
      query($collection: String!) {
        allPost(filter: { collection: { eq: $collection } }) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { collection }
  );

  // Create individual post pages.
  posts.forEach(({ id, path }) => {
    createPage({
      path,
      component: require.resolve('../src/templates/post.js'),
      context: {
        id,
      },
    });
  });

  // Create posts page.
  createPage({
    path: urlResolve(basePath),
    component: require.resolve('../src/templates/posts.js'),
    context: {
      collection,
    },
  });
};
