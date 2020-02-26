# @undataforum/gatsby-themes

This monorepo contains [Gatsby](https://www.gatsbyjs.org/) themes for United
Nations World Data Forum websites.

## gatsby-theme-base

`@undataforum/gatsby-theme-base` provides layouts and configurations for all
other themes.

## gatsby-theme-blog

With `@undataforum/gatsby-theme-blog` you can manage a blog. Each post can have
multiple authors and for each author a profile page is created using
`@undataforum/gatsby-theme-profiles`. You can use this theme standalone or in
another theme.

## gatsby-theme-events

With `@undataforum/gatsby-theme-events` you can manage a collection of events,
mostly geared at webinars and conference sessions. Each event can have multiple
moderators and speakers. You can use this theme standalone or in another theme.

## gatsby-theme-profiles

With `@undataforum/gatsby-theme-profiles` you can manage profiles of authors,
speakers etc. You can use this theme standalone or in another theme.

## site

This is the test site used for developing themes. It uses mock content only. Run

    yarn workspace site run develop

to launch the site.

## Contributing

Any changes to one of the themes need to be accompanied by a
[changeset](https://github.com/atlassian/changesets) that includes a description
of the changes and how the version numbers should be increased (patch, minor,
major) following [semantic versioning](https://semver.org/). When you create a
pull request, the [changeset-bot](https://github.com/apps/changeset-bot) will
remind you of the missing changeset if there is none.

At the moment versioning and releasing theme packages is done manually with the
`changeset` command. For this to work you need to have NPM permissions and
permissions for this repository and create a `.env` file at the root containing
a `GITHUB_TOKEN` with permissions `repo:status` and `read:user`.
