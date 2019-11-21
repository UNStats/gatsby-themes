const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const strip = require('strip-markdown');

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

  // Process profiles from specific source only.
  if (name === type) {
    const { createNode, createParentChildLink } = actions;

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
        // Strip Markdown.
        description = remark()
          .use(strip)
          .processSync(match[1])
          .contents.trim();
      }
    }

    // Process path and slug.
    let path;
    if (node.frontmatter.slug) {
      path = `/${node.frontmatter.slug}/`;
    } else {
      // relativePath in corresponding file node is relative to contentPath from corresponding gatsby-source-filesystem config.
      // Therefore, pass in '' for basePath (argument basePath is different from theme option basePath.
      path = createFilePath({ node, getNode, basePath: '' });
    }
    // We need slug to create a reproducible ID for foreign key linking.
    const slug = path.slice(1, -1);
    // Add theme's basePath.
    path = `${basePath}${path}`;
    const profile = {
      slug,
      type,
      // frontmatter.avatar contains relative path.
      // Type definition links relative path to corresponding File node.
      avatar: node.frontmatter.avatar,
      firstName: node.frontmatter.firstName,
      lastName: node.frontmatter.lastName,
      name: `${node.frontmatter.firstName} ${node.frontmatter.lastName}`,
      honorific: node.frontmatter.honorific,
      jobtitle: node.frontmatter.jobtitle,
      organization: node.frontmatter.organization,
      roles: node.frontmatter.roles,
      path,
      description,
    };
    const profileNode = {
      ...profile,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${type}-${slug}`),
      // Make profile node aware of MDX node.
      parent: node.id,
      children: [],
      internal: {
        type: 'Profile',
        contentDigest: createContentDigest(profile),
      },
    };
    createNode(profileNode);
    // Make MDX node aware of derived profile node.
    createParentChildLink({ parent: node, child: profileNode });
  }
};
