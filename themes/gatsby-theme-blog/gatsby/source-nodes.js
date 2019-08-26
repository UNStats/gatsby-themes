module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Derive Post nodes from Mdx nodes.
  // There are 2 types of fields:
  // 1: fields whose values exists on the Mdx node
  // 2: fields that only return values after using a resolver to compute a value
  // See https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  createTypes(
    schema.buildObjectType({
      name: 'Post',
      fields: {
        id: { type: 'ID!' },
        // Slug can be used as alternative ID.
        slug: {
          type: 'ID!',
        },
        // Type is used to distinguish different post collections.
        type: {
          type: 'String!',
        },
        date: {
          type: 'Date!',
          // Enable date formatting in GraphQL queries.
          extensions: {
            dateformat: {},
          },
        },
        authors: {
          type: '[Profile]!',
          // Link profiles by slug.
          extensions: {
            link: { by: 'slug' },
          },
        },
        images: {
          type: '[File]',
          extensions: {
            fileByRelativePath: {},
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
