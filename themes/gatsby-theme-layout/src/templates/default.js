import React from 'react';
import { shape, string } from 'prop-types';
import DefaultPage from '../components/default-page';

const DefaultTemplate = ({ pageContext, location }) => {
  const { title, description } = pageContext.frontmatter;
  return (
    <DefaultPage title={title} description={description} location={location} />
  );
};

DefaultTemplate.propTypes = {
  pageContext: shape({
    frontmatter: shape({ title: string.isRequired, description: string })
      .isRequired,
  }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default DefaultTemplate;
