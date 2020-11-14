import React from 'react';
import { node, object } from 'prop-types';
import {
  Container,
  Grid,
  Heading,
  Layout,
  Names,
  PostPreview,
  SEO,
  Styled,
} from '@undataforum/gatsby-theme-base';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useProfiles } from '@undataforum/gatsby-theme-profiles-core';
import _filter from 'lodash.filter';

import messages from '../../../i18n/messages';

const ShadowedPostsPage = ({ blurb, data, pageContext, location }) => {
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

  // Retrieve all profiles (sorted).
  const profiles = useProfiles();

  // Map author IDs to names.
  const posts = data.allPost.nodes.map((post) => ({
    ...post,
    // Select all profiles whose ID is in post.authors.
    authors: post.authors
      ? _filter(profiles, (profile) => post.authors.includes(profile.id)).map(
          (profile) => profile.name
        )
      : undefined,
  }));

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
          {blurb}
          <Grid gap={4} columns={[1, null, 2]}>
            {posts.map((post) => (
              <PostPreview
                key={post.id}
                post={{
                  title: (
                    <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                      {post.title}
                    </Heading>
                  ),
                  // Authors is optional.
                  authors: post.authors && (
                    <Names values={post.authors} mb={3} />
                  ),
                  date: post.date,
                  // Description is optional.
                  description: (
                    <MDXRenderer>{post.description.body}</MDXRenderer>
                  ),
                  href: post.path,
                }}
              />
            ))}
          </Grid>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

ShadowedPostsPage.propTypes = {
  blurb: node,
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default ShadowedPostsPage;
