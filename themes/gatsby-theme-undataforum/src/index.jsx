import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
import { Box, Provider } from '@undataforum/components';
import Link from './components/Link';
import components from './components/MDXComponents';
import Header from './components/Header';
import RootLayout from './components/RootLayout';

/* eslint-disable react/prop-types */

export const wrapPageElement = ({ element, props }) => {
  const {
    location: { pathname },
  } = props;
  if (pathname === '/') {
    return <RootLayout>{element}</RootLayout>;
  }
  return (
    <RootLayout>
      <Header />
      <Box my={[3, 4]}>{element}</Box>;
    </RootLayout>
  );
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <Provider theme={{ internalLink: Link }}>{element}</Provider>
  </MDXProvider>
);
