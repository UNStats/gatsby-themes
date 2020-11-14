import { graphql, useStaticQuery } from 'gatsby';

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

  return data.site.siteMetadata;
};

export default useSiteMetadata;
