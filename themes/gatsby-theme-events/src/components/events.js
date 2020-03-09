import React from 'react';
import { node, object, shape, string } from 'prop-types';
import { Container, Grid, Heading, Styled } from 'theme-ui';
import { EventPreview, Names } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';

import messages from '../i18n/messages';

const Events = ({
  blurb,
  data,
  pageContext: { collection, lang },
  location,
}) => {
  const events = data.allEvent.nodes;
  // We need to localize props that are not React components:
  // https://github.com/formatjs/react-intl/blob/master/docs/API.md#createintl
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: lang,
      messages: messages[lang],
    },
    cache
  );
  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout
        location={location}
        title={intl.formatMessage({ id: `${collection}.title` })}
        description={intl.formatMessage({ id: `${collection}.description` })}
      >
        <Container sx={{ maxWidth: 'width.default', px: [2, 3, 4] }}>
          <Styled.h1>
            <FormattedMessage id={`${collection}.title`} />
          </Styled.h1>
          {blurb}
          <Grid gap={4} columns={[1, null, 2]}>
            {events.map(event => {
              const {
                id,
                title: { text: title },
                displayDate: date,
                duration,
                moderators,
                speakers,
                description: {
                  childMdx: { body },
                },
                registrationLink,
                path: href,
              } = event;
              // EventPreview has speakers prop only and does not distinguish between moderators and speakers.
              // Consolidate moderators and speakers into profiles. Add "(Moderator)" after moderator's name.
              let profiles = speakers;
              if (moderators) {
                profiles = [
                  ...moderators.map(moderator => ({
                    ...moderator,
                    name: `${moderator.name} (${intl.formatMessage({
                      id: `${collection}.moderator`,
                    })})`,
                  })),
                  ...speakers,
                ];
              }
              return (
                <EventPreview
                  event={{
                    tag: intl.formatMessage({ id: `${collection}.tag` }),
                    title: (
                      <Heading as="h1" sx={{ textAlign: 'start', mb: 3 }}>
                        {title}
                      </Heading>
                    ),
                    date,
                    duration,
                    speakers: profiles && (
                      <Names values={profiles.map(({ name }) => name)} mb={3} />
                    ),
                    description: <MDXRenderer>{body}</MDXRenderer>,
                    registrationLink,
                    href,
                  }}
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

Events.propTypes = {
  blurb: node,
  data: shape({ allEvent: object.isRequired }).isRequired,
  pageContext: shape({
    collection: string.isRequired,
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Events;
