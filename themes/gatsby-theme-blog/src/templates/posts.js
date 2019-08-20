import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PostsPage from '../components/posts-page';
import ProfileList from '../components/profile-list';

const Posts = ({ data, pageContext, location }) => {
  const posts = data.allPost.nodes.map(post => {
    const { id, title, authors, date, description, path } = post;
    return {
      id,
      title,
      authors() {
        return (
          <ProfileList
            profiles={authors.map(author => ({
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
          />
        );
      },
      date,
      lead: description,
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
        title
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
        description
        path
      }
    }
  }
`;
