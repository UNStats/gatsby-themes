import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@undataforum/gatsby-theme-base';
import {
  Container,
  Grid,
  Heading,
  Layout,
  Link,
  Styled,
} from '@undataforum/gatsby-theme-theme-ui';
import { Link as GatsbyLink } from 'gatsby';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';

import messages from '../../../i18n/messages';
import TaggedItem from '../../../components/tagged-item';

const ShadowedTagPage = ({ data, pageContext, location }) => {
  // We need to localize props that are not React components:
  // https://github.com/formatjs/react-intl/blob/master/docs/API.md#createintl
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: pageContext.lang,
      messages: messages.en,
    },
    cache
  );

  const { tag } = pageContext;
  const taggedItems = data.allMdx.nodes.map(
    ({ id, frontmatter: { title, date }, fields: { collection, path } }) => ({
      id,
      path,
      collection,
      title: (
        <Heading
          as="h2"
          sx={{
            variant: 'styles.h2',
            // Override color from variant.
            color: 'inherit',
            mb: 1,
          }}
        >
          {title}
        </Heading>
      ),
      date,
    })
  );
  return (
    // We would normally use `IntlProvider`, but we already have `intl` and therefore reuse it with RawIntlProvider.
    <RawIntlProvider value={intl}>
      <Layout location={location}>
        <SEO
          title={tag}
          description={`Content tagged with: ${tag}.`}
          path={location.pathname}
        />
        <Container>
          <Styled.h1>{`Content tagged with: ${tag}`}</Styled.h1>

          <Grid gap={3} columns={1}>
            {taggedItems.map(({ id, path, collection, ...taggedItem }) => (
              // Gatsby Link uses `to` instaead of `href`.
              <Link as={GatsbyLink} key={id} to={path}>
                <TaggedItem
                  {...{
                    ...taggedItem,
                    type: intl.formatMessage({
                      id: `${collection}.tag`,
                    }),
                  }}
                  mb={3}
                />
              </Link>
            ))}
          </Grid>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

ShadowedTagPage.propTypes = {
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default ShadowedTagPage;
