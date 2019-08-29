import React from 'react';
import { Header } from '@undataforum/components';
import { Logo } from '@undataforum/tokens';

const ShadowedHeader = props => (
  <Header
    {...props}
    logo={() => <Logo height="100%" mr={[2, 3]} />}
    links={[
      { text: 'Blog', href: '/blog/' },
      { text: 'Events', href: '/events/' },
      { text: 'Profiles', href: '/profiles/' },
      { text: 'Test', href: '/test/' },
    ]}
    height={[64, 80, 96]}
  />
);

export default ShadowedHeader;
