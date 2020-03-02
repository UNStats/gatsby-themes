import preset from '@undataforum/preset';
import merge from 'deepmerge';
import { NewTabLink } from '@undataforum/components';

import Link from '../components/link';

/**
 * Fonts should not be configured in the base theme but in the website (fonts default to system-ui).
 * To overwrite fonts and other configs in your website, shadow this file.
 * Import this theme via
 *
 * import theme from "@undataforum/gatsby-theme-base/src/gatsby-plugin-theme-ui
 *
 * and then merge your changes like below.
 */

// Use Gatsby's Link for internal links.
// Open external links in new tab.
const theme = merge(preset, {
  badges: {
    highlight: {
      color: 'primary',
      bg: 'background',
    },
    promotion: {
      color: 'secondary',
      bg: 'background',
    },
  },
  buttons: {
    // Buttons inside highlight box on homepage.
    highlight: {
      variant: 'buttons.default',
      color: 'primary',
      bg: 'background',
    },
    promotion: {
      variant: 'buttons.default',
      color: 'secondary',
      bg: 'background',
    },
    outline: {
      highlight: {
        variant: 'buttons.outline.default',
        color: 'background',
      },
      promotion: {
        variant: 'buttons.outline.default',
        color: 'background',
      },
    },
  },
  link: {
    external: NewTabLink,
    internal: Link,
  },
});

export default theme;
