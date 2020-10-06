# @undataforum/gatsby-theme-blog

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) to create a blog with
post pages and a posts overview page. This theme can also be used for news
articles.

## Usage

### Theme options

| Key           | Default Value    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------ | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`    | `/`              | Root url for all posts. Should be changed to `/blog` in most cases. `basePath` is used in Gatsby lifecycle methods to generate individual post pages and the posts overview page.                                                                                                                                                                                                                                                          |
| `contentPath` | `content/posts`  | Location of profile MDX files. The filename convention is `<slug>.md`, e.g. `the-power-of-new-data-sources.md`. If you do not set a slug in the frontmatter, the MDX file's base name, in this example `the-power-of-new-data-sources`, is used as slug. `contentPath` is used to configure plugin `gatsby-source-filesystem`. Any file in `contentPath` is part of the GraphQL `Mdx` collection.                                          |
| `assetPath`   | `content/assets` | Location of assets for blog posts. `assetPath` is used to configure plugin `gatsby-source-filesystem`. Any image in `assetPath` can be linked to a post by adding it to the frontmatter `images` array via relative path. Images can follow any file name convention you like.                                                                                                                                                             |
| `collection`  | `blog`           | The `collection` option is supplied to the `name` option of plugin `gatsby-source-filesystem` for the `contentPath` definition. This makes it possible to filter `File` nodes by `collection` using `sourceInstanceName`. If you configure this theme more than once in `gatsby-config.js`, you can use `collection` to distinguish different post collections, e.g. collection `blog` for a blog and collection `news` for news articles. |
| `profiles`    | `undefined`      | If `profiles` is not set, frontmatter `authors` is interpreted as an array of author names and rendered as such. If `profiles` is set, it refers to a specific collection of profiles created with `@undataforum/gatsby-theme-profiles`. In this case frontmatter `authors` is interpreted as array of author slugs that each reference a profile in the collection defined by the `profiles` option.                                      |

This example config shows how to configure two separate posts collections:

```
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@undataforum/gatsby-theme-blog`,
      options: {
        basePath: '/news',
        contentPath: '/content/news',
        assetPath: '/assets/news',
        collection: 'news'
      },
    },
        {
      resolve: '@undataforum/gatsby-theme-blog',
      options: {
        basePath: '/blog',
        contentPath: '/content/blog',
        assetPath: '/assets/blog',
        collection: 'blog'
      },
    },
  ],
}
```

### MDX frontmatter

Frontmatter keys for MDX posts located in `contentPath`. The YAML type of each
key corresponds to the GraphQL type listed in the following section.

| Key           | Required | Description                                                                                                                                                                                                                |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | yes      | Post title.                                                                                                                                                                                                                |
| `date`        | yes      | Date in `yyyy-MM-dd` format. This is the date as it should appear on the website. There is no timezone magic happening anywhere.                                                                                           |
| `authors`     | no       | If theme option `profiles` is not set, this is a list of author names. If theme option `profiles` is set, this is a list of author slugs that references profiles from the collection provided in theme option `profiles`. |
| `slug`        | no       | The default slug is the post MDX file's base name. This value overrides the default.                                                                                                                                       |
| `description` | no       | The default description for SEO purposes is the first paragraph in a post MDX file. This value overrrides the default.                                                                                                     |
| `images`      | no       | List of relative paths to images that can be included into a post via MDX.                                                                                                                                                 |

### GraphQL Profile type

This theme adds GraphQL type `Post` which can be queried with `post` and
`allPost` queries. Type `Post` makes no assumptions about what the underlying
data source is.

| Field         | Type                          | Description                                                                                    |
| :------------ | :---------------------------- | :--------------------------------------------------------------------------------------------- |
| `id`          | `ID!`                         | Gatsby node GUID.                                                                              |
| `slug`        | `ID!`                         | Alternative ID used for querying and building the graph.                                       |
| `collection`  | `String!`                     | Distinguish separate post collections.                                                         |
| `title`       | `PostTitle!`                  | Text and compiled MDX variants of post title.                                                  |
| `date`        | `Date!`                       |                                                                                                |
| `authors`     | `[String!]!` or `[Profile!]!` | Type depends on theme option `profiles`.                                                       |
| `description` | `PostDescription!`            | Text and compiled MDX variants of post description.                                            |
| `body`        | `String!`                     | A string representation of the body of the profile page. For MDX pages this is the MDX `body`. |
| `images`      | `[File!]`                     | Relative paths to images.                                                                      |
| `path`        | `String!`                     | Path to generated page.                                                                        |

### Localizations

This theme does not support full i18n, but partial localization. The following
keys are supported:

| Key                        | Description                                                       |
| :------------------------- | :---------------------------------------------------------------- |
| `<collection>.tag`         | Tag that is displayed on post pages to indicate the type of post. |
| `<collection>.title`       | Title of posts overview page.                                     |
| `<collection>.description` | Description that is used for SEO on the posts overview page.      |

Each key is prepended by the collection name, which is a theme option. The
default collection is `blog` and the theme comes with default localizations for
this collection.

The default localizations are located in `src/i18n/translations/en.js`. To
customize localizations, you need to shadow this file in your Gatsby website. If
you shadow `en.js` you need to include all keys that you intend to use since
shadowed keys are not merged with defaults.

Shadowing is normally done in the main Gatsby website. If you use a
microfrontend architecture as is the case in the example website in this
repository and if you use multiple collections in different microfrontends, then
you need to shadow `en.js` in each microfrontend to ensure that the
microfrontend renders properly when launched in isolation and you need to
consolidate all shadowed `en.js` files in another shadowed file inside your
Gatsby site. Check out the source code in this repository.
