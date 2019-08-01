import React from 'react';
import { Heading } from '@undataforum/components';

// Add m={0} to Heading due to https://github.com/UNDataForum/gatsby-themes/issues/72.
const H2 = ({ ...props }) => (
  <Heading {...props} as="h2" fontSize={4} lineHeight="title" m={0} mb={3} />
);

export default H2;
