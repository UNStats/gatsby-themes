import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Head, Provider } from "@undataforum/components";
import Link from "./Link";

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
      <Provider theme={{ internalLink: Link }}>
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
