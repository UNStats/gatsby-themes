import { graphql } from 'gatsby';

import ProfilePage from '../components/profile-page';

export default ProfilePage;

export const query = graphql`
  query($id: String!) {
    profile(id: { eq: $id }) {
      ...ProfileFragment
    }
  }
`;
