import React from "react";
import PropTypes from "prop-types";
import { Text } from "@undataforum/components";

const P = ({ children }) => (
  <Text as="p" fontFamily="serif" lineHeight="copy" mt={0} mb={3}>
    {children}
  </Text>
);

P.propTypes = {
  children: PropTypes.node.isRequired
};

export default P;
