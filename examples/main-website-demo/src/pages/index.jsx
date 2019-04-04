import React from 'react';
import { object } from 'prop-types';
import { BlogPreview, Hero } from 'gatsby-theme-undataforum';
import { graphql } from 'gatsby';

const Index = ({ data }) => (
  <>
    <Hero fluid={data.hero.nodes[0].fluid} mb={3} />
    <BlogPreview color="text" />
  </>
);

Index.propTypes = {
  data: object,
};

export default Index;

export const query = graphql`
  query {
    hero: allImageSharp(filter: { original: { src: { regex: "/hero/" } } }) {
      nodes {
        id
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
