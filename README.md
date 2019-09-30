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

All themes in this repository are published with [Lerna](https://lerna.js.org/) using [Conventional Commits](https://www.conventionalcommits.org/). The publish configuration is in `lerna.json`. Run

```
npx lerna publish
```
