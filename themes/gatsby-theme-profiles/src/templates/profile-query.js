import { graphql } from 'gatsby';

import ProfilePage from '../components/profile-page';

export default ProfilePage;

export const query = graphql`
  query($id: String!) {
    profile(id: { eq: $id }) {
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
      body
      description
      roles
    }
  }
`;
