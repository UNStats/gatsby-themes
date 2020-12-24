import preset from '@undataforum/gatsby-theme-theme-ui/src/gatsby-plugin-theme-ui';

const theme = {
  ...preset,
  fonts: {
    ...preset.fonts,
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
  },
};

export default theme;
