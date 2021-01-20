# @undataforum/gatsby-theme-posts-core

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) that adds a `Post`
interface and `MdxPost` type to Gatsby sites.

## Options

| Key                      | Default Value   | Description                                                                                                                 |
| :----------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`             | Basepath for deployments at path other than root.                                                                           |
| `collection`             | `posts`         | The collection is added to `Post` nodes. It is also part of the path.                                                       |
| `contentPath`            | `content/posts` | Location of post MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `mdxOtherwiseConfigured` | `false`         | Set this flag to `true` if `gatsby-plugin-mdx` is already configured for your site.                                         |

Any other options will have no effect on the theme, but they will get routed
through all tempaltes via `pageContext` and you can access them from within a
template.

## Frontmatter

| Key           | Required | Description                                                                                                                                                                        |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          |          | You can override Gatsby's internal ID with this field. This comes in handy when you want to be able to easily identify and query a specific post, e.g. for a pinned posts feature. |
| `title`       | ✓        | Post title. A post's slug is automatically derived from the title.                                                                                                                 |
| `slug`        |          | Use this field to overwrite the automatically derived slug.                                                                                                                        |
| `date`        | ✓        | Date in `yyyy-MM-dd` format. This is the date as it should appear on the website. There is no timezone magic happening anywhere.                                                   |
| `authors`     |          | Array of author names.                                                                                                                                                             |
| `description` |          | The default description for SEO purposes is the first paragraph in a post MDX file. With this field you can overrwrite the default.                                                |
| `images`      | no       | List of relative paths to images that can be included into a post via MDX.                                                                                                         |

## Interfaces

### `PostDescription` interface

| Field  | Type      | Description                                  |
| :----- | :-------- | :------------------------------------------- |
| `id`   | `ID!`     | Gatsby node GUID.                            |
| `body` | `String!` | String representation of the description.    |
| `text` | `String!` | Text only representation of the description. |

### `Post` interface

| Field         | Type               | Description                                             |
| :------------ | :----------------- | :------------------------------------------------------ |
| `id`          | `ID!`              | Gatsby node GUID unless overwritten in frontmatter.     |
| `collection`  | `String!`          | Collection to which this post belongs.                  |
| `title`       | `String!`          | Post title.                                             |
| `date`        | `Date!`            | Post date.                                              |
| `authors`     | `[String!]`        | Array of author names.                                  |
| `description` | `PostDescription!` | Post description (formatted and text).                  |
| `body`        | `String!`          | A string representation of the body of a post page.     |
| `images`      | `[File!]`          | File nodes for images that can be embedded into a post. |
| `path`        | `String!`          | Path to generated post page.                            |

Type `MdxPost` implements `Post`. If you prefer to use a data source other than
MDX files, you can write a child theme that implements the `Post` interface.

## Tagging support

This theme is compatible with
[@maiertech/gatsby-theme-tags-core](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-tags-core),
which implements tagging for MDX files. Check its README for more information on
how to wire it up. You can add the tagging theme more than once and create
multiple independent tag collections. But the most common use case is one tag
collection for multiple tagged collections. Use option `mdxCollections` to
configure which collections should be included.

Once you have added the tagging theme to your `gatsby-config.js` you need to
follow these steps:

1. You can add an optional `tags` field to the frontmatter of posts. The tags
   theme will include them in the configured collection and corresponding tag
   pages. At this point any pages generated by the tags theme are unstyled.
1. Shadow
   [`tag-page.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-tags-core/src/components/tag-page.js)
   and Shadow
   [`tags-page.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-tags-core/src/components/tags-page.js)
   to style tag pages.
1. Modify the shadowed
   [`post-page.js`](https://github.com/UNDataForum/gatsby-themes/blob/master/packages/gatsby-theme-posts-core/src/components/post-page.js)
   to display the tags. You can use the
   [`Tags`](https://design-system.undataforum.org/components/tags) component to
   display the tags. Tags are already included in the template query. In oder to
   assemble paths to tag pages, you can add theme option `tagCollection` with
   the tag collection name. All theme options are routed through to the template
   and accessible via `pageContext`.

Note that Field `description` for tagged items is not supported, because
`description` in frontmatter is optional in @undataforum/gatsby-theme-posts-core
since descriptions default to the first paragraph in MDX files.
