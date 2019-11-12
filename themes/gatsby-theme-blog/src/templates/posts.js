import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import { Names } from '@undataforum/components';

import PostsPage from '../components/posts-page';

const Posts = ({ data, pageContext, location }) => {
  const posts = data.allPost.nodes.map(post => {
    const { id, title, authors, date, description, path } = post;
    return {
      id,
      title: title.text,
      authors() {
        return <Names values={authors.map(({ name }) => name)} mb={3} />;
      },
      date,
      description: description.text,
      href: path,
    };
  });
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

export const pageQuery = graphql`
  query($type: String!) {
    allPost(
      sort: { fields: date, order: DESC }
      filter: { type: { eq: $type } }
    ) {
      nodes {
        id
        title {
          childMdx {
            body
          }
          text
        }
        authors {
          name
        }
        date(formatString: "MMM DD, YYYY")
        description {
          childMdx {
            body
          }
          text
        }
        path
      }
    }
  }
`;
