import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
import { Box, Provider } from '@undataforum/components';
import Link from './components/Link';
import components from './components/MDXComponents';
import Header from './components/Header';
import Root from './layouts/Root';
import { ProfilesProvider } from './components/ProfilesContext';

/* eslint-disable react/prop-types */

export const wrapPageElement = ({ element, props }) => {
  const {
    location: { pathname },
  } = props;
  if (pathname === '/') {
    return <Root>{element}</Root>;
  }
  return (
    <ProfilesProvider>
      <Root>
        <Header />
        <Box my={[3, 4]}>{element}</Box>
      </Root>
    </ProfilesProvider>
  );
};

// ProfilesProvider should be in wrapRootElement to ensure profiles query is executed only once.
// Needs to be placed in wrapPageEelement due to this bug:
// https://github.com/gatsbyjs/gatsby/issues/7747
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <Provider theme={{ internalLink: Link }}>{element}</Provider>
  </MDXProvider>
);
