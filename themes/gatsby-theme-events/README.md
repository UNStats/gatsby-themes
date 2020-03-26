# @undataforum/gatsby-theme-events

A [Gatsby](https://www.gatsbyjs.org/) theme to create event pages and an events
overview page. Can be used for any types of events, including webinars and
sessions.

## Usage

### Theme options

| Key           | Default Value    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------ | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`    | `/`              | Root url for all events. Should be changed to `/events` in most cases. `basePath` is used in Gatsby lifecycle methods to generate individual event pages and the events overview page.                                                                                                                                                                                                                                                           |
| `contentPath` | `content/events` | Location of event MDX files. The filename convention is `<slug>.md`, e.g. `keynote-session.md`. If you do not set a slug in the frontmatter, the MDX file's base name, in this example `keynote-session`, is used as slug. `contentPath` is used to configure plugin `gatsby-source-filesystem`. Any file in `contentPath` is part of the GraphQL `Mdx` collection.                                                                              |
| `assetPath`   | `content/assets` | Location of assets for events. `assetPath` is used to configure plugin `gatsby-source-filesystem`. Any image in `assetPath` can be linked to an event by adding it to the frontmatter `images` array via relative path. Images can follow any file name convention you like.                                                                                                                                                                     |
| `collection`  | `events`         | The `collection` option is supplied to the `name` option of plugin `gatsby-source-filesystem` for the `contentPath` definition. This makes it possible to filter `File` nodes by `collection` using `sourceInstanceName`. If you configure this theme more than once in `gatsby-config.js`, you can use `collection` to distinguish different event collections, e.g. collections `webinars` and `sessions`.                                     |
| `profiles`    | `undefined`      | If `profiles` is not set, frontmatter properties `moderators` and `speakers` are interpreted as an array of names and rendered as such. If `profiles` is set, it refers to a specific collection of profiles created with `@undataforum/gatsby-theme-profiles`. In this case frontmatter `moderators` and `speakers` are interpreted as array of profile slugs that each reference a profile in the collection defined by the `profiles` option. |

This example config shows how to configure two separate posts collections:

```
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@undataforum/gatsby-theme-events`,
      options: {
        basePath: '/webinars',
        assetPath: '/assets/webinars',
        contentPath: '/content/webinars',
        collection: 'webinars'
      },
    },
        {
      resolve: `@undataforum/gatsby-theme-events`,
      options: {
        basePath: '/sessions`,
        assetPath: `/assets/sessions`,
        contentPath: '/content/sessions',
        type: 'webinars`
      },
    },
  ],
}
```

### MDX Frontmatter

Frontmatter for MDX profiles located in `contentPath`. The YAML type of each key
corresponds to the GraphQL type listed in the following section.

| Key                | Required | Description                                                                                                                                                                                                                    |
| :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`            | yes      | Event title.                                                                                                                                                                                                                   |
| `start`            | yes      | Shortened [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp (`yyyy-MM-ddTHH:mm`), eg `2019-08-29T09:00`.                                                                                                            |
| `end`              | yes      | See `start`.                                                                                                                                                                                                                   |
| `timezone`         | yes      | Time zone name from [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), eg `America/New_York`.                                                                                                        |
| `moderators`       | no       | If theme option `profiles` is not set, this is a list of moderator names. If theme option `profiles` is set, this is a list of profile slugs that references profiles from the collection provided in theme option `profiles`. |
| `speakers`         | no       | If theme option `profiles` is not set, this is a list of speaker names. If theme option `profiles` is set, this is a list of profile slugs that references profiles from the collection provided in theme option `profiles`.   |
| `location`         | yes      | Location ID. You can localize the location ID to provide a more meaningful location description.                                                                                                                               |
| `slug`             | no       | The default slug is the event MDX file's base name. This value overrides the default.                                                                                                                                          |
| `description`      | no       | The default description for SEO purposes is the first paragraph in an event MDX file. This value overrrides the default.                                                                                                       |
| `registrationLink` | no       | Optional registration link.                                                                                                                                                                                                    |

### GraphQL Event type

This theme adds GraphQL type `Event` which can be queried with `event` and
`allEvent` queries. Type `Event` makes no assumptions about what the underlying
data source is.

| Field              | Type                        | Description                                                                                  |
| :----------------- | :-------------------------- | :------------------------------------------------------------------------------------------- |
| `id`               | `ID!`                       | Gatsby node GUID.                                                                            |
| `slug`             | `ID!`                       | Alternative ID used for querying and building the graph.                                     |
| `collection`       | `String!`                   | Distinguish separate event collections.                                                      |
| `title`            | `EventTitle!`               | Text and compiled MDX variant of event title.                                                |
| `startDate`        | `Date!`                     | Start date converted to UTC.                                                                 |
| `endDate`          | `Date!`                     | End date converted to UTC.                                                                   |
| `displayDate`      | `String!`                   | This is the start date augmented with time zone information.                                 |
| `duration`         | `String!`                   | Event duration (calculated with `startDate` and `endDate`).                                  |
| `moderators`       | `[String!]` or `[Profile!]` | Type depends on theme option `profiles`.                                                     |
| `speakers`         | `[String!]` or `[Profile!]` | Type depends on theme option `profiles`.                                                     |
| `description`      | `EventDescription!`         | Text and compiled MDX variants of event description.                                         |
| `registrationLink` | `String`                    |                                                                                              |
| `body`             | `String!`                   | A string representation of the body of the event page. For MDX pages this is the MDX `body`. |
| `path`             | `String!`                   | Path to generated page.                                                                      |
