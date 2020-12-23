# @undataforum/gatsby-theme-profiles-core

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) that adds a `Profile`
interface and `MdxProfile` type to Gatsby sites.

## Options

| Key                      | Default value      | Description                                                                                                                    |
| :----------------------- | :----------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`                | Basepath for deployments at path other than root.                                                                              |
| `collection`             | `profiles`         | The collection is added to `Profile` nodes. It is also part of the path.                                                       |
| `contentPath`            | `content/profiles` | Location of profile MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `mdxOtherwiseConfigured` | `false`            | Set this flag to `true` if `gatsby-plugin-mdx` is already configured for your site.                                            |

## Frontmatter

| Key            | Required | Description                                                                                                                                                           |
| :------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`         | ✓        | The slug is used to create the path to the generated profile and is used as ID to match profiles to other data types. The slug needs to be unique across collections. |
| `avatar`       | ✓        | Relative path to avatar image located in the `contentPath`.                                                                                                           |
| `honorific`    |          | Honorific title, e.g. _Her Excellency_ or _His Royal Highness_.                                                                                                       |
| `firstName`    | ✓        | First name.                                                                                                                                                           |
| `lastName`     | ✓        | Last name.                                                                                                                                                            |
| `jobtitle`     |          | Job title.                                                                                                                                                            |
| `organization` |          | Organization.                                                                                                                                                         |
| `description`  |          | The default description for SEO purposes is the first paragraph in a profile MDX file. This value overrrides the default.                                             |
| `roles`        |          | One or more roles that a profile can have. This is a YAML list with role keys as values, e.g. `2020-committee-member` or `2018-organizer`.                            |

### `Profile` interface

| Field          | Type        | Description                                                                                                                                                                                                                                                                   |
| :------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `ID!`       | Use slug instead of Gatsby node GUID.                                                                                                                                                                                                                                         |
| `collection`   | `String!`   | Collection to which this profile belongs.                                                                                                                                                                                                                                     |
| `avatar`       | `File!`     | If in the future data sources other than MDX are supported, `avatar` still needs to be of type `File!`, e.g. downoaded from [Contentful](https://www.contentful.com/) to cache. Data sources need to support [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/). |
| `firstName`    | `String!`   | Used for sorting profiles.                                                                                                                                                                                                                                                    |
| `lastName`     | `String!`   | Used for sorting profiles.                                                                                                                                                                                                                                                    |
| `name`         | `String!`   | Display name.                                                                                                                                                                                                                                                                 |
| `honorific`    | `String`    | From frontmatter.                                                                                                                                                                                                                                                             |
| `jobtitle`     | `String`    | From frontmatter.                                                                                                                                                                                                                                                             |
| `organization` | `String`    | From frontmatter.                                                                                                                                                                                                                                                             |
| `description`  | `String`    | From frontmatter.                                                                                                                                                                                                                                                             |
| `body`         | `String!`   | A string representation of the body of the profile page.                                                                                                                                                                                                                      |
| `roles`        | `[String!]` | A role is an identifier that can be used to lookup a role name. A profile can have more than one role.                                                                                                                                                                        |
| `path`         | `String!`   | Path to generated page.                                                                                                                                                                                                                                                       |

Type `MdxProfile` implements `Profile`. If you prefer to use a data source other
than MDX files, you can write a child theme that implements the `Profile`
interface.
