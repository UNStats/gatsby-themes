import React from 'react';
import { Heading } from '@undataforum/components';

// Add m={0} to Heading due to https://github.com/UNDataForum/gatsby-themes/issues/72.
const H3 = ({ ...props }) => (
  <Heading {...props} as="h3" fontSize={3} lineHeight="title" m={0} mb={3} />
);

export default H3;
