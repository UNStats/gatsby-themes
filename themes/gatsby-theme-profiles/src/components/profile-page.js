import React from 'react';
import { func, shape, string } from 'prop-types';
import { Container } from 'theme-ui';
import { ProfilePreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';

const ProfilePage = ({ profile, description, body, location }) => (
  <Layout location={location} title={profile.name} description={description}>
    <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
      <ProfilePreview profile={profile} mb={4} />
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  </Layout>
);

ProfilePage.propTypes = {
  profile: shape({
    avatar: func.isRequired,
    honorific: string,
    name: string,
    jobtitle: string,
    organization: string,
  }).isRequired,
  description: string,
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfilePage;
