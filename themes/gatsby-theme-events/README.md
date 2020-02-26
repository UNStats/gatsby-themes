# @undataforum/gatsby-theme-events

A [Gatsby](https://www.gatsbyjs.org/) theme to manage events.

## Usage

### Theme options

#### `assetPath` (default: `/content/assets/posts`)

Path to folder with assets for events.

#### `basePath` (default: "")

By default, the blog is served from `/`. When using this theme together with
other themes, you should change this option to `/events`.

#### `contentPath` (default: `/content/posts`)

Path to folder with MDX files for events. The filename convention is
`<slug>.mdx`, e.g. `a-very-interesting-event.mdx`. If you do not set a slug in
the frontmatter, the base name, in this example `a-very-interesting-article` is
used as slug.

#### `description` (default: placeholder)

SEO description for the index page generated at route `basePath`.

#### `profileType` (default: `profile`)

This theme uses `@undataforum/gatsby-theme-profiles` to manage profile pages of
speakers. The frontmatter of each event contains collections of moderators and
speakers, which uses slugs to reference profiles. Referenced profiles must be
part of collection defined by this property.

#### `title` (default: `Events`)

Page title for the index page generated at route `basePath`.

#### `type` (default: `event`)

If this theme is configured multiple times in `gatsby-config.js`, you can
distinguish different event collections with the `type` field in GraphQL
queries, e.g. type `webinar` for webinars and type `session` for sessions.

### Example theme config

This example shows how to include this theme twice, but keep the post
collections separate:

```
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@undataforum/gatsby-theme-blog`,
      options: {
        basePath: '/news',
        assetPath: '/assets/news',
        contentPath: '/content/news',
        type: 'news'
      },
    },
        {
      resolve: `@undataforum/gatsby-theme-blog`,
      options: {
        basePath: `/blog`,
        assetPath: `/assets/blog`,
        contentPath: '/content/blog',
        type: 'blog`
      },
    },
  ],
}
```

### Frontmatter

Frontmatter for MDX profiles located in `contentPath`.

#### `title` (required)

Post title.

#### `date` (required)

Date formatted as `YYYY-mm-DD`. The date as it should appear on the site. There
is no timezone magic happening anywhere.

#### `authors` (required)

List of profile slugs referencing profiles in the `profileType` collection.
`profileType` is a theme option.

#### `slug` (optional)

By default, this theme derives a posts's slug from its MDX filename:
`<slug>.mdx`. If you set a slug in the frontmatter, it takes precedence.

#### `description` (optional)

By default, this theme uses a post's first paragraph as description meta tag for
SEO. If you provide `description` in the frontmatter, it takes precedence over
the first paragraph.
