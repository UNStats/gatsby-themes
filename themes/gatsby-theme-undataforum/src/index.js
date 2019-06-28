import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { Box, Flex, theme as defaultTheme } from '@undataforum/components';
import { Logo } from '@undataforum/tokens';
import { Header, Footer } from './components';
import components from './mapping';
import { Root } from './templates';
import theme from './theme';

/* eslint-disable react/prop-types */

export const wrapPageElement = ({ element, props }) => {
  const {
    location: { pathname },
  } = props;
  if (pathname === '/') {
    return (
      <Root>
        <Flex css="min-height: 100vh;" flexDirection="column">
          <Box
            css={`
              flex: 1;
            `}
            mb={[3, 4]}
          >
            {element}
          </Box>
          <Footer
            logo={() => <Logo monochrome height={[3, 4]} my={[2, 3]} />}
          />
        </Flex>
      </Root>
    );
  }
  return (
    <Root>
      <Flex css="min-height: 100vh;" flexDirection="column">
        <Header logo={() => <Logo height="100%" mr={[2, 3]} />} />
        <Box
          css={`
            flex: 1;
          `}
          my={[3, 4]}
        >
          {element}
        </Box>
        <Footer logo={() => <Logo monochrome height={[3, 4]} my={[2, 3]} />} />
      </Flex>
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
