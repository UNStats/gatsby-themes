# @undataforum/gatsby-themes

This monorepo contains a [Gatsby](https://www.gatsbyjs.org/) theme for United Nations World Data Forum websites and example websites that consume the theme.

## themes/gatsby-theme-undataforum

Main Gatsby theme for forum websites. This package will eventually be renamed to `@undataforum/gatsby-theme-main`. Because of an issue outlined in [this pull request](https://github.com/gatsbyjs/gatsby/pull/10786), the package name is to be `gatsby-theme-undataforum` for the time being. A scoped package name would break component shadowing and static queries.

## examples/main-website-demo

This is the mock main forum website used for development. It uses mock data. Run

    yarn workspace main-website-demo start

## Contributing

### Using Yarn vs. Lerna

This repository is configured for [yarn workspaces](https://yarnpkg.com/en/docs/workspaces). Since not all of the workspaces are published as NPM packages, they need to be excluded from tagging when publishing packages with [Lerna](https://lerna.js.org/).

Lerna's configuration [`lerna.json`](https://github.com/UNDataForum/gatsby-themes/blob/master/lerna.json) includes only those packages that are published to NPM:

```
"packages": ["themes/*"]
```

and does not include

```
"useWorkspaces": true
```

This is to keep Lerna from adding tags for packages that are never published and would pollute the repository's tags. Therefore, do not use the `lerna` command for managing dependencies.

### Publishing the Theme

The theme is published with Lerna using [Conventional Commits](https://www.conventionalcommits.org/). The publish configuration is in `lerna.json`.

Prior to publishing make sure that your `GH_TOKEN` environment variable is configured. Then run

```
npx lerna publish
```
