/** Supported theme options. */
export interface ThemeOptions {
  /** Set this flag to true if gatsby-plugin-mdx is already configured for your site.  */
  mdxOtherwiseConfigured: boolean;
}

/** Options can include unsupported theme options that are passed into templates. */
export type Options = { [key: string]: any };

/** Site metadata needs to be defined in a site's `gatsby-config.js` under the `siteMetadata` key. */
export type SiteMetadata = {
  /** Site title for SEO.  */
  siteTitle: string;
  /** Site description for SEO in homepage.  */
  siteDescription?: string;
  /** URL from which the production site is served. Used for sitemap creation. */
  siteUrl: string;
  /** Site Twitter username for SEO. Can be set to `''`. */
  siteTwitter: string;
  /** Default site language. */
  siteLanguage: string;
};
