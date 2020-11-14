import baseTheme from '@undataforum/gatsby-theme-base/src/gatsby-plugin-theme-ui';

const theme = {
  ...baseTheme,
  fonts: {
    ...baseTheme.fonts,
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
  },
};

export default theme;
