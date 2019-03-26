import React from 'react';
import { arrayOf } from 'prop-types';
import { GridList, PostPreview } from '@undataforum/components';
import { postType } from '../types';

const Posts = ({ posts }) => (
  <GridList
    align="center"
    gridGap={3}
    gridTemplateColumns="repeat(auto-fit, 512px)"
    render={({ id, ...post }) => {
      debugger;
      return <PostPreview post={{ ...post }} key={id} />;
    }}
    values={posts}
  />
);

Posts.propTypes = {
  posts: arrayOf(postType).isRequired,
};

export default Posts;
