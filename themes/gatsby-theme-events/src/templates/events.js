import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import { Box, Names, Heading } from '@undataforum/components';
import { MDXRenderer } from '@undataforum/gatsby-theme-base';

import EventsPage from '../components/events-page';

const Events = ({ data, pageContext, location }) => {
  const events = data.allEvent.nodes.map(event => {
    const {
      id,
      displayType,
      title,
      displayDate,
      duration,
      moderators,
      speakers,
      description,
      registration,
      path,
    } = event;

    let profiles = speakers;
    // Add "(Moderator)" after name.
    // Combine moderators and speakers for EventPreview.
    if (moderators) {
      profiles = [
        ...moderators.map(moderator => ({
          ...moderator,
          name: `${moderator.name} (Moderator)`,
        })),
        ...speakers,
      ];
    }

    return {
      id,
      type: displayType,
      title() {
        return (
          <Heading as="h1" fontSize={[4, 5]} color="text">
            <MDXRenderer>{title.childMdx.body}</MDXRenderer>
          </Heading>
        );
      },
      date: displayDate,
      duration,
      speakers() {
        return <Names values={profiles.map(({ name }) => name)} mb={3} />;
      },
      description() {
        return (
          <Box color="text">
            <MDXRenderer>{description.childMdx.body}</MDXRenderer>
          </Box>
        );
      },
      links: { page: path, registration },
    };
  });
  return (
    <EventsPage
      events={events}
      title={pageContext.title}
      description={pageContext.description}
      location={location}
    />
  );
};

Events.propTypes = {
  data: shape({ allEvent: object.isRequired }).isRequired,
  pageContext: shape({
    title: string.isRequired,
    description: string,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Events;

export const pageQuery = graphql`
  query($type: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { type: { eq: $type } }
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
        moderators {
          name
        }
        speakers {
          name
        }
        description {
          childMdx {
            body
          }
          text
        }
        registration
        path
      }
    }
  }
`;
