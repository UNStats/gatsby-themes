import React from 'react';
import { node, object, shape, string } from 'prop-types';
import { Container, Grid, Heading, Styled } from 'theme-ui';
import { Names, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer } from '@undataforum/gatsby-theme-base';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';

import messages from '../i18n/messages';

const Posts = ({
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
            {posts.map(post => {
              const {
                id,
                title: { text: title },
                authors,
                date,
                description: {
                  childMdx: { body },
                },
                path,
              } = post;
              return (
                <PostPreview
                  post={{
                    title: (
                      <Heading as="h2" sx={{ textAlign: 'start', mb: 3 }}>
                        {title}
                      </Heading>
                    ),
                    authors: (
                      <Names values={authors.map(({ name }) => name)} mb={3} />
                    ),
                    date,
                    description: <MDXRenderer>{body}</MDXRenderer>,
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

Posts.propTypes = {
  blurb: node,
  data: shape({ allPost: object.isRequired }).isRequired,
  pageContext: shape({
    collection: string.isRequired,
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Posts;
