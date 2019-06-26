module.exports = {
  onCreateNode: ({ node, getNode, actions }) => {
    // Add slug and path to blog post nodes.
    if (node.internal.type !== 'Mdx') {
      return;
    }
    if (node.internal.type === 'Mdx') {
      const { relativePath } = getNode(node.parent);
      if (relativePath.startsWith('posts')) {
        const { createNodeField } = actions;

        // Mark node as blog post.
        createNodeField({
          node,
          name: 'type',
          value: 'post',
        });

        // Derive slug from relative path: posts/slug/index.md => slug.
        // Match result: ["posts/slug/", "slug"].
        // Optional: overwrite slug in frontmatter.
        const slug =
          node.frontmatter.slug || /.*\/(.*)\//.exec(relativePath)[1];

        // Type and slug combo identifies content in layout queries for programmatic page generation.
        createNodeField({
          node,
          name: 'slug',
          value: slug,
        });

        createNodeField({
          node,
          name: 'path',
          value: `/blog/${slug}`,
        });

        // If no lead is provided derive it from rawBody.
        const lead =
          node.frontmatter.lead || node.rawBody.match(/\n\n(.+)\n\n/)[1];

        createNodeField({
          node,
          name: 'lead',
          value: lead,
        });
      } else if (relativePath.startsWith('profiles')) {
        const { createNodeField } = actions;

        createNodeField({
          node,
          name: 'type',
          value: 'profile',
        });

        // Derive slug from relative path: profiles/slug/profile.md => slug.
        // Match result: ["profiles/slug/", "slug"].
        // Optional: overwrite slug in frontmatter.
        const slug =
          node.frontmatter.slug || /.*\/(.*)\//.exec(relativePath)[1];

        createNodeField({
          node,
          name: 'slug',
          value: slug,
        });

        createNodeField({
          node,
          name: 'path',
          value: `/profiles/${slug}`,
        });

        createNodeField({
          node,
          name: 'avatar',
          value: `${slug}.png`,
        });
      }
    }
  },

  createPages: async ({ graphql, actions }) => {
    const { createPage } = actions;

    // Create posts.
    const posts = await graphql(`
      query {
        allMdx(filter: { fields: { type: { eq: "post" } } }) {
          nodes {
            fields {
              path
              slug
            }
          }
        }
      }
    `);

    posts.data.allMdx.nodes.forEach(({ fields: { path, slug } }) => {
      createPage({
        path,
        component: require.resolve('./src/templates/Post.js'),
        context: {
          slug,
        },
      });
    });

    // Create profiles.
    const profiles = await graphql(`
      query {
        allMdx(filter: { fields: { type: { eq: "profile" } } }) {
          nodes {
            fields {
              path
              slug
            }
          }
        }
      }
    `);

    profiles.data.allMdx.nodes.forEach(({ fields: { path, slug } }) => {
      createPage({
        path,
        component: require.resolve('./src/templates/Profile.js'),
        context: {
          slug,
        },
      });
    });
  },
};
