import React from "react";
import PropTypes from "prop-types";

import { Heading } from "@undataforum/components";

const H2 = ({ children }) => (
  <Heading as="h2" fontFamily="sans" fontSize="4" mb={2}>
    {children}
  </Heading>
);

H2.propTypes = {
  children: PropTypes.node.isRequired
};

export default H2;
