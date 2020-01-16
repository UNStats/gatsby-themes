import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ title, description, keywords, lang, meta, creator }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            twitter
          }
        }
      }
    `
  );

  const prettyTitle = `${title} | ${site.siteMetadata.title}`;
  // Use site description as backup description.
  const metaDescription = description || site.siteMetadata.description;
  // Use site twitter username as backup creator.
  const twitterCreator = creator || site.siteMetadata.twitter;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={prettyTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: prettyTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:site',
          content: `@${site.siteMetadata.twitter}`,
        },
        {
          name: 'twitter:creator',
          content: `@${twitterCreator}`,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        ...(keywords.length > 0
          ? {
              name: 'keywords',
              content: keywords.join(', '),
            }
          : []),
        ...meta,
      ]}
    />
  );
};

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

Seo.propTypes = {
  title: string.isRequired,
  description: string,
  creator: string,
  keywords: arrayOf(string),
  lang: string,
  // Either { name, content } or { property, content } pairs.
  meta: arrayOf(object),
};

export default Seo;
