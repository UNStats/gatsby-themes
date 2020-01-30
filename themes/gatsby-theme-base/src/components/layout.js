import React from 'react';
import { node } from 'prop-types';
import { Box, Flex, Styled } from 'theme-ui';

import Header from './header';
import Footer from './footer';
import Seo from './seo';

const Layout = ({ children, ...props }) => (
  <Styled.root>
    <Seo {...props} />
    <Flex sx={{ flexDirection: 'column', minHeight: '100vh' }}>
      <Header mb={3} />
      <Box sx={{ flex: 1, mb: 4 }}>{children}</Box>
      <Footer />
    </Flex>
  </Styled.root>
);

Layout.propTypes = {
  children: node,
};

export default Layout;
