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
  const dirs = [contentPath, assetPath];
  dirs.forEach(dir => {
    reporter.info(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

module.exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Derive Profile nodes from Mdx nodes.
  // There are 2 types of fields:
  // 1: fields whose values exists on the Mdx node
  // 2: fields that only return values after using a resolver to compute a value
  // See https://www.christopherbiscardi.com/post/constructing-query-types-in-themes
  createTypes(
    schema.buildObjectType({
      name: 'Profile',
      fields: {
        id: { type: 'ID!' },
        // Slug is used as alternative ID to match profiles.
        slug: { type: 'ID!' },
        // Type is used to distinguish different profile collections.
        collection: {
          type: 'String!',
        },
        avatar: {
          type: 'File!',
          extensions: {
            fileByRelativePath: {},
          },
        },
        firstName: {
          type: 'String!',
        },
        lastName: {
          type: 'String!',
        },
        name: {
          type: 'String!',
        },
        honorific: {
          type: 'String',
        },
        jobtitle: {
          type: 'String',
        },
        organization: {
          type: 'String',
        },
        description: {
          type: 'String',
        },
        roles: {
          type: '[String!]',
        },
        path: {
          type: 'String!',
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
      },
      interfaces: ['Node'],
    })
  );
};

module.exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const { basePath, collection, postCollection } = withDefaults(themeOptions);
  const { createPage } = actions;

  const {
    data: {
      allProfile: { nodes: profiles },
    },
  } = await graphql(
    `
      query($collection: String!) {
        allProfile(filter: { collection: { eq: $collection } }) {
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

  // Create individual profile pages.
  for (const { id, slug, path: href } of profiles) {
    let posts;
    if (postCollection) {
      // Query posts with current profile author.
      ({
        data: {
          allPost: { nodes: posts },
        },
      } = await graphql(
        `
          query($collection: String!, $slug: ID!) {
            allPost(
              filter: {
                authors: { elemMatch: { slug: { eq: $slug } } }
                collection: { eq: $collection }
              }
              sort: { fields: [date, title___text], order: [DESC, ASC] }
            ) {
              nodes {
                id
                title {
                  childMdx {
                    body
                  }
                  text
                }
                authors {
                  id
                  name
                }
                date(formatString: "MMM DD, YYYY")
                path
              }
            }
          }
        `,
        { collection: postCollection, slug }
      ));
    }
    createPage({
      path: href,
      component: require.resolve('./src/templates/profile-query'),
      context: {
        id,
        lang: 'en',
        posts,
      },
    });
  }

  // Create profiles page.
  createPage({
    path: urlResolve(basePath),
    component: require.resolve('./src/templates/profiles-query'),
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

  // Process profiles from specific collection only.
  if (name === collection) {
    const { createNode, createParentChildLink } = actions;

    // Process description.
    // For profiles description is used only for SEO and never in previews.
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
        // Strip Markdown, line breaks and white space.
        description = remark()
          .use(strip)
          .processSync(match[0])
          .contents.replace(/\n/g, ' ')
          .trim();
      }
    }

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
    const profile = {
      slug,
      collection,
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
      path: href,
      description,
    };
    const profileNode = {
      ...profile,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${collection}-${slug}`),
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
