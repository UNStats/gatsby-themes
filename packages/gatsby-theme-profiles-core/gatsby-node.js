const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
} = require('@maiertech/gatsby-helpers');
const remark = require('remark');
const strip = require('strip-markdown');

const withDefaults = require('./theme-options');

// This Webpack config helps prevent this error: https://github.com/gatsbyjs/gatsby/issues/24815.
// It is caused when using @maiertech/gatsby-helpers inside use-profiles.js.
// See https://www.gatsbyjs.com/docs/troubleshooting-common-errors/#issues-with-fs-resolution.
/* istanbul ignore next */
module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
  });
};

module.exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions);
  ensurePathExists(contentPath, reporter);
};

/* istanbul ignore next */
module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    interface Profile @nodeInterface {
      id: ID!
      collection: String!
      avatar: File! @fileByRelativePath
      firstName: String!
      lastName: String!
      name: String!
      honorific: String
      jobtitle: String
      organization: String
      description: String
      roles: [String!]
      body: String!
      path: String!
    }
    type MdxProfile implements Node & Profile {
      id: ID!
      collection: String!
      avatar: File! @fileByRelativePath
      firstName: String!
      lastName: String!
      name: String!
      honorific: String
      jobtitle: String
      organization: String
      description: String
      roles: [String!]
      body: String!
      path: String!
    }
  `);
};

/* istanbul ignore next */
module.exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MdxProfile: { body: { resolve: mdxResolverPassthrough('body') } },
  });
};

module.exports.onCreateNode = (
  { actions, node, getNode, createContentDigest },
  themeOptions
) => {
  const { basePath, collection } = withDefaults(themeOptions);

  // Process MDX nodes only.
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Parent (file node) makes `name` option from `gatsby-source-filesystem` available as `sourceInstanceName`.
  // Process nodes from same collection only.
  const parent = getNode(node.parent);
  if (parent.sourceInstanceName !== collection) {
    return;
  }

  const nodeData = {
    collection,
    ...node.frontmatter,
    name: `${node.frontmatter.firstName} ${node.frontmatter.lastName}`,
  };

  // The description is derived from the first paragraph of the MDX file if it is not provided in the frontmatter.
  // For profiles, the description is used only for SEO and never in profile previews.
  if (!node.frontmatter.description) {
    // Four scenarios for which we need to match first paragraph:
    // - multiple paras with import statement
    // - multiple paras without import statement
    // - one para with import statement
    // - one para without import statement
    // Regex:
    // - match subsequent non-empty lines (but not lines starting with "import")
    // - lookbehind and there should be two line feeds (\n)
    const match = node.rawBody.match(/(?<=\n{2})((?!import).+\n)+/);
    if (match) {
      // Strip Markdown, line breaks and white space.
      nodeData.description = remark()
        .use(strip)
        .processSync(match[0])
        .contents.replace(/\n/g, ' ')
        .trim();
    }
  }

  nodeData.path = createPath(basePath, collection, node.frontmatter.slug);

  const nodeType = 'MdxProfile';

  actions.createNode({
    // Generated ID is namespaced to plugin.name.
    id: node.frontmatter.slug,
    // Make profile node aware of MDX node.
    parent: node.id,
    ...nodeData,
    children: [],
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(node.internal.contentDigest),
    },
  });
};

module.exports.createPages = async (
  { actions, graphql, reporter },
  themeOptions
) => {
  const options = withDefaults(themeOptions);
  const { basePath, collection } = options;

  const result = await graphql(
    `
      query($collection: String!) {
        allProfile(filter: { collection: { eq: $collection } }) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { collection }
  );

  if (result.errors) {
    reporter.error('There was an error fetching profiles.', result.errors);
    return;
  }

  // Create profiles page.
  actions.createPage({
    path: createPath(basePath, collection),
    component: require.resolve('./src/templates/profiles-query'),
    context: {
      collection,
      // i18n is hard wired at the moment.
      lang: 'en',
      themeOptions: options,
    },
  });

  const profiles = result.data.allProfile.nodes;

  // Create individual profile pages.
  profiles.forEach(({ id, path }) => {
    actions.createPage({
      path,
      component: require.resolve('./src/templates/profile-query'),
      context: {
        id,
        // i18n is hard wired at the moment.
        lang: 'en',
        themeOptions: options,
      },
    });
  });
};
