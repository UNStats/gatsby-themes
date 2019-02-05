import React from "react";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/tag";
import Layout from "./Layout";
import H1 from "./H1";
import H2 from "./H2";
import P from "./P";

const MDXLayout = ({ children }) => (
  <Layout>
    <MDXProvider components={{ h1: H1, h2: H2, p: P }}>{children}</MDXProvider>
  </Layout>
);

MDXLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MDXLayout;
