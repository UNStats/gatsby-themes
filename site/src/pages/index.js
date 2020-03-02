import React from 'react';
import { shape, object } from 'prop-types';
import { Button, Container, Flex, Grid, Heading, Styled, Text } from 'theme-ui';
import { EventPreview, Names, PostPreview } from '@undataforum/components';
import { Layout } from '@undataforum/gatsby-theme-base';
import { graphql } from 'gatsby';

import About from '../components/about';
import Experience from '../components/experience';
import Hero from '../components/hero';

// If you change the hero image, you need to update the page query:
// - update filename regex,
// - update maxWidth to avoid blurry images.
const Homepage = ({ data }) => {
  const posts = data.allPost.nodes;
  const events = data.allEvent.nodes;
  return (
    <Layout title="Homepage" description={data.site.siteMetadata.description}>
      <Hero
        fluid={data.hero.nodes[0].fluid}
        title="View of Bern, Switzerland"
        alt="View of Bern, Switzerland. The river Aare with its distinct blue water is in the foreground. The hills surrounding Bern in the background."
        highlight={
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
            }}
          >
            <Heading
              as="h2"
              sx={{
                textAlign: ['center', 'left'],
                mb: [2, 3],
              }}
            >
              Call for session proposals
            </Heading>
            <Text
              as="p"
              sx={{ textAlign: ['center', 'left'], mb: [3, null, 4] }}
            >
              The call for session proposals for the United Nations World Data
              Forum 2020 is open. Please submit your proposals through 31
              January 2020.
            </Text>
            <Button variant="highlight">Submit your proposal</Button>
          </Flex>
        }
        promotion={
          <EventPreview
            align={['center', 'start']}
            event={{
              tag: events[0].displayType,
              title: (
                <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                  {events[0].title.text}
                </Heading>
              ),
              date: events[0].displayDate,
              duration: events[0].duration,
              links: {
                page: events[0].path,
                registration: events[0].registration,
              },
            }}
            variant="promotion"
          />
        }
        mt={-3}
        mb={[4, 5]}
      />
      <About mb={[4, 5]} />
      <Experience mb={[4, 5]} />
      <Container
        sx={{
          maxWidth: 'width.default',
          px: [2, 3, 4],
        }}
      >
        <Styled.h1>Webinars</Styled.h1>
        <Grid gap={[4, 5]} columns={[1, null, 2]} sx={{ mb: [4, 5] }}>
          {events.map(event => {
            const {
              id,
              displayType,
              title: { text: title },
              displayDate,
              duration,
              path,
              registration,
            } = event;
            return (
              <EventPreview
                event={{
                  tag: displayType,
                  title: (
                    <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                      {title}
                    </Heading>
                  ),
                  date: displayDate,
                  duration,
                  links: { page: path, registration },
                }}
                key={id}
              />
            );
          })}
        </Grid>
        <Styled.h1>Blog</Styled.h1>
        <Grid gap={[4, 5]} columns={[1, null, 2]}>
          {posts.map(post => {
            const {
              id,
              title: { text: title },
              date,
              authors,
              path,
            } = post;
            return (
              <PostPreview
                post={{
                  title: (
                    <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                      {title}
                    </Heading>
                  ),
                  date,
                  authors: (
                    <Names values={authors.map(({ name }) => name)} mb={3} />
                  ),
                  href: path,
                }}
                fontSize={[3, 4]}
                key={id}
              />
            );
          })}
        </Grid>
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
      limit: 4
      sort: { fields: date, order: DESC }
      filter: { collection: { eq: "blog" } }
    ) {
      nodes {
        id
        title {
          text
        }
        date(formatString: "MMM DD, YYYY")
        authors {
          name
        }
        path
      }
    }
    allEvent(
      limit: 4
      sort: { fields: startDate, order: DESC }
      filter: { type: { eq: "event" } }
    ) {
      nodes {
        id
        displayType
        title {
          childMdx {
            body
          }
          text
        }
        displayDate
        duration
        path
        registration
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
