import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { Container, GridList, EventPreview } from '@undataforum/components';
import { H1, Layout, Seo } from '@undataforum/gatsby-theme-base';

const EventsPage = ({ events, title, description, location }) => (
  <Layout location={location}>
    <Seo title={title} description={description} />
    <Container maxWidth={7} px={[2, 3, 0]}>
      <H1>{title}</H1>
      <GridList
        align="center"
        gridGap={3}
        gridTemplateColumns="1fr"
        render={({ id, ...event }) => (
          <EventPreview event={{ ...event }} mb={3} key={id} />
        )}
        values={events}
      />
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
      href: string.isRequired,
    })
  ).isRequired,
  title: string.isRequired,
  description: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default EventsPage;
