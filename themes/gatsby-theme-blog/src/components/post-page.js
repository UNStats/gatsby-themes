import React from 'react';
import { object, shape, string, arrayOf } from 'prop-types';
import { Container, Heading } from 'theme-ui';
import { Avatars, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';
import Img from 'gatsby-image';

const PostPage = ({ data, location }) => {
  const { title, date, authors, description, body, images } = data.post;
  // If post defines images in frontmatter, extract fluid images.
  const fluidImages = images
    ? images.map(image => image.childImageSharp.fluid)
    : undefined;
  return (
    <Layout
      location={location}
      title={title.text}
      description={description.text}
    >
      <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
        <PostPreview
          post={{
            title: (
              <Heading as="h1" sx={{ textAlign: 'start', mb: 3 }}>
                {title.text}
              </Heading>
            ),
            date,
            authors: authors ? (
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
            ) : (
              undefined
            ),
          }}
          mb={[3, 4]}
        />
        <MDXRenderer images={fluidImages}>{body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

PostPage.propTypes = {
  data: shape({
    post: shape({
      title: shape({ text: string.isRequired }).isRequired,
      date: string.isRequired,
      authors: arrayOf(object.isRequired),
      description: shape({ text: string.isRequired }).isRequired,
      body: string.isRequired,
    }).isRequired,
  }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default PostPage;
