import React from 'react';
import { node, shape, string } from 'prop-types';

import DefaultPage from '../components/default-page';

// The default template is for MDX pages only.
// It does the additional step of reading title and description from frontmatter.
const DefaultTemplate = ({ pageContext, children }) => {
  const { title, description } = pageContext.frontmatter;
  return (
    <DefaultPage title={title} description={description}>
      {children}
    </DefaultPage>
  );
};

DefaultTemplate.propTypes = {
  pageContext: shape({
    frontmatter: shape({ title: string.isRequired, description: string })
      .isRequired,
  }).isRequired,
  children: node.isRequired,
};

export default DefaultTemplate;
