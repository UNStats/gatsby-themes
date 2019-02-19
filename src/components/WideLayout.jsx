import React from "react";
import PropTypes from "prop-types";
import RootLayout from "./RootLayout";
import MDXMapping from "./MDXMapping";

const WideLayout = ({ children }) => (
  <RootLayout>
    <MDXMapping>{children}</MDXMapping>
  </RootLayout>
);

WideLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default WideLayout;
