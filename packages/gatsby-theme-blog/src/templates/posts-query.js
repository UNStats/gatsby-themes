import { graphql } from 'gatsby';

import PostsPage from '../components/posts-page';

export default PostsPage;

// Do not shadow this file: https://github.com/gatsbyjs/gatsby/issues/23729.

// Query description as MDX only, since it may be required for post previews.
export const query = graphql`
  query($collection: String!) {
    allPost(
      sort: { fields: date, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        id
        title {
          text
        }
        authors {
          name
        }
        date(formatString: "MMM DD, YYYY")
        description {
          childMdx {
            body
          }
        }
        path
      }
    }
  }
`;
