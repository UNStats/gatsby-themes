# @undataforum/gatsby-themes

This monorepo contains [Gatsby](https://www.gatsbyjs.org/) themes for United Nations World Data Forum websites.

## themes/gatsby-theme-base

`@undataforum/gatsby-theme-base` provides layouts and configurations for all other themes.

## themes/gatsby-theme-blog

With `@undataforum/gatsby-theme-blog` you can manage a blog. Each post can have multiple authors and for each author a profile page is created using `@undataforum/gatsby-theme-profiles`. You can use this theme standalone or in another theme.

## themes/gatsby-theme-events

With `@undataforum/gatsby-theme-events` you can manage a collection of events, mostly geared at webminars and conference sessions. Each event can have multiple moderators and speakers. You can use this theme standalone or in another theme.

## themes/gatsby-theme-profiles

With `@undataforum/gatsby-theme-profiles` you can manage profiles of authors, speakers etc. You can use this theme standalone or in another theme.

## site

This is the site used for developing and testing all themes. It uses mock content only. Run

    yarn workspace site run develop

to launch the site.

## Contributing

All themes in this repository are published with [Lerna](https://lerna.js.org/) using [Conventional Commits](https://www.conventionalcommits.org/). The publish configuration is in `lerna.json`. Run

```
npx lerna publish
```

to publish all packages with changes.

Lerna also adds version tags to the repository when publishing. Even thoug `site` is configured as a private package, Lerna tags it and creates unnecessary tags. The `site` package needs a version number in its `package.json` since otherwise Yarn workspaces breaks. This version number, however, triggers Lerna to add version tags, even though it does not publish private packages.

Related issues:

- https://github.com/lerna/lerna/issues/1649
- https://github.com/lerna/lerna/issues/1942
- https://github.com/yarnpkg/yarn/issues/6371
