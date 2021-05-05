import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@undataforum/gatsby-theme-base/src';
import {
  Container,
  EventPreview,
  Grid,
  Heading,
  Layout,
  Styled,
} from '@undataforum/gatsby-theme-theme-ui';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import messages from '../../../i18n/messages';

const EventsPage = ({ data, pageContext, location }) => {
  const events = data.allEvent.nodes;
  // We need to localize props that are not React components:
  // https://github.com/formatjs/react-intl/blob/master/docs/API.md#createintl
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: pageContext.lang,
      messages: messages[pageContext.lang],
    },
    cache
  );

  // Format start date.

  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <SEO
          title={intl.formatMessage({ id: `${pageContext.collection}.title` })}
          description={intl.formatMessage({
            id: `${pageContext.collection}.description`,
          })}
          path={location.pathname}
        />
        <Container>
          <Styled.h1>
            <FormattedMessage id={`${pageContext.collection}.title`} />
          </Styled.h1>
          <Grid gap={4} columns={[1, null, 2]}>
            {events.map((event) => {
              // Format start date.
              const date = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'long',
              }).format(new Date(event.startDate));
              return (
                <EventPreview
                  key={event.id}
                  event={{
                    tag: intl.formatMessage({ id: `${event.collection}.tag` }),
                    title: (
                      <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                        {event.title}
                      </Heading>
                    ),
                    date,
                    speakers: undefined,
                    description: event.description && (
                      <MDXRenderer>{event.description.body}</MDXRenderer>
                    ),
                    registrationLink: event.registrationLink,
                    href: event.path,
                  }}
                />
              );
            })}
          </Grid>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

EventsPage.propTypes = {
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default EventsPage;
