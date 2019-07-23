import React from 'react';
import { Heading } from '@undataforum/components';

const H2 = ({ ...props }) => (
  <Heading {...props} as="h2" fontSize={4} lineHeight="title" mb={3} />
);

export default H2;
