# @undataforum/gatsby-theme-blog-core

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) that adds a `Post`
interface and `MdxPost` type to Gatsby sites.

## Options

| Key                      | Default Value   | Description                                                                                                                 |
| :----------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`             | Basepath for deployments at path other than root.                                                                           |
| `collection`             | `posts`         | The collection is added to `Post` nodes. It is also part of the path.                                                       |
| `contentPath`            | `content/posts` | Location of post MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `mdxOtherwiseConfigured` | `false`         | Set this flag to `true` if `gatsby-plugin-mdx` is already configured for your site.                                         |

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
