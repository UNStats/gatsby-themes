# @undataforum/gatsby-theme-theme-ui

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) that wires everything up
required for styling with [Theme UI](https://theme-ui.com/).

This theme export the `Layout` component and re-exports all of
[Theme UI's components](https://theme-ui.com/components) and all components from
[`@undataforum/components`](https://github.com/UNDataForum/design-system/tree/master/packages/components).
This means that you do not have to install anything other than this theme to use
the [UNDataForum design system](https://design-system.undataforum.org/).

## Styling with Theme UI

All `@undataforum/gatsby-theme-<content-type>-core` themes are themes that come
without any opinion on styling. The idea is that you shadow all page components
and use whatever you prefer for styling.

This theme on the other hand is opinionated about styling. It wires up
[Theme UI](https://theme-ui.com/home) for use with Gatsby and configures
[`@undataforum/preset`](https://github.com/UNDataForum/design-system/tree/master/packages/preset)
as theme. You can use
[any other Theme UI preset](https://theme-ui.com/packages/presets/) by shadowing
`index.js` of
[`gatsby-plugin-theme-ui`](https://theme-ui.com/packages/gatsby-plugin/).

## Plugins

This theme installs the following plugins:

| Plugin                                                                                   | Description                                                         |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/) | Use Gatsby's `Link` component for all internal links.               |
| [gatsby-plugin-theme-ui](https://theme-ui.com/packages/gatsby-plugin/)                   | Wire up [Theme UI](https://theme-ui.com/home/) for use with Gatsby. |
