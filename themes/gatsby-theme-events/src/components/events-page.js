import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import {
  Container,
  Grid,
  Heading,
  EventPreview,
} from '@undataforum/components';
import { Layout } from '@undataforum/gatsby-theme-base';

const EventsPage = ({ events, title, description, location }) => (
  <Layout location={location} title={title} description={description}>
    <Container>
      <Heading as="h1" sx={{ mb: [3, null, 4] }}>
        {title}
      </Heading>
      <Grid gap={4} columns={[1, null, 2]}>
        {events.map(({ id, ...event }) => (
          <EventPreview event={{ ...event }} key={id} />
        ))}
      </Grid>
    </Container>
  </Layout>
);

EventsPage.propTypes = {
  events: arrayOf(
    shape({
      id: string.isRequired,
      title: func.isRequired,
      speakers: func.isRequired,
      date: string.isRequired,
      duration: string.isRequired,
      description: func.isRequired,
      links: shape({
        page: string.isRequired,
        registration: string,
      }),
    })
  ).isRequired,
  title: string.isRequired,
  description: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default EventsPage;
