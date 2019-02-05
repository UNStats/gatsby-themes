import React from "react";
import PropTypes from "prop-types";

import { Heading } from "@undataforum/components";

const H1 = ({ children }) => (
  <Heading as="h1" fontFamily="sans" fontSize={5} lineHeight="title" mb={3}>
    {children}
  </Heading>
);

H1.propTypes = {
  children: PropTypes.node.isRequired
};

export default H1;
