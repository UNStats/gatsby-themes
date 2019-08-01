import React from 'react';
import { Heading } from '@undataforum/components';

// Add m={0} to Heading due to https://github.com/UNDataForum/gatsby-themes/issues/72.
const H1 = ({ ...props }) => (
  <Heading {...props} as="h1" fontSize={5} lineHeight="title" m={0} mb={4} />
);

export default H1;
