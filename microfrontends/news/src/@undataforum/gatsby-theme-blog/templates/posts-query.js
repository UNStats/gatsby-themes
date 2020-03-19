import { graphql } from 'gatsby';
import PostsPage from '@undataforum/gatsby-theme-blog/src/components/posts-page';

export default PostsPage;

// Shadow this file to remove description from query.
// Shadowing this file triggers a warning about the query not being executed.
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
        path
      }
    }
  }
`;
