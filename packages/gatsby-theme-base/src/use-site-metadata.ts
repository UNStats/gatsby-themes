import { graphql, useStaticQuery } from 'gatsby';

type SiteMetadata = {
  siteTitle: string;
  siteDescription?: string;
  siteUrl: string;
  siteTwitter: string;
  siteLanguage: string;
};

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
