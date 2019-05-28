import { Link } from './components';

const theme = {
  // Override defaults from @undataforum/components.
  fonts: {
    body: 'Roboto, sans-serif',
    monospace: 'Menlo, monospace',
  },
  internalLink: Link,

  // Add additional scales.
  heights: [0, '1rem', '2rem', '4rem', '8rem', '16rem', '32rem', '48rem'],
};

export default theme;
