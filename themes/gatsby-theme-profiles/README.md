# @undataforum/gatsby-theme-profiles

A [Gatsby](https://www.gatsbyjs.org/) theme to create profile pages.

## Usage

### Theme options

#### `assetPath` (default: `/content/assets/profiles`)

Path to folder with profile pictures.

#### `basePath` (default: `/`)

Root URL for all profiles. By default profiles are served from `/`. When using this theme together with other themes, you should change this option to `/profiles/`.

#### `contentPath` (default: `/content/profiles`)

Path to folder with MDX profiles. The filename convention is `<slug>.mdx`, e.g. `cleric-edis.mdx`. If you do not set a slug in the frontmatter, the base name, in this example `cleric-edis` is used as slug.

#### `typeName` (default: `Profile`)

This theme creates custom nodes to make querying profiles simple. The default type name is `Profile`. In scenarios when this theme is used more than once (as a direct or indirect dependency), it is necessary to keep different profile collections separate by providing different values to type, e.g. `AuthorProfile` and `SpeakerProfile`. This option is usually modified together with `contentPath`.

### Example theme config

This example shows how to include this theme twice, but keep the profile collections separate:

```
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@undataforum/gatsby-theme-profiles`,
      options: {
        basePath: `/author-profiles`,
        assetPath: `/assets/author-profiles`,
        contentPath: '/content/author-profiles',
        type: 'AuthorProfile`
      },
    },
        {
      resolve: `@undataforum/gatsby-theme-profiles`,
      options: {
        basePath: `/speaker-profiles`,
        assetPath: `/assets/speaker-profiles`,
        contentPath: '/content/speaker-profiles',
        type: 'SpeakerProfile`
      },
    },
  ],
}
```

### Frontmatter

Frontmatter for MDX profiles located in `contentPath`.

#### `avatar` (required)

Relative path to profile picture located in the `assetPath` folder. Filenames of profile pictures can ba anything you like. The recommended filename is `<slug>.jpg`, e.g. `cleric-edis.jpg`. In this case, with default `assetPath` and `contentPath`, the value for `avatar` would be `../assets/profiles/cleric-edis.png`.

#### `firstName` (required)

First name.

#### `lastName` (required)

Last name.

#### `honorificTitle` (optional)

Honorific title, e.g. Her Excellency or His Royal Highness.

#### `jobtitle` (optional)

Job title.

#### `organization` (optional)

Organization.

#### `slug` (optional)

By default, this theme derives a profile's slug from its MDX filename: `<slug>.mdx`. If you set the slug in the frontmatter, it takes precedence.
