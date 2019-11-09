import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Avatars } from '@undataforum/components';

import PostsPage from '../components/posts-page';

const Posts = ({ data, pageContext, location }) => {
  const posts = data.allPost.nodes.map(post => {
    const { id, title, authors, date, description, path } = post;
    return {
      id,
      title: title.text,
      authors() {
        return (
          <Avatars
            values={authors.map(author => ({
              id: author.id,
              avatar() {
                return (
                  <Img
                    style={{ borderRadius: '100%' }}
                    alt={author.name}
                    fixed={author.avatar.childImageSharp.fixed}
                  />
                );
              },
              name: author.name,
            }))}
            mb={3}
          />
        );
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
          id
          name
          avatar {
            childImageSharp {
              fixed(height: 64, width: 64) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
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
