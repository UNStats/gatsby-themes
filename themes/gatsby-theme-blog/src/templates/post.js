import React from 'react';
import { object, shape, string } from 'prop-types';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import PostPage from '../components/post-page';
import ProfileList from '../components/profile-list';

const Post = ({ location, data }) => {
  const { title, date, authors, images, description, body } = data.post;
  const post = {
    title: title.text,
    date,
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
            href: author.path,
          }))}
        />
      );
    },
  };
  // If post has images, extract fluid images.
  const fluidImages = images
    ? images.map(image => image.childImageSharp.fluid)
    : undefined;
  return (
    <PostPage
      post={post}
      images={fluidImages}
      description={description.text}
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
      title {
        childMdx {
          body
        }
        text
      }
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
      images {
        childImageSharp {
          fluid(maxWidth: 1024, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      description {
        childMdx {
          body
        }
        text
      }
      body
    }
  }
`;
