import React from 'react';
import { object, shape, string } from 'prop-types';
import { Container } from 'theme-ui';
import { ProfilePreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';
import Img from 'gatsby-image';

const Profile = ({ data, location }) => {
  const {
    avatar: {
      childImageSharp: { fixed },
    },
    honorific,
    name,
    jobtitle,
    organization,
    description,
    body,
    roles,
  } = data.profile;
  return (
    <Layout location={location} title={name} description={description}>
      <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
        <ProfilePreview
          profile={{
            avatar: (
              <Img style={{ borderRadius: '100%' }} alt={name} fixed={fixed} />
            ),
            honorific,
            name,
            jobtitle,
            organization,
            badges: roles,
          }}
          mb={4}
        />
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

Profile.propTypes = {
  data: shape({ profile: object.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Profile;
