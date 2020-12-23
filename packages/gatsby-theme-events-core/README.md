# @undataforum/gatsby-theme-events-core

A [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) that adds an `Event`
interface and `MdxEvent` type to Gatsby sites.

## Options

| Key                      | Default Value    | Description                                                                                                                  |
| :----------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`              | Basepath for deployments at path other than root.                                                                            |
| `collection`             | `events`         | The collection is added to `Event` nodes. It is also part of the path.                                                       |
| `contentPath`            | `content/events` | Location of event MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `mdxOtherwiseConfigured` | `false`          | Set this flag to `true` if `gatsby-plugin-mdx` is already configured for your site.                                          |

## Frontmatter

| Key                | Required | Description                                                                                                                                                                            |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               |          | You can override Gatsby's internal ID with this field. This comes in handy when you want to be able to easily identify and query a specific event, e.g. for a pinned events feature.   |
| `title`            | ✓        | Event title. An event's slug is automatically derived from the title.                                                                                                                  |
| `slug`             |          | Use this field to overwrite the automatically derived slug.                                                                                                                            |
| `startDate`        | ✓        | Start date and time. Shortened [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp (`yyyy-MM-ddTHH:mm`), e.g. `2019-08-29T09:00`.                                             |
| `endDate`          | ✓        | End date and time. See `start`.                                                                                                                                                        |
| `timezone`         | ✓        | Time zone name from [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. `America/New_York`. This is the time zone for your event (should be local time). |
| `moderators`       |          | Array of moderator names.                                                                                                                                                              |
| `speakers`         |          | Array of speaker names.                                                                                                                                                                |
| `location`         | ✓        | Location ID. You can localize the location ID in shadowed templates.                                                                                                                   |
| `description`      |          | The default description for SEO purposes is the first paragraph in an event MDX file. With this field you can overrwrite the default.                                                  |
| `registrationLink` |          | Optional registration link.                                                                                                                                                            |
| `attachments`      |          | Array of relative paths to attachments, e.g. images or PDFs.                                                                                                                           |

## Interfaces

### `EventDescription` interface

| Field  | Type      | Description                                  |
| :----- | :-------- | :------------------------------------------- |
| `id`   | `ID!`     | Gatsby node GUID.                            |
| `body` | `String!` | String representation of the description.    |
| `text` | `String!` | Text only representation of the description. |

### `Event` interface

| Field              | Type                | Description                                            |
| :----------------- | :------------------ | :----------------------------------------------------- |
| `id`               | `ID!`               | Gatsby node GUID.                                      |
| `collection`       | `String!`           | Collection to which this event belongs.                |
| `title`            | `String!`           | Event title.                                           |
| `startDate`        | `Date!`             | Start date converted to UTC.                           |
| `endDate`          | `Date!`             | End date converted to UTC.                             |
| `moderators`       | `[String!]`         | Array of moderator names.                              |
| `speakers`         | `[String!]`         | Array of speaker names.                                |
| `location`         | `String!`           | Location ID (currently not linked to anything).        |
| `description`      | `EventDescription!` | Event description (formatted and text).                |
| `registrationLink` | `String`            | Registration link.                                     |
| `body`             | `String!`           | A string representation of the body of the event page. |
| `path`             | `String!`           | Path to generated page.                                |

Type `MdxEvent` implements `Event`. If you prefer to use a data source other
than MDX files, you can write a child theme that implements the `Event`
interface.
