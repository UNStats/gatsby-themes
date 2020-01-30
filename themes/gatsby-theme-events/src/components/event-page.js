import React from 'react';
import { func, shape, string, arrayOf } from 'prop-types';
import { Container, Link, Styled } from 'theme-ui';
import { EventPreview, NewTabLink } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';

const EventPage = ({
  event,
  title,
  description,
  attachments,
  body,
  location,
}) => (
  <Layout location={location} title={title} description={description}>
    <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
      <EventPreview event={event} mb={3} />
      <MDXRenderer>{body}</MDXRenderer>
      {attachments.length > 0 && (
        <>
          <Styled.h2>Presentations</Styled.h2>
          <ul>
            {attachments.map(({ text, href }) => (
              <li key={text}>
                <Link as={NewTabLink} variant="branded" href={href}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
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
  attachments: arrayOf(
    shape({ text: string.isRequired, href: string.isRequired })
  ),
  body: string.isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default EventPage;
