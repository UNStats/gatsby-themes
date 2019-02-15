import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "./RootLayout";
import MDXMapping from "./MDXMapping";
import Narrow from "./Narrow";

const NarrowMDXLayout = ({ children }) => (
  <DefaultLayout>
    <MDXMapping>
      <Narrow>{children}</Narrow>
    </MDXMapping>
  </DefaultLayout>
);

NarrowMDXLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default NarrowMDXLayout;
