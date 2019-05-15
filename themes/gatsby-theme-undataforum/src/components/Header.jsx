import React from 'react';
import { Header } from '@undataforum/components';
import useSiteMetadata from '../hooks/useSiteMetadata';

const HeaderProxy = props => {
  const {
    navigation: { links, button },
  } = useSiteMetadata();
  return <Header {...props} links={links} button={button} />;
};

export default HeaderProxy;
