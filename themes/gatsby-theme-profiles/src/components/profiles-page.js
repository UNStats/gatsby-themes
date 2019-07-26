import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Container } from '@undataforum/components';
import { H1, Layout, Seo } from '@undataforum/gatsby-theme-base';
import ProfileList, { profileType } from './profile-list';

const ProfilesPage = ({ profiles, title, description, location }) => (
  <Layout location={location}>
    <Seo title={title} description={description} />
    <Container maxWidth={8} px={[2, 3, 0]}>
      <H1>{title}</H1>
      <ProfileList profiles={profiles} mb={4} />
    </Container>
  </Layout>
);

ProfilesPage.propTypes = {
  profiles: arrayOf(profileType),
  title: string.isRequired,
  description: string,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfilesPage;
