import React from 'react';
import { node, object, shape, string } from 'prop-types';
import { Container, Grid, Heading, Link, Styled } from 'theme-ui';
import { ProfilePreview } from '@undataforum/components';
import { Layout, Seo } from '@undataforum/gatsby-theme-base';
import Img from 'gatsby-image';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';

import messages from '../i18n/messages';

const Profiles = ({
  blurb,
  data,
  pageContext: { collection, lang },
  location,
}) => {
  const profiles = data.allProfile.nodes;
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
          <Grid gap={4} columns={[1, 2, 3]}>
            {profiles.map(({ id, path, ...profile }) => {
              const {
                avatar: {
                  childImageSharp: { fixed },
                },
                honorific,
                name,
                jobtitle,
                organization,
              } = profile;
              return (
                <Link
                  key={id}
                  sx={{
                    color: 'inherit',
                    ':hover': { textDecoration: 'none' },
                  }}
                  href={path}
                >
                  <ProfilePreview
                    profile={{
                      avatar: (
                        <Img
                          style={{ borderRadius: '100%' }}
                          alt={name}
                          fixed={fixed}
                        />
                      ),
                      honorific,
                      name: (
                        <Heading as="h2" sx={{ textAlign: 'center', mb: 1 }}>
                          {name}
                        </Heading>
                      ),
                      jobtitle,
                      organization,
                    }}
                  />
                </Link>
              );
            })}
          </Grid>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

Profiles.propTypes = {
  blurb: node,
  data: shape({ allProfile: object.isRequired }).isRequired,
  pageContext: shape({
    collection: string.isRequired,
    lang: string.isRequired,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Profiles;
