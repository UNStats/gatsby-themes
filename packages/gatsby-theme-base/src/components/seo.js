import React from 'react';
import { arrayOf, oneOfType, shape, string } from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({
  title: pageTitle,
  authors = [],
  description: pageDescription,
  keywords: pageKeywords = [],
  lang = 'en',
  meta = [],
  authorTwitterUsernames = [],
}) => {
  // Read site metadata from gatsby-config.js.
  const {
    site: {
      siteMetadata: {
        title: siteTitle,
        description: siteDescription,
        keywords: siteKeywords = [],
        siteTwitterUsername,
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            siteTwitterUsername
          }
        }
      }
    `
  );

  // Create a pretty title.
  const metaTitle = `${pageTitle} | ${siteTitle}`;

  // Use site description as fallback if no description is provided.
  const metaDescription = pageDescription || siteDescription;

  const keywords = [...siteKeywords, ...pageKeywords];

  // Open Graph meta tags.
  const ogMeta = [
    {
      property: 'og:title',
      content: metaTitle,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ];

  // Twitter meta tags.
  let twitterMeta = [
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: metaTitle,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ];
  if (siteTwitterUsername) {
    twitterMeta = [
      ...twitterMeta,
      {
        name: 'twitter:site',
        content: `@${siteTwitterUsername}`,
      },
    ];
  }
  if (authorTwitterUsernames.length > 0) {
    twitterMeta = [
      ...twitterMeta,
      ...authorTwitterUsernames.map((authorTwitterUsername) => ({
        name: 'twitter:creator',
        content: `@${authorTwitterUsername}`,
      })),
    ];
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        // Authors.
        ...authors.map((author) => ({ name: 'author', content: author })),
        // Description.
        {
          name: 'description',
          content: metaDescription,
        },
        // Keywords.
        {
          name: 'keywords',
          content: keywords.join(', '),
        },
        // Open Graph meta.
        ...ogMeta,
        // Twitter meta.
        ...twitterMeta,
        // Other meta.
        ...meta,
      ]}
    />
  );
};

Seo.propTypes = {
  title: string.isRequired,
  authors: arrayOf(string),
  description: string,
  keywords: arrayOf(string),
  lang: string,
  authorTwitterUsernames: arrayOf(string),
  meta: arrayOf(
    oneOfType([
      shape({ name: string.isRequired, content: string.isRequired }),
      shape({ property: string.isRequired, content: string.isRequired }),
    ]).isRequired
  ),
};

export default Seo;
