import { graphql } from 'gatsby';

import PostsPage from '../components/posts-page';

export default PostsPage;

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
