const pkg = require("./package.json");

module.exports = {
  siteMetadata: {
    title: pkg.name,
    description: pkg.description,
    siteUrl: "https://theme.undataforum.org",
    navLinks: [
      {
        href: "/about",
        text: "About"
      },
      {
        href: "/committee",
        text: "Committee"
      }
    ]
  },
  plugins: [
    // Install "gatsby-plugin-page-creator" if the theme should be able to generate pages.
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/src/pages`
    //   }
    // },
    {
      resolve: "gatsby-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/MDXTextPage.jsx")
        }
      }
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet"
  ]
};
