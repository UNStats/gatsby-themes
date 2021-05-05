# @undataforum/gatsby-theme-base

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) that does the following:

1. It adds selected [Gatsby plugins](https://www.gatsbyjs.com/plugins/) that are
   required in every [@UNDataForum](https://github.com/UNDataForum) website to
   `gatsby-config.js`.

1. It exports the `SEO` component that can be used in templates to add SEO
   metadata.

1. It and generates standardized pages (from MDX files) that need to be present
   in every website.

## Options

Theme options are documented in type [ThemeOptions](./src/types.ts). You can
lookup theme option defaults in file [theme-options.ts](./src/theme-options.ts).

## Site metadata

To make the `SEO` component work, you need to define the following
[site metadata](https://www.gatsbyjs.com/docs/gatsby-config/#sitemetadata) in
your site's `gatsby-config.js`:

| Key             | Required | Description                                                              |
| :-------------- | :------- | :----------------------------------------------------------------------- |
| siteTitle       | ✓        | Site title for SEO.                                                      |
| siteDescription |          | Site description for SEO in homepage.                                    |
| siteUrl         | ✓        | URL from which the production site is served. Used for sitemap creation. |
| siteTwitter     | ✓        | Site Twitter username for SEO. Can be set to `''`.                       |
| siteLanguage    | ✓        | Default site language.                                                   |

## Plugins

This theme installs the following plugins:

| Plugin                                                                                     | Description                                                                                                             |
| :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/) | Required to make the `SEO` component work.                                                                              |
| [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap)            | Create a [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) that you can submit to Google. |

## Standardized pages

| Title          | Path               | Description                                                            |
| :------------- | :----------------- | :--------------------------------------------------------------------- |
| Contact        | `/contact/`        | Palceholder page for contact details. Needs to be shadowed in website. |
| Copyright      | `/copyright/`      | Standardized copyright notice.                                         |
| Privacy Notice | `/privacy-notice/` | Standardized privacy notice.                                           |
| Terms of USe   | `/terms-of-use/`   | Standardized terms of use.                                             |
| 404            | `/404/`            | 404 page. Can be shadowed in your site.                                |

All standardized pages are unstyled. You can style them by shadowing the
template from
[@maiertech/gatsby-theme-pages-core](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-pages-core).
