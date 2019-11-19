const defaultOptions = require('../defaultOptions');

module.exports = async (
  { graphql, actions },
  {
    basePath = defaultOptions.basePath,
    title = defaultOptions.title,
    description = defaultOptions.description,
    type = defaultOptions.type,
  }
) => {
  const { createPage } = actions;

  const {
    data: {
      allProfile: { nodes: profiles },
    },
  } = await graphql(
    `
      query($type: String!) {
        allProfile(filter: { type: { eq: $type } }) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { type }
  );

  // Create individual profile pages.
  profiles.forEach(({ id, path }) => {
    createPage({
      path,
      component: require.resolve('../src/templates/profile.js'),
      context: {
        id,
      },
    });
  });

  // Create profiles page.
  createPage({
    path: `${basePath}/`,
    component: require.resolve('../src/templates/profiles.js'),
    context: {
      title,
      description,
      type,
    },
  });
};
