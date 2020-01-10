import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import {
  Container,
  Grid,
  ProfilePreview,
  SmartLink,
} from '@undataforum/components';
import { Layout, Styled } from '@undataforum/gatsby-theme-base';

const ProfilesPage = ({ profiles, render, title, description, location }) => (
  <Layout location={location} title={title} description={description}>
    <Container sx={{ maxWidth: 'width.default', px: [2, 3, 4], mb: 4 }}>
      <Styled.h1>{title}</Styled.h1>
      {render && render()}
      <Grid gap={4} columns={[1, 2, 3]}>
        {profiles.map(({ id, href, ...profile }) => (
          <SmartLink
            css={{ ':hover': { textDecoration: 'none' } }}
            href={href}
            key={id}
          >
            <ProfilePreview profile={profile} />
          </SmartLink>
        ))}
      </Grid>
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
  render: func,
  title: string.isRequired,
  description: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default ProfilesPage;
