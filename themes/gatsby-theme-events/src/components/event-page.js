import React from 'react';
import { func, shape, string } from 'prop-types';
import { Container, EventPreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';

const EventPage = ({ event, title, description, body, location }) => (
  <Layout location={location} title={title} description={description}>
    <Container maxWidth="narrow">
      <EventPreview event={event} mb={[3, 4]} />
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  </Layout>
);

EventPage.propTypes = {
  event: shape({
    type: string.isRequired,
    title: func.isRequired,
    date: string.isRequired,
    duration: string.isRequired,
    speakers: func.isRequired,
    links: shape({
      registration: string,
    }),
  }).isRequired,
  title: string.isRequired,
  description: string.isRequired,
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default EventPage;
