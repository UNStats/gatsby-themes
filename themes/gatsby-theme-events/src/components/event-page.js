import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Container, Heading, Link, Styled } from 'theme-ui';
import { Avatars, EventPreview, NewTabLink } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Img from 'gatsby-image';

import messages from '../i18n/messages';
import decorate from '../../utils/decorate-moderators';

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
    title,
    displayDate,
    duration,
    moderators,
    speakers,
    description,
    registrationLink,
    body,
  } = data.event;

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

  // Process attachments.
  const attachments = data.allFile.nodes.map(({ base, publicURL }) => ({
    text: base,
    href: publicURL,
  }));

  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <Seo title={title.text} description={description.text} />
        <Container sx={{ maxWidth: 'width.narrow', px: [2, 3, 4] }}>
          <EventPreview
            event={{
              tag: intl.formatMessage({ id: `${collection}.tag` }),
              title: (
                <Heading as="h1" sx={{ textAlign: 'start', mb: 3 }}>
                  {title.text}
                </Heading>
              ),
              date: displayDate,
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
                    <Link as={NewTabLink} href={href} variant="primary">
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
  data: shape({
    event: shape({
      collection: string.isRequired,
      title: shape({ text: string.isRequired }).isRequired,
      displayDate: string.isRequired,
      duration: string.isRequired,
      moderators: arrayOf(shape({ name: string.isRequired }).isRequired),
      speakers: arrayOf(shape({ name: string.isRequired }).isRequired),
      registrationLink: string,
      body: string.isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: shape({
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Event;
