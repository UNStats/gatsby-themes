import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Box, Head, Header, Provider } from "@undataforum/components";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
            navLinks {
              href
              text
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, description, siteUrl, navLinks }
      }
    }) => (
      <Provider>
        <Fragment>
          <Head
            title={title}
            description={description}
            url={siteUrl}
            noRobots
          />

          <Header links={navLinks} />
          <Box my={[3, 4]}>{children}</Box>
        </Fragment>
      </Provider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
