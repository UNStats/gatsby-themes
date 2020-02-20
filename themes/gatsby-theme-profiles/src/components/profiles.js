import React from 'react';
import { node, object, shape, string } from 'prop-types';
import { Container, Grid, Styled } from 'theme-ui';
import { ProfilePreview, SmartLink } from '@undataforum/components';
import { Layout } from '@undataforum/gatsby-theme-base';
import Img from 'gatsby-image';

const Profiles = ({ blurb, data, pageContext: { collection }, location }) => {
  const profiles = data.allProfile.nodes;
  return (
    // eslint-disable-next-line no-warning-comments
    // TODO Use collection as key to localize title and description.
    // eslint-disable-next-line no-warning-comments
    // TODO Add page description (use SEO component).
    <Layout location={location} title={collection}>
      <Container sx={{ maxWidth: 'width.default', px: [2, 3, 4] }}>
        <Styled.h1>{collection}</Styled.h1>
        {blurb}
        <Grid gap={4} columns={[1, 2, 3]}>
          {profiles.map(({ id, path, ...profile }) => {
            const {
              avatar: {
                childImageSharp: { fixed },
              },
              honorific,
              name,
              jobtitle,
              organization,
            } = profile;
            return (
              <SmartLink
                css={{ ':hover': { textDecoration: 'none' } }}
                href={path}
                key={id}
              >
                <ProfilePreview
                  profile={{
                    avatar: (
                      <Img
                        style={{ borderRadius: '100%' }}
                        alt={name}
                        fixed={fixed}
                      />
                    ),
                    honorific,
                    name,
                    jobtitle,
                    organization,
                  }}
                />
              </SmartLink>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

Profiles.propTypes = {
  data: shape({ allProfile: object.isRequired }).isRequired,
  pageContext: shape({ collection: string.isRequired }),
  location: shape({ pathname: string.isRequired }).isRequired,
  blurb: node,
};

export default Profiles;
