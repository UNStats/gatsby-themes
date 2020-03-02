import React from 'react';
import { Header } from '@undataforum/components';

import Logo from './logo';

// Shadow this file to customize header.
const HeaderProxy = props => (
  <Header
    {...props}
    logo={<Logo scaleTo="height" />}
    links={[
      { text: 'Nav item 1', href: '/nav-item-1/' },
      { text: 'Nav item 2', href: '/nav-item-2/' },
      { text: 'Nav item 3', href: '/nav-item-3/' },
    ]}
    button={{
      text: 'Button',
      href: '/button',
    }}
  />
);

export default HeaderProxy;
