import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

const HomePage = ({
  data: {
    site: {
      siteMetadata: { title, description }
    }
  }
}) => (
  <Fragment>
    <h1>{title}</h1>
    <p>{description}</p>
  </Fragment>
);

HomePage.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default HomePage;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
