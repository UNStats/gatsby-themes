import React from 'react';
import { DummyLogo, Header } from '@undataforum/components';

// Shadow this file to customize header.
const HeaderProxy = props => {
  return (
    <Header
      {...props}
      logo={() => <DummyLogo height="100%" mr={[2, 3]} />}
      links={[
        { text: 'Nav item 1', href: '/nav-item-1/' },
        { text: 'Nav item 2', href: '/nav-item-2/' },
        { text: 'Nav item 3', href: '/nav-item-3/' },
      ]}
      button={{
        text: 'Button',
        href: '/button',
      }}
      height={[64, 80, 96]}
    />
  );
};

export default HeaderProxy;
