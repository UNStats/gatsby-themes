# @undataforum/gatsby-themes

This is a monorepo containing a [Gatsby](https://www.gatsbyjs.org/) theme for UN World data forum websites and example websites that using the theme.

## gatsby-theme-undataforum

Main theme for all forum websites. The eventual name of this theme will be `@undataforum/gatsby-theme-main`. Because of an issue outlined in [this pull request](https://github.com/gatsbyjs/gatsby/pull/10786), the package name needs to be `gatsby-theme-undataforum`. A scoped package name would break component shadowing and `StaticQuery`.

## Examples

### main-website-demo

Demo website with mock data to develop and test new features. In order to launch run

```bash
yarn workspace main-website-demo start
```

### docs

Documentation website with info on how to set up a development environment and how to use themes. In order to launch run

```bash
yarn workspace docs start
```

## Contributing

Run

```bash
npx lerna bootstrap
```

to install all depedencies. If something breaks, you can try going back to a clean slate and reinstall all dependencies:

```bash
npx lerna clean -y && npx lerna bootstrap
```
