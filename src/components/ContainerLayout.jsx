import React from "react";
import { node } from "prop-types";
import Container from "./Container";

const ContainerLayout = ({ children }) => <Container>{children}</Container>;

ContainerLayout.propTypes = {
  children: node.isRequired
};

export default ContainerLayout;
