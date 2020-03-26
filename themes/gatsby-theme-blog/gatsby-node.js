const fs = require('fs');
const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const strip = require('strip-markdown');

const withDefaults = require('./utils/default-options');
const urlResolve = require('./utils/url-resolve');

// Ensure that content directories exist.
// contentPath and assetPath are relative to the root of the project to which this theme has been added as dependency.
module.exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath, assetPath } = withDefaults(themeOptions);
  const dirs = [assetPath, contentPath];
  dirs.forEach((dir) => {
    if (fs.existsSync(dir)) return;
    reporter.info(`Creating directory ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  });
};

module.exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    // PostDescription (derived from first paragraph/frontmatter.description of Mdx node).
    schema.buildObjectType({
      name: 'PostDescription',
      fields: {
        id: { type: 'ID!' },
        childMdx: { type: 'Mdx!' },
        text: { type: 'String!' },
      },
      interfaces: ['Node'],
    }),

    // PostTitle (derived from frontmatter.title of Mdx node).
    schema.buildObjectType({
      name: 'PostTitle',
      fields: {
        id: { type: 'ID!' },
        childMdx: { type: 'Mdx!' },
        text: { type: 'String!' },
      },
      interfaces: ['Node'],
    }),

    // Post (derived from Mdx node).
    schema.buildObjectType({
      name: 'Post',
      fields: {
        id: { type: 'ID!' },
        slug: {
          type: 'ID!',
        },
        collection: {
          type: 'String!',
        },
        title: {
          type: 'PostTitle!',
          extensions: {
            link: { by: 'id' },
          },
        },
        authors: {
          type: '[Profile!]',
          extensions: {
            link: { by: 'slug' },
          },
        },
        date: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        description: {
          type: 'PostDescription!',
          extensions: {
            link: { by: 'id' },
          },
        },
        images: {
          type: '[File!]',
          extensions: {
            fileByRelativePath: {},
          },
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
        path: {
          type: 'String!',
        },
      },
      interfaces: ['Node'],
    }),
  ];

  createTypes(typeDefs);
};

module.exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const { basePath, collection } = withDefaults(themeOptions);
  const { createPage } = actions;

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

  // Create individual post pages.
  posts.forEach(({ id, path: href }) => {
    createPage({
      path: href,
      component: require.resolve('./src/templates/post-query.js'),
      context: {
        id,
      },
    });
  });

  // Create posts page.
  createPage({
    path: urlResolve(basePath),
    component: require.resolve('./src/templates/posts-query.js'),
    context: {
      collection,
      lang: 'en',
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
    const { createNode } = actions;

    // Process description.
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

    // Use this ID to link node that processes any Markdown in description.
    const descriptionNodeId = createNodeId(
      `${collection}-description-${description}`
    );

    // Use this ID to link node that processes Markdown in title.
    const titleNodeId = createNodeId(
      `${collection}-title-${node.frontmatter.title}`
    );

    // Process path and slug.
    let slug;
    if (node.frontmatter.slug) {
      slug = node.frontmatter.slug;
    } else {
      // relativePath in corresponding file node is relative to contentPath from corresponding gatsby-source-filesystem config.
      // Therefore, pass in '' for basePath (argument basePath is different from theme option basePath.
      slug = path.basename(createFilePath({ node, getNode, basePath: '' }));
    }
    const href = urlResolve(basePath, slug);
    const post = {
      slug,
      collection,
      // Foreign key reference to PostTitle node.
      title: titleNodeId,
      date: node.frontmatter.date,
      // Author slugs.
      authors: node.frontmatter.authors,
      // Foreign key reference to PostDescription node.
      description: descriptionNodeId,
      images: node.frontmatter.images,
      path: href,
    };
    const postNode = {
      ...post,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${collection}-${slug}`),
      // Make post node aware of MDX node.
      parent: node.id,
      children: [],
      internal: {
        type: 'Post',
        contentDigest: createContentDigest(post),
      },
    };
    createNode(postNode);

    // Create description node that processes Markdown in description.
    // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
    const descriptionNode = {
      id: descriptionNodeId,
      parent: postNode.id,
      children: [],
      internal: {
        type: 'PostDescription',
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
    };
    createNode(descriptionNode);

    // Create title node that processes Markdown in title.
    // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
    const titleNode = {
      id: titleNodeId,
      parent: postNode.id,
      children: [],
      internal: {
        type: 'PostTitle',
        contentDigest: createContentDigest(node.frontmatter.title),
        mediaType: 'text/markdown',
        content: node.frontmatter.title,
      },
      // Strip Markdown.
      text: remark()
        .use(strip)
        .processSync(node.frontmatter.title)
        .contents.trim(),
    };
    createNode(titleNode);
  }
};
