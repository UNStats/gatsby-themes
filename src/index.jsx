import React from "react";
import { MDXProvider } from "@mdx-js/tag";
import { Box, Provider } from "@undataforum/components";
import Link from "./components/Link";
import components from "./components/MDXComponents";
import Header from "./components/Header";
import RootLayout from "./components/RootLayout";

/* eslint-disable react/prop-types */

export const wrapPageElement = ({ element, props }) => {
  const {
    location: { pathname }
  } = props;
  if (pathname === "/") {
    return <RootLayout>{element}</RootLayout>;
  }
  return (
    <MDXProvider components={components}>
      <RootLayout>
        <Header />
        <Box my={[3, 4]}>{element}</Box>;
      </RootLayout>
    </MDXProvider>
  );
};

export const wrapRootElement = ({ element }) => (
  // MDXProvider should be placed inside wrapRootElement.
  // Due to the following bug it needs to be placed inside wrapPageElement.
  // https://github.com/ChristopherBiscardi/gatsby-mdx/issues/292
  <Provider theme={{ internalLink: Link }}>{element}</Provider>
);
