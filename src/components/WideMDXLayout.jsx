import React from "react";
import PropTypes from "prop-types";
import RootLayout from "./RootLayout";
import MDXMapping from "./MDXMapping";

const WideMDXLayout = ({ children }) => (
  <RootLayout>
    <MDXMapping>{children}</MDXMapping>
  </RootLayout>
);

WideMDXLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default WideMDXLayout;
