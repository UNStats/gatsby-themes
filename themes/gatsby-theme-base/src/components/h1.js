import React from 'react';
import { Heading } from '@undataforum/components';

const H1 = ({ ...props }) => (
  <Heading {...props} as="h1" fontSize={5} lineHeight="title" mb={4} />
);

export default H1;
