import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { GridList, ProfilePreview } from '@undataforum/components';

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
  profiles: arrayOf(
    shape({
      id: string.isRequired,
      avatar: func.isRequired,
      name: string.isRequired,
      href: string,
    })
  ).isRequired,
};

export default ProfileList;
