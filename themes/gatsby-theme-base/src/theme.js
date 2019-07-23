import { theme as defaultTheme } from '@undataforum/components';
import Link from './components/link';

const theme = {
  ...defaultTheme,
  fonts: {
    body: 'Roboto, sans-serif',
    monospace: 'Menlo, monospace',
  },
  internalLink: Link,
};

export default theme;
