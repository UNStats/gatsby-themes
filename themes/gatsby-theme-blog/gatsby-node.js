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

module.exports.sourceNodes = ({ actions, schema }) => {
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
        title: {
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
    type = defaultOptions.type,
  }
) => {
  // Process MDX nodes only.
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Parent fileNode makes `name` option from `gatsby-source-filename` available as `sourceInstanceName`.
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  const { createNode, createParentChildLink } = actions;

  // Process files in `contentPath` location only.
  if (source === contentPath) {
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
    const slug = path.slice(1, -1);
    // Add theme's basePath.
    path = `${basePath}${path}`;
    const post = {
      slug,
      type,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      // Contains author slugs.
      authors: node.frontmatter.authors,
      path,
      description,
    };
    const postNode = {
      ...post,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${type}-${slug}`),
      // Make post node aware of MDX node.
      parent: node.id,
      children: [],
      internal: {
        type: 'Post',
        contentDigest: createContentDigest(post),
      },
    };
    createNode(postNode);
    // Make MDX node aware of derived post node.
    createParentChildLink({ parent: node, child: postNode });
  }
};

module.exports.createPages = async (
  { graphql, actions },
  {
    basePath = defaultOptions.basePath,
    title = defaultOptions.title,
    description,
    type = defaultOptions.type,
    alwaysRenderHeader = defaultOptions.alwaysRenderHeader,
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
      component: require.resolve('./src/templates/post.js'),
      context: {
        id,
      },
    });
  });

  // Create posts page.
  createPage({
    path: `${basePath}/`,
    component: require.resolve('./src/templates/posts.js'),
    context: {
      title,
      description,
      type,
      alwaysRenderHeader,
    },
  });
};
