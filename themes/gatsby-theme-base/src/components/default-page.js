import React from 'react';
import { node, shape, string } from 'prop-types';
import { Container } from '@undataforum/components';
import { Styled } from 'theme-ui';

import Layout from './layout';

const DefaultPage = ({ title, description, location, children }) => (
  <Layout location={location} title={title} description={description}>
    <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
      <Styled.h1>{title}</Styled.h1>
      {children}
    </Container>
  </Layout>
);

DefaultPage.propTypes = {
  title: string.isRequired,
  description: string,
  location: shape({ pathname: string.isRequired }).isRequired,
  children: node,
};

export default DefaultPage;
