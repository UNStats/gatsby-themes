import React from 'react';
import { shape, string } from 'prop-types';
import { Container, Themed, Text } from 'theme-ui';
import { Layout, Seo } from '@undataforum/gatsby-theme-base';

const Homepage = ({ location }) => {
  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <Layout location={location}>
      <Seo
        title="You can query site title with Gatsby"
        description="You can query site description with Gatsby."
      />
      <Container>
        <Themed.h1>Homepage</Themed.h1>
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
