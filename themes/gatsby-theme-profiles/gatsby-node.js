const fs = require('fs');
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

const resolveThroughMdx = fieldName => async (source, args, context, info) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

module.exports.sourceNodes = (
  { actions, reporter, schema },
  { typeName = defaultOptions.typeName }
) => {
  const { createTypes } = actions;
  reporter.info(`Adding type ${typeName}`);
  createTypes(
    schema.buildObjectType({
      name: typeName,
      fields: {
        id: { type: 'ID!' },
        avatar: {
          type: 'File!',
          resolve: resolveThroughMdx('avatar'),
        },
        firstName: {
          type: 'String!',
        },
        lastName: {
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
        slug: {
          type: 'String!',
        },
        path: {
          type: 'String!',
        },
        body: {
          type: 'String!',
          resolve: resolveThroughMdx('body'),
        },
      },
      interfaces: ['Node'],
    })
  );
};

module.exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest, reporter },
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
    const slug =
      node.frontmatter.slug || /(.*)\.mdx/.exec(fileNode.relativePath)[1];
    const profile = {
      firstName: node.frontmatter.firstName,
      lastName: node.frontmatter.lastName,
      honorificTitle: node.frontmatter.honorificTitle,
      jobtitle: node.frontmatter.jobtitle,
      organization: node.frontmatter.organization,
      slug,
      path: `${basePath}${slug}`,
    };
    reporter.info(`Creating ${typeName} node from ${node.fileAbsolutePath}`);
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
