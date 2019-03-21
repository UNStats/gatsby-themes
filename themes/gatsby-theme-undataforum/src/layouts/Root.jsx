import React from 'react';
import { node } from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';

const Style = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700|Merriweather:400,700');
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`;

const query = graphql`
  query RootQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;

const Root = ({ children }) => {
  const {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
  } = useStaticQuery(query);
  return (
    <>
      <Style />
      <Helmet title={title}>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:description" content={description} />
      </Helmet>
      {children}
    </>
  );
};

Root.propTypes = {
  children: node.isRequired,
};

export default Root;
