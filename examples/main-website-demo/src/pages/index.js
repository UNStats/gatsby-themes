import React from 'react';
import { object } from 'prop-types';
import { BlogPreview, Header, Hero, VideoList } from 'gatsby-theme-undataforum';
import { graphql } from 'gatsby';

const Index = ({ data }) => (
  <>
    <Header
      css="
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
      "
      transparent
    />
    <Hero fluid={data.hero.nodes[0].fluid} mb={3} />
    <BlogPreview color="text" mb={3} />
    <VideoList
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
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
