import React from 'react';
import { Header } from '@undataforum/gatsby-theme-theme-ui';
import { Logo } from '@undataforum/assets';

const ShadowedHeader = (props) => (
  <Header
    {...props}
    logo={<Logo scaleTo="height" />}
    links={[
      { href: '/blog/', text: 'Blog' },
      { href: '/news/', text: 'News' },
      { href: '/webinars/', text: 'Webinars' },
      { href: '/profiles/', text: 'Profiles' },
    ]}
  />
);

export default ShadowedHeader;
