import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { GridList, ProfilePreview } from '@undataforum/components';

const ProfileList = ({ profiles, ...props }) => (
  <GridList
    {...props}
    align="center"
    gridGap={3}
    gridTemplateColumns="repeat(auto-fit, 256px)"
    render={({ id, ...profile }) => (
      <ProfilePreview profile={profile} key={id} />
    )}
    values={profiles}
    mb={3}
  />
);

// Unlike profileType in @undataforum/components, id is required and is used as key in the list.
export const profileType = shape({
  id: string.isRequired,
  avatar: func.isRequired,
  title: string,
  name: string,
  jobtitle: string,
  organization: string,
  href: string,
});

ProfileList.propTypes = {
  profiles: arrayOf(profileType).isRequired,
};

export default ProfileList;
