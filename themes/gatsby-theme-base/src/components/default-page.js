import React from 'react';
import { node, string } from 'prop-types';
import { Container, Styled } from 'theme-ui';

import Layout from './layout';

const DefaultPage = ({ title, description, children }) => (
  <Layout title={title} description={description}>
    <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
      <Styled.h1>{title}</Styled.h1>
      {children}
    </Container>
  </Layout>
);

DefaultPage.propTypes = {
  title: string.isRequired,
  description: string,
  children: node,
};

export default DefaultPage;
