import React from 'react';
import { object, shape, string } from 'prop-types';
import { Button, Container, Flex, Grid, Heading, Styled, Text } from 'theme-ui';
import { EventPreview, Names, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';
import { graphql } from 'gatsby';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import { messages } from '@undataforum/gatsby-theme-events';

import About from '../components/about';
import Experience from '../components/experience';
import Hero from '../components/hero';

// If you change the hero image, you need to update the page query:
// - update filename regex,
// - update maxWidth to avoid blurry images.
const Homepage = ({ data, location }) => {
  const posts = data.allPost.nodes;
  const events = data.allEvent.nodes;

  // We need to localize props that are not React components:
  // https://github.com/formatjs/react-intl/blob/master/docs/API.md#createintl
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: 'en',
      messages: messages.en,
    },
    cache
  );

  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <Seo
          title="Homepage"
          description={data.site.siteMetadata.description}
        />
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
                tag: intl.formatMessage({ id: `${events[0].collection}.tag` }),
                title: (
                  <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                    {events[0].title.text}
                  </Heading>
                ),
                date: events[0].displayDate,
                duration: events[0].duration,
                registrationLink: events[0].registrationLink,
                href: events[0].path,
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
                collection,
                title: { text: title },
                displayDate,
                duration,
                path,
                registrationLink,
              } = event;
              return (
                <EventPreview
                  event={{
                    tag: intl.formatMessage({ id: `${collection}.tag` }),
                    title: (
                      <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                        {title}
                      </Heading>
                    ),
                    date: displayDate,
                    duration,
                    registrationLink,
                    href: path,
                  }}
                  key={id}
                />
              );
            })}
          </Grid>
          <Styled.h1>Latest articles</Styled.h1>
          <Grid gap={[4, 5]} columns={[1, null, 2]}>
            {posts.map(post => {
              const { id, title, date, authors, description, path } = post;
              return (
                <PostPreview
                  post={{
                    title: (
                      <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                        {title.text}
                      </Heading>
                    ),
                    date,
                    // Authors prop is optional.
                    authors: authors ? (
                      <Names values={authors.map(({ name }) => name)} mb={3} />
                    ) : (
                      undefined
                    ),
                    // Description is optional.
                    description: description ? (
                      <MDXRenderer>{description.childMdx.body}</MDXRenderer>
                    ) : (
                      undefined
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
    </RawIntlProvider>
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
    allPost(limit: 4, sort: { fields: date, order: DESC }) {
      nodes {
        id
        title {
          text
        }
        date(formatString: "MMM DD, YYYY")
        authors {
          name
        }
        description {
          childMdx {
            body
          }
        }
        path
      }
    }
    allEvent(
      limit: 4
      sort: { fields: startDate, order: DESC }
      filter: { collection: { eq: "webinars" } }
    ) {
      nodes {
        id
        collection
        title {
          childMdx {
            body
          }
          text
        }
        displayDate
        duration
        registrationLink
        path
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
