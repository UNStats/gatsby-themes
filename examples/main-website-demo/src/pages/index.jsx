import React from 'react';
import { object } from 'prop-types';
import { Hero } from 'gatsby-theme-undataforum';
import { graphql } from 'gatsby';

const Index = ({ data }) => <Hero fluid={data.hero.edges[0].node.fluid} />;

Index.propTypes = {
  data: object,
};

export default Index;

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
