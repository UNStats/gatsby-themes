import React from 'react';
import { arrayOf, bool, shape, string, func } from 'prop-types';
import { Container, GridList, PostPreview } from '@undataforum/components';
import { H1, Layout, Seo } from '@undataforum/gatsby-theme-base';

const PostsPage = ({
  posts,
  title,
  description,
  location,
  alwaysRenderHeader,
}) => (
  <Layout location={location} alwaysRenderHeader={alwaysRenderHeader}>
    <Seo title={title} description={description} />
    <Container maxWidth={7} px={[2, 3, 0]}>
      <H1>{title}</H1>
      <GridList
        align="center"
        gridGap={3}
        gridTemplateColumns="1fr"
        render={({ id, ...post }) => (
          <PostPreview post={{ ...post }} fontSize={[3, 4]} mb={3} key={id} />
        )}
        values={posts}
      />
    </Container>
  </Layout>
);

PostsPage.propTypes = {
  posts: arrayOf(
    shape({
      id: string.isRequired,
      title: string.isRequired,
      authors: func.isRequired,
      date: string.isRequired,
      lead: string.isRequired,
      href: string.isRequired,
    })
  ).isRequired,
  title: string.isRequired,
  description: string,
  location: shape({ pathname: string.isRequired }).isRequired,
  alwaysRenderHeader: bool.isRequired,
};

export default PostsPage;
