# @undataforum/gatsby-theme-profiles

A [Gatsby](https://www.gatsbyjs.org/) theme to create profile pages.

## Usage

### Options

| Key           | Default value              | Description                                                                              |
| :------------ | :------------------------- | :--------------------------------------------------------------------------------------- |
| `basePath`    | `/`                        | Root URL for all profiles.                                                               |
| `contentPath` | `/content/profiles`        | Location of profiles. Filename convention: `<slug>.mdx`, e.g. `cleric-edis.mdx`.         |
| `assetPath`   | `/content/assets/profiles` | Location of profile pictures. Filename convention: `<slug>.jpg`, e.g. `cleric-edis.jpg`. |

Use these options in your `gatsby-config.js`. The following example publishes profiles at `/profiles`.

```
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@undataforum/gatsby-theme-profiles`,
      options: {
        basePath: `/profiles`,
      },
    },
  ],
}
```
