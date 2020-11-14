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
        ...ProfileFragment
      }
    }
  }
`;
