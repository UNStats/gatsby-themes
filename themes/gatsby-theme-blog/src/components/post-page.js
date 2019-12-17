import React from 'react';
import { arrayOf, func, object, shape, string } from 'prop-types';
import { Container, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';

const PostPage = ({ post, images, description, body, location }) => (
  <Layout location={location} title={post.title} description={description}>
    <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
      <PostPreview post={post} fontSize={[4, 5]} mb={[3, 4]} />
      <MDXRenderer images={images}>{body}</MDXRenderer>
    </Container>
  </Layout>
);

PostPage.propTypes = {
  post: shape({
    title: string.isRequired,
    date: string.isRequired,
    authors: func.isRequired,
  }).isRequired,
  images: arrayOf(object),
  description: string,
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default PostPage;
