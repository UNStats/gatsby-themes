import React from 'react';
import { arrayOf, bool } from 'prop-types';
import { GridList, ProfilePreview } from '@undataforum/components';
import { profileType } from '../types';

const Profiles = ({ profiles, linkProfiles = false }) => {
  const processProfiles = () => {
    if (!linkProfiles) {
      // eslint-disable-next-line no-unused-vars
      return profiles.map(({ href, ...profile }) => ({ ...profile }));
    }
    return profiles;
  };
  return (
    <GridList
      align="left"
      gridGap={2}
      gridTemplateColumns="repeat(auto-fit, 96px)"
      render={({ id, ...profile }) => (
        <ProfilePreview profile={profile} align="left" fontSize={1} key={id} />
      )}
      values={processProfiles()}
      mb={3}
    />
  );
};

Profiles.propTypes = {
  profiles: arrayOf(profileType).isRequired,
  linkProfiles: bool,
};

export default Profiles;
