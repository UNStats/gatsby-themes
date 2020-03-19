import React from 'react';
import { node, shape, string, arrayOf } from 'prop-types';
import { Container, Styled } from 'theme-ui';

import Layout from './layout';
import Seo from './seo';

const MdxPage = ({ children, location, pageContext }) => (
  <Layout location={location}>
    <Seo
      title={pageContext.frontmatter.title}
      description={pageContext.frontmatter.description}
      keywords={pageContext.frontmatter.keywords}
    />
    <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
      <Styled.h1>{pageContext.frontmatter.title}</Styled.h1>
      {children}
    </Container>
  </Layout>
);

MdxPage.propTypes = {
  children: node.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
  pageContext: shape({
    frontmatter: shape({
      title: string.isRequired,
      description: string,
      keywords: arrayOf(string.isRequired),
    }).isRequired,
  }).isRequired,
};

export default MdxPage;
