import { theme as defaultTheme } from '@undataforum/components';
import merge from 'deepmerge';

import Link from '../components/link';

const theme = merge(defaultTheme, {
  fonts: {
    body: 'Roboto, sans-serif',
    monospace: 'Menlo, monospace',
  },
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
