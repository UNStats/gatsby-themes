import React from 'react';
import { Header } from '@undataforum/components';
import useSiteMetadata from '../hooks/useSiteMetadata';

const HeaderProxy = props => {
  const { navigation } = useSiteMetadata();
  return <Header {...props} links={navigation} />;
};

export default HeaderProxy;
