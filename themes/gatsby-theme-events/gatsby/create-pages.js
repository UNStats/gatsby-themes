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
      allEvent: { nodes: events },
    },
  } = await graphql(
    `
      query($type: String!) {
        allEvent(filter: { type: { eq: $type } }) {
          nodes {
            id
            path
            slug
          }
        }
      }
    `,
    { type }
  );

  // Create individual post pages.
  events.forEach(({ id, path, slug }) => {
    createPage({
      path,
      component: require.resolve('../src/templates/event.js'),
      context: {
        id,
        // Regex to select files whose relative path starts with the slug.
        regex: `/^${slug}/`,
      },
    });
  });

  // Create events page.
  createPage({
    path: `${basePath}/`,
    component: require.resolve('../src/templates/events.js'),
    context: {
      title,
      description,
      type,
    },
  });
};
