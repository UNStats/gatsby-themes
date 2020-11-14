import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment ProfileFragment on Profile {
    id
    collection
    avatar {
      childImageSharp {
        large: fixed(height: 128, width: 128) {
          ...GatsbyImageSharpFixed_withWebp
        }
        small: fixed(height: 64, width: 64) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    honorific
    name
    jobtitle
    organization
    description
    body
    roles
    path
  }
`;
