import { theme as defaultTheme } from '@undataforum/components';
import merge from 'deepmerge';

import Link from '../components/link';

// Fonts should not be configured in the base theme but in the website (fonts default to system-ui).
// To overwrite fonts and other configs in your website, shadow this file.
// Import this theme via
// `import theme from "@undataforum/gatsby-theme-base/src/gatsby-plugin-theme-ui`
// and then merge your changes like below.
const theme = merge(defaultTheme, {
  link: {
    internal: Link,
  },
  // h1-h6 and p have top margins 0 and only set bottom margins.
  styles: {
    h1: {
      mt: 0,
    },
    h2: {
      mt: 0,
    },
    h3: {
      mt: 0,
    },
    h4: {
      mt: 0,
    },
    h5: {
      mt: 0,
    },
    h6: {
      mt: 0,
    },
    p: {
      mt: 0,
    },
  },
});

export default theme;
