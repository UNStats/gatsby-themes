import { graphql } from 'gatsby';

import PostPage from '../components/post-page';

export default PostPage;

// Do not shadow this file: https://github.com/gatsbyjs/gatsby/issues/23729.

// Query description as text only, since it is only needed for SEO.
export const query = graphql`
  query($id: String!) {
    post(id: { eq: $id }) {
      collection
      title {
        text
      }
      date(formatString: "MMM DD, YYYY")
      authors {
        id
        name
        path
        avatar {
          childImageSharp {
            fixed(height: 64, width: 64) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      images {
        childImageSharp {
          fluid(maxWidth: 1024, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      description {
        text
      }
      body
    }
  }
`;
