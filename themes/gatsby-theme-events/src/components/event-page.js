import React from 'react';
import { func, shape, string } from 'prop-types';
import { Container, EventPreview } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';

const EventPage = ({ event, title, description, body, location }) => (
  <Layout location={location}>
    <Seo title={title} description={description} />
    <Container maxWidth={7} px={[2, 3, 0]}>
      <EventPreview event={event} mb={[3, 4]} />
      <MDXRenderer>{body}</MDXRenderer>
    </Container>
  </Layout>
);

EventPage.propTypes = {
  event: shape({
    type: string.isRequired,
    title: func.isRequired,
    start: string.isRequired,
    duration: string.isRequired,
    speakers: func.isRequired,
  }).isRequired,
  title: string.isRequired,
  description: string.isRequired,
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default EventPage;
