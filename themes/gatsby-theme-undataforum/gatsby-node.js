exports.onCreateNode = ({ node, getNode, actions }) => {
  // Add slug and path to blog post nodes.
  if (node.internal.type === 'Mdx') {
    const { relativePath } = getNode(node.parent);
    if (relativePath.startsWith('posts')) {
      const { createNodeField } = actions;

      createNodeField({
        node,
        name: 'type',
        value: 'post',
      });

      // Derive slug from relative path: posts/slug/index.md => slug.
      // Match result: ["posts/slug/", "slug"]
      const slug = /.*\/(.*)\//.exec(relativePath)[1];

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
    }
  }
};

// Create blog pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const posts = await graphql(`
    query {
      allMdx(filter: { fields: { type: { eq: "post" } } }) {
        edges {
          node {
            fields {
              path
              slug
            }
          }
        }
      }
    }
  `);
  posts.data.allMdx.edges.forEach(({ node: { fields: { path, slug } } }) => {
    createPage({
      path,
      component: require.resolve('./src/layouts/Post.jsx'),
      context: {
        slug,
      },
    });
  });
};
