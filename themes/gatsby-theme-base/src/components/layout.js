import React from 'react';
import { node, shape, string } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Box, Flex, GlobalStyle } from '@undataforum/components';
import { MDXProvider } from '@mdx-js/react';
import theme from '../theme';
import Header from './header';
import Footer from './footer';
import A from './a';
import H1 from './h1';
import H2 from './h2';
import H3 from './h3';
import P from './p';

const Layout = ({ location, children }) => (
  <MDXProvider components={{ a: A, h1: H1, h2: H2, h3: H3, p: P }}>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Flex css="min-height: 100vh;" flexDirection="column">
          {location.pathname !== '/' && <Header pathname={location.pathname} />}
          <Box
            css={`
              flex: 1;
            `}
            my={[3, 4]}
          >
            {children}
          </Box>
          <Footer />
        </Flex>
      </>
    </ThemeProvider>
  </MDXProvider>
);

Layout.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
  children: node,
};

export default Layout;
