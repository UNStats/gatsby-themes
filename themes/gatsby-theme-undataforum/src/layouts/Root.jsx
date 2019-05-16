import React from 'react';
import { node } from 'prop-types';
import { GlobalStyle } from '@undataforum/components';
import Helmet from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';

const Root = ({ children }) => {
  const { title, description, siteUrl } = useSiteMetadata();
  return (
    <>
      <GlobalStyle />
      <Helmet title={title}>
        <html lang="en" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:description" content={description} />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </>
  );
};

Root.propTypes = {
  children: node.isRequired,
};

export default Root;
