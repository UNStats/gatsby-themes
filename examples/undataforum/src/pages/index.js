import React from 'react';
import { shape, string } from 'prop-types';
import { SEO, useSiteMetadata } from '@undataforum/gatsby-theme-base/src';
import {
  Container,
  Styled,
  Text,
  Layout,
} from '@undataforum/gatsby-theme-theme-ui';

const Homepage = ({ location }) => {
  const { siteDescription } = useSiteMetadata();

  return (
    <Layout location={location}>
      <SEO
        title="Homepage"
        description={siteDescription}
        path={location.pathname}
      />
      <Container>
        <Styled.h1>Homepage</Styled.h1>
        <Text as="p">
          Homepage design needs to be done inside each project that adopts one
          or more themes from this repository.
        </Text>
      </Container>
    </Layout>
  );
};

Homepage.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Homepage;
