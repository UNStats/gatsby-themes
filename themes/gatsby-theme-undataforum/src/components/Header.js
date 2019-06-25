import React from 'react';
import { Header } from '@undataforum/components';
import { useSiteMetadata } from '../hooks';

const HeaderProxy = props => {
  const {
    navigation: { links, button },
  } = useSiteMetadata();
  return (
    <Header {...props} links={links} button={button} height={[64, 80, 96]} />
  );
};

export default HeaderProxy;
