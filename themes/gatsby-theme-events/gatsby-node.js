const fs = require('fs');
const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const strip = require('strip-markdown');
const { DateTime } = require('luxon');

const urlResolve = require('./utils/url-resolve');
const withDefaults = require('./utils/default-options');

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
    // EventDescription (derived from frontmatter.description of Mdx node).
    schema.buildObjectType({
      name: 'EventDescription',
      fields: {
        id: { type: 'ID!' },
        childMdx: { type: 'Mdx!' },
        text: { type: 'String!' },
      },
      interfaces: ['Node'],
    }),

    // EventTitle (derived from frontmatter.title of Mdx node).
    schema.buildObjectType({
      name: 'EventTitle',
      fields: {
        id: { type: 'ID!' },
        childMdx: { type: 'Mdx!' },
        text: { type: 'String!' },
      },
      interfaces: ['Node'],
    }),

    // Event (derived from Mdx node).
    schema.buildObjectType({
      name: 'Event',
      fields: {
        id: { type: 'ID!' },
        slug: {
          type: 'ID!',
        },
        collection: {
          type: 'String!',
        },
        title: {
          type: 'EventTitle!',
          extensions: {
            link: { by: 'id' },
          },
        },
        startDate: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        endDate: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        displayDate: {
          type: 'String!',
        },
        duration: {
          type: 'String!',
        },
        moderators: {
          type: '[Profile!]',
          extensions: {
            link: { by: 'slug' },
          },
        },
        speakers: {
          type: '[Profile!]',
          extensions: {
            link: { by: 'slug' },
          },
        },
        description: {
          type: 'EventDescription!',
          extensions: {
            link: { by: 'id' },
          },
        },
        registrationLink: {
          type: 'String',
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
      allEvent: { nodes: events },
    },
  } = await graphql(
    `
      query($collection: String!) {
        allEvent(filter: { collection: { eq: $collection } }) {
          nodes {
            id
            slug
            path
          }
        }
      }
    `,
    { collection }
  );

  // Create individual event pages.
  events.forEach(({ id, slug, path: href }) => {
    createPage({
      path: href,
      component: require.resolve('./src/templates/event-query.js'),
      context: {
        id,
        lang: 'en',
        // Regex to select files whose relative path starts with the slug.
        // By convention attachments are stored in a folder named with the event slug in assetPath.
        regex: `/^${slug}/`,
      },
    });
  });

  // Create events page.
  createPage({
    path: urlResolve(basePath),
    component: require.resolve('./src/templates/events-query.js'),
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

    // Use this ID to link node that processes Markdown in title.
    const titleNodeId = createNodeId(
      `${collection}-title-${node.frontmatter.title}`
    );

    // Use this ID to link node that processes Markdown in description.
    const descriptionNodeId = createNodeId(
      `${collection}-description-${description}`
    );

    // Process path and slug.
    let slug;
    if (node.frontmatter.slug) {
      slug = node.frontmatter.slug;
    } else {
      // relativePath in corresponding file node is relative to contentPath from corresponding gatsby-source-filesystem config.
      // Therefore, pass in '' for basePath (argument basePath is different from theme option basePath).
      slug = path.basename(createFilePath({ node, getNode, basePath: '' }));
    }

    const href = urlResolve(basePath, slug);

    // Process start and end dates.
    const startDate = DateTime.fromISO(node.frontmatter.start, {
      zone: node.frontmatter.timezone,
    });
    const endDate = DateTime.fromISO(node.frontmatter.end, {
      zone: node.frontmatter.timezone,
    });
    const displayDate = startDate.toLocaleString(DateTime.DATETIME_FULL);
    const duration = `${endDate.diff(startDate, 'minutes').minutes} minutes`;

    const event = {
      slug,
      collection,
      // Foreign key reference to EventTitle node.
      title: titleNodeId,
      startDate: startDate.toUTC().toString(),
      endDate: endDate.toUTC().toString(),
      displayDate,
      duration,
      // Moderator slugs.
      moderators: node.frontmatter.moderators,
      // Speaker slugs.
      speakers: node.frontmatter.speakers,
      // Foreign key reference to EventDescription node.
      description: descriptionNodeId,
      registrationLink: node.frontmatter.registrationLink,
      path: href,
    };

    const eventNode = {
      ...event,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${collection}-${slug}`),
      // Make event node aware of MDX node.
      parent: node.id,
      children: [],
      internal: {
        type: 'Event',
        contentDigest: createContentDigest(event),
      },
    };
    createNode(eventNode);

    // Create description node that processes Markdown in description.
    // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
    const descriptionNode = {
      id: descriptionNodeId,
      parent: eventNode.id,
      children: [],
      internal: {
        type: 'EventDescription',
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
      parent: eventNode.id,
      children: [],
      internal: {
        type: 'EventTitle',
        contentDigest: createContentDigest(node.frontmatter.title),
        mediaType: 'text/markdown',
        content: `${node.frontmatter.title}`,
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
