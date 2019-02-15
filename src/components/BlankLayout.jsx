import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Head, Provider } from "@undataforum/components";

const BlankLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query BlankLayoutQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, description, siteUrl }
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
          {children}
        </Fragment>
      </Provider>
    )}
  />
);

BlankLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default BlankLayout;
