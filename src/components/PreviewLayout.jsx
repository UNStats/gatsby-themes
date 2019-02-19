import React from "react";
import { node } from "prop-types";
import BlankLayout from "./BlankLayout";
import MDXMapping from "./MDXMapping";

const PreviewLayout = ({ children }) => (
  <BlankLayout>
    <MDXMapping>{children}</MDXMapping>
  </BlankLayout>
);

PreviewLayout.propTypes = {
  children: node.isRequired
};

export default PreviewLayout;
