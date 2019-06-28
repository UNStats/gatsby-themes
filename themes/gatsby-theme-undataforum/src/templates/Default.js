import React from 'react';
import { node } from 'prop-types';
import { Container } from '@undataforum/components';

const Default = ({ children }) => (
  <Container maxWidth={7} px={[2, 3, 0]}>
    {children}
  </Container>
);

Default.propTypes = {
  children: node.isRequired,
};

export default Default;
