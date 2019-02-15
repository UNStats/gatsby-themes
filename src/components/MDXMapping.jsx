import React from "react";
import { node, object } from "prop-types";
import { MDXProvider } from "@mdx-js/tag";
import A from "./A";
import H1 from "./H1";
import H2 from "./H2";
import P from "./P";

const componentsType = object;

const defaultComponents = {
  a: A,
  h1: H1,
  h2: H2,
  p: P
};

// This component makes MDX HTML component mapping reusable.
// https://mdxjs.com/getting-started/#table-of-components
const MDXMapping = ({ children, components }) => (
  <MDXProvider components={{ ...defaultComponents, ...components }}>
    {children}
  </MDXProvider>
);

MDXMapping.propTypes = {
  children: node.isRequired,
  components: componentsType
};

MDXMapping.defaultProps = {
  components: {}
};

export default MDXMapping;
