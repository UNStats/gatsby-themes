import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import ProfilePage from '../components/profile-page';

const Profile = ({ location, data }) => {
  const {
    avatar: {
      childImageSharp: { fixed },
    },
    honorific,
    name,
    jobtitle,
    organization,
    description,
    body,
  } = data.profile;
  const profile = {
    avatar() {
      return <Img style={{ borderRadius: '100%' }} alt={name} fixed={fixed} />;
    },
    honorific,
    name,
    jobtitle,
    organization,
  };
  return (
    <ProfilePage
      profile={profile}
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

export const pageQuery = graphql`
  query($id: String!) {
    profile(id: { eq: $id }) {
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
      description
      body
    }
  }
`;
