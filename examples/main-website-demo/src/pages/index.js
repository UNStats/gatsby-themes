import React from "react";
import { Flex, Box, Hero, RootLayout } from "gatsby-theme-undataforum";
import { graphql } from "gatsby";
import About from "./about.mdx";
import Logo from "../components/Logo";

export default ({ data }) => (
  <RootLayout>
    <Hero fluid={data.hero.edges[0].node.fluid} />
    <About />
  </RootLayout>
);

export const query = graphql`
  query {
    hero: allImageSharp(filter: { original: { src: { regex: "/hero/" } } }) {
      edges {
        node {
          id
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

/*
      <Box px={4}>
      <Flex mx={-4} py={[4, 5, 6]} bg="cyan" flexWrap="wrap">
        <Flex
          width={[1, 1 / 2, 2 / 5]}
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Box size={256} m="auto" color="white">
            <Logo size={256} m="auto" color="white" />
          </Box>
        </Flex>
        <Box width={[1, 1 / 2, 3 / 5]} px={4} py={5}>
          <Box as="h1" m={0} fontSize={[4, 5, 6]}>
            UN World Data Forum 2020
          </Box>
          <Box as="p" fontSize={3}>
            18-21 Oct 2020 in Bern, Switzerland
          </Box>
          <Box
            px={4}
            py={3}
            color="white"
            bg="black"
            fontSize={3}
            css={{
              display: "inline-block",
              fontWeight: "bold",
              borderRadius: 8
            }}
          >
            Beep Boop
          </Box>
        </Box>
      </Flex>
    </Box>

   */
