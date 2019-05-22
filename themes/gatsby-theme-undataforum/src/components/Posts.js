import React from 'react';
import { arrayOf } from 'prop-types';
import { Box, GridList, PostPreview } from '@undataforum/components';
import styled from 'styled-components';
import { borderColor, borderBottom } from 'styled-system';
import { colorType, postType, responsiveNumberType } from '../types';

const Separator = styled(Box)`
  ${borderBottom}
  ${borderColor}
`;

const Posts = ({ posts, color = 'primary', fontSize = [3, 4], ...props }) => (
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
    render={({ id, ...post }) => (
      <Separator key={id} borderColor={color} borderBottom="1px solid">
        <PostPreview post={{ ...post }} fontSize={fontSize} mb={3} />
      </Separator>
    )}
    values={posts}
  />
);

Posts.propTypes = {
  posts: arrayOf(postType).isRequired,
  fontSize: responsiveNumberType,
  color: colorType,
};

export default Posts;
