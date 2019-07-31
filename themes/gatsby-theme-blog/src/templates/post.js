import React from 'react';
import { object, shape, string } from 'prop-types';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import PostPage from '../components/post-page';
import ProfileList from '../components/profile-list';

const Post = ({ location, data }) => {
  const { title, date, authors, description, body } = data.post;
  const post = {
    title,
    date,
    authors() {
      return (
        <ProfileList
          profiles={authors.map(author => ({
            name: author.name,
            avatar() {
              return (
                <Img
                  style={{ borderRadius: '100%' }}
                  alt={author.name}
                  fixed={author.avatar.childImageSharp.fixed}
                />
              );
            },
            href: author.path,
          }))}
        />
      );
    },
  };
  return (
    <PostPage
      post={post}
      description={description}
      body={body}
      location={location}
    />
  );
};

Post.propTypes = {
  data: shape({ post: object.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Post;

export const pageQuery = graphql`
  query($id: String!) {
    post(id: { eq: $id }) {
      title
      date(formatString: "MMM DD, YYYY")
      authors {
        id
        name
        path
        avatar {
          childImageSharp {
            fixed(height: 64, width: 64) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      description
      body
    }
  }
`;
