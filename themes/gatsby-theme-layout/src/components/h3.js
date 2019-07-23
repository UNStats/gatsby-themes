import React from 'react';
import { Heading } from '@undataforum/components';

const H3 = ({ ...props }) => (
  <Heading {...props} as="h3" fontSize={3} lineHeight="title" mb={3} />
);

export default H3;
