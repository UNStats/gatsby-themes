import React from 'react';
import { func, shape, string } from 'prop-types';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { Container, ProfilePreview } from '@undataforum/components';
import { Layout, Seo } from '@undataforum/gatsby-theme-layout';

// TODO populate description for SEO
const ProfilePage = ({ profile, body, location }) => (
  <Layout location={location}>
    <Seo title={profile.name} />
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
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfilePage;
