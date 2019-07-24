const fs = require('fs');
const { createFilePath } = require('gatsby-source-filesystem');
const defaultOptions = require('./index');

module.exports.onPreBootstrap = (
  { reporter },
  {
    assetPath = defaultOptions.assetPath,
    contentPath = defaultOptions.contentPath,
  }
) => {
  const dirs = [assetPath, contentPath];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`Creating directory ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  });
};

module.exports.sourceNodes = (
  { actions, schema },
  { typeName = defaultOptions.typeName }
) => {
  const { createTypes } = actions;

  // Derive Profile nodes from Mdx nodes.
  // There are 2 types of fields:
  // 1: fields whose values exists on the Mdx node
  // 2: fields that only return values after using a resolver to compute a value
  // See https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  createTypes(
    schema.buildObjectType({
      name: typeName,
      fields: {
        id: { type: 'ID!' },
        avatar: {
          type: 'File!',
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
        honorificTitle: {
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

module.exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  {
    basePath = defaultOptions.basePath,
    contentPath = defaultOptions.contentPath,
    typeName = defaultOptions.typeName,
  }
) => {
  const { createNode, createParentChildLink } = actions;

  // Process MDX nodes only.
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Parent fileNode makes `name` option from `gatsby-source-filename` available as `sourceInstanceName`.
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  // Process files in `contentPath` location only.
  if (node.internal.type === `Mdx` && source === contentPath) {
    // Process description.
    let description;
    if (node.frontmatter.description) {
      description = node.frontmatter.description;
    } else {
      const match =
        // Match first paragraph when there are multiple paragraphs
        // or first paragraph when there is only 1 parapgraph.
        node.rawBody.match(/\n\n(.+)\n\n/) || node.rawBody.match(/\n\n(.+)\n/);
      if (match) {
        description = match[1];
      }
    }

    // Process path.
    let path;
    if (node.frontmatter.slug) {
      path = `/${node.frontmatter.slug}/`;
    } else {
      // The `basePath` argument is not the same as theme option `basePath`/
      path = createFilePath({ node, getNode, basePath: contentPath });
    }
    // Add theme's basePath.
    path = `${basePath}${path}`;
    const profile = {
      // Gatsby automatically links `childImageSharpNode`.
      avatar: node.frontmatter.avatar,
      firstName: node.frontmatter.firstName,
      lastName: node.frontmatter.lastName,
      name: `${node.frontmatter.firstName} ${node.frontmatter.lastName}`,
      honorificTitle: node.frontmatter.honorificTitle,
      jobtitle: node.frontmatter.jobtitle,
      organization: node.frontmatter.organization,
      path,
      description,
    };
    const profileNode = {
      ...profile,
      id: createNodeId(`${node.id} >>> Profile`),
      // Make profile node aware of MDX node.
      parent: node.id,
      children: [],
      internal: {
        type: typeName,
        contentDigest: createContentDigest(profile),
      },
    };
    createNode(profileNode);
    // Make MDX node aware of derived profile node.
    createParentChildLink({ parent: node, child: profileNode });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: {
      allProfile: { nodes: profiles },
    },
  } = await graphql(`
    query {
      allProfile(sort: { fields: [lastName, firstName] }) {
        nodes {
          id
          path
        }
      }
    }
  `);

  profiles.forEach(({ id, path }) => {
    createPage({
      path,
      component: require.resolve('./src/templates/profile.js'),
      context: {
        id,
      },
    });
  });
};
