import React from 'react';
import { object } from 'prop-types';
import {
  Avatars,
  Container,
  EventPreview,
  Heading,
  Link,
  NewTabLink,
  Layout,
  SEO,
  Themed,
} from '@undataforum/gatsby-theme-base';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useProfiles } from '@undataforum/gatsby-theme-profiles-core';

import messages from '../../../i18n/messages';

const ShadowedEventPage = ({ data, pageContext, location }) => {
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

  const { event } = data;

  // Format start date.
  const date = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'long',
  }).format(new Date(event.startDate));

  // Interpret moderators and speakers as profile IDs and retrieve matching profiles.
  const allProfiles = useProfiles();

  // Pull moderators from profiles.
  let moderators = [];
  if (event.moderators) {
    moderators = allProfiles.filter((profile) =>
      event.moderators.includes(profile.id)
    );
  }

  // Decorate moderators.
  moderators = moderators.map((profile) => ({
    ...profile,
    name: `${profile.name} (${intl.formatMessage({
      id: `${event.collection}.moderator`,
    })})`,
  }));

  // Pull speakers from profiles.
  let speakers = [];
  if (event.speakers) {
    speakers = allProfiles.filter((profile) =>
      event.speakers.includes(profile.id)
    );
  }

  // Merge (decorated) moderators and speakers.
  const profiles = [...moderators, ...speakers];

  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <SEO
          title={event.title}
          description={event.description.text}
          path={location.pathname}
        />
        <Container variant="narrow">
          <EventPreview
            event={{
              tag: intl.formatMessage({ id: `${event.collection}.tag` }),
              title: (
                <Heading as="h1" sx={{ textAlign: 'start', mb: 3 }}>
                  {event.title}
                </Heading>
              ),
              date,
              speakers: profiles.length > 0 && (
                <Avatars
                  values={profiles.map((profile) => ({
                    id: profile.id,
                    avatar: (
                      <Img
                        style={{ borderRadius: '100%' }}
                        alt={profile.name}
                        fixed={profile.avatar.childImageSharp.small}
                      />
                    ),
                    name: (
                      <Heading
                        as="div"
                        sx={{ fontSize: 1, textAlign: 'start' }}
                      >
                        {profile.name}
                      </Heading>
                    ),
                    href: profile.path,
                  }))}
                  mb={3}
                />
              ),
              registrationLink: event.registrationLink,
            }}
            mb={3}
          />
          <MDXRenderer>{event.body}</MDXRenderer>
          {event.attachments && event.attachments.length > 0 && (
            <>
              <Themed.h2>Presentations</Themed.h2>
              <ul>
                {event.attachments.map(({ base, publicURL }) => (
                  <li key={base}>
                    <Link as={NewTabLink} href={publicURL}>
                      {base}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

ShadowedEventPage.propTypes = {
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default ShadowedEventPage;
