import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { Container, GridList, ProfilePreview } from '@undataforum/components';
import { Layout, Styled } from '@undataforum/gatsby-theme-base';

const ProfilesPage = ({ profiles, title, description, location }) => (
  <Layout location={location} title={title} description={description}>
    <Container>
      <Styled.h1>{title}</Styled.h1>
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
