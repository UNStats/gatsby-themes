const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const strip = require('strip-markdown');

const defaultOptions = require('../defaultOptions');

module.exports = (
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

  const { createNode } = actions;

  // Process files in `contentPath` location only.
  if (source === contentPath) {
    // Process description.
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

    // Use this ID to link node that processes Markdown in title.
    const titleNodeId = createNodeId(`${type}-title-${node.frontmatter.title}`);

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
      // Foreign key reference to node that will be created further down.
      title___NODE: titleNodeId,
      date: node.frontmatter.date,
      // Contains author slugs.
      authors: node.frontmatter.authors,
      images: node.frontmatter.images,
      // Foreign key reference to node that will be created further down.
      description___NODE: descriptionNodeId,
      path,
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

    // Create description node that processes Markdown in description.
    // https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
    const descriptionNode = {
      id: descriptionNodeId,
      parent: postNode.id,
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
      parent: postNode.id,
      children: [],
      internal: {
        type: `${type}Title`,
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
