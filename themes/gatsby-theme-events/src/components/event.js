import React from 'react';
import { shape, string, object } from 'prop-types';
import { Container, Heading, Link, Styled } from 'theme-ui';
import { Avatars, EventPreview, NewTabLink } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Img from 'gatsby-image';

import messages from '../i18n/messages';

const Event = ({ data, pageContext: { lang }, location }) => {
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

  // Data from GraphQL query.
  const {
    collection,
    title: { text: title },
    displayDate: date,
    duration,
    moderators,
    speakers,
    description: { text: description },
    registrationLink,
    body,
  } = data.event;

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

  // Process attachments.
  const attachments = data.allFile.nodes.map(({ base, publicURL }) => ({
    text: base,
    href: publicURL,
  }));

  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location} title={title} description={description}>
        <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
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
                <Avatars
                  values={profiles.map(profile => ({
                    id: profile.id,
                    avatar: (
                      <Img
                        style={{ borderRadius: '100%' }}
                        alt={profile.name}
                        fixed={profile.avatar.childImageSharp.fixed}
                      />
                    ),
                    name: profile.name,
                    href: profile.path,
                  }))}
                  mb={3}
                />
              ),
              registrationLink,
            }}
            mb={3}
          />
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
    </RawIntlProvider>
  );
};

Event.propTypes = {
  data: shape({ event: object.isRequired }).isRequired,
  pageContext: shape({
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Event;
