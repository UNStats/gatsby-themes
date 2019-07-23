import React from 'react';
import { node, shape, string } from 'prop-types';
import DefaultPage from '../components/default-page';

const DefaultTemplate = ({ pageContext, location, children }) => {
  const { title, description } = pageContext.frontmatter;
  return (
    <DefaultPage title={title} description={description} location={location}>
      {children}
    </DefaultPage>
  );
};

DefaultTemplate.propTypes = {
  pageContext: shape({
    frontmatter: shape({ title: string.isRequired, description: string })
      .isRequired,
  }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
  children: node.isRequired,
};

export default DefaultTemplate;
