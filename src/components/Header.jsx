import React from "react";
import { Header } from "@undataforum/components";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        navigation {
          href
          text
        }
      }
    }
  }
`;

const Component = props => {
  const {
    site: {
      siteMetadata: { navigation }
    }
  } = useStaticQuery(query);
  return <Header {...props} links={navigation} />;
};

export default Component;
