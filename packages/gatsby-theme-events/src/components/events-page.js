import React from 'react';
import { arrayOf, node, shape, string } from 'prop-types';
import { Container, Grid, Heading, Styled } from 'theme-ui';
import { EventPreview, Names } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';

import messages from '../i18n/messages';
import decorate from '../../utils/decorate-moderators';

const EventsPage = ({
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
      <Layout location={location}>
        <Seo
          title={intl.formatMessage({ id: `${collection}.title` })}
          description={intl.formatMessage({ id: `${collection}.description` })}
        />
        <Container>
          <Styled.h1>
            <FormattedMessage id={`${collection}.title`} />
          </Styled.h1>
          {blurb}
          <Grid gap={4} columns={[1, null, 2]}>
            {events.map((event) => {
              const {
                id,
                title,
                displayDate,
                duration,
                moderators,
                speakers,
                description,
                registrationLink,
                path,
              } = event;

              // Consolidate moderators and speakers for EventPreview.
              let profiles;
              if (moderators && speakers) {
                profiles = [
                  ...decorate(moderators, lang, messages, collection),
                  ...speakers,
                ];
              } else if (moderators) {
                profiles = decorate(moderators, lang, messages, collection);
              } else {
                profiles = speakers;
              }

              return (
                <EventPreview
                  key={id}
                  event={{
                    tag: intl.formatMessage({ id: `${collection}.tag` }),
                    title: (
                      <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                        {title.text}
                      </Heading>
                    ),
                    date: displayDate,
                    duration,
                    speakers: profiles && (
                      <Names values={profiles.map(({ name }) => name)} mb={3} />
                    ),
                    description: description && (
                      <MDXRenderer>{description.childMdx.body}</MDXRenderer>
                    ),
                    registrationLink,
                    href: path,
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
  blurb: node,
  data: shape({
    allEvent: shape({
      nodes: arrayOf(
        shape({
          title: shape({ text: string.isRequired }).isRequired,
          displayDate: string.isRequired,
          duration: string.isRequired,
          moderators: arrayOf(shape({ name: string.isRequired }).isRequired),
          speakers: arrayOf(shape({ name: string.isRequired }).isRequired),
          description: shape({
            childMdx: shape({ body: string.isRequired }).isRequired,
          }),
          registrationLink: string,
          path: string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: shape({
    collection: string.isRequired,
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default EventsPage;
