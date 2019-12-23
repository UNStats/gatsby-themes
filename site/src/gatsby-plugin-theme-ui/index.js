import baseTheme from '@undataforum/gatsby-theme-base/src/gatsby-plugin-theme-ui';
import merge from 'deepmerge';

// Universal colors.
const black = '#000000';
const white = '#ffffff';
const gray = '#eee';

// Styleguide colors.
// const forumBlue = '#00609d';
const blue = '#0e6a9c';
const green = '#266f37';
const red = '#a21723';
const yellow = '#c59b25';

// Abstractions.
const colors = {
  // Theme ui colors.
  text: black,
  background: white,
  primary: blue,
  secondary: green,
  accent: red,
  muted: gray,
  // Style guide colors.
  blue,
  green,
  red,
  yellow,
};

// Additional color pairings optimized for contrast.
const pairings = {
  blue: {
    color: 'background',
    bg: 'blue',
  },
  green: {
    color: 'background',
    bg: 'green',
  },
  red: {
    color: 'background',
    bg: 'red',
  },
  yellow: {
    color: 'text',
    bg: 'yellow',
  },
};

const theme = merge(baseTheme, {
  colors,
  pairings,
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
  },
});

export default theme;
