import React from 'react';
import { Header } from '@undataforum/components';
import { Logo } from '@undataforum/assets';

const ShadowedHeader = props => (
  <Header
    {...props}
    logo={() => <Logo scaleTo="height" />}
    links={[
      { href: '/blog/', text: 'Blog' },
      { href: '/events/', text: 'Events' },
      { href: '/profiles/', text: 'Profiles' },
      { href: '/test/', text: 'Test' },
    ]}
    height={[64, 80, 96]}
  />
);

export default ShadowedHeader;
