import React from 'react';
import { object, shape, string } from 'prop-types';
import { Container } from 'theme-ui';
import { Avatars, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';
import Img from 'gatsby-image';

const Post = ({ data, location }) => {
  const {
    title: { text: title },
    date,
    authors,
    description: { text: description },
    body,
    images,
  } = data.post;
  // If post defines images in frontmatter, extract fluid images.
  const fluidImages = images
    ? images.map(image => image.childImageSharp.fluid)
    : undefined;
  return (
    <Layout location={location} title={title} description={description}>
      <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
        <PostPreview
          post={{
            title,
            date,
            authors: (
              <Avatars
                values={authors.map(author => ({
                  id: author.id,
                  avatar: (
                    <Img
                      style={{ borderRadius: '100%' }}
                      alt={author.name}
                      fixed={author.avatar.childImageSharp.fixed}
                    />
                  ),
                  name: author.name,
                  href: author.path,
                }))}
                mb={3}
              />
            ),
          }}
          fontSize={[4, 5]}
          mb={[3, 4]}
        />
        <MDXRenderer images={fluidImages}>{body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

Post.propTypes = {
  data: shape({ post: object.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Post;
