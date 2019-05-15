import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import { Box, Shapes, theme } from '@undataforum/components';
import { Header, Link } from './components';
import components from './components/MDXComponents';
import { Root } from './layouts';

/* eslint-disable react/prop-types */

export const wrapPageElement = ({ element, props }) => {
  const {
    location: { pathname },
  } = props;
  if (pathname === '/') {
    return <Root>{element}</Root>;
  }
  return (
    <Root>
      <Header logo={() => <Shapes height="100%" mr={[2, 3]} />} />
      <Box my={[3, 4]}>{element}</Box>
    </Root>
  );
};

// ProfilesProvider should be in wrapRootElement to ensure profiles query is executed only once.
// Needs to be placed in wrapPageEelement due to this bug:
// https://github.com/gatsbyjs/gatsby/issues/7747
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider theme={{ ...theme, internalLink: Link }}>
      {element}
    </ThemeProvider>
  </MDXProvider>
);
