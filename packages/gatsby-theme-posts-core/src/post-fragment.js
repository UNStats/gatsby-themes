import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment PostFragment on Post {
    id
    collection
    title
    date(formatString: "MMM DD, YYYY")
    authors
    images {
      childImageSharp {
        fluid(maxWidth: 1024, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    description {
      body
      text
    }
    body
    path
  }
`;
