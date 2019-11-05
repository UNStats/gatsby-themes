import React from 'react';
import { shape, string } from 'prop-types';
import { Text } from '@undataforum/components';

import DefaultPage from '../components/default-page';

const NotFound = ({ location }) => (
  <DefaultPage title="Page not found" location={location}>
    <Text fontFamily="body">
      Oops! The page you are looking for has been removed or relocated.
    </Text>
  </DefaultPage>
);

NotFound.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default NotFound;
