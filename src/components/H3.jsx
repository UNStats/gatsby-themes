import React from "react";
import PropTypes from "prop-types";

import { Heading } from "@undataforum/components";

const H3 = ({ children }) => (
  <Heading as="h3" fontFamily="sans" fontSize="3" mb={3}>
    {children}
  </Heading>
);

H3.propTypes = {
  children: PropTypes.node.isRequired
};

export default H3;
