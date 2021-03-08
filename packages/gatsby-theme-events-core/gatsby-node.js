const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
  slugify,
} = require('@maiertech/gatsby-helpers');
const remark = require('remark');
const strip = require('strip-markdown');
const { DateTime } = require('luxon');

const withDefaults = require('./theme-options');

// createPath and ensurePathExists from @maiertech/gatsby-helpers use fs and path from the Node API.
// They cannot be run in the browser without a polyfill.
/* istanbul ignore next */
module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve('path-browserify'),
      },
      fallback: { fs: false },
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
    interface EventDescription implements Node {
      id: ID!
      body: String!
      text: String!
    }

    type MdxEventDescription implements Node & EventDescription {
      id: ID!
      body: String!
      text: String!
    }

    interface Event implements Node {
      id: ID!
      collection: String!
      title: String!
      startDate: Date! @dateformat
      endDate: Date! @dateformat
      moderators: [String!]
      speakers: [String!]
      location: String!
      description: EventDescription!
      registrationLink: String
      attachments: [File!]
      tags: [String!]
      body: String!
      path: String!
    }

    type MdxEvent implements Node & Event {
      id: ID!
      collection: String!
      title: String!
      startDate: Date! @dateformat
      endDate: Date! @dateformat
      moderators: [String!]
      speakers: [String!]
      location: String!
      description: EventDescription! @link
      registrationLink: String
      attachments: [File!] @fileByRelativePath
      tags: [String!]
      body: String!
      path: String!
    }
  `);
};

// Create resolvers for `body` on MdxEvent and MdxEventDescripion.
/* istanbul ignore next */
module.exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MdxEvent: { body: { resolve: mdxResolverPassthrough('body') } },
    MdxEventDescription: {
      body: {
        // gatsby-plugin-mdx adds `Mdx` node as child of `MdxEventDescription` node (parent node for which Markdown is processed).
        // `body` on `MdxEventDescription` node needs to be resolved with `body` from child `Mdx` node.
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
  if (name !== collection) return;

  // Process description.
  // The goal is to create an MdxEventDescription node that implements EventDescription.
  // The MdxEventDescription node processes Markdown and makes processed Markdown availalbe via `body` field.
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

  // Use this ID to link from MdxEvent node to MdxEventDescription node.
  const descriptionNodeId = createNodeId(
    `${collection}-description-${description}`
  );

  const slug = node.frontmatter.slug || slugify(node.frontmatter.title);

  // Process start date.
  // Interpret date in timezone and then convert to UTC.
  const startDate = DateTime.fromISO(node.frontmatter.date, {
    zone: node.frontmatter.timezone,
  })
    .toUTC()
    .toString();

  // Process end date.
  // Interpret date in timezone and then convert to UTC.
  const endDate = DateTime.fromISO(node.frontmatter.endDate, {
    zone: node.frontmatter.timezone,
  })
    .toUTC()
    .toString();

  const eventData = {
    // Spreading frontmatter makes it possible to add fields to frontmatter and use then in query.
    ...node.frontmatter,
    collection,
    startDate,
    endDate,
    // Foreign key reference to EventDescription node.
    description: descriptionNodeId,
    path: createPath(basePath, collection, slug),
    // We do not want slug to show up in node.
    slug: undefined,
  };

  // You can explicitly override ID in frontmatter.
  const eventNodeId =
    node.frontmatter.id || createNodeId(`${collection}-${slug}`);

  actions.createNode({
    ...eventData,
    // Generated ID is namespaced to plugin.name.
    id: eventNodeId,
    // Make MdxEvent node aware of Mdx node.
    parent: node.id,
    children: [],
    internal: {
      type: 'MdxEvent',
      contentDigest: createContentDigest(eventData),
    },
  });

  // Create description node that can processes a Markdown description.
  // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
  // mediaType text/markdown on non-File nodes triggers processing with gatsby-plugin-mdx.
  // This results in childMdx being added to this node.
  actions.createNode({
    id: descriptionNodeId,
    parent: eventNodeId,
    children: [],
    internal: {
      type: 'MdxEventDescription',
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

  // Add collection to Mdx node.
  actions.createNodeField({
    node,
    name: 'collection',
    value: collection,
  });

  // Add path to Mdx node.
  actions.createNodeField({
    node,
    name: 'path',
    value: eventData.path,
  });
};

module.exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const options = withDefaults(themeOptions);
  const { basePath, collection } = options;

  const {
    data: {
      allEvent: { nodes: events },
    },
  } = await graphql(
    `
      query($collection: String!) {
        allEvent(filter: { collection: { eq: $collection } }) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { collection }
  );

  // Create events page.
  actions.createPage({
    path: createPath(basePath, collection),
    component: require.resolve('./src/templates/events-query.js'),
    context: {
      collection,
      // i18n is hard wired at the moment.
      lang: 'en',
      themeOptions: options,
    },
  });

  // Create individual event pages.
  events.forEach(({ id, path }) => {
    actions.createPage({
      path,
      component: require.resolve('./src/templates/event-query.js'),
      context: {
        id,
        // i18n is hard wired at the moment.
        lang: 'en',
        themeOptions: options,
      },
    });
  });
};
