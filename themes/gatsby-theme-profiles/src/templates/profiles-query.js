import { graphql } from 'gatsby';

import ProfilesPage from '../components/profiles-page';

export default ProfilesPage;

export const query = graphql`
  query($collection: String!) {
    allProfile(
      sort: { fields: [lastName, firstName], order: ASC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        id
        avatar {
          childImageSharp {
            fixed(height: 128, width: 128) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        honorific
        name
        jobtitle
        organization
        path
      }
    }
  }
`;
