import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@undataforum/gatsby-theme-base';
import {
  Container,
  Grid,
  Heading,
  Layout,
  Link,
  PostPreview,
  ProfilePreview,
  Styled,
} from '@undataforum/gatsby-theme-theme-ui';
import Img from 'gatsby-image';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { usePosts } from '@undataforum/gatsby-theme-posts-core';

import messages from '../../../i18n/messages';

const ShadowedProfilePage = ({ data, pageContext, location }) => {
  const { profile } = data;

  // Interpret post authors as profile IDs and retrieve matching posts for current profile.
  const posts = usePosts((post) =>
    post.authors ? post.authors.includes(profile.id) : false
  );

  return (
    <IntlProvider
      locale={pageContext.lang}
      messages={messages[pageContext.lang]}
    >
      <Layout location={location}>
        <SEO
          title={profile.name}
          description={profile.description}
          path={location.pathname}
        />
        <Container variant="narrow">
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
                <Heading as="h1" sx={{ textAlign: 'center', mb: 1 }}>
                  {profile.name}
                </Heading>
              ),
              jobtitle: profile.jobtitle,
              organization: profile.organization,
              badges: profile.roles,
            }}
            mb={4}
          />
          <MDXRenderer>{profile.body}</MDXRenderer>
          {posts.length > 0 && (
            <>
              <Styled.h2>
                <FormattedMessage
                  id="relatedPosts"
                  values={{ name: profile.name }}
                />
              </Styled.h2>
              <Grid gap={3} columns={1}>
                {posts.map(({ id, ...post }) => (
                  <Link
                    key={id}
                    href={post.path}
                    sx={{
                      color: 'primary',
                    }}
                  >
                    <PostPreview
                      post={{
                        title: (
                          <Heading
                            as="h3"
                            sx={{
                              textAlign: 'start',
                              mb: 1,
                            }}
                          >
                            {post.title}
                          </Heading>
                        ),
                        date: post.date,
                      }}
                    />
                  </Link>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Layout>
    </IntlProvider>
  );
};

ShadowedProfilePage.propTypes = {
  data: object.isRequired,
  pageContext: object.isRequired,
  location: object.isRequired,
};

export default ShadowedProfilePage;
