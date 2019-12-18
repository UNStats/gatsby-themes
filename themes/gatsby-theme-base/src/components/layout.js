import React from 'react';
import { node } from 'prop-types';
import { Box, Flex } from '@undataforum/components';
import { Styled } from 'theme-ui';
import { Global } from '@emotion/core';

import Header from './header';
import Footer from './footer';
import Seo from './seo';

const Layout = ({ children, ...props }) => (
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
      <Header mb={3} />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Flex>
  </Styled.root>
);

Layout.propTypes = {
  children: node,
};

export default Layout;
