import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';

import ProfilesPage from '../components/profiles-page';

import { normalize } from './profile';

const Profiles = ({ data, pageContext, location }) => {
  // Normalize profiles and add href.
  const profiles = data.allProfile.nodes.map(({ path: href, ...profile }) => ({
    ...normalize(profile),
    href,
  }));
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

// Query all profiles of specific type and sort them by name.
// Query default props with fragment and additional path prop.
export const query = graphql`
  query($type: String!) {
    allProfile(
      sort: { fields: [lastName, firstName], order: ASC }
      filter: { type: { eq: $type } }
    ) {
      nodes {
        ...Profile
        path
      }
    }
  }
`;
