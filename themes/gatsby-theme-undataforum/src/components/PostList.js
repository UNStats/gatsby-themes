import React from 'react';
import { arrayOf } from 'prop-types';
import { Box, GridList, PostPreview } from '@undataforum/components';
import { borderColor, borderBottom } from 'styled-system';
import { colorType, postType, responsiveNumberType } from '../types';

const PostList = ({ posts, color, fontSize, ...props }) => (
  <GridList
    {...props}
    css={`
      div:last-child {
        border: none;
        margin-bottom: 0;
      }
    `}
    align="center"
    gridGap={3}
    gridTemplateColumns="1fr"
    render={({ id, ...post }) => (
      <Box
        css={`
          ${borderBottom}
          ${borderColor}
        `}
        key={id}
        borderColor={color}
        borderBottom="1px solid"
      >
        <PostPreview post={{ ...post }} fontSize={fontSize} mb={3} />
      </Box>
    )}
    values={posts}
  />
);

PostList.propTypes = {
  posts: arrayOf(postType).isRequired,
  fontSize: responsiveNumberType,
  color: colorType,
};

PostList.defaultProps = {
  color: 'primary',
  fontSize: [3, 4],
};

export default PostList;
