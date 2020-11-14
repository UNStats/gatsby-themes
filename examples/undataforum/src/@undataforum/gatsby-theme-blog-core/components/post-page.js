import React from 'react';
import { object } from 'prop-types';
import {
  Avatars,
  Container,
  Heading,
  Layout,
  PostPreview,
  SEO,
} from '@undataforum/gatsby-theme-base';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useProfiles } from '@undataforum/gatsby-theme-profiles-core';

import messages from '../../../i18n/messages';

const ShadowedPostPage = ({ data, pageContext, location }) => {
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

  const { post } = data;

  // Interpret post authors as profile IDs and retrieve matching profiles.
  const profiles = useProfiles((profile) =>
    post.authors ? post.authors.includes(profile.id) : false
  );

  // Assemble Avatars component.
  const authors =
    profiles.length > 0 ? (
      <Avatars
        values={profiles.map((author) => ({
          id: author.id,
          avatar: (
            <Img
              style={{ borderRadius: '100%' }}
              alt={author.name}
              fixed={author.avatar.childImageSharp.small}
            />
          ),
          name: (
            <Heading as="div" sx={{ fontSize: 1, textAlign: 'start' }}>
              {author.name}
            </Heading>
          ),
          href: author.path,
        }))}
        mb={3}
      />
    ) : undefined;

  // If post defines images in frontmatter, extract fluid images.
  const fluidImages = post.images
    ? post.images.map((image) => image.childImageSharp.fluid)
    : undefined;
  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <SEO
          title={post.title}
          description={post.description.text}
          path={location.pathname}
        />
        <Container variant="narrow">
          <PostPreview
            post={{
              tag: intl.formatMessage({ id: `${post.collection}.tag` }),
              title: (
                <Heading as="h1" sx={{ textAlign: 'start', mb: 3 }}>
                  {post.title}
                </Heading>
              ),
              date: post.date,
              authors,
            }}
            mb={[3, 4]}
          />
          <MDXRenderer images={fluidImages}>{post.body}</MDXRenderer>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

ShadowedPostPage.propTypes = {
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default ShadowedPostPage;
