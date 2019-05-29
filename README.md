# @undataforum/gatsby-themes

This monorepo contains a [Gatsby](https://www.gatsbyjs.org/) theme for United Nations World Data Forum websites and example websites that consume the theme.

## themes/gatsby-theme-undataforum

Main Gatsby theme for forum websites. This package will eventually be renamed to `@undataforum/gatsby-theme-main`. Because of an issue outlined in [this pull request](https://github.com/gatsbyjs/gatsby/pull/10786), the package name is to be `gatsby-theme-undataforum` for the time being. A scoped package name would break component shadowing and static queries.

## examples/main-website-demo

This is the mock main forum website used for development. It uses mock data. Run

    yarn workspace main-website-demo start

## Contributing

### Using Yarn and Lerna

Use `yarn` to manage dependencies with [yarn workspaces](https://yarnpkg.com/en/docs/workspaces). Do not use [Lerna](https://lerna.js.org/) and the `lerna` command to manage dependencies. Lerna is used for publishing packages and tagging only. Therefore, `lerna.json` looks like this:

```
{
  "packages": ["themes/*"],
  "npmClient": "yarn",
  "version": "independent"
}
```

Note that `lerna.json` does not include the `useWorkspaces: true` flag and its `packages` declaration is different from the `workspaces` declaration in `package.json`. This ensures that `lerna` does not tag packages in the `examples` directory.

This table shows how each package is handled:

| Package                    | Path       | Dependencies | Publishing and Tagging |
| :------------------------- | :--------- | :----------- | :--------------------- |
| `gatsby-theme-undataforum` | `themes`   | `yarn`       | `lerna`                |
| `main-website-demo`        | `examples` | `yarn`       | n/a                    |

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to enable autoamtic changelog generation with Lerna.

## Publish with Lerna

In order to publish `gatsby-theme-undataforum` run

    npx lerna publish --conventional-commits --github-release
