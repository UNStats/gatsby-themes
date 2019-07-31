import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { Container, GridList, ProfilePreview } from '@undataforum/components';
import { H1, Layout, Seo } from '@undataforum/gatsby-theme-base';

const ProfilesPage = ({ profiles, title, description, location }) => (
  <Layout location={location}>
    <Seo title={title} description={description} />
    <Container maxWidth={8} px={[2, 3, 0]}>
      <H1>{title}</H1>
      <GridList
        align="center"
        gridGap={3}
        gridTemplateColumns="repeat(auto-fit, 256px)"
        render={({ id, ...profile }) => (
          <ProfilePreview profile={profile} key={id} />
        )}
        values={profiles}
        mb={4}
      />
    </Container>
  </Layout>
);

ProfilesPage.propTypes = {
  profiles: arrayOf(
    shape({
      id: string.isRequired,
      avatar: func.isRequired,
      title: string,
      name: string,
      jobtitle: string,
      organization: string,
      href: string,
    })
  ),
  title: string.isRequired,
  description: string,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfilesPage;
