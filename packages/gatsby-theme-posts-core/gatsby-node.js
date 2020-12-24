const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
  slugify,
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

/* istanbul ignore next */
module.exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions);
  ensurePathExists(contentPath, reporter);
};

// Not clear yet whether `File` is the right data type for `images`.
// Need to understand more how to retrieve files from a CMS.
/* istanbul ignore next */
module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    interface PostDescription @nodeInterface {
      id: ID!
      body: String!
      text: String!
    }

    type MdxPostDescription implements Node & PostDescription {
      id: ID!
      body: String!
      text: String!
    }

    interface Post @nodeInterface {
      id: ID!
      collection: String!
      title: String!
      date: Date! @dateformat
      authors: [String!]
      description: PostDescription!
      body: String!
      images: [File!]
      path: String!
    }

    type MdxPost implements Node & Post {
      id: ID!
      collection: String!
      title: String!
      date: Date! @dateformat
      authors: [String!]
      description: PostDescription! @link
      body: String!
      images: [File!] @fileByRelativePath
      path: String!
    }
  `);
};

// Create resolvers for `body` on MdxPost and MdxPostDescripion.
/* istanbul ignore next */
module.exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MdxPost: { body: { resolve: mdxResolverPassthrough('body') } },
    MdxPostDescription: {
      body: {
        // gatsby-plugin-mdx adds `Mdx` node as child of `MdxPostDescription` node (parent node for which Markdown is processed).
        // `body` on `MdxPostDescription` node needs to be resolved with `body` from child `Mdx` node.
        resolve: async (source, args, context, info) => {
          const type = info.schema.getType(`Mdx`);
          const mdxNode = context.nodeModel.getNodeById({
            id: source.children[0],
          });
          const resolver = type.getFields().body.resolve;
          // Run resolver for `body` on `Mdx` node.
          // If you do not provide args, context and info, you get a warning.
          const result = await resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
          return result;
        },
      },
    },
  });
};

module.exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  const { basePath, collection } = withDefaults(themeOptions);

  // Process MDX nodes only.
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Parent fileNode makes `name` option from `gatsby-source-filename` available as `sourceInstanceName`.
  const fileNode = getNode(node.parent);
  const name = fileNode.sourceInstanceName;

  // Process files in `contentPath` location only.
  if (name === collection) {
    // Process description.
    // The goal is to create an MdxPostDescription node that implements PostDescription.
    // The MdxPostDescription node processes Markdown and makes processe Markdown availalbe via `body` field.
    let description;
    if (node.frontmatter.description) {
      description = node.frontmatter.description;
    } else {
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
        description = match[0];
      }
    }

    // Use this ID to link from MdxPost node to MdxPostDescription node.
    const descriptionNodeId = createNodeId(
      `${collection}-description-${description}`
    );

    const slug = node.frontmatter.slug || slugify(node.frontmatter.title);

    const postData = {
      // Spreading frontmatter makes it possible to add fields to frontmatter and use then in query.
      ...node.frontmatter,
      collection,
      // Foreign key reference to description node.
      description: descriptionNodeId,
      path: createPath(basePath, collection, slug),
      // We do not want slug to show up in node.
      slug: undefined,
    };

    // You can explicitly override ID in frontmatter.
    const postNodeId =
      node.frontmatter.id || createNodeId(`${collection}-${slug}`);

    actions.createNode({
      ...postData,
      // Generated ID is namespaced to plugin.name.
      id: postNodeId,
      // Make MdxPost node aware of Mdx node.
      parent: node.id,
      children: [],
      internal: {
        type: 'MdxPost',
        contentDigest: createContentDigest(postData),
      },
    });

    // Create description node that can processes a Markdown description.
    // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
    // mediaType text/markdown on non-File nodes triggers processing with gatsby-plugin-mdx.
    // This results in childMdx being added to this node.
    actions.createNode({
      id: descriptionNodeId,
      parent: postNodeId,
      children: [],
      internal: {
        type: 'MdxPostDescription',
        contentDigest: createContentDigest(description),
        mediaType: 'text/markdown',
        content: description,
      },
      // Strip Markdown, line breaks and white space.
      text: remark()
        .use(strip)
        .processSync(description)
        .contents.replace(/\n/g, ' ')
        .trim(),
    });
  }
};

module.exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const options = withDefaults(themeOptions);
  const { basePath, collection } = options;

  const {
    data: {
      allPost: { nodes: posts },
    },
  } = await graphql(
    `
      query($collection: String!) {
        allPost(filter: { collection: { eq: $collection } }) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { collection }
  );

  // Create posts page.
  actions.createPage({
    path: createPath(basePath, collection),
    component: require.resolve('./src/templates/posts-query.js'),
    context: {
      collection,
      // i18n is hard wired at the moment.
      lang: 'en',
      themeOptions: options,
    },
  });

  // Create individual post pages.
  posts.forEach(({ id, path }) => {
    actions.createPage({
      path,
      component: require.resolve('./src/templates/post-query.js'),
      context: {
        id,
        // i18n is hard wired at the moment.
        lang: 'en',
        themeOptions: options,
      },
    });
  });
};
