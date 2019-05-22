import React from 'react';
import { object } from 'prop-types';
import { graphql } from 'gatsby';
import { PostPreview } from '@undataforum/components';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Container, ProfileList } from '../components';
import useNormalizedProfiles from '../hooks/useNormalizedProfiles';

const Post = ({ data: { mdx } }) => {
  const {
    frontmatter: { title, date, authors },
    code: { body },
  } = mdx;
  const profiles = useNormalizedProfiles()
    .filter(({ slug }) => authors.includes(slug))
    .map(({ id, avatar, name, href }) => ({
      id,
      avatar,
      name,
      href,
    }));
  const renderAuthors = () => <ProfileList profiles={profiles} />;
  return (
    <Container>
      <PostPreview
        post={{
          title,
          date,
          authors: renderAuthors,
        }}
        fontSize={[4, 5]}
        mb={[3, 4]}
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
