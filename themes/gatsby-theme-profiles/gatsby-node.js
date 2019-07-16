const fs = require('fs');
const crypto = require('crypto');
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
    reporter.info(`creating the ${dir} directory`);
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

module.exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions;
  createTypes(
    schema.buildObjectType({
      name: 'Profile',
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
        rank: {
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
  { node, actions, getNode, createNodeId },
  {
    basePath = defaultOptions.basePath,
    contentPath = defaultOptions.contentPath,
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
    const fieldData = {
      firstName: node.frontmatter.firstName,
      lastName: node.frontmatter.lastName,
      rank: node.frontmatter.rank,
      jobtitle: node.frontmatter.jobtitle,
      organization: node.frontmatter.organization,
      slug,
      path: `${basePath}${slug}`,
    };
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Profile`),
      parent: node.id,
      children: [],
      internal: {
        type: 'Profile',
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(fieldData))
          .digest('hex'),
        content: JSON.stringify(fieldData),
        description: 'Profiles',
      },
    });
    createParentChildLink({ parent: fileNode, child: node });
  }
};
