import React from "react";
import PropTypes from "prop-types";
import { Box } from "@undataforum/components";

const Narrow = ({ children }) => (
  <Box as="main" css="max-width: 48rem;" mx="auto" px={[2, 3, 0]}>
    {children}
  </Box>
);

Narrow.propTypes = {
  children: PropTypes.node.isRequired
};

export default Narrow;
