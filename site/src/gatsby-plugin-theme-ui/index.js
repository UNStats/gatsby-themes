import baseTheme from '@undataforum/gatsby-theme-base/src/gatsby-plugin-theme-ui';
import merge from 'deepmerge';

const theme = merge(baseTheme, {
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
  },
});

export default theme;
