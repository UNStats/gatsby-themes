import { graphql, useStaticQuery } from 'gatsby';

import { SiteMetadata } from './types';

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteTwitter
          siteLanguage
        }
      }
    }
  `);

  return data.site.siteMetadata as SiteMetadata;
};

export default useSiteMetadata;
