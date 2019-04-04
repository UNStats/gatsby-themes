import React from 'react';
import { object } from 'prop-types';
import { BlogPreview, Hero, Videos } from 'gatsby-theme-undataforum';
import { graphql } from 'gatsby';

const Index = ({ data }) => (
  <>
    <Hero fluid={data.hero.nodes[0].fluid} mb={3} />
    <BlogPreview color="text" mb={3} />
    <Videos
      videos={[
        'OXweXaub8Iw',
        'kVMFjhMRyOw',
        '1dokisXqr6w',
        'Nx_kVM9MAHc',
        'VQ9ps16S5ek',
        'BQdOVcQAons',
      ]}
    />
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
