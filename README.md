# @undataforum/gatsby-themes

This is a monorepo containing [Gatsby](https://www.gatsbyjs.org/) themes for UN World data forum websites and example website that use the themes. For starters there is only one theme.

## Themes

- **`gatsby-theme-undataforum`:** This is the main theme for all forum websites. The eventual name of this theme will be `@undataforum/gatsby-theme-main`. Because of an issue outlined in [this pull request](https://github.com/gatsbyjs/gatsby/pull/10786), the package name needs to be `gatsby-theme-undataforum` instead of a scoped package name, since otherwise component shadowing and `StaticQuery` break.

## Examples

### `main-website-demo`

Demo website with mock data to develop new features. In order to launch run

```bash
yarn run demo
```

### `docs`

Documentation website with info on how to set up a local development environment and how to use the themes. In order to launch run

```bash
yarn run docs
```

## CodeSandbox

You can explore this repository on [CodeSandbox](https://codesandbox.io):

https://codesandbox.io/s/github/UNDataForum/gatsby-themes
