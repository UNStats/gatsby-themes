import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { node } from 'prop-types';
import {
  smallAvatarProfileMap,
  mediumAvatarProfileMap,
  largeAvatarProfileMap,
} from '../fragments/ProfilePreview';

const { Provider, Consumer } = React.createContext();

const ProfilesProvider = ({ children }) => {
  const {
    allMdx: { nodes: profiles },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fields: { type: { eq: "profile" } } }
        sort: {
          order: ASC
          fields: [frontmatter___lastName, frontmatter___firstName]
        }
      ) {
        nodes {
          ...ProfilePreview
        }
      }
    }
  `);
  return (
    <Provider
      value={{
        profilesWithSmallAvatar: profiles.map(smallAvatarProfileMap),
        profilesWithMediumAvatar: profiles.map(mediumAvatarProfileMap),
        profilesWithLargeAvatar: profiles.map(largeAvatarProfileMap),
      }}
    >
      {children}
    </Provider>
  );
};

ProfilesProvider.propTypes = {
  children: node.isRequired,
};

export { ProfilesProvider, Consumer as ProfilesConsumer };
