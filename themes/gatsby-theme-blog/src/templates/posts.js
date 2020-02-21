import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import { Names } from '@undataforum/components';

import PostsPage from '../components/posts-page';

export const normalize = ({ id, title, authors, date, description, path }) => ({
  id,
  title: title.text,
  authors: <Names values={authors.map(({ name }) => name)} mb={3} />,
  date,
  description: description.text,
  href: path,
});

const Posts = ({ data, pageContext, location }) => {
  const posts = data.allPost.nodes.map(normalize);
  return (
    <PostsPage
      posts={posts}
      title={pageContext.title}
      description={pageContext.description}
      location={location}
    />
  );
};

Posts.propTypes = {
  data: shape({ allPost: object.isRequired }).isRequired,
  pageContext: shape({
    title: string.isRequired,
    description: string,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Posts;

export const fragment = graphql`
  fragment Post on Post {
    id
    title {
      text
    }
    authors {
      name
    }
    date(formatString: "MMM DD, YYYY")
    description {
      text
    }
    path
  }
`;

export const query = graphql`
  query($collection: String!) {
    allPost(
      sort: { fields: date, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        ...Post
      }
    }
  }
`;
