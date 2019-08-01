# @undataforum/gatsby-themes

This monorepo contains a [Gatsby](https://www.gatsbyjs.org/) themes for United Nations World Data Forum websites.

## themes/gatsby-theme-base

`@undataforum/gatsby-theme-base` provides layouts and configurations for all other themes.

## themes/gatsby-theme-profiles

With `@undataforum/gatsby-theme-profiles` you can manage profiles of authors, speakers etc. You can use this theme standalone or in another theme.

## themes/gatsby-theme-blog

With `@undataforum/gatsby-theme-blog` you can manage a blog. Each post can have multiple authors and for each author a profile page is created using `@undataforum/gatsby-theme-profiles`. You can use this theme standalone or in another theme.

## site

This is the site used for developing and testing all themes. It uses mock data. Run

    yarn workspace site run develop

to launch the site.

## Contributing

### Using Yarn vs. Lerna

This repository is configured for [yarn workspaces](https://yarnpkg.com/en/docs/workspaces). Since not all of the workspaces are published as NPM packages, they need to be excluded from tagging when publishing packages with [Lerna](https://lerna.js.org/).

Lerna's configuration [`lerna.json`](https://github.com/UNDataForum/gatsby-themes/blob/master/lerna.json) includes only those packages that are published to the [GitHub package registry](https://github.com/features/package-registry):

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

Prior to publishing make sure that your `GH_TOKEN` environment variable is configured in `~/.bashrc` and the GitHub package registry token in `~/.npmrc`. Then run

```
npx lerna publish
```
