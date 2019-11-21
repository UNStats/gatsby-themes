import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import ProfilePage from '../components/profile-page';

export const normalize = ({
  id,
  avatar: {
    childImageSharp: { fixed },
  },
  honorific,
  name,
  jobtitle,
  organization,
}) => ({
  id,
  avatar() {
    return <Img style={{ borderRadius: '100%' }} alt={name} fixed={fixed} />;
  },
  honorific,
  name,
  jobtitle,
  organization,
});

const Profile = ({ location, data }) => {
  const { description, roles, body, ...profile } = data.profile;
  let badges;
  if (roles) {
    badges = roles.map(role => ({ text: role }));
  }
  return (
    <ProfilePage
      profile={{ ...normalize(profile), badges }}
      description={description}
      body={body}
      location={location}
    />
  );
};

Profile.propTypes = {
  data: shape({ profile: object.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Profile;

export const fragment = graphql`
  fragment Profile on Profile {
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
`;

// Use Profile fragment and add additional required props.
export const query = graphql`
  query($id: String!) {
    profile(id: { eq: $id }) {
      ...Profile
      description
      roles
      body
    }
  }
`;
