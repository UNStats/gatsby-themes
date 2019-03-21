import React from 'react';
import { object } from 'prop-types';
import { graphql } from 'gatsby';
import { Text } from '@undataforum/components';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Container from '../components/Container';
import PostPreview from '../fragments/PostPreview';

const Post = ({ data: { mdx } }) => {
  const {
    id,
    frontmatter: { title, date, authors },
    code: { body },
  } = mdx;
  const render = () => (
    <Text as="div" fontFamily="sans" lineHeight="title" mb={3}>
      {authors.join(', ')}
    </Text>
  );
  return (
    <Container>
      <PostPreview
        post={{
          id,
          title,
          date,
          authors: render,
        }}
      />
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  );
};

Post.propTypes = {
  data: object.isRequired,
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...PostPreview
      code {
        body
      }
    }
  }
`;
