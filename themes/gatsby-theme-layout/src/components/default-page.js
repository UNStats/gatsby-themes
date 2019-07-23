import React from 'react';
import { node, shape, string } from 'prop-types';
import { Container } from '@undataforum/components';
import H1 from './h1';
import Layout from './layout';
import Seo from './seo';

const DefaultPage = ({ title, description, location, children }) => (
  <Layout location={location}>
    <Seo title={title} description={description} />
    <Container maxWidth={7} px={[2, 3, 0]}>
      <H1>{title}</H1>
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
