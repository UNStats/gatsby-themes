import React from 'react';
import { func, shape, string } from 'prop-types';
import { Container, ProfilePreview } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';

const ProfilePage = ({ profile, description, body, location }) => (
  <Layout location={location}>
    <Seo title={profile.name} description={description} />
    <Container maxWidth={7} px={[2, 3, 0]}>
      <ProfilePreview profile={profile} mb={4} />
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  </Layout>
);

ProfilePage.propTypes = {
  profile: shape({
    avatar: func.isRequired,
    title: string,
    name: string,
    jobtitle: string,
    organization: string,
  }).isRequired,
  description: string,
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfilePage;
