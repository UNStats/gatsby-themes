import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import ProfilesPage from '../components/profiles-page';

const Profiles = ({ data, pageContext, location }) => {
  const profiles = data.allProfile.nodes.map(profile => {
    const {
      id,
      avatar: {
        childImageSharp: { fixed },
      },
      honorific,
      name,
      path,
    } = profile;
    return {
      id,
      avatar: function avatar() {
        return (
          <Img style={{ borderRadius: '100%' }} alt={name} fixed={fixed} />
        );
      },
      honorific,
      name,
      href: path,
    };
  });
  return (
    <ProfilesPage
      profiles={profiles}
      title={pageContext.title}
      description={pageContext.description}
      location={location}
    />
  );
};

Profiles.propTypes = {
  data: shape({ allProfile: object.isRequired }).isRequired,
  pageContext: shape({ title: string.isRequired, description: string }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Profiles;

export const pageQuery = graphql`
  query($type: String!) {
    allProfile(
      sort: { fields: [lastName, firstName], order: ASC }
      filter: { type: { eq: $type } }
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
        path
      }
    }
  }
`;
