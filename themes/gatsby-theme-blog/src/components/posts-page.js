import React from 'react';
import { node, shape, string, arrayOf } from 'prop-types';
import { Container, Grid, Heading, Styled } from 'theme-ui';
import { Names, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';

import messages from '../i18n/messages';

const PostsPage = ({
  blurb,
  data,
  pageContext: { collection, lang },
  location,
}) => {
  const posts = data.allPost.nodes;
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
        <Container sx={{ maxWidth: 'width.default', px: [2, 3, 4] }}>
          <Styled.h1>
            <FormattedMessage id={`${collection}.title`} />
          </Styled.h1>
          {blurb}
          <Grid gap={4} columns={[1, null, 2]}>
            {posts.map((post) => {
              const { id, title, authors, date, description, path } = post;
              return (
                <PostPreview
                  post={{
                    title: (
                      <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                        {title.text}
                      </Heading>
                    ),
                    // Authors is optional.
                    authors: authors && (
                      <Names values={authors.map(({ name }) => name)} mb={3} />
                    ),
                    date,
                    // Description is optional.
                    description: description && (
                      <MDXRenderer>{description.childMdx.body}</MDXRenderer>
                    ),
                    href: path,
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

PostsPage.propTypes = {
  blurb: node,
  data: shape({
    allPost: shape({
      nodes: arrayOf(
        shape({
          title: shape({ text: string.isRequired }).isRequired,
          authors: arrayOf(shape({ name: string.isRequired }).isRequired),
          date: string.isRequired,
          description: shape({
            childMdx: shape({ body: string.isRequired }).isRequired,
          }),
          path: string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }),
  pageContext: shape({
    collection: string.isRequired,
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default PostsPage;
