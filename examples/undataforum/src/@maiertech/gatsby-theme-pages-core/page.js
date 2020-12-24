import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@undataforum/gatsby-theme-base';
import { Container, Layout, Styled } from '@undataforum/gatsby-theme-theme-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const ShadowedPage = ({ data, location }) => {
  const { page } = data;
  return (
    <Layout location={location}>
      <SEO
        title={page.title}
        description={page.description}
        path={location.pathname}
      />
      <Container variant="narrow">
        <Styled.h1>{page.title}</Styled.h1>
        <MDXRenderer>{page.body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

ShadowedPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default ShadowedPage;
