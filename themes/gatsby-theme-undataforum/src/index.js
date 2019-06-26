import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { Box, theme as defaultTheme } from '@undataforum/components';
import { Logo } from '@undataforum/tokens';
import { Header } from './components';
import components from './mapping';
import { Root } from './templates';
import theme from './theme';

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
      <Header logo={() => <Logo height="100%" mr={[2, 3]} />} />
      <Box my={[3, 4]}>{element}</Box>
    </Root>
  );
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider
      theme={{
        ...defaultTheme,
        ...theme,
      }}
    >
      {element}
    </ThemeProvider>
  </MDXProvider>
);

/* eslint-enable react/prop-types */
