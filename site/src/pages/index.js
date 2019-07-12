import React from 'react';
import { object } from 'prop-types';
import {
  BlogPreview,
  Container,
  Header,
  Hero,
  VideoList,
} from 'gatsby-theme-undataforum';
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
    <Container maxWidth={9}>
      <Hero fluid={data.hero.nodes[0].fluid} mb={3} />
    </Container>
    <Container maxWidth={8} px={[2, 3]}>
      <BlogPreview color="text" mb={3} />
      <VideoList
        videos={[
          { id: 'OXweXaub8Iw' },
          { id: 'kVMFjhMRyOw' },
          { id: '1dokisXqr6w' },
          { id: 'Nx_kVM9MAHc' },
          { id: 'VQ9ps16S5ek' },
          { id: 'BQdOVcQAons' },
        ]}
      />
    </Container>
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
