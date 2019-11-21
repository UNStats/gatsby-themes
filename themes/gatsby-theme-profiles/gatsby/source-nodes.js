module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Derive Profile nodes from Mdx nodes.
  // There are 2 types of fields:
  // 1: fields whose values exists on the Mdx node
  // 2: fields that only return values after using a resolver to compute a value
  // See https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  createTypes(
    schema.buildObjectType({
      name: 'Profile',
      fields: {
        id: { type: 'ID!' },
        // Slug is used as alternative ID to match profiles.
        slug: { type: 'ID!' },
        // Type is used to distinguish different profile collections.
        type: {
          type: 'String!',
        },
        avatar: {
          type: 'File!',
          extensions: {
            fileByRelativePath: {},
          },
        },
        firstName: {
          type: 'String!',
        },
        lastName: {
          type: 'String!',
        },
        name: {
          type: 'String!',
        },
        honorific: {
          type: 'String',
        },
        jobtitle: {
          type: 'String',
        },
        organization: {
          type: 'String',
        },
        description: {
          type: 'String',
        },
        roles: {
          type: '[String!]',
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
