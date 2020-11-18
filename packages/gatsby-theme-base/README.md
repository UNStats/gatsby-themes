# @undataforum/gatsby-theme-base

## Styling

All `@undataforum/gatsby-theme-<content_type>-core` themes are themes that come
without any opinion on styling. The idea is that you shadow all page components
and use whatever you prefer for styling.

This theme on the other hand is opinionated about styling. It wires up
[Theme UI](https://theme-ui.com/home) for use with Gatsby and configures
[`@undataforum/preset`](https://github.com/UNDataForum/design-system/tree/master/packages/preset)
as theme. You can use
[any other Theme UI preset](https://theme-ui.com/packages/presets/) by shadowing
`index.js` of
[`gatsby-plugin-theme-ui`](https://theme-ui.com/packages/gatsby-plugin/).

## Components

This theme also provides `Layout` and `SEO` components and re-exports all of
[Theme UI's components](https://theme-ui.com/components) and all components from
[`@undataforum/components`](https://github.com/UNDataForum/design-system/tree/master/packages/components).
This means that you do not have to install anything other than this theme to use
the [UNDataForum design system](https://design-system.undataforum.org/).

For the `SEO` component to work, you need to define the following
[site metadata](https://www.gatsbyjs.com/docs/gatsby-config/#sitemetadata) in
your site's `gatsby-config.js`:

| Key             | Required | Description                                                              |
| :-------------- | :------- | :----------------------------------------------------------------------- |
| siteTitle       | ✓        | Site title for SEO. Can also be used for header.                         |
| siteDescription | ✓        | Site description for SEO.                                                |
| siteUrl         | ✓        | URL from which the production site is served. Used for sitemap creation. |
| siteTwitter     | ✓        | Site Twitter username for SEO. Can be set to `''`.                       |
| siteLanguage    | ✓        | Default site language.                                                   |

## Plugins

This theme installs the following plugins:

| Plugin                                                                                     | Description                                                                                                             |
| :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)   | Use Gatsby's `Link` component for all internal links.                                                                   |
| [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/) | Required to make the `SEO` component work.                                                                              |
| [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap)            | Create a [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) that you can submit to Google. |
| [gatsby-plugin-theme-ui](https://theme-ui.com/packages/gatsby-plugin/)                     | Wire up [Theme UI](https://theme-ui.com/home/) for use with Gatsby.                                                     |

## Pages
