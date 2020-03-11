import { graphql } from 'gatsby';

import PostPage from '../components/post-page';

export default PostPage;

export const query = graphql`
  query($id: String!) {
    post(id: { eq: $id }) {
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
        childMdx {
          body
        }
        text
      }
      body
    }
  }
`;
