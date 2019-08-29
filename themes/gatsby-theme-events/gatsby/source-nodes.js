module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Derive Event nodes from Mdx nodes.
  // There are 2 types of fields:
  // 1: fields whose values exists on the Mdx node
  // 2: fields that only return values after using a resolver to compute a value
  // See https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  createTypes(
    schema.buildObjectType({
      name: 'Event',
      fields: {
        id: { type: 'ID!' },
        // Slug can be used as alternative ID.
        slug: {
          type: 'ID!',
        },
        // Type is used to distinguish different event collections.
        type: {
          type: 'String!',
        },
        displayType: {
          type: 'String!',
        },
        startDate: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        endDate: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        displayDate: {
          type: 'String!',
        },
        duration: {
          type: 'String!',
        },
        moderators: {
          type: '[Profile]',
          // Link moderators by slug.
          extensions: {
            link: { by: 'slug' },
          },
        },
        speakers: {
          type: '[Profile]!',
          // Link speakers by slug.
          extensions: {
            link: { by: 'slug' },
          },
        },
        path: {
          type: 'String!',
        },
        // Retrieve resolver from Mdx node and run it.
        body: {
          type: 'String!',
          resolve: async (source, args, context, info) => {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields().body.resolve;
            const result = await resolver(mdxNode, args, context, {
              fieldName: 'body',
            });
            return result;
          },
        },
      },
      interfaces: ['Node'],
    })
  );
};
