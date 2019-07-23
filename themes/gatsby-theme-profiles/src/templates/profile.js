import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import ProfilePage from '../components/profile-page';

const ProfileTemplate = ({ location, data }) => {
  const {
    id,
    avatar: {
      childImageSharp: { fixed },
    },
    honorificTitle,
    name,
    jobtitle,
    organization,
    path,
    body,
  } = data.profile;
  const profile = {
    id,
    avatar: function avatar() {
      return <Img style={{ borderRadius: '100%' }} alt={name} fixed={fixed} />;
    },
    title: honorificTitle,
    name,
    jobtitle,
    organization,
    href: path,
  };

  return <ProfilePage profile={profile} body={body} location={location} />;
};

ProfileTemplate.propTypes = {
  data: shape({ profile: object.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfileTemplate;

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
      honorificTitle
      name
      jobtitle
      organization
      body
    }
  }
`;
