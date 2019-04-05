import React from 'react';
import { node } from 'prop-types';
import { Box } from '@undataforum/components';

const Container = ({ children }) => (
  <Box css="max-width: 48rem;" mx="auto" px={[2, 3, 0]}>
    {children}
  </Box>
);

Container.propTypes = {
  children: node.isRequired,
};

export default Container;
