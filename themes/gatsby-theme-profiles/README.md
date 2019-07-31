# @undataforum/gatsby-theme-profiles

A [Gatsby](https://www.gatsbyjs.org/) theme to create profile pages.

## Usage

### Theme options

#### `assetPath` (default: `/content/assets/profiles`)

Path to folder with profile pictures.

#### `basePath` (default: "")

Root URL for all profiles. By default profiles are served from `/`. When using this theme together with other themes, you should change this option to `/profiles`.

#### `contentPath` (default: `/content/profiles`)

Path to folder with MDX profiles. The filename convention is `<slug>.mdx`, e.g. `cleric-edis.mdx`. If you do not set a slug in the frontmatter, the base name, in this example `cleric-edis`, is used as slug.

#### `type` (default: `profile`)

If this theme is configured multiple times in `gatsby-config.js`, you can distinguish different profile collections with the `type` field in GraphQL queries, e.g. type `author` for author profiles and type `speaker` for speaker profiles.

#### `title` (default: `Profiles`)

Page title for the index page generated at route `basePath`. Defaults to `Profiles`. Can be set to something like `Speakers` or `Contributors`.

#### `description` (optional)

SEO description for the index page generated at route `basePath`.

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

#### `honorific` (optional)

Honorific title, e.g. _Her Excellency_ or _His Royal Highness_.

#### `firstName` (required)

First name.

#### `lastName` (required)

Last name.

#### `jobtitle` (optional)

Job title.

#### `organization` (optional)

Organization.

#### `slug` (optional)

By default, this theme derives a profile's slug from its MDX filename: `<slug>.mdx`. If you set the slug in the frontmatter, it takes precedence.

#### `description` (optional)

By default, this theme uses a profile's first paragraph as description meta tag for SEO. If you provide `description` in the frontmatter, it takes precedence over the first paragraph.
