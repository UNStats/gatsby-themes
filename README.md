# @undataforum/gatsby-themes

This monorepo contains [Gatsby](https://www.gatsbyjs.org/) themes for United
Nations World Data Forum websites.

## Base theme

`@undataforum/gatsby-theme-base` provides layouts and configurations for all
other themes.

## Blog theme

With `@undataforum/gatsby-theme-blog` you can manage a blog. Each post can have
multiple authors and for each author a profile page is created using
`@undataforum/gatsby-theme-profiles`. You can use this theme standalone or in
another theme.

## Events theme

With `@undataforum/gatsby-theme-events` you can manage a collection of events,
mostly geared at webinars and conference sessions. Each event can have multiple
moderators and speakers. You can use this theme standalone or in another theme.

## Profiles theme

With `@undataforum/gatsby-theme-profiles` you can manage profiles of authors,
speakers etc. You can use this theme standalone or in another theme.

## Test site

This is the test site used for developing themes. It uses mock content only. Run

    yarn workspace test run dev

to launch the site.
