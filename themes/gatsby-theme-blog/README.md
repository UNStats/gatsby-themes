# @undataforum/gatsby-theme-blog

A [Gatsby](https://www.gatsbyjs.org/) theme to create a blog.

## Usage

### Theme options

#### `assetPath` (default: `/content/assets/posts`)

Path to folder with pictures for blog posts.

#### `basePath` (default: "")

Root URL for blog. By default, the blog is served from `/`. When using this theme together with other themes, you should change this option to `/blog`.

#### `contentPath` (default: `/content/posts`)

Path to folder with MDX blog posts. The filename convention is `<slug>.mdx`, e.g. `a-very-interesting-article.mdx`. If you do not set a slug in the frontmatter, the base name, in this example `a-very-interesting-article` is used as slug.

#### `type` (default: `post`)

If this theme is configured multiple times in `gatsby-config.js`, you can distinguish different post collections with the `type` field in GraphQL queries, e.g. type `blog` for blog posts and type `news` news articles.

#### `profileType` (default: `profile`)

This theme uses `@undataforum/gatsby-theme-profiles` to manage profile pages of blog post authors. The frontmatter of each post contains one or more links to profiles via profile slugs. Referenced profiles must be part of the `profileType` collection of profiles.

#### `title` (default: `Blog`)

Page title for the index page generated at route `basePath`. Defaults to `Posts`. Can be set to something like `Blog` or `News`.

#### `description` (optional)

SEO description for the index page generated at route `basePath`.

#### `alwaysRenderHeader` (default: false)

By default, the header is not rendered on the root page. The root page often has a layout that is very different from any other page. If you want the header to be rendered on the root page, set to `true`.

### Example theme config

This example shows how to include this theme twice, but keep the post collections separate:

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

Date formatted as `YYYY-mm-DD`. The date as it should appear on the site. There is no timezone magic happening anywhere.

#### `authors` (required)

List of profile slugs referencing profiles in the `profileType` collection. `profileType` is a theme option.

#### `slug` (optional)

By default, this theme derives a posts's slug from its MDX filename: `<slug>.mdx`. If you set a slug in the frontmatter, it takes precedence.

#### `description` (optional)

By default, this theme uses a post's first paragraph as description meta tag for SEO. If you provide `description` in the frontmatter, it takes precedence over the first paragraph.
