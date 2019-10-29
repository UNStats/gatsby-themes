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
  styles: {
    h1: {
      fontSize: 5,
      lineHeight: 'heading',
      mt: 0,
      mb: [3, 4],
    },
    h2: {
      fontSize: 4,
      lineHeight: 'heading',
      mt: 0,
      mb: [2, 3],
    },
    h3: {
      fontSize: 3,
      lineHeight: 'heading',
      mt: 0,
      mb: [2, 3],
    },
    p: {
      lineHeight: 'body',
      mt: 0,
      mb: 3,
    },
  },
});

export default theme;
