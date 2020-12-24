import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@undataforum/gatsby-theme-base';
import {
  Container,
  Grid,
  Heading,
  Layout,
  Link,
  ProfilePreview,
  Styled,
} from '@undataforum/gatsby-theme-theme-ui';
import Img from 'gatsby-image';
import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  RawIntlProvider,
} from 'react-intl';

import messages from '../../../i18n/messages';

const ShadowedProfilesPage = ({ data, pageContext, location }) => {
  const profiles = data.allProfile.nodes;
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
          <Grid gap={4} columns={[1, 2, 3]}>
            {profiles.map(({ id, path, ...profile }) => (
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
                        alt={profile.name}
                        fixed={profile.avatar.childImageSharp.large}
                      />
                    ),
                    honorific: profile.honorific,
                    name: (
                      <Heading as="h2" sx={{ textAlign: 'center', mb: 1 }}>
                        {profile.name}
                      </Heading>
                    ),
                    jobtitle: profile.jobtitle,
                    organization: profile.organization,
                  }}
                />
              </Link>
            ))}
          </Grid>
        </Container>
      </Layout>
    </RawIntlProvider>
  );
};

ShadowedProfilesPage.propTypes = {
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default ShadowedProfilesPage;
