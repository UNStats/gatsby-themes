import React from 'react';
import { shape, object } from 'prop-types';
import {
  Box,
  Container,
  EventPreview,
  Grid,
  PostPreview,
} from '@undataforum/components';
import { Layout, Styled } from '@undataforum/gatsby-theme-base';
import { graphql } from 'gatsby';
import { normalize as normalizePost } from '@undataforum/gatsby-theme-blog';
import { normalize as normalizeEvent } from '@undataforum/gatsby-theme-events';

import About from '../components/about';
import Experience from '../components/experience';
import Hero from '../components/hero';

// If you change the hero image, you need to update the page query:
// - update filename regex,
// - update maxWidth to avoid blurry images.
const Homepage = ({ data }) => {
  const posts = data.allPost.nodes.map(normalizePost);
  const events = data.allEvent.nodes.map(normalizeEvent);
  return (
    <Layout title="Homepage" description={data.site.siteMetadata.description}>
      <Hero
        alt="View of Bern, Switzerland. The river Aare with its distinct blue water is in the foreground. The hills surrounding Bern in the background."
        title="View of Bern"
        fluid={data.hero.nodes[0].fluid}
        mt={-3}
        mb={[3, 4]}
      />
      <About mb={[3, 4]} />
      <Experience mb={[3, 4]} />
      <Container sx={{ maxWidth: 'width.default', px: [2, 3, 4] }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateAreas: [
              '"posts" "events"',
              '"posts" "events"',
              '"posts posts posts events events"',
            ],
            gridTemplateColumns: ['1fr', '1fr', 'repeat(5, 1fr)'],
            gridGap: [3, 4, 5],
          }}
        >
          <Box
            sx={{
              gridArea: 'posts',
            }}
          >
            <Styled.h1>Blog</Styled.h1>
            <Grid gap={3} columns={1}>
              {posts.map(({ id, ...post }) => (
                <PostPreview
                  post={{ ...post }}
                  fontSize={[3, 4]}
                  mb={3}
                  key={id}
                />
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              gridArea: 'events',
            }}
          >
            <Styled.h1>Events</Styled.h1>
            <Grid gap={3} columns={1}>
              {events.map(({ id, ...event }) => (
                <EventPreview event={{ ...event }} mb={3} key={id} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

Homepage.propTypes = {
  data: shape({
    allPost: object.isRequired,
    allEvent: object.isRequired,
  }).isRequired,
};

export default Homepage;

export const query = graphql`
  {
    site {
      siteMetadata {
        description
      }
    }
    allPost(
      limit: 3
      sort: { fields: date, order: DESC }
      filter: { type: { eq: "post" } }
    ) {
      nodes {
        ...Post
      }
    }
    allEvent(limit: 2, filter: { type: { eq: "event" } }) {
      nodes {
        ...Event
      }
    }
    hero: allImageSharp(
      filter: {
        original: { src: { regex: "/s-ratanak-vp5M_15_SNo-unsplash/" } }
      }
    ) {
      nodes {
        id
        fluid(maxWidth: 4032) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
