const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const strip = require('strip-markdown');
const { DateTime } = require('luxon');

const defaultOptions = require('../defaultOptions');

module.exports = (
  { node, actions, getNode, createNodeId, createContentDigest },
  { basePath = defaultOptions.basePath, type = defaultOptions.type }
) => {
  // Process MDX nodes only.
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Parent fileNode makes `name` option from `gatsby-source-filename` available as `sourceInstanceName`.
  const fileNode = getNode(node.parent);
  const name = fileNode.sourceInstanceName;

  // Process events from specific source only.
  if (name === type) {
    const { createNode } = actions;

    let description;
    if (node.frontmatter.description) {
      description = node.frontmatter.description;
    } else {
      const match =
        // Match first para when there is import statement, then first para when there is no import statement.
        node.rawBody.match(/;\n\n(.+)/) || node.rawBody.match(/\n\n(.+)/);
      if (match) {
        description = match[1];
      }
    }

    // Use this ID to link node that processes any Markdown in description.
    const descriptionNodeId = createNodeId(
      `${type}-description-${description}`
    );

    // Use this ID to link node that processes Markdown in frontmatter title.
    const titleNodeId = createNodeId(`${type}-title-${node.frontmatter.title}`);

    // Process path and slug.
    let path;
    if (node.frontmatter.slug) {
      path = `/${node.frontmatter.slug}/`;
    } else {
      // relativePath in corresponding file node is relative to contentPath from corresponding gatsby-source-filesystem config.
      // Therefore, pass in '' for basePath (argument basePath is different from theme option basePath.
      path = createFilePath({ node, getNode, basePath: '' });
    }
    const slug = path.slice(1, -1);
    // Add theme's basePath.
    path = `${basePath}${path}`;

    // Process start and end.
    const startDate = DateTime.fromISO(node.frontmatter.start, {
      zone: node.frontmatter.zone,
    });
    const endDate = DateTime.fromISO(node.frontmatter.end, {
      zone: node.frontmatter.zone,
    });
    const displayDate = startDate.toLocaleString(DateTime.DATETIME_FULL);
    const duration = `${endDate.diff(startDate, 'minutes').minutes} minutes`;

    // Registration link.
    const registration = node.frontmatter.registration;

    const event = {
      slug,
      type,
      displayType: node.frontmatter.type,
      // Foreign key reference to node that will be created further down.
      title___NODE: titleNodeId,
      startDate,
      endDate,
      displayDate,
      duration,
      // Contains moderator slugs.
      moderators: node.frontmatter.moderators,
      // Contains speaker slugs.
      speakers: node.frontmatter.speakers,
      // Foreign key reference to node that will be created further down.
      description___NODE: descriptionNodeId,
      registration,
      path,
    };
    const eventNode = {
      ...event,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${type}-${slug}`),
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
        type: `${type}Description`,
        contentDigest: createContentDigest(description),
        mediaType: 'text/markdown',
        content: description,
      },
      // Strip Markdown.
      text: remark()
        .use(strip)
        .processSync(description)
        .contents.trim(),
    };
    createNode(descriptionNode);

    // Create title node that processes Markdown in title.
    // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
    const titleNode = {
      id: titleNodeId,
      parent: eventNode.id,
      children: [],
      internal: {
        type: `${type}Title`,
        contentDigest: createContentDigest(node.frontmatter.title),
        mediaType: 'text/markdown',
        // Workaround to process any Markdown in title, such as quotes and dashes.
        // Without adding # the result would be wrapped in <p> which cannot be nested inside a heading.
        content: `# ${node.frontmatter.title}`,
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
