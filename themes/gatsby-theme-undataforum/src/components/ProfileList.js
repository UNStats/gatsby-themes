import React from 'react';
import { arrayOf } from 'prop-types';
import { GridList, ProfilePreview } from '@undataforum/components';
import { profileType } from '../types';

const ProfileList = ({ profiles, ...props }) => (
  <GridList
    {...props}
    align="left"
    gridGap={2}
    gridTemplateColumns="repeat(auto-fit, 96px)"
    render={({ id, ...profile }) => (
      <ProfilePreview profile={profile} align="left" fontSize={1} key={id} />
    )}
    values={profiles}
    mb={3}
  />
);

ProfileList.propTypes = {
  profiles: arrayOf(profileType).isRequired,
};

export default ProfileList;
