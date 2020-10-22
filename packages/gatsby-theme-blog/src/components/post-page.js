import React from 'react';
import { object, shape, string, arrayOf } from 'prop-types';
import { Container, Heading } from 'theme-ui';
import { Avatars, PostPreview } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Img from 'gatsby-image';

import messages from '../i18n/messages';

const PostPage = ({ data, pageContext: { lang }, location }) => {
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
    date,
    authors,
    description,
    body,
    images,
  } = data.post;

  // If post defines images in frontmatter, extract fluid images.
  const fluidImages = images
    ? images.map((image) => image.childImageSharp.fluid)
    : undefined;
  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <Seo title={title.text} description={description.text} />
        <Container variant="narrow">
          <PostPreview
            post={{
              tag: intl.formatMessage({ id: `${collection}.tag` }),
              title: (
                <Heading as="h1" sx={{ textAlign: 'start', mb: 3 }}>
                  {title.text}
                </Heading>
              ),
              date,
              authors: authors ? (
                <Avatars
                  values={authors.map((author) => ({
                    id: author.id,
                    avatar: (
                      <Img
                        style={{ borderRadius: '100%' }}
                        alt={author.name}
                        fixed={author.avatar.childImageSharp.fixed}
                      />
                    ),
                    name: (
                      <Heading
                        as="div"
                        sx={{ fontSize: 1, textAlign: 'start' }}
                      >
                        {author.name}
                      </Heading>
                    ),
                    href: author.path,
                  }))}
                  mb={3}
                />
              ) : undefined,
            }}
            mb={[3, 4]}
          />
          <MDXRenderer images={fluidImages}>{body}</MDXRenderer>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

PostPage.propTypes = {
  data: shape({
    post: shape({
      title: shape({ text: string.isRequired }).isRequired,
      date: string.isRequired,
      authors: arrayOf(object.isRequired),
      description: shape({ text: string.isRequired }).isRequired,
      body: string.isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: shape({
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default PostPage;
