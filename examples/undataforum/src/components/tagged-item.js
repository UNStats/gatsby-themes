import React from 'react';
import { node, string } from 'prop-types';
import { Badge, Box, Text } from '@undataforum/gatsby-theme-theme-ui';

const TaggedItem = ({ type, title, date, ...props }) => (
  <Box {...props}>
    <Box sx={{ mb: 2 }}>
      <Badge
        sx={{
          // Anything below variant cannot be overridden by this variant.
          variant: 'post-preview.badge',
        }}
      >
        {type}
      </Badge>
    </Box>
    {title}
    <Text as="time">{date}</Text>
  </Box>
);

TaggedItem.propTypes = {
  type: string.isRequired,
  title: node.isRequired,
  date: string.isRequired,
};

export default TaggedItem;
