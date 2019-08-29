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
      allEvent: { nodes: events },
    },
  } = await graphql(
    `
      query($type: String!) {
        allEvent(filter: { type: { eq: $type } }) {
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
  events.forEach(({ id, path }) => {
    createPage({
      path,
      component: require.resolve('../src/templates/event.js'),
      context: {
        id,
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
