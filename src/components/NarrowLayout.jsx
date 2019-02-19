import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "./RootLayout";
import MDXMapping from "./MDXMapping";
import Narrow from "./Narrow";

const NarrowLayout = ({ children }) => (
  <DefaultLayout>
    <MDXMapping>
      <Narrow>{children}</Narrow>
    </MDXMapping>
  </DefaultLayout>
);

NarrowLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default NarrowLayout;
