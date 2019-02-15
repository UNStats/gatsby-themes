import React from "react";
import PropTypes from "prop-types";
import BlankLayout from "./BlankLayout";
import MDXMapping from "./MDXMapping";

const PreviewMDXLayout = ({ children }) => (
  <BlankLayout>
    <MDXMapping>{children}</MDXMapping>
  </BlankLayout>
);

PreviewMDXLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PreviewMDXLayout;
