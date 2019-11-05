import React from 'react';
import { node, shape, string } from 'prop-types';
import { Box, Flex } from '@undataforum/components';
import { Styled } from 'theme-ui';
import { Global } from '@emotion/core';

import Header from './header';
import Footer from './footer';
import Seo from './seo';

const Layout = ({ location, children, ...props }) => (
  <Styled.root>
    <Seo {...props} />
    <Global
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
        },
      }}
    />
    <Flex sx={{ flexDirection: 'column', minHeight: '100vh' }}>
      {location.pathname !== '/' && <Header mb={[3, 4]} />}
      <Box sx={{ flex: 1, mb: [3, 4] }}>{children}</Box>
      <Footer />
    </Flex>
  </Styled.root>
);

Layout.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
  children: node,
};

export default Layout;
