import React from 'react';
import { shape, string, object } from 'prop-types';
import {
  Box,
  Card,
  Container,
  EventPreview,
  Grid,
  Header,
  Hero,
  PostPreview,
} from '@undataforum/components';
import { Layout, Styled } from '@undataforum/gatsby-theme-base';
import { graphql } from 'gatsby';
import { normalize as normalizePost } from '@undataforum/gatsby-theme-blog';
import { normalize as normalizeEvent } from '@undataforum/gatsby-theme-events';
import { Logo } from '@undataforum/assets';
import Img from 'gatsby-image';

const Homepage = ({ location, data }) => {
  const posts = data.allPost.nodes.map(normalizePost);
  const events = data.allEvent.nodes.map(normalizeEvent);
  return (
    <Layout
      location={location}
      title="Homepage"
      description={data.site.siteMetadata.description}
    >
      <Header
        links={[
          { href: '/blog/', text: 'Blog' },
          { href: '/events/', text: 'Events' },
          { href: '/profiles/', text: 'Profiles' },
          { href: '/test/', text: 'Test' },
        ]}
        variant="transparent"
        position="absolute"
        top={0}
        right={0}
        left={0}
      />
      <Hero
        image={() => (
          <Img
            style={{ height: '100%', width: '100%' }}
            fluid={data.hero.nodes[0].fluid}
          />
        )}
        logo={() => <Logo scaleTo="height" />}
        text="18-21 October 2020 in Bern, Switzerland"
        action={{
          text: 'Submit your proposal',
          href: '/2020/call-for-proposals',
        }}
        promo={() => {
          // Remove description due to space constraints.
          const event = { ...events[0], description: undefined };
          return (
            <Card sx={{ maxWidth: 512, variant: 'pairings.branded' }}>
              <EventPreview event={event} />
            </Card>
          );
        }}
        mb={3}
      />
      <Container>
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
  location: shape({ pathname: string.isRequired }).isRequired,
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
