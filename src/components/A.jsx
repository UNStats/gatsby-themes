import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const A = ({ children, href }) => <Link to={href}>{children}</Link>;

A.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired
};

export default A;
