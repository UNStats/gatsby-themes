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
lookup theme option defaults in file [theme-options.js](./theme-options.js).

## Site metadata

To make the `SEO` component work, you need to define site metadata in your
site's gatsby-config.js. See type [SiteMetadata](./src/types.ts).

## Plugins

This theme installs the plugins listed in
[gatsby-config.js](./gatsby-config.js).

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
