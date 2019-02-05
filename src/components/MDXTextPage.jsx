import React from "react";
import PropTypes from "prop-types";
import { Box } from "@undataforum/components";
import MDXLayout from "./MDXLayout";

const MDXTextPage = ({ children }) => (
  <MDXLayout>
    <Box as="main" css="max-width: 48rem;" mx="auto" px={[2, 3, 0]}>
      {children}
    </Box>
  </MDXLayout>
);

MDXTextPage.propTypes = {
  children: PropTypes.node.isRequired
};

export default MDXTextPage;
