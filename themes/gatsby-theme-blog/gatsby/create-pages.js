const defaultOptions = require('../defaultOptions');

module.exports = async (
  { graphql, actions },
  {
    basePath = defaultOptions.basePath,
    title = defaultOptions.title,
    description,
    type = defaultOptions.type,
  }
) => {
  const { createPage } = actions;

  const {
    data: {
      allPost: { nodes: posts },
    },
  } = await graphql(
    `
      query($type: String!) {
        allPost(filter: { type: { eq: $type } }) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { type }
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
    path: `${basePath}/`,
    component: require.resolve('../src/templates/posts.js'),
    context: {
      title,
      description,
      type,
    },
  });
};
