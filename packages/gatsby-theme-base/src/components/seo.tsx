import React from 'react';
import Helmet from 'react-helmet';
import { createPath } from '@maiertech/gatsby-helpers';

import useSiteMetadata from '../use-site-metadata';

type Props = {
  title: string;
  description: string;
  path: string;
  lang?: string;
  keywords?: string[];
  canonicalUrl?: string;
  children?: React.ReactNode;
};

const SEO = ({
  title,
  description,
  path,
  canonicalUrl,
  lang,
  keywords,
  children,
}: Props) => {
  const { siteTitle, siteUrl, siteLanguage, siteTwitter } = useSiteMetadata();

  const url = canonicalUrl
    ? canonicalUrl
    : (createPath(siteUrl, path) as string);

  return (
    <Helmet
      title={title}
      defaultTitle={siteTitle}
      titleTemplate={`%s | ${siteTitle}`}
    >
      <html lang={lang || siteLanguage || 'en'} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={siteTwitter} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Helmet>
  );
};

export default SEO;
